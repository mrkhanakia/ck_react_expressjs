var JournalModel = require('../model/JournalModel')

var MetaDataModel = require('../model/MetaDataModel')

var UserClass = require('../class/UserClass')
var ReportClass = require('../class/ReportClass')
var AccountClass = require('./AccountClass')
var JournalEntryClass = require('./JournalEntryClass')
var BackupClass = require('./BackupClass')
var SetupClass = require('./SetupClass')


module.exports = {

    async dropCollection(collectionName) {
        try {
            return await db.dropCollection(collectionName)
        } catch(e) {}

        return 'done'
    },
    async removeAllRecords() {
        UserClass.checkIsAdminElseThrowError()
        // db.dropCollection('accounts', function(err, result) {});
        // await db.dropCollection('accounts');
        // await db.dropCollection('teams');
        await this.dropCollection('livematchschedules');
        await this.dropCollection('livematchscheduleseries');
        await this.dropCollection('activitylogs');
        // await this.dropCollection('identitycounters');
        // await this.dropCollection('journalentries');
        // await this.dropCollection('journals');
        await this.dropCollection('matchsummaries');
        await this.dropCollection('matchentries');
        await this.dropCollection('matchteams');
        await this.dropCollection('matches');
        await this.dropCollection('sessionentries');
        await this.dropCollection('sessions');
        await this.dropCollection('meterentries');
        await this.dropCollection('meters');

        await db.collection('identitycounters').updateMany({ model: { $nin: [ "Account", "Journal", "JournalEntry", "User" ] } },  { '$set':  {"count": 0} });



        return ResponseHelper.ok(200, 'Successfully removed all records.')
    },

    async removeLedgerRecordsAndMerge() {
        UserClass.checkIsAdminElseThrowError()

        await BackupClass.backupDb()

        var bsheetList = await ReportClass.balanceSheet()

        await this.dropCollection('journalentries');
        await this.dropCollection('journals');
        await db.collection('identitycounters').updateMany({ model: { $in: ["Journal", "JournalEntry"] } },  { '$set':  {"count": 0} });

        var companyAccountId = await AccountClass.getCompanyAccounId()
        var narration = "Opening Balance"

        var journalItem = await new JournalModel().save();
        journalItem.ref_id = journalItem._id
        journalItem.ref_type = "Auto"
        await journalItem.save()

        await Promise.all(bsheetList.map(async (item) => {
            // do not create any item for BOOK we will sum total PL in the last then will add to book account
            if(item.is_company) return false;

            /* 
                We have to toggle the -ve values because createJournalEntryItem1 will Credit the +ve values but 
                in bsheet -ve values means Punter is in profit book is in loss 
            */
            var bal = -1 * item.bal

            var jeitem = await JournalEntryClass.createJournalEntryItem1({
                journal_id: journalItem._id, 
                by_account_id: companyAccountId, 
                account_id: item.account_id, 
                amount: bal, 
                type: 'OB', 
                narration: narration
            })            
        }))


        var pl_bal = await JournalEntryClass.getBalanceTotal_byJournalId(journalItem._id)
        if(pl_bal!==0) {            
            var jeitemBook = await JournalEntryClass.createJournalEntryItem1({
                    journal_id: journalItem._id, 
                    by_account_id: companyAccountId, 
                    account_id: companyAccountId, 
                    amount: pl_bal, 
                    type: 'PL', 
                    narration: narration,
                    is_company: true
                })
        }
        
        // return bsheetList;
        // UserClass.checkIsAdminElseThrowError()
        return ResponseHelper.ok(200, 'Successfully removed ledger.')
    },

    async clearWholeDb() {
        UserClass.checkIsAdminElseThrowError()
       // await db.dropDatabase()
           // db.dropCollection('accounts', function(err, result) {});
        await db.dropCollection('accounts');
        await db.dropCollection('teams');
        await this.dropCollection('livematchschedules');
        await this.dropCollection('livematchscheduleseries');
        await this.dropCollection('activitylogs');
        // await this.dropCollection('identitycounters');
        await this.dropCollection('journalentries');
        await this.dropCollection('journals');
        await this.dropCollection('matchsummaries');
        await this.dropCollection('matchentries');
        await this.dropCollection('matchteams');
        await this.dropCollection('matches');
        await this.dropCollection('sessionentries');
        await this.dropCollection('sessions');
        await this.dropCollection('meterentries');
        await this.dropCollection('meters');
        await this.dropCollection('metadatas');

        await db.collection('identitycounters').updateMany({ model: { $nin: [ "User" ] } },  { '$set':  {"count": 0} });

        return ResponseHelper.ok(200, 'Successfully cleared database.')
    },

    async saveSettings(args = {} ) {
        await MetaDataModel.updateMeta('setting_show_decimals', HelperClass.stringToBoolean(args.show_decimals))
        await MetaDataModel.updateMeta('theme_name', args.theme_name)
        await MetaDataModel.updateMeta('grid_theme_name', args.grid_theme_name)
        
        await AccountClass.updateCompanyName(args.company_name)

        var settings = await this.getSettings()
        return ResponseHelper.ok(200, 'Successfully saved.', {settings: settings})
    },

    async getSettings() {
        var show_decimals = await MetaDataModel.get('setting_show_decimals', true)
        var theme_name = await MetaDataModel.get('theme_name', 'default')
        var grid_theme_name = await MetaDataModel.get('grid_theme_name', 'metro')
        var accountCompany = await AccountClass.getCompanyAccount()
        return {
            show_decimals: HelperClass.stringToBoolean(show_decimals),
            company_name: accountCompany.account_name,
            theme_name: theme_name,
            grid_theme_name: grid_theme_name
        }
    },



};