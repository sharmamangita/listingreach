import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { common } from "../../../helpers";
import { adminActions } from "../../../actions";
import { userActions } from "../../../actions";
import UserProfileModal from "../../../components/UserProfileModal";
import moment from "moment";
import { Button,Modal } from 'react-bootstrap';
import { MDBDataTable } from "mdbreact";
import { MDBTableEditable } from "mdbreact";

class EmployersPage extends React.Component{
 	constructor(props) {
		super(props);
		this.state = {
		  show: false,
		  hrData: this.props.hrData,
		  profile: "",
		  totaldataemp: "",
		  submitted: false,
		  companyName:'',
		  email:'',
		  firstName:'',
		  lastName:'',
		  userId:''
		};
		const { dispatch } = this.props;
		this.handleShow = this.handleShow.bind(this);
    	this.handleClose = this.handleClose.bind(this);
		this.deleteUsers = this.deleteUsers.bind(this);
		this.createdDate = this.createdDate.bind(this);
		this.lastLogin = this.lastLogin.bind(this);
		this.status = this.status.bind(this);
		this.userStatus = this.userStatus.bind(this);
		this.getById = this.getById.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.deletelink = this.deletelink.bind(this);
  	}

  	componentWillUpdate(nextProps, nextState) {
	   //this.props.dispatch(adminActions.getcandidates('hr'));
	}

	componentDidMount() {
		this.props.dispatch(adminActions.getcandidates('hr'));
	
  	}


    handleChange(event){
	const { name, value } = event.target;
	 this.setState({
          [name]: value
      });
    }

	handleClose() {
	   this.setState({ show: false });
	   this.forceUpdate();
	   this.setState({ state: this.state });
	}

	handleShow(event) {
      let id = event.target.id;
		//this.getById(id); 
		   this.setState({ 
			   show: true,
			   userId:id
	   });
		this.getById(id);
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
		if(lastlogin){
			var expDate = new moment(lastlogin, "YYYY-MM-DD");
			var lastlogin = moment(expDate).format("DD-MM-YYYY");
			return lastlogin; 
		}else{
			return "No Logged In Yet"
		}
	}

	userStatus(id) {
		this.props.dispatch(adminActions.userStatus(id));
	}

	deletelink(id){
		return (<a href="javascript:void(0)"className="pl-1" onClick={e => {if (window.confirm("Are you sure you wish to delete this users?"))
						this.deleteUsers(id);
						}
					}><i className="fa fa-trash" aria-hidden="true"></i>
			  	</a>);
	}

  	status(status, id) {
	if (status == "verified") {
		console.log("id====",id);
		return (
			<a href="javascript:void(0)"
			onClick={e => {
				if (window.confirm("Are you sure you wish to unverified this users?"))
					this.userStatus(id);
				}
			}><i className="fa status-active fa-dot-circle-o" aria-hidden="true"></i>
			</a>
		);
	} 
	else {
		return (
			<a href="javascript:void(0)"
			onClick={e => {	if (window.confirm("Are you sure you wish to verified this users?"))
				this.userStatus(id);
				}
			}><i className="fa status-active fa-dot-circle-o red"	aria-hidden="true" ></i></a>
		);
	}
	}

    getById(id) {
		if (this.props.hrData) {
			var filteredEmployee = this.props.hrData.filter(item => {
			return item.id == id && item.roles=='hr';
			});
			//console.log("display12==",filteredEmployee);
			if (filteredEmployee.length > 0) {
				var fulldata =  filteredEmployee[0].firstName +" "+filteredEmployee[0].lastName;
				this.setState({
					firstName: filteredEmployee[0].firstName,
					lastName: filteredEmployee[0].lastName,
					email: filteredEmployee[0].email,
					companyName: filteredEmployee[0].companyName
				});
			}
		}
		   
  	}

	handleSubmit(e) { 
		e.preventDefault();
		this.setState({ submitted: true });
		const {firstName,lastName,email,companyName,submitted,userId} = this.state;
		var user = {
			'firstName':firstName,
			'lastName':lastName,
			'companyName':companyName,
			'userId':userId
		}
		const { dispatch } = this.props;
	   	dispatch(userActions.updateHr(user));
	} 


