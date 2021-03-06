var express = require('express');
var router = express.Router();
var async = require("async");
var _ = require('lodash');

var ReportClass = require('../class/ReportClass')
var ActivityLogClass = require('../class/ActivityLogClass')
var JournalEntryClass = require('../class/JournalEntryClass')
var JournalEntryModel = require('../model/JournalEntryModel')

router.get('/connect_list_matches', function(req, res, next) {
    ReportClass.connectListMatches().then(function(data){
        res.send(data)    
    }).catch((err)=>{
        res.send(err)
    })
})

router.post('/connect_report', function(req, res, next) {
    ReportClass.connectReport(req.body).then(function(data){
        res.send(data)    
    }).catch((err)=>{
        res.send(err)
    })
})

router.get('/balance_sheet', function(req, res, next) {
    ReportClass.balanceSheetGrid().then(function(data){
        res.send(data)    
    }).catch((err)=>{
        res.send(err)
    })
})

router.get('/pl_matchwise', function(req, res, next) {
    ReportClass.plMatchWise().then(function(data){
        res.send(data)    
    }).catch((err)=>{
        res.send(err)
    })
});

router.get('/pl_match_accountwise', function(req, res, next) {
    ReportClass.plMatchAccountWise().then(function(data){
        res.send(data)    
    }).catch((err)=>{
        res.send(err)
    })
});

router.get('/pl_match_accountwise_matchsummary', function(req, res, next) {
    ReportClass.plMatchAccountWiseMatchSummary({matchId: req.query.match_id, accountId: req.query.account_id}).then(function(data){
        res.send(data)    
    }).catch((err)=>{
        res.send(err)
    })
});
router.get('/pl_match_accountwise_entries', function(req, res, next) {
    ReportClass.plMatchAccountWise_Entries(req.query).then(function(data){
        res.send(data)    
    }).catch((err)=>{
        res.send(err)
    })
});

router.get('/journal_summary', function(req, res, next) {
    ReportClass.journalSummary().then(function(data){
        res.send(data)    
    }).catch((err)=>{
        res.send(err)
    })
});

router.get('/activity_log', function(req, res, next) {
    ActivityLogClass.list().then(function(data){
        res.send(data)    
    }).catch((err)=>{
        res.send(err)
    })
});

module.exports = router;