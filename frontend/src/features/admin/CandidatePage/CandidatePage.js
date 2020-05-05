import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { common } from "../../../helpers";
import { adminActions } from "../../../actions";
import { userActions } from "../../../actions";
import UserProfileModal from "../../../components/UserProfileModal";
import moment from "moment";
import { MDBDataTable } from "mdbreact";
import { MDBTableEditable } from "mdbreact";
class CandidatePage extends React.Component {
	constructor(props) {
		super(props);
		// reset login status
		this.state = {
		  show: false,
		  candidateData: this.props.candidateData,
		  profile: "",
		  totaldatacad: ""
		};
		const { dispatch } = this.props;
		this.handleShow = this.handleShow.bind(this);
		this.deleteUsers = this.deleteUsers.bind(this);
		this.createdDate = this.createdDate.bind(this);
		this.lastLogin = this.lastLogin.bind(this);
		this.status = this.status.bind(this);
		this.userStatus = this.userStatus.bind(this);
		this.getById = this.getById.bind(this);
		this.deletelink = this.deletelink.bind(this);
  	}

  	handleShow() {
		this.setState({
		  show: true,
		  profile: this.props
		});
  	}

	commonsearchfield(dataval){
      if(typeof dataval !=='undefined'){
       return (<div> {dataval[0] ? dataval[0].city +' '+dataval[0].country : ''}</div>);
      }
    }	  
  	componentWillMount() {
  	
  		this.props.dispatch(adminActions.getcandidates('candidate'));
		
  	}

  	deletelink(id){
  	  return(
		<a href="javascript:void(0)"className="pl-1" onClick={e => {if (window.confirm("Are you sure you wish to delete this users?"))
						this.deleteUsers(id);
						}
					}><i className="fa fa-trash" aria-hidden="true"></i>
			</a>)
  	}
		  
	deleteUsers(id) {
		this.props.dispatch(adminActions.deleteusers(id));
	}

	createdDate(createdOn) {
		var expDate = new moment(createdOn, "YYYY-MM-DD");
		var created = moment(expDate).format("DD-MM-YYYY");
		return created; 
	}

	lastLogin(lastlogin) {
		var expDate = new moment(lastlogin, "YYYY-MM-DD");
		var lastlogin = moment(expDate).format("DD-MM-YYYY");
		return lastlogin; 
	}

	userStatus(id) {
		this.props.dispatch(adminActions.userStatus(id));
	}

  	status(status, id) {
  	if (status == "verified") {
	  return (
		<a href="javascript:void(0)"
		  onClick={e => {
			if (
			  window.confirm("Are you sure you wish to unverified this users?")
			)
			  this.userStatus(id);
		  }}>
		  <i className="fa status-active fa-dot-circle-o" aria-hidden="true" ></i>
		</a>
	  	);
	} 
	else {
	  	return (
			<a
			  href="javascript:void(0)"
			  onClick={e => {
				if (window.confirm("Are you sure you wish to verified this users?"))
				  this.userStatus(id);
			  }} >
			  <i className="fa status-active fa-dot-circle-o red" aria-hidden="true" ></i>
			</a>
	  	);
		}
  	}

	getById(id) {
	if (this.props.candidateData) {
		var filteredEmployee = this.props.candidateData.filter(item => {
			return item._id == id;
		});
		if (filteredEmployee.length > 0) {
			this.setState({
				profile: filteredEmployee[0]
			});
		}
	}
	}

