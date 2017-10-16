import React, { Component } from "react";

import InputDecimal from '../controls/InputDecimal.jsx'
// import ComboBoxMember from '../controls/ComboBoxMember.jsx'
import ComboBoxLocal from '../controls/ComboBoxLocal.jsx'
import CSelect from '../controls/CSelect.jsx'
import AccountHelper from '../../helpers/AccountHelper'

import {LIST_COMM_TYPE, LIST_STATUS_BOOLEAN} from '../../Constant'
class MemberForm extends Component {

    constructor(props) {
        super(props);

        this.defaultItem = {
            _id: null,
            limit: 0,
            sess_comm: 0,
            match_comm: 0,
            lk_comm: 0,
            player_comm: 0,
            khada_comm: 0,
            cup_comm: 0,
            tfr_sess_comm: 0,
            tfr_match_comm: 0,
            tfr_lk_comm: 0,
            tfr_player_comm: 0,
            tfr_khada_comm: 0,
            tfr_cup_comm: 0,
            status: true,
            hide: false,
            patti: []

        }
    }
    static defaultProps = {
        accountsList : [],
        onSubmit: function() {},
        cancelFormClick: function() {},
        item: {}
    }


    componentDidMount() {

    }

    // refresh() {
    //     this.refs.memberDdl.dataAdapter.dataBind()
    //     this.refs.pattiAccountDdl_0.dataAdapter.dataBind()
    //     this.refs.pattiAccountDdl_1.dataAdapter.dataBind()
    //     this.refs.pattiAccountDdl_2.dataAdapter.dataBind()
    //     this.refs.pattiAccountDdl_3.dataAdapter.dataBind()
    // }

    onSubmit = (e) => {
        e.preventDefault()
        // if(! $(this.refs.memberForm.refs.form).valid()) {
        //   return false;
        // }

        let data = jQuery(this.refs.form).serialize()
        // console.log(data);
        AccountHelper.save(data, this.props.item._id).then( (response) => {
            console.log(response);
            this.props.onSubmit()
        }).catch(function(error) {
            console.log(error)
            // if (error.response.data.cerror) {
            //     toastr.error(error.response.data.cerror)
            // } else {
            //     toastr.error("Validation failed.")
            // }
        });
    }

