import React from 'react';
import config from 'config';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../actions';
import { authHeader } from '../../helpers';
import Spinner from 'react-spinner-material'; 
import { Alert } from 'reactstrap';
const axios = require("axios");
class SendinvitationPage extends React.Component {
    constructor(props) {
      super(props);
      var user  = JSON.parse(localStorage.getItem('user'));
      this.state = {
			loader:false, 
			fullname:'',
			email:'',
			user:user,
			submitted: false,
			alert:false,
			visible : false
        };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.closebtn= this.closebtn.bind(this);
      this.responseLinkedin = this.responseLinkedin.bind(this);
      window.scrollTo(0,0);
      console.log("username",user);
    }
	  handleChange(e) {
			const { name, value } = e.target;
			this.setState({ [name]: value });
		}
    closebtn(){
  	 this.setState({visible:false})
 	  } 
    responseLinkedin(response) {

      var thisobj=this;
        OAuth.initialize('cBzDnFqPnj0K7v6yq4tHf2T1zNA');
        OAuth.popup('linkedin2').then(linkedin => {
         
          linkedin.me().then(data => {
             const { user } = thisobj.state;
              const { dispatch } = thisobj.props;
              user.email=data.email;
              user.firstName=data.firstname;
              user.lastName=data.lastname;
              user.linkdinId=data.id;
              thisobj.setState({ submitted: true });
              
               if (data.email && data.id ) {
                 dispatch(userActions.sendinvite( data.id,data.email,user.userId));
              }
          })
        });  

    }
    handleSubmit(e) { 
      e.preventDefault();
      this.setState({ submitted: true,loader:true});  
      const {fullname,email,user} = this.state;
      var logInFullname = user.firstName+" "+user.lastName;
      const { dispatch } = this.props;
      if(fullname && email){
        var getresult = dispatch(userActions.sendinvite(fullname,email,user.userId,logInFullname)); 
        window.scrollTo(0,0);
      }
    } 
    

   render() {
      const { loggingIn  } = this.props;
      const { alert } = this.props;
      const { fullname,email,submitted,loader} = this.state;
      if( typeof alert.message !='undefined' && loader){
        this.setState({
          loader:false,
          fullname:'',
          email:'',
          visible:true,
          submitted:false
        });
      } 
      var alertmsg = '';
      let imgstyle = { width: '50px'  } 
      let loaderstyle = {bottom:'50%', left: '70%'  } 
      return ( 
      <div className="site-section bg-light">
          <div className="container">
          <div className="text-center mb-5 section-heading">
            <h2>Send a Referral Request</h2>		 
          </div>
          <div className="text-center mb-3">
        		<p>Send a request for a reference to your professional contacts.</p>	
        	   { alert.message &&
             		<Alert className={`alert ${alert.type}`} isOpen={this.state.visible} > <button type="button" onClick={this.closebtn} className="close">
					<span aria-hidden="true">&times;</span>
					</button>{alert.message}</Alert>
                 }
      		</div>
          <div className="row">
        		<div className="col-lg-1">
        		</div>
            <div className="col-lg-4">
              <div className="p-4 mb-3 bg-white">              
                <p className="mb-1 font-weight-bold">Invite via Linkedin</p>
                 <a id="img-fluid" className="img-fluid" onClick={this.responseLinkedin.bind(this)} >
                 <img src="/public/assets/images/linkedin.png" alt="" className="img-fluid"  style={imgstyle} />
                        
                 </a>       
              </div>
            </div>
            <div className="col-md-12 col-lg-6  mb-5">
              <div style={loaderstyle} className="loaderspinner">
              <Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={loader} />
              </div>
              <form  className="p-4 bg-white" onSubmit={this.handleSubmit}>
                <div className="row form-group">
                  <div className="col-md-12 mb-md-0">
                    <h3 className="h5 text-black mb-1">OR</h3>
                    <label className="font-weight-bold" htmlFor="fullname">Invite via Email</label>
                    <input type="text" name="fullname" id="fullname" className="form-control mb-3" value={fullname} placeholder="Enter Full Name of Contact"  onChange={this.handleChange} />
                    {submitted && !fullname && <div className="help-block red">Name is required</div> }
                    <input type="email" id="email" name="email" className="form-control mb-3" value={email} placeholder="Enter Contacts Email Address" onChange={this.handleChange} />	
                    {submitted && !email &&  <div className="help-block red">Email is required</div> }  
                  </div>
                </div>  
                <div className="row form-group">
                  <div className="col-md-6">
                    <input type="submit" value="Send Invite" className="btn btn-primary pill px-4 py-2" />
                  </div>					
                </div>
             </form>
            </div>
        </div>
      </div>
    </div>
    );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    const { alert } = state;
    return {
        loggingIn,
        alert
    };
}

const connectedSendinvitationPage = connect(mapStateToProps)(SendinvitationPage);
export { connectedSendinvitationPage as SendinvitationPage }; 
