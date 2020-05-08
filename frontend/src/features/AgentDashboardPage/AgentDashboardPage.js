import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import config from "config";
import { Alert } from "reactstrap";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { userActions } from "../../actions";
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
class AgentDashboardPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
  const { dispatch } = this.props;
  this.props.dispatch(userActions.getapagecontent({page:'Dashboard'})); 
  window.scrollTo(0,0);
  }

  render() {
	  if(this.props.users && this.props.users.items){
		  console.log("test",this.props.users);
      if(this.props.users.items[0]){
		  var abouttitle = entities.decode(this.props.users.items[0].page);
		  var AgentDashboardPage = entities.decode(this.props.users.items[0].content);
		  }
    }
    return (
	<div>
	 <section className="intro-single" style={{padding: "9rem 0 3rem"}}>
		<div className="container">
				<div className="row">
					<div className="col-md-12">
					  <div className="topnav" id="myTopnav">
						  <a href="dashboard.html" className="active">Dashboard</a>
						  <a href="create-flyer.html">Create New Blast</a>
						  <a href="flyers.html">My Saved Blasts</a>
						  <a href="designs.html">Design Ideas</a>
						  <a href="billing.html">My Billing</a>
						  <a href="account-details.html">Account Details</a>
						  <a href="javascript:void(0);" className="icon">
							<i className="fa fa-bars"></i>
						  </a>
					  </div>
						
					</div>
				</div>
			</div>
	  </section>
	    <section className="news-grid grid">
    <div className="container">
      <div className="row mb-4">       
        <div className="col-md-12 section-t2">
         <div className="card-deck">
  <div className="card bg-light">
    <div className="card-body text-center">
	<i className="fa fa-file-image-o mb-2" style={{fontSize: "38px"}}></i>
      <p className="card-text"> <a href="create-flyer.html">Create New Blast</a></p>
	   <span className="card-text-sm"> Select Template and Creatre New Blasts</span>
    </div>
  </div>
  <div className="card bg-light">
    <div className="card-body text-center">
	<i className="fa fa-file-text-o mb-2" style={{fontSize: "38px"}}></i>
      <p className="card-text"><a href="flyers.html">My Saved Blasts</a></p>
	   <span className="card-text-sm"> View Saved Work, Resend Blasts, View Details & Stats. 
Edit Existing Orders Pending Delivery*</span>
	   
    </div>
  </div>
  <div className="card bg-light">
    <div className="card-body text-center">
	<i className="fa fa-address-book-o mb-2" style={{fontSize: "38px"}}></i>
      <p className="card-text"><a href="account-details.html">Account Details</a></p>
	   <span className="card-text-sm">Update Your Account Info, Photo, Logo</span>
    </div>
  </div> 
 
</div>
        </div>
      </div>
	  <div className="row mb-4">       
        <div className="col-md-12 section-t2">
         <div className="card-deck">
  <div className="card bg-light">
    <div className="card-body text-center">
      <i className="fa fa-building-o mb-2" style={{fontSize: "38px"}}></i>
	  <p className="card-text"><a href="designs.html">Design Ideas</a></p>
	  <span className="card-text-sm"> View Email Templates Designs</span>
    </div>
  </div>
  <div className="card bg-light">
    <div className="card-body text-center">
       <i className="fa fa-list mb-2" style={{fontSize: "38px"}}></i>
	  <p className="card-text"><a href="billing.html">My Billing</a></p>
	  <span className="card-text-sm">View all charges and print receipts</span>
    </div>
  </div>
  <div className="card bg-light">
    <div className="card-body text-center">
<i className="fa fa-envelope mb-2" style={{fontSize: "38px"}}></i>
	  <p className="card-text"><a href="billing.html">Subscriber Preferences</a></p>
	  <span className="card-text-sm">Update preferences on blasts you receive from others</span>
    </div>
  </div>
</div>
        </div>
      </div>

    </div>
  </section>
	  </div>
    );
  } 
}

function mapStateToProps(state) {
  const { alert,users } = state;
  return {
    alert,
    users
  };
}

const connectedAgentDashboardPage = connect(mapStateToProps)(AgentDashboardPage);
export { connectedAgentDashboardPage as AgentDashboardPage };
