/*
  This page will show all the matches which is not declared yet so user can enter to particular match to add entries
*/
import React from 'react'

import JqxGrid from './jqwidgets-react/react_jqxgrid.js';
import { API_URL_MATCHES, APP_URL_MDI_MATCH } from '../Constant';

class MatchEntries extends React.Component {
    render() {
        var _this = this;
        let source = {
            datatype: 'json',
            datafields: [
                { name: '_id', type: 'string' },
                { name: 'created_at', type: 'date' },
                { name: 'match_name', type: 'string' },
                { name: 'match_type', type: 'string' },
                { name: 'is_declared', type: 'boolean' },
                { name: 'team_name', type: 'string' },
            ],

            id: '_id',
            url: API_URL_MATCHES,

            updaterow: (rowid, rowdata, commit) => {
                MatchHelper.update(rowdata.uid, {
                    match_name: rowdata.match_name
                })
                commit(true);
            },
        };

        let dataAdapter = new $.jqx.dataAdapter(source);

        let columns = [          
            {
                text: '',
                datafield: 'Select1',
                columntype: 'button',
                width: 100,
                filterable: false,
                cellsrenderer: () => {
                    return 'Enter Match';
                },
                buttonclick: (row) => {
                    let dataRecord = this.refs.jqxgrid.getrowdata(row);
                    _this.props.history.push(APP_URL_MDI_MATCH + "/" + dataRecord.uid)
                }
            },
            { text: 'Match Id', datafield: '_id', width: 100 },
            { text: 'Name', datafield: 'match_name', width: 150 },
            { text: 'Match Type', datafield: 'match_type', width: 100 },
            { text: 'Is Declared', datafield: 'is_declared', width: 100, columntype: 'checkbox', filtertype: "boolean" },
            { text: 'Winner', datafield: 'team_name', width: 100 },
            { text: 'Dated', datafield: 'created_at', width: 100, cellsformat: 'dd/MM/yyyy' },
        ];
        return (
            <div className="page d-inline-block mx-2">
                <h6><i className="fa fa-futbol-o"></i> Select Match</h6>
                <JqxGrid ref="jqxgrid" source={dataAdapter} columns={columns}
                    width={"750"} height={500}  
                    pageable={true} sortable={true} altrows={true} enabletooltips={true} 
                    editable={false} filterable={true} showfilterrow={true} />
            </div>
        );
    }
}

export default MatchEntries;