	renderUserProfileModal() {
		const dispatchval = {
			tagName: "span",
			className: "",
			children: null,
			dispatch: this.props
		};
		let modalClose = () => this.setState({ show: false, profile: "" });
		return (
			<UserProfileModal
			dispatchval={dispatchval}
			profile={this.state.profile}
			users={this.state.user}
			visible={this.state.show}
			onClickBackdrop={modalClose}
			dialogClassName="modal-lg"
			/>
		);
	}
	render() {
		const { users, candidateData, profile } = this.props;
		const { totaldatacad } = this.state;
		
		if(totaldatacad=='' && this.props.candidateData && this.props.candidateData.length>0){
			if (this.props.candidateData && this.props.candidateData.length > 0) {
			
			let modalOpen = event => {
			  var id = event.currentTarget.dataset.id;
			  var filteredEmployee = this.props.candidateData.filter(item => {
				return item.id == id;
			  });
			  if (filteredEmployee.length > 0) {
				this.setState({ show: true, profile: filteredEmployee[0] });
			  }
			};
			var totaldata = [];
		
			for (var cad = 0; cad <= this.props.candidateData.length - 1; cad++) {
			var Url = window.location.href;
			var spliturlk = Url.split('=');
			console.log("spliturlk[1]=====",typeof spliturlk[1]);
			 
			  var cadporps='';
			  cadporps = this.props.candidateData[cad];
			  var paidonstring = cadporps.paidOn.toString();
			  if(spliturlk.length > 1  && paidonstring==spliturlk[1]){
			  totaldata.push({
				name: cadporps.firstName ? cadporps.firstName : "--",
				email: cadporps.email ? cadporps.email : "--",
				freepaid: cadporps.paidOn ? "Paid" : "Free",
				experience: cadporps.experienceYear ? cadporps.experienceYear +' yrs' : '0 yrs '+  cadporps.experienceMonth ? cadporps.experienceMonth +' months' : '0 months'    ,
				averagerating:cadporps.totaloverall ? cadporps.totaloverall:'--' ,
				registered: this.createdDate(cadporps.createdOn),
				lastlogin: this.lastLogin(cadporps.lastLogin),
				expsalary:cadporps.currentSalary ? cadporps.currentSalary :0,
				location:this.commonsearchfield(cadporps.currentaddress),
				actions: (
				    <span><a href="javascript:void(0)"
					className="pb-2 pr-2 pl-0"
					data-toggle="modal"
					data-id={cadporps.id}
					onClick={modalOpen}
					data-target="#intro"><span className="fa fa-edit"></span> </a>
				    {
				    	this.deletelink(cadporps.id)
				    }
				    </span>
				),
				status: (
				    this.status(cadporps.status,cadporps.id)
				)
			  });

			} else if(spliturlk.length == 1) {

			   totaldata.push({
				name: cadporps.firstName ? cadporps.firstName: "--",
				email: cadporps.email ? cadporps.email : "--",
				freepaid: cadporps.paidOn ? "Paid" : "Free",
				experience: cadporps.experienceYear ? cadporps.experienceYear +' yrs' : '0 yrs '+  cadporps.experienceMonth ? cadporps.experienceMonth +' months' : '0 months'    ,
				averagerating:cadporps.totaloverall ? cadporps.totaloverall:'--' ,
				registered: this.createdDate(cadporps.createdOn),
				lastlogin: this.lastLogin(cadporps.lastLogin),
				expsalary:cadporps.currentSalary ? cadporps.currentSalary :0,
				location:this.commonsearchfield(cadporps.currentaddress),
				actions: (
				    <span><a href="javascript:void(0)"
					className="pb-2 pr-2 pl-0"
					data-toggle="modal"
					data-id={cadporps.id}
					onClick={modalOpen}
					data-target="#intro"><span className="fa fa-edit"></span> </a>
				    {
				    	this.deletelink(cadporps.id)
				    } 
				    </span>
				),
				status: (
				    this.status(cadporps.status,cadporps.id)
				)
			  });	

			}
		}

			const caddata = {
			  columns: common.caddata,
			  rows: totaldata
			};
			this.setState({ totaldatacad: caddata });
		  }
		}
		var UserProfileModal = this.state.profile ? (
		  this.renderUserProfileModal()
		) : ( <span></span>);
		return (
		  <main className="col-xs-12 col-sm-8 col-lg-9 col-xl-10 pt-3 pl-4 ml-auto">
		  <h3 className="admin-title">  Candidates</h3>
			{UserProfileModal}
			<section className="row">
			  <div className="col-sm-12">
				<section className="row">
				  <div className="col-12">
						<MDBDataTable 
						striped 
						hover 
						responsive
						bordered
						data={totaldatacad} />
					  </div>
				</section>
			  </div>
			</section>
		  </main>
		);
	  }
	}

	function mapStateToProps(state) {
	  const { authentication, admins } = state;
	  const { user } = authentication;
	  const { candidateData } = admins;
	  console.log("candidateData====",candidateData);
	  return {
		user,
		candidateData
	  };
	}

	const connectedCandidatePage = connect(mapStateToProps)(CandidatePage);
	export { connectedCandidatePage as CandidatePage };
