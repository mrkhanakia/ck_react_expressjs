import React from 'react'


import ComboBoxMatchTeam from '../controls/ComboBoxMatchTeam.jsx'
import ComboBoxTeam from '../controls/ComboBoxTeam.jsx'
import ComboBoxMember from '../controls/ComboBoxMember.jsx'
import InputDecimal from '../controls/InputDecimal.jsx'


import MatchEntryHelper from '../../helpers/MatchEntryHelper'
import CSelect from '../controls/CSelect'

import { LIST_MATCH_LK } from '../../Constant'

class MatchEntryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matchId: this.props.matchId,
            isNew: true,
            item: {
                _id: null,
                account_id: null,
                match_team_id: null,
                rate: 0,
                amount: 0,
                lk: "L"
            },
            teamsList: []

        }
    }

    static defaultProps = {
        matchId: null,
        onFormSubmitted: function() {},
        getBookNo: function() {}
    }

    edit(rowdata) {
        this.setState({
            isNew: false,
            item: rowdata
        })
    }

    resetForm = () => {
        console.log(this.state)
        this.setState({
            isNew: false,
            item: {

            }
        })
    }

    formSubmit = (e) => {
        e.preventDefault()

        var book_no = this.props.getBookNo();
        // console.log("book_no", book_no)

        if (!this.props.matchId) {
            toastr.error("Please Select Match First.")
        }

        let data = jQuery(this.refs.form).serialize()

        const dataJson = URI.parseQuery(data)
        dataJson.book_no = book_no;
        // console.log(dataJson)
        MatchEntryHelper.save(data, this.state.item._id).then((response) => {
            this.props.onFormSubmitted(response);
        }).catch((error) => {
            // console.log(error)
            toastr.error("Validation failed.")
        })
        return false;
    }

    render() {

        const { item } = this.state
        console.log(item)
        return (
            <div>
                <form ref="form">
                    <input type="hidden" defaultValue={this.props.matchId} name="match_id" />
                    <div className="form-row align-items-center">
                        <div className="col-auto">
                            <label className="">S.N.</label>
                            <div>
                                <input className="form-control form-control-sm w-50p error-hide required number" type="number" readOnly={true} key={item._id} defaultValue={item._id} />
                            </div>
                        </div>
                        <div className="col-auto">
                            <label className="">Rate</label>
                            <div>
                                <InputDecimal className="form-control form-control-sm w-100p error-hide required number" name="rate" value={item.rate} />
                            </div>
                        </div>
                        <div className="col-auto">
                            <label className="">Amount</label>
                            <div>
                                <InputDecimal className="form-control form-control-sm w-100p error-hide required number" name="amount" value={item.amount} />
                            </div>
                        </div>
                        <div className="col-auto">
                            <label className="">L/K</label>
                            <div>
                                <CSelect className="form-control form-control-sm w-50p" name="lk" value={item.lk} items={LIST_MATCH_LK}>
                                </CSelect>
                            </div>
                        </div>
                        <div className="col-auto">
                            <label className="">Team</label>
                            <div>
                                <ComboBoxMatchTeam width={100} height={35} selectedValue={item.match_team_id} key={this.state.item._id} data={this.props.teamsList.slice()} />
                            </div>
                        </div>
                        <div className="col-auto">
                            <label className="">Party</label>
                            <div>
                                <ComboBoxMember width={100} field_id="account_id" selectedValue={item.account_id} key={this.state.item._id} />
                            </div>
                        </div>
                        <div className="col-auto ">
                            <label className="">&nbsp;</label>
                            <div>
                                <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                                    <button className="btn btn-primary btn-sm" type="button" onClick={this.formSubmit}>Save</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-auto ">
                            <label className="">&nbsp;</label>
                            <div>
                                <button className="btn btn-primary btn-sm" type="button" onClick={this.resetForm}>Cancel</button>
                            </div>
                        </div>
                        <div className="col-auto ">
                            <label className="">&nbsp;</label>
                            <div>
                                <label className="form-check-label">
                                    <input type="hidden" value="false" name="comm_yn" />
                                    <input className="form-check-input" type="checkbox" name="comm_yn" value={true} defaultChecked={true}/> Add Commission
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default MatchEntryForm;