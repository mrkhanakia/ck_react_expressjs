import React, { Component } from "react";
import { render } from 'react-dom'
import { inject, observer } from 'mobx-react';


@inject('serverStatusStore')
@observer
class ServerStatus extends Component {

	componentDidMount() {
		this.props.serverStatusStore.fetchDbServerStatus()
	}

	checkStatuses = () => {
		this.props.serverStatusStore.fetchDbServerStatus()
	}

	startDbServer = () => {
		// console.log('startDbServer')
		axios.get('/others/server_startdb')
	    .then((res) => {
	    	setTimeout(() => {
	    		this.props.serverStatusStore.fetchDbServerStatus()
	    	}, 2000)
	    })
	}

    render() {
    	const { dbServerStatus } = this.props.serverStatusStore
        return (
            <div>
         		<h5>Server Status</h5>
     			<div className="row">
         			<div className="col-md-4">
	         		    <div className="mt-2 mb-2">
					        <button className="btn btn-sm btn-primary" onClick={this.checkStatuses}>Check Statues</button>
					    </div>
					    <table className="table table-striped">
					      <thead>
					        <tr>
					          <th scope="col">#</th>
					          <th scope="col">Type</th>
					          <th scope="col">Status</th>
					          <th scope="col"></th>
					        </tr>
					      </thead>
					      <tbody>
					        <tr>
					          <th scope="row">1</th>
					          <td>DB Server</td>
					          <td className="db_server_status">{dbServerStatus}</td>
					          <td>
					          	{dbServerStatus==0 ?
					          		<button className="btn btn-sm btn-primary" onClick={this.startDbServer}>Start</button>
					          		: ''
					          	}
					          </td>
					        </tr>
					      </tbody>
					    </table>
         			</div>
     			</div>
            </div>
        );
    }
}

export default ServerStatus;
