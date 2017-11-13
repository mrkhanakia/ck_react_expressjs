import { observable } from 'mobx';

export class ReportStoreClass {
	@observable fetched = false;
	
	
	@observable accountBalanceList = [];
	@observable plMatchAccountWiseList = [];
	@observable plMatchWiseList = [];
	@observable connectListMatches = [];
	@observable connectReportList = [];
	@observable activityLogList = [];
	
	fetchAccountBalanceList() {
		axios.get('/reports/balance_sheet', {
  		})
	    .then((res) => {
	    	this.accountBalanceList = res.data
	    })
	    .catch(() => this.fetched = false);
	}

	fetchConnectListMatches() {
		axios.get('/reports/connect_list_matches', {
  		})
	    .then((res) => {
	    	this.connectListMatches = res.data
	    })
	    .catch(() => this.fetched = false);
	}

	fetchConnectListMatches() {
		axios.get('/reports/connect_list_matches', {
  		})
	    .then((res) => {
	    	this.connectListMatches = res.data
	    })
	    .catch(() => this.fetched = false);
	}

	fetchConnectReportList(filters = []) {
		axios({
	    method: 'post',
	      url: "/reports/connect_report",
	      data: filters
	    })
	    .then((res) => {
	    	this.connectReportList = res.data
	    })
	    .catch(() => this.fetched = false);
	}

	fetchPlMatchAccountWiseList() {
		axios.get('/reports/pl_match_accountwise', {
  		})
	    .then((res) => {
	    	this.plMatchAccountWiseList = res.data
	    })
	    .catch(() => this.fetched = false);
	}

	fetchPlMatchWiseList() {
		axios.get('/reports/pl_matchwise', {
  		})
	    .then((res) => {
	    	this.plMatchWiseList = res.data
	    })
	    .catch(() => this.fetched = false);
	}

	fetchActivityLogList() {
		axios.get('/reports/activity_log', {
  		})
	    .then((res) => {
	    	this.activityLogList = res.data
	    })
	    .catch(() => this.fetched = false);
	}
}