  render() {
	const { users, hrData, profile } = this.props;
	const { totaldataemp,firstName,lastName,email,companyName,submitted} = this.state;
		if(this.state.totaldataemp=='' && this.props.hrData && this.props.hrData.length>0){
		var totaldata = [];
		var downloaded=[];
		var amount=0;
		for (var cad = 0; cad <= this.props.hrData.length - 1; cad++) {
		downloaded= this.props.downloadData.filter(item=>{
			if(item.id.toString()==this.props.hrData[cad].id.toString() && item.amount && item.downloaded=='true'){
				console.log("amountvalue====",item.amount);
				amount += parseInt(item.amount);
			}
			return item.id.toString()==this.props.hrData[cad].id.toString() && item.downloaded=='true';
		});

		var Url = window.location.href;
		var spliturlk = Url.split('=');

		var cadporps='';
		  cadporps = this.props.hrData[cad];
		  var name= cadporps.firstName+' '+cadporps.lastName;
		   var paidonstring = cadporps.paidOn.toString();
			if(spliturlk.length > 1  && paidonstring==spliturlk[1]){
			totaldata.push({
			name: name ? name:'--',
			email: cadporps.email ? cadporps.email : "--",
			company: cadporps.companyName ? cadporps.companyName : "--",
			downloaded: downloaded.length,
			totalpaid: "$"+amount,
			registered: this.createdDate(cadporps.createdOn),
			lastlogin: this.lastLogin(cadporps.lastLogin),
			actions: (
			    <span><a href="javascript:void(0)"
					className="pb-2 pr-2 pl-0"
					data-toggle="modal"
					data-id={cadporps.id}
					onClick={this.handleShow}
					data-target="#intro"><span id={cadporps.id} className="fa fa-edit"></span> </a>
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
			name: name ? name:'--',
			email: cadporps.email ? cadporps.email : "--",
			company: cadporps.companyName ? cadporps.companyName : "--",
			downloaded: downloaded.length,
			totalpaid: "$"+amount,
			registered: this.createdDate(cadporps.createdOn),
			lastlogin: this.lastLogin(cadporps.lastLogin),
			actions: (
			    <span><a href="javascript:void(0)"
					className="pb-2 pr-2 pl-0"
					data-toggle="modal"
					data-id={cadporps.id}
					onClick={this.handleShow}
					data-target="#intro"><span id={cadporps.id} className="fa fa-edit"></span> </a>
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
		  columns: common.empdata,
		  rows: totaldata
		};
		this.setState({ totaldataemp: caddata });
	 
	}	
	return (
	  <main className="col-xs-12 col-sm-8 col-lg-9 col-xl-10 pt-3 pl-4 ml-auto">
		<h3 className="admin-title"> Employers</h3>
		{UserProfileModal}
		<section className="row">
		  <div className="col-sm-12">
			<section className="row">
			  <div className="col-12">
				<div className="hr-table">
				
					<MDBDataTable responsive striped hover bordered data={totaldataemp} />
		
				</div>
			  </div>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>You can update your profile details:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
     <form onSubmit={this.handleSubmit} className="p-5 bg-white">
	      <div className="row form-group">
	          <div className="col-md-12 mb-3 mb-md-0">
	            
	                <div className='form-group mb-3'>
	                  <input type="text" className="form-control " name="firstName" value={firstName} onChange={this.handleChange}  placeholder="First Name"/>
	                  {submitted && (!firstName) &&
	                      <div className="help-block red">First Name is required</div>
	                  }
	                </div>
	                <div className='form-group mb-3'>
	                  <input type="text" className="form-control " name="lastName" value={lastName} onChange={this.handleChange}  placeholder="Last Name"/>
	                  {submitted && (!lastName) &&
	                      <div className="help-block red">Last Name is required</div>
	                  }
	                </div>
	                <input type="text" className="form-control mb-3" name="companyName" value={companyName} onChange={this.handleChange}  placeholder="Company Name"/>
	               
	                <input type="text" className="form-control mb-3" readOnly="readOnly" name="email" value={email} onChange={this.handleChange}  placeholder="Email Address"/>
	                {submitted && !email &&
	                    <div className="help-block red">Email address is required</div>
	                }
	          </div>
	      </div>
	 <Modal.Footer>
	<Button variant="secondary" onClick={this.handleClose}>
	  Close
	</Button>
	<Button variant="primary" type="submit" onClick={this.handleClose} >
	  Save Changes
	</Button>
	</Modal.Footer>
	 </form>
          </Modal.Body>
       
        </Modal>

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
	const { hrData } = admins;
    const {downloadData} = admins;
    console.log("hrData======1===",hrData);
    console.log("downloadData======1===",downloadData);
	return {
		user,
		hrData,
		downloadData
	};
	
}


const connectedEmployersPage = connect(mapStateToProps)(EmployersPage);
export { connectedEmployersPage as EmployersPage };