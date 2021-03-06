var async = require("async");
var _ = require('lodash');
var json2csv = require('json2csv');
var fs = require('fs');

var ReportClass = require('../class/ReportClass')
var JournalClass = require('../class/JournalClass')
var JournalEntryClass = require('../class/JournalEntryClass')

module.exports = {
    async report_balanceSheet() {
        var items = await ReportClass.balanceSheetGrid()
        var fieldNames = ['Account', 'Bal','Account', 'Bal'];
        var fields = ['account_name', 'bal', 'account_name1', 'bal1'];
        var csv = json2csv({ data: items, fields: fields, fieldNames: fieldNames });

        var fileName = `balance_sheet_${Date.now()}.csv`
        var filePath = `${DIR_TEMP}/${fileName}`
        var fileDownloadUrl = `${APP_URL}/temp/${fileName}`
        await fs.writeFile(filePath, csv);



        try {
            var bal = 0;
            var bal1 = 0;
            
            _.map(items, (item) => {
                var itembal = +item.bal || 0
                var itembal1 = +item.bal1 || 0
                bal += itembal
                bal1 += itembal1

            })
            var gtotal = bal1 + bal


            // return { items : items, bal: bal, bal1: bal1, gtotal: gtotal};

            var htmlData = ''
            await app.render('report_bsheet', { items : items, bal: bal, bal1: bal1, gtotal: gtotal}, function(err, html) {
                htmlData = html
                console.log('DDD', html)
            })
            
            var filePathHTML = `${DIR_TEMP}/report_bsheet.html`
            await fs.writeFile(filePathHTML, htmlData);
        } catch(e) {
            console.log(e)
        }
        
        return {
            fileName: fileName,
            filePath: filePath,
            fileDownloadUrl: fileDownloadUrl
        }
    },

    async report_plMatchWise() {
        var items = await ReportClass.plMatchWise()
        var fieldNames = ['MatchId', 'Match Name', 'Match - Comm.','Match - Patti','Match - PL','Session - Comm.','Session - Patti','Session - PL','Meter - Comm.','Meter - Patti','Meter - PL','Bal'];
        var fields = ['match_id', 'match_name', 'comm_match', 'patti_match', 'pl_match', 'comm_session', 'patti_session', 'pl_session', 'comm_meter', 'patti_meter', 'pl_meter', 'bal'];
        var csv = json2csv({ data: items, fields: fields, fieldNames: fieldNames });

        var fileName = `pl_match_wise_${Date.now()}.csv`
        var filePath = `${DIR_TEMP}/${fileName}`
        var fileDownloadUrl = `${APP_URL}/temp/${fileName}`
        await fs.writeFile(filePath, csv);
        
        return {
            fileName: fileName,
            filePath: filePath,
            fileDownloadUrl: fileDownloadUrl
        }
    },

    async report_plMatchAccountWise() {
        var items = await ReportClass.plMatchAccountWise()
        var fieldNames = ['MatchId', 'Match Name', 'AccountId.','Account Name','Bal'];
        var fields = ['match_id', 'match_name', 'account_id', 'account_name', 'bal'];
        var csv = json2csv({ data: items, fields: fields, fieldNames: fieldNames });

        var fileName = `pl_match_accountwise_${Date.now()}.csv`
        var filePath = `${DIR_TEMP}/${fileName}`
        var fileDownloadUrl = `${APP_URL}/temp/${fileName}`
        await fs.writeFile(filePath, csv);
        
        return {
            fileName: fileName,
            filePath: filePath,
            fileDownloadUrl: fileDownloadUrl
        }
    },

    async report_connectReport(filters=[]) {

        var items = await ReportClass.connectReport(filters)
        var fieldNames = ['Account', 'Bal', 'With Patti', 'Account', 'Bal', 'With Patti'];
        var fields = ['account_name', 'bal', 'after_patti', 'account_name1', 'bal1', 'after_patti1'];
        var csv = json2csv({ data: items, fields: fields, fieldNames: fieldNames });

        var fileName = `connect_report_${Date.now()}.csv`
        var filePath = `${DIR_TEMP}/${fileName}`
        var fileDownloadUrl = `${APP_URL}/temp/${fileName}`
        await fs.writeFile(filePath, csv);
        
        
        
        try {
            var bal = 0;
            var bal1 = 0;
            
            _.map(items, (item) => {
                var itembal = +item.after_patti || 0
                var itembal1 = +item.after_patti1 || 0
                bal += itembal
                bal1 += itembal1

            })
            var gtotal = bal1 + bal


            // return { items : items, title: title, bal: bal, bal1: bal1, gtotal: gtotal};

            var title = _.map(filters, 'name').join(' / ');
            var htmlData = ''
            await app.render('report_connect', { items : items, title: title, bal: bal, bal1: bal1, gtotal: gtotal}, function(err, html) {
                htmlData = html
                // console.log('DDD', html)
            })

            var filePathHTML = `${DIR_TEMP}/report.html`
            await fs.writeFile(filePathHTML, htmlData);
        } catch(e) {
            console.log(e)
        }
        
        // return htmlData
        return {
            fileName: fileName,
            filePath: filePath,
            fileDownloadUrl: fileDownloadUrl
        }
    },

    async journalEntries(args={}) {
        var items = await JournalEntryClass.list(args)
        var fieldNames = ['Id', 'Created At', 'Account', 'Narration', 'Debit', 'Credit', 'Balance'];
        var fields = ['_id', 'created_at', 'account_name', 'narration', 'dr_amt', 'cr_amt', 'bal'];
        var csv = json2csv({ data: items, fields: fields, fieldNames: fieldNames });

        var fileName = `journal_entries_${Date.now()}.csv`
        var filePath = `${DIR_TEMP}/${fileName}`
        var fileDownloadUrl = `${APP_URL}/temp/${fileName}`
        await fs.writeFile(filePath, csv);
        
        return {
            fileName: fileName,
            filePath: filePath,
            fileDownloadUrl: fileDownloadUrl
        }
    },

    // async journalSummary() {
    //     var items = await JournalClass.entriesList()
    //     var fieldNames = ['Account', 'Bal','Account', 'Bal'];
    //     var fields = ['account_name', 'bal', 'account_name1', 'bal1'];
    //     var csv = json2csv({ data: items, fields: fields, fieldNames: fieldNames });

    //     var fileName = `pl_match_wise_${Date.now()}.csv`
    //     var filePath = `${DIR_TEMP}/${fileName}`
    //     var fileDownloadUrl = `${APP_URL}/temp/${fileName}`
    //     await fs.writeFile(filePath, csv);
        
    //     return {
    //         fileName: fileName,
    //         filePath: filePath,
    //         fileDownloadUrl: fileDownloadUrl
    //     }
    // },

};