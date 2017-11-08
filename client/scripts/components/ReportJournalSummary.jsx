import React, { Component } from "react";
import { inject, observer } from 'mobx-react';

import JournalEntryListGrid from './Journal/JournalEntryListGrid.jsx'

@inject('journalStore')
@observer
class ReportJournalSummary extends Component {

    componentDidMount() {
        this.props.journalStore.fetchEntriesList()
    }


    componentWillReceiveProps(nextProps) {
        // console.log(nextProps.match.params.id, this.props.match.params.id)
        // if(nextProps.match.params.account_id!==this.props.match.params.account_id) {
        //     this.props.journalEntryStore.fetchListByAccount(nextProps.match.params.account_id, this.refs.showMondayFinalChk.checked)
        //     this.props.journalEntryStore.fetchAccountBalanceObject(nextProps.match.params.account_id)
        // }
    }

    exportToPdf = () => {
        this.refs.entryGrid.refs.jqxgrid.exportdata('pdf', 'journal_summary');
    }

    render() {  
        const {journalEntriesList} = this.props.journalStore

        return (
            <div>
                <h5>Report - Journal Summary</h5>
                 <div className="mb-1 text-right">    
                    <button ref='pdfExport' onClick={this.exportToPdf} className="btn btn-sm btn-primary mr-1">Print</button>
                </div>
                <div className="mb-2">
                    <div className="row">
                        <div className="col-md-12">
                            <JournalEntryListGrid ref="entryGrid" entriesList={journalEntriesList} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReportJournalSummary;
