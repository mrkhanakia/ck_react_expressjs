import React, { Component } from "react";

import JqxGrid from '../jqwidgets-react/react_jqxgrid.js';

import JournalEntryHelper from '../../helpers/JournalEntryHelper'

class JournalEntryGrid extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        entriesList : [],
        onEditButtonClick: function(data) {},
        onDataUpdate: function() {}
    }

    componentWillMount() {
        this.initDataAdapter()
    }

    componentDidUpdate() {
        this.source.localdata = this.props.entriesList.slice()
        this.dataAdapter.dataBind()
    }


    initDataAdapter() {
        var datafields = [
            { name: '_id', type: 'string' },
            { name: 'account_name', type: 'string' },
            { name: 'dr_amt', type: 'string' },
            { name: 'cr_amt', type: 'string' },
            { name: 'bal', type: 'string' },
            { name: 'narration', type: 'string' },
            { name: 'account_id', type: 'string' },
            { name: 'journal_id', type: 'string' },
            { name: 'created_at', type: 'date' },
            { name: 'is_monday_final', type: 'boolean' },
            { name: 'locked', type: 'boolean' },
            { name: 'type', type: 'string' },
            { name: 'by_account_name', type: 'string' },
        ];

        this.source = {
            datatype: 'json',
            datafields: datafields,
            id: '_id',
            localdata: this.props.entriesList.slice(),
            // url: '/journal_entries?account_id='+this.props.accountId
        };


        this.dataAdapter = new $.jqx.dataAdapter(this.source);

        this.columns = [{
                text: 'Delete',
                datafield: 'Delete',
                columntype: 'button',
                width: 50,
                filterable: false,
                exportable: false,
                cellclassname: function (row, column, value, data) {
                     // console.log(row, column , value, data)
                     if(data.locked) {
                        return "jqx_cell_disabled"
                     }
                },
                cellsrenderer: () => {
                    return 'Delete';
                },
                buttonclick: (row) => {
                    let dataRecord = this.refs.jqxgrid.getrowdata(row);
                    console.log(dataRecord.uid)
                    var r = confirm("Are you sure!");
                    if (r == true) {
                        JournalEntryHelper.delete(dataRecord.uid).then((res) => {
                            this.props.onDataUpdate()
                        }).catch((err)=> {
                            console.log(err)
                            toastr.error(err.response.data.message)
                        })
                    }

                }
            },
            { text: 'Id', datafield: '_id', width: 50 },
            { text: 'Created At', datafield: 'created_at', width: 200, cellsformat: 'dd/MM/yyyy Thh:mm tt' },
            { text: 'Type', datafield: 'type', width: 80 },
            { text: 'By Account', datafield: 'by_account_name', width: 150 },
            // { text: 'Account', datafield: 'account_name', width: 150 },
            { text: 'Narration', datafield: 'narration', width: 500 },
            { text: 'Debit', datafield: 'dr_amt', width: 100, cellsformat: 'd2' },
            { text: 'Credit', datafield: 'cr_amt', width: 100, cellsformat: 'd2' },
            { text: 'Balance', datafield: 'bal', width: 100, cellsformat: 'd2' },
            { text: 'Is Monday Final', datafield: 'is_monday_final', width: 100, columntype: 'checkbox', filterable: false },
        ];

    }

    render() {
        // console.log(this.props.entriesList.slice())

        
        return (
            <div>
                <JqxGrid key={Math.random()} ref="jqxgrid"  source={this.dataAdapter} columns={this.columns} 
                        width={ "100%"} height={400}
                        pageable={true} sortable={true} altrows={false} enabletooltips={false} 
                        editable={false} filterable={true} showfilterrow={true} 
                        columnsresize={true} />
            </div>
        );
    }
}

export default JournalEntryGrid;