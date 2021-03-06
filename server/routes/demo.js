var express = require('express');
var router = express.Router();

var Account = require('../model/AccountModel')
var MatchEntryModel = require('../model/MatchEntryModel')
var MatchTypeModel = require('../model/MatchTypeModel')
var MetaDataModel = require('../model/MetaDataModel')

var MatchEntryClass = require('../class/MatchEntryClass')
var AccountClass = require('../class/AccountClass')
var MatchTeamClass = require('../class/MatchTeamClass')
var MatchSummaryClass = require('../class/MatchSummaryClass')

var SessionClass = require('../class/SessionClass')
var SessionEntryClass = require('../class/SessionEntryClass')

var MeterClass = require('../class/MeterClass')
var MeterEntryClass = require('../class/MeterEntryClass')

var JournalEntryClass = require('../class/JournalEntryClass')


var fs = require('fs');
var path = require('path');

router.get('/env', function(req, res, next) {
	res.send(req.app.get('env'))
})

router.get('/', function(req, res, next) {

	// var account = new Account({
	// 	account_name: "Aman"
	// })

	// account.save(function(error, obj){
	// 	if (error) {
	//     	res.status(500).send(error);
	//     }
	//     res.status(200).send(obj);
	// })


	// var mentry = new MatchEntryModel({
	// 	match_id: "59d774e3db652b22f83ff98c",
	// 	account_id: "59da24d61ae1d43d7373744c",
	// 	team_id: "59d7187512dfaf1a6a842d86",
	// 	rate: 0.10,
	// 	amount: 100,
	// 	lk: "L"
	// })

	// mentry.save(function(error, obj){
	// 	if (error) {
	//     	res.status(500).send(error);
	//     }
	//     res.status(200).send(obj);
	// })


	// MatchEntryModel.updateFullEntry("59da25338d64b83d7d8efc9f", function(err,obj){
	// 	res.send(obj);
	// })


// DbClass.sayHelloInSpanish1().then(function(data){
// 	res.send(data)
// })

// MatchEntryClass.generateTeamDataArray("59d774e3db652b22f83ff98c", null).then(function(data){
// 	res.send(data)
// })


 // MatchTeamClass.listByMatchId("59d774e3db652b22f83ff98c", function(err, data){
 //            	res.send(data)
 //        })


MatchEntryClass.updateEntryAfterInsert(1).then((data)=>{
	console.log('DONE1')
	res.send(data)
}).catch((data)=>{
	console.log('ERROR')
	res.send(data)
});

// MatchSummaryClass.buildSummaryByMatchEntry(4, 'Winner', function(err, data){
// 	if(err) return res.send(err)
// 		return res.send('data')
// })

// MatchSummaryClass.buildMatchSummary(1).then((data)=>{
// 	console.log('DONE1')
// 	res.send(data)
// }).catch((data)=>{
// 	console.log('ERROR')
// 	res.send(data)
// });

//  MatchEntryClass.updateEntriesByAccount(1).then(function(data){
// 	console.log(data)
// 	res.send(data)
// 	// res.send(data);
// }).catch((err)=>{
// 	res.send(err.message)
// })
// MatchSummaryClass.cleanUndeclaredData(1)
// MatchSummaryClass.buildByMatchTeam(1, 'Loser', function(err, data){
// 	if(err) return res.send(err)
// 		return res.send(data)
// })

// MatchSummaryClass.buildMatchJournal(1, function(err, data){
// 	if(err) return res.send(err)
// 		return res.send(data)
// })

// res.send("sdfds")

// MatchSummaryClass.buildMatchEntryJournal("59dc80189857c85e8d6d94ac", "59dc7ffe9857c85e8d6d94a7").then((data) => {
// 	res.send(data)
// })
// MatchEntryClass.buildNetComm().then(function(data){
// 	console.log(data)
// 	res.send(data);
// })


// MatchSummaryClass.session_updateFinalWinLossAmt(12).then(function(data){
// 	console.table(data)
// 	res.send(data)
// 	// res.send(data);
// }).catch((err)=>{
// 	res.send(err.message)
// })

// MatchSummaryClass.session_updateFinalWinLossAmt_bySession(5).then(function(data){
// 	console.table(data)
// 	res.send(data)
// 	// res.send(data);
// }).catch((err)=>{
// 	res.send(err.message)
// })

// MatchSummaryClass.session_buildJournal(5).then(function(data){
// 	console.table(data)
// 	res.send(data)
// 	// res.send(data);
// }).catch((err)=>{
// 	res.send(err.message)
// })

// MatchSummaryClass.session_updateFinalWinLossAmt_onAccountUpdate(1).then(function(data){
// 	console.table(data)
// 	res.send(data)
// 	// res.send(data);
// }).catch((err)=>{
// 	res.send(err.message)
// })



// SessionEntryClass.session_updateEntries_onAccountUpdate(1).then(function(data){
// 	console.table(data)
// 	res.send(data)
// 	// res.send(data);
// }).catch((err)=>{
// 	res.send(err.message)
// })

// MatchEntryClass.getTeamsWinLossList().then(function(data){
// 	console.log(data)
// 	res.send(data);
// })


// SessionEntryClass.updateEntryAfterInsert(7).then(function(data){
// 	console.table(data)
// 	res.send(data)
// 	// res.send(data);
// }).catch((err)=>{
// 	res.send(err.message)
// })

// SessionEntryClass.sessionPL_Info(9).then(function(data){
	
// 	res.send(data)
// 	// res.send(data);
// }).catch((err)=>{
// 	res.send(err.message)
// })


// SessionClass.undeclare(1).then(function(data){
// 	SessionClass.declare(1).then(function(data){
// 		res.send(data)
// 	}).catch((err)=>{
// 		res.send(err)
// 	})	
// }).catch((err)=>{
// 	res.send(err)
// })


// MeterEntryClass.updateEntryAfterInsert(1).then(function(data){
// 	res.send(data)
// }).catch((err)=>{
// 	res.send(err)
// })

// MatchSummaryClass.meter_updateFinalWinLossAmt_byEntry(2).then(function(data){
// 	res.send(data)
// }).catch((err)=>{
// 	res.send(err)
// })

// MatchSummaryClass.meter_updateFinalWinLossAmt_byMeter(4).then(function(data){
// 	res.send(data)
// }).catch((err)=>{
// 	res.send(err)
// })


// MeterClass.declare(4, 16).then(function(data){
// 	res.send(data)
// }).catch((err)=>{
// 	res.send(err)
// })


// AccountClass.getSessCommAggregate(2)

// AccountClass.getCompanyAccounId();

// JournalEntryClass.getBalanceTotal_byJournalId(171)

// SessionEntryClass.buildWinLossList();

// DbClass.updateMatchEntry("59da25338d64b83d7d8efc9f",function(err,obj){
// 	res.send(obj)
// })
// AccountClass.getPattiTotalPercentage("59da24d61ae1d43d7373744c", function(err,obj){
// 	res.send(obj)
// })


// MetaDataModel.updateMeta("aman", "11")
// MetaDataModel.get("aman").then((res)=> {
// 	console.log(res)
// })


// MeterEntryClass.meter_updateEntries_onAccountUpdate(1)

// MetaDataModel.updateMeta('version', 1)
// res.send('respond with a resource');


});

router.get('/migration', function(req, res, next) {
	MatchTypeModel.findOneAndUpdate({match_type_val: "one_day"}, {match_type_name: "One Day", match_type_val: "one_day"}, {upsert:true}).exec();
	MatchTypeModel.findOneAndUpdate({match_type_val: "twenty"}, {match_type_name: "Twenty-20", match_type_val: "twenty"}, {upsert:true}).exec();
	MatchTypeModel.findOneAndUpdate({match_type_val: "test"}, {match_type_name: "Test", match_type_val: "test"}, {upsert:true}).exec();
	MatchTypeModel.findOneAndUpdate({match_type_val: "cup"}, {match_type_name: "Cup", match_type_val: "cup"}, {upsert:true}).exec();
	res.send("Migration Done")
});


module.exports = router;
