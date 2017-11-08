var async = require("async");
var await = require("async").await;
var mongoose = require('mongoose');

var Constant = require('../Constant')
var SessionModel = require('../model/SessionModel')
var MatchSummaryClass = require('./MatchSummaryClass')
var ResponseHelper = require('../class/ResponseHelper')

module.exports = {

    async declare(id, runs) {
        var session = await SessionModel.findOne({_id: parseInt(id)})
        if(session.is_declared) {
            throw(ResponseHelper.error(400, 'Session is declared already.'))
        }

        try {
            session.declared_runs = runs
            session.is_declared = true
            await session.save() 
            await MatchSummaryClass.session_updateFinalWinLossAmt_bySession(id)
            await MatchSummaryClass.session_buildJournal(id)
            return ResponseHelper.ok(200, 'Successfully declared')
        } catch(err) {
            console.log(err)
            await this.undeclare(id)
            throw(ResponseHelper.error(400, 'Cannot declare.'))
        }

        return ResponseHelper.ok(200, 'Successfully declared')
    },

    async undeclare(id, runs) {
        var session = await SessionModel.findOne({_id: parseInt(id)})
        try {
            await MatchSummaryClass.session_deleteJournal(id)
            session.declared_runs = null
            session.is_declared = false
            await session.save()
        } catch(err) {
            throw(ResponseHelper.error(400, 'Cannot undeclare.'))
        }
        return ResponseHelper.ok(200, 'Successfully undeclared')
    },

    list(args = { match_id: null}) {
        var aggregate = [];

        if(args.match_id) {
            aggregate.push(
                {
                    $match: {
                        'match_id' : parseInt(args.match_id)
                    }
                }
            )
        }

        aggregate.push(
            {
                $lookup:
                {
                   from: "matches",
                   localField: "match_id",
                   foreignField: "_id",
                   as: "match"
                }
            },

            {
                $unwind:"$match"
            },

            {
                $lookup:
                {
                   from: "teams",
                   localField: "team_id",
                   foreignField: "_id",
                   as: "team"
                }
            },
            
            {
                $unwind:"$team"
            },

            { 
                $project : { 
                    _id : 1 , 
                    match_id: 1,
                    team_id : 1 ,
                    session_name: 1,
                    declared_runs: 1,
                    is_declared: 1,
                    created_at: 1,
                    updated_at: 1,
                    match_name :"$match.match_name",
                    team_name :"$team.team_name"
                } 
            }
        );



        return SessionModel.aggregate(aggregate);
    },

};