import React, { Component } from "react";
import ReactDOM from 'react-dom';

import JqxWindow from '../jqwidgets-react/react_jqxwindow.js';
import ComboBoxTeam from '../controls/ComboBoxTeam'
import SessionHelper from '../../helpers/SessionHelper'
class SessionForm extends Component {

	constructor(props) {
		super(props)

		this.state = {
			scount: 0,
			item: {}
		}
	}
	static defaultProps = {
        matchId : null,
        onFormSubmitted: function() {},
        id: null
    }

	componentDidMount() {
		// $("#jqxwindow").jqxWindow("move", $(window).width() / 2 - $("#jqxwindow").jqxWindow("width") / 2, $(window).height() / 2 - $("#jqxwindow").jqxWindow("height") / 2);
		
		this.refs.jqxWindow.move($(window).width() / 2 - this.refs.jqxWindow.width() / 2, $(window).height() / 2 - this.refs.jqxWindow.height() / 2)

		this.refs.jqxWindow.on('close', (event) => { 			
			ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).parentNode);
		}); 


		if(this.props.id) {
			SessionHelper.show(this.props.id).then((res) => {
				this.setState({
					scount: this.state.scount+1,
					item: res.data
				})
				console.log(res)
			}).catch((error) => {
	          toastr.error("Validation Failed")
	        })
		}
	}

	componentWillMount() {

	}

    formSubmit = (e) => {
        e.preventDefault()
    
        if(!this.props.matchId) {
            toastr.error("Please Select Match First.")
        }

        let data = jQuery(e.target).serialize()
        const dataJson = URI.parseQuery(data)
        console.log(dataJson)
        SessionHelper.save(dataJson, this.props.id).then((response) => {
        	this.refs.jqxWindow.close()
        	this.props.onFormSubmitted(response);
        }).catch((error) => {
          toastr.error("Validation Failed")
        })
        return false;
    }

    render() {

        return (
            <div>
                <JqxWindow ref='jqxWindow' autoOpen={true}
                    width={500} height={300} position={{ x: "50%", y: 175, left:"-250px" }}
                    minWidth={200} minHeight={200} maxWidth={700}
                    maxHeight={400} showCollapseButton={false}
                >
                	<div >
                        <span>
                            Session Form {this.state.item.session_name}
                        </span>
                    </div>
                    <div >
                		<form ref="form" onSubmit={(e) => this.formSubmit(e)}>
                			<input type="text" name="match_id" defaultValue={this.props.matchId} />
	                        <input type="text" name="session_name" defaultValue={this.state.item.session_name} key={this.state.scount} />

	                        <ComboBoxTeam field_id="team_id" selectedValue={this.state.item.team_id} />
	                        <button type="submit">Save Session</button>
                        </form>
                    </div>
                   
                </JqxWindow>
            </div>
        );
    }
}

export default SessionForm;
