import React, { Component } from "react";


import JqxGrid from '../jqwidgets-react/react_jqxgrid.js';
import SessionEntryHelper from '../../helpers/SessionEntryHelper'


class ReportSessionEntryGrid extends Component {
    constructor(props) {
        super(props);
     }

    static defaultProps = {
        entriesList : [],
        onEditButtonClick: function(data) {},
        onDataUpdate: function() {},
        filterable: true,
        showfilterrow: true,
        selectionmode: 'singlerow'
    }

    componentWillMount() {
        this.initDataAdapter()
    }

    componentDidUpdate() {
        

        // this.source.localdata = this.props.entriesList.slice()
        this.source.localdata = this.props.entriesList.slice()
        this.dataAdapter.dataBind()

        let el = document.querySelector('#ReportsessionEntryGrid'); 
        if(el) {
            let headers = el.querySelectorAll('.jqx-grid-column-header');
            let lastHeader = headers[headers.length -1];

            // if(lastHeader && lastHeader.parentElement.previousElementSibling) {
            if(lastHeader) {    
                lastHeader.parentElement.remove();
            }
        }

    }

    refresh = () => {
        // this.refs.jqxgrid.updatebounddata();
        // this.dataAdapter.dataBind()
    }

    initDataAdapter() {

        

        var datafields = [
            { name: '_id', type: 'string' },
            { name: 'rate', type: 'number' },
            { name: 'runs', type: 'number' },
            { name: 'amount', type: 'number' },
            { name: 'amount_patti', type: 'number' },
            { name: 'yn', type: 'string' },
            { name: 'account_name', type: 'string' },       
            { name: 'account_id', type: 'number' },
            { name: 'match_id', type: 'number' },
            { name: 'created_at', type: 'date'},
            { name: 'comm_yn', type: 'boolean' },
            { name: 'session_id', type: 'number' },
            { name: 'is_declared', type: 'boolean' },
            { name: 'is_summarized', type: 'boolean' },
            { name: 'patti_total_per', type: 'number' },
            // { name: 'sess_comm', type: 'string' },
            { name: 'comm_amt', type: 'number' },
            { name: 'comm_total_per', type: 'number' },
            
        ];

        this.source = {
            datatype: 'json',
            datafields: datafields,
            id: '_id',
            // localdata: this.props.entriesList.slice(),
            localdata: this.props.entriesList.slice(),
            
        };

        this.dataAdapter = new $.jqx.dataAdapter(this.source);

            this.columns = [
            { text: 'Id', datafield: '_id', width: 70 },
            { text: 'Party', datafield: 'account_name', width: 120 },
            { text: 'Rate', datafield: 'rate', width: 60, cellsformat: 'd2' },
            { text: 'Runs', datafield: 'runs', width: 60 },
            { text: 'L/K', datafield: 'yn', width: 50 },
            { text: 'Amount', datafield: 'amount', width: 80 , cellsformat: 'd2', aggregates: ['sum']},
            { text: 'Patti Amt.', datafield: 'amount_patti', width: 80 , cellsformat: 'd2', aggregates: ['sum']},
            { text: 'Comm Amt.', datafield: 'comm_amt', width: 100 , cellsformat: 'd2', aggregates: ['sum']},
            { text: 'Comm YN', datafield: 'comm_yn', width: 100, columntype: 'checkbox', filtertype:'bool' },
            { text: 'Patti (%)', datafield: 'patti_total_per', width: 100 , cellsformat: 'd2'},
            { text: 'Comm (%)', datafield: 'comm_total_per', width: 100 , cellsformat: 'd2'},
            { text: 'Is Declared', datafield: 'is_declared', width: 100, columntype: 'checkbox', filtertype:'bool' },
            { text: 'Is Summarized', datafield: 'is_summarized', width: 120, columntype: 'checkbox', filtertype:'bool' },
            { text: 'Created At', datafield: 'created_at', width: 200, cellsformat: 'dd/MM/yyyy Thh:mm tt' },
        ];
        
    }

    render() {
        
        const { filterable, showfilterrow, selectionmode } = this.props

        return (
            <div id="sessionEntryGrid">
                <JqxGrid ref="jqxgrid" key11={Math.random()}
                    source={this.dataAdapter} columns={this.columns}
                    width={"100%"} height={400} pageable={false} pagermode={'simple'} pagesize={1000}
                    sortable={false} altrows={true} enabletooltips={true}
                    editable={false}  selectionmode={selectionmode}
                    showstatusbar={true} showaggregates={true} statusbarheight={25}
                    filterable={filterable} showfilterrow={showfilterrow}
                />
            </div>
        );
    }
}

export default ReportSessionEntryGrid;
