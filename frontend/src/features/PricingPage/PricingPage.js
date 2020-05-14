import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import config from "config";
import { Alert } from "reactstrap";
import { adminActions } from '../../actions';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { userActions } from "../../actions";
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
class PricingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
   this.props.dispatch(adminActions.getPlan()); 
   window.scrollTo(0,0);
  }

  render() {
    
    return (
		<div>
			<section className="intro-single">
			<div className="container">
				<div className="row">
					<div className="col-md-12 col-lg-8">
					  <div className="title-single-box">
						<h1 className="title-single">Pricing</h1> 
					</div>
					</div>
					<div className="col-md-12 col-lg-4">
					  <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
						<ol className="breadcrumb">
						  <li className="breadcrumb-item">
							<a href="index.html">Home</a>
						  </li>
						  <li className="breadcrumb-item active" aria-current="page">
							Pricing
						  </li>
						</ol>
					  </nav>
					</div>
				</div>
			</div>
			</section>
			<section className="contact">
				<div className="container">
				  <div className="row">       
					<div className="col-sm-12 section-t2">
					  <div className="row">
						<div className="col-md-12">
						 
							<p className="color-text-a">
							Databases at ListingReach.com are broken down by “board affiliation”.
							Email a listing to the database of your choice for only $19.95. Add additional databases to your blast for only $15.00. Pricing is per blast.</p>

							<p className="color-text-a">
							It is always free to receive our listing alerts. Click “receive blasts” above to start receiving yours today.</p>
							<p className="color-text-a">
							Please be sure to visit our FAQ’s, testimonials and video tutorials to learn more today.</p>
						  <p></p>
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
  const { alert,users,admins } = state;
  const { plan } = admins;
  return {
    alert,
    users,
     plan
   
  };
}

const connectedPricingPage = connect(mapStateToProps)(PricingPage);
export { connectedPricingPage as PricingPage };