    render() {
        const item = Object.assign({}, this.defaultItem, this.props.item || {} )
        // console.log(this.props.item)

        return (
            <div className="">
                <form className="moustrapform" ref="form" key={`form_${item._id}`}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="col-form-label">Name ({item._id ? item._id : 'N/A'})</label>
                            <input className="form-control form-control-sm error-hide required" type="text" name="account_name" defaultValue={item.account_name} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label">Limit:</label>
                            
                            <InputDecimal className="form-control form-control-sm uk-form-small error-hide required number" type="text" max="100" value={item.limit} name="limit" />
                            
                        </div>
                        <div className="form-group col-md-2">
                            <label className="col-form-label">Status:</label>
                            <div className="uk-form-controls">
                                {/*<input type="hidden" name="status" defaultValue={false} />
                                <input className="" type="checkbox" defaultChecked={item.status} name="status" />*/}
                                <CSelect className="form-control form-control-sm" name="status" value={item.status} items={LIST_STATUS_BOOLEAN}> </CSelect>
                            </div>
                        </div>
                        <div className="form-group col-md-2">
                            <label className="col-form-label">Hide:</label>
                            <div className="uk-form-controls">
                                <CSelect className="form-control form-control-sm" name="hide" value={item.hide} items={LIST_STATUS_BOOLEAN}> </CSelect>
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label">Match Comm. To:</label>
                            {/*<ComboBoxMember ref="memberDdl" field_id="match_comm_to" selectedValue={item._id} />*/}
                            <ComboBoxLocal width={"100%"} ref="memberDdl" field_id="match_comm_to" valueMember='_id'
                                        displayMember='account_name' data={this.props.accountsList}  selectedValue={item.match_comm_to} />
                        </div>
                        <div className="form-group col-md-2">
                            <label className="col-form-label">Match Comm. :</label>
                            <InputDecimal className="form-control form-control-sm uk-form-small error-hide required number" type="text" value={item.match_comm} name="match_comm" />
                        </div>
                        <div className="form-group col-md-2">
                            <label className="col-form-label">Entry Type</label>
                            <CSelect className="form-control form-control-sm" name="match_comm_type" value={item.match_comm_type} items={LIST_COMM_TYPE}> </CSelect>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label">Sess Comm. To:</label>
                            <ComboBoxLocal width={"100%"} field_id="sess_comm_to" valueMember='_id'
                                        displayMember='account_name' data={this.props.accountsList}  selectedValue={item.sess_comm_to} />
                        </div>
                        <div className="form-group col-md-2">
                            <label className="col-form-label">Sess Comm.:</label>
                            <InputDecimal className="form-control form-control-sm uk-form-small error-hide required number" type="text" value={item.sess_comm} name="sess_comm" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label">Meter Comm. To:</label>
                            <ComboBoxLocal width={"100%"} field_id="meter_comm_to" valueMember='_id'
                                        displayMember='account_name' data={this.props.accountsList}  selectedValue={item.meter_comm_to} />
                        </div>
                        <div className="form-group col-md-2">
                            <label className="col-form-label">Meter Comm.:</label>
                            <InputDecimal className="form-control form-control-sm uk-form-small error-hide required number" type="text" value={item.meter_comm} name="meter_comm" />
                        </div>
                    </div>
                 
             
                    <div className="">
                        <div className="row">
                            <div className="col-md-1">
                                <label className="col-form-label">S.N.</label>
                            </div>
                            <div className="col-md-3">
                                <label className="col-form-label">Patti Under:</label>
                            </div>
                            <div className="col-md-2">
                                <label className="col-form-label">Match (%):</label>
                            </div>
                            <div className="col-md-2">
                                <label className="col-form-label">Sess (%):</label>
                            </div>
                            <div className="col-md-2">
                                <label className="col-form-label">Meter (%):</label>
                            </div>
                        </div>
                        {Array.apply(0, Array(4)).map( (x, i) => { 
                            
                            var account_id = (item.patti[i] == undefined) ? '' : item.patti[i]['account_id']; 
                            var match = (item.patti[i] == undefined) ? 0 : item.patti[i]['match']; 
                            var session = (item.patti[i] == undefined) ? 0 : item.patti[i]['session']; 
                            var meter = (item.patti[i] == undefined) ? 0 : item.patti[i]['meter']; 
                            return (
                                <div className="row" key={`${item.id}_key_${i}`}>
                                    <div className="col-md-1">
                                        <label className="col-form-label">{i+1}</label>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="uk-form-controls">
                                            {/*<ComboBoxMember width="100%" ref={`pattiAccountDdl_${i}`} field_id={`patti[${i}][account_id]`} selectedValue={account_id} />*/}
                                            <ComboBoxLocal width={"100%"} ref={`pattiAccountDdl_${i}`} field_id={`patti[${i}][account_id]`} valueMember='_id'
                                        displayMember='account_name' data={this.props.accountsList}  selectedValue={account_id} width="100%" />
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="uk-form-controls">
                                            <InputDecimal className="form-control form-control-sm uk-form-small error-hide required number" type="text" value={match} name={`patti[${i}][match]`} />
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="uk-form-controls">
                                            <InputDecimal className="form-control form-control-sm uk-form-small error-hide required number" type="text" value={session} name={`patti[${i}][session]`} />
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="uk-form-controls">
                                            <InputDecimal className="form-control form-control-sm uk-form-small error-hide required number" type="text" value={meter} name={`patti[${i}][meter]`} />
                                        </div>
                                    </div>
                              
                                </div>
                        ) })}
                    </div>
                    <div className="mt-3 text-right col-md-10">
                        <button className="btn btn-primary btn-sm" type="button" onClick={this.onSubmit}>Save</button>
                        <button className="btn btn-danger btn-sm ml-1" type="button" onClick={(e)=> this.props.cancelFormClick(e)}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default MemberForm;