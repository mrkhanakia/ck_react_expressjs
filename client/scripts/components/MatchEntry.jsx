import React from 'react'
import { inject, observer } from 'mobx-react';
import { render } from 'react-dom'

import ComboBox from './controls/ComboBox.jsx'
import MatchEntryForm from './MatchEntry/MatchEntryForm.jsx'
import MatchEntryGrid from './MatchEntry/MatchEntryGrid.jsx'
import MatchEntryTeamGrid from './MatchEntry/MatchEntryTeamGrid.jsx'
import MatchEntryAvgBlock from './MatchEntry/MatchEntryAvgBlock.jsx'
import MatchEntryBookDdl from './MatchEntry/MatchEntryBookDdl.jsx'
import MatchDeclare from './MatchEntry/MatchDeclare.jsx'

import SessionEntryForm from './SessionEntry/SessionEntryForm'
import SessionEntryWinLossGrid from './SessionEntry/SessionEntryWinLossGrid'

import { API_URL_MATCH_ABANDON, API_URL_MATCH_UNABANDON , API_URL_MATCH_UNDECLARE, MATCH_TYPE_CUP } from '../Constant'


@inject('globalStore')
@inject('matchStore')
@inject('matchEntryStore')
@inject('sessionStore')
// @inject('sessionEntryStore')
@inject('accountStore')
@observer
class MatchEntry extends React.Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        matchId : 1,
    }

    componentDidMount() {
        this.props.matchStore.fetchTeams(this.props.matchId)
        this.props.accountStore.fetchList()
        this.props.sessionStore.fetchList(this.props.matchId)
        
        this.fetch()
        // this.props.matchStore.fetch(this.props.matchId)

        // // For Session Form

    }

    onFormSubmitted = () => {
        this.fetch()
        setTimeout(() => {
        }, 1000)
    }

    fetch = () => {
        this.props.matchEntryStore.fetchAll(this.props.matchId, this.getBookNo())

        
    }

    onEditButtonClick = (data) => {
        // console.log(data)
        this.refs.matchEntryForm.edit(data)
    }

    matchGridOnDataUpdate = () => {
        this.fetch()
    }

    getBookNo = () => {
        try {
            return this.refs.bookddl.getSelectedValue()
        } catch(err) {
            return 1
        }
    }

    onBookNoChange = (bookNo) => {
        // console.log(bookNo)
        this.fetch()
    }


    onDeclareChange = () => {
        this.props.matchStore.fetch(this.props.matchId)
        this.fetch()
    }

    openDeclareWindow = () => {
        let mainDemoContainer = document.getElementById('footerContainer');
            let widgetContainer = document.createElement('div');
            mainDemoContainer.appendChild(widgetContainer);
            render(<MatchDeclare teamList={this.props.matchStore.teamsList} onChange={this.onDeclareChange} />, widgetContainer);
    }

    undeclare = () => {
        var r = confirm("Are you sure to Undeclare ?", ' ');
        if (r == true) {
           axios({
                method: 'post',
                headers: Auth.header(),
                url: API_URL_MATCH_UNDECLARE + "/" + this.props.matchId
            }).then((res) => {
                this.props.matchStore.fetch(this.props.matchId)
                this.fetch()
                
            }).catch((err)=> {
                toastr.error(err.response.data.message)
            })
        }
    }

    abandon = () => {
        var r = confirm("Are you sure to Abandon ?", ' ');
        if (r == true) {
           axios({
                method: 'post',
                headers: Auth.header(),
                url: API_URL_MATCH_ABANDON + "/" + this.props.matchId
            }).then((res) => {
                this.props.matchStore.fetch(this.props.matchId)
                this.fetch()
                
            }).catch((err)=> {
                toastr.error(err.response.data.message)
            })
        }
    }

    unAbandon = () => {
        var r = confirm("Are you sure to UnAbandon ?", ' ');
        if (r == true) {
           axios({
                method: 'post',
                headers: Auth.header(),
                url: API_URL_MATCH_UNABANDON + "/" + this.props.matchId
            }).then((res) => {
                this.props.matchStore.fetch(this.props.matchId)
                this.fetch()
                
            }).catch((err)=> {
                toastr.error(err.response.data.message)
            })
        }
    }


    renderDeclareButtons = () => {
        const {match} = this.props.matchStore
        if(match.is_abandoned || match.is_monday_final) return null;
        if(match.is_declared) {
            return (
                <button className="btn btn-primary btn-sm" onClick={this.undeclare}>UnDeclare</button>
            ) 
        }
        return (
            <button className="btn btn-primary btn-sm" onClick={this.openDeclareWindow}>Declare</button>
        )
    }

    renderAbandonButtons = () => {
        const {match} = this.props.matchStore
        if(match.is_declared || match.is_monday_final) return null;
        if(match.is_abandoned) {
            return (
                <button className="btn btn-primary btn-sm ml-1" onClick={this.unAbandon}>Un Abandon</button>
            ) 
        }
        return (
            <button className="btn btn-primary btn-sm ml-1" onClick={this.abandon}>Abandon</button>
        )
    }



     //// SESSION ENTRY FUNCTIONS ========================================================
    comboSessionOnClose = (e) => {
        const sessionId = (this.refs.sessionEntryForm.refs.comboSession.getSelectedValue())
        this.props.globalStore.setSessionId(sessionId)
        stores.sessionEntryStore.fetchAll(sessionId)
    }
    sessionEntry_onFormSubmitted = (response) => {
        this.refs.sessionEntryForm.resetForm()
        stores.sessionEntryStore.fetchAll(response.session_id)

        console.log(response)
        stores.sessionEntryStore.lastEnteredRun = response.runs
    }

    
    refresh1 = () => {
        // this.props.matchStore.count = Math.random()
        this.props.matchStore.fetch(this.props.matchId)
    }

    render() {
        const {matchId, match} = this.props
        const {teamsList} = this.props.matchStore
        // if (!this.props.matchId) return null;
        // if (_.isEmpty(match)) return null;
        const {entriesList, matchPlInfo} = this.props.matchEntryStore
        const {bookNoList, teamsWinLossList, lastEntryAccountTeamsWinLossList} = matchPlInfo


        // For Session Form
        const {selectedSessionId} = this.props.globalStore
        const {sessionList} = this.props.sessionStore
        // const {sessionWinLossList, lastEnteredRun} = this.props.sessionEntryStore
        

        const { accountList } = this.props.accountStore

        const cssClassHidden = match.match_type==MATCH_TYPE_CUP ? ' hidden' : ''
        return ( 
            <div>
                <div className="row">
                    <div className="col-md-2">
                        {/*<button className="btn btn-primary btn-sm ml-1" onClick={this.refresh1}>Refresh</button>*/}
                        {this.renderDeclareButtons()}
                        {this.renderAbandonButtons()}
                        
                        
                        <div className={"mt-2" + cssClassHidden}>
                            <MatchEntryBookDdl ref="bookddl" bookNoList={bookNoList} onChange={this.onBookNoChange} /> 
                            <MatchEntryAvgBlock teamsWinLossList={teamsWinLossList} />
                        </div>
                        <div className="mt-2">
                            <h6>Book Profit/Loss</h6>
                            <MatchEntryTeamGrid ref="teamGrid" teamsWinLossList={teamsWinLossList} />
                            <h6 className="mt-5">Last Entry Profit/Loss</h6>
                            <MatchEntryTeamGrid ref="teamGrid" teamsWinLossList={lastEntryAccountTeamsWinLossList} />
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="mt-2 mb-2">
                            <SessionEntryForm ref="sessionEntryForm" matchId={this.props.matchId} 
                                        accountList={accountList}
                                        sessionId={selectedSessionId} sessionList={sessionList}
                                        onFormSubmitted={this.sessionEntry_onFormSubmitted} 
                                        comboSessionOnClose={this.comboSessionOnClose} />
                        </div>
                        <div className="mb-2">
                            <MatchEntryForm ref="matchEntryForm" 
                                matchId={matchId} match={match} accountList={accountList}
                                onFormSubmitted={this.onFormSubmitted} getBookNo={this.getBookNo} 
                                teamsList={teamsList} />
                        </div>

                        <div className="matchEntryRow">
                            <div className="acol acol1">
                                <MatchEntryGrid ref="matchGrid" 
                                    onEditButtonClick={this.onEditButtonClick}  onDataUpdate={this.matchGridOnDataUpdate}
                                    entriesList={entriesList}
                                    teamsList={teamsList} />
                            </div>
                            <div className="acol acol2">
                               <SessionEntryWinLossGrid ref="winlossGrid"  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MatchEntry;
