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
class AboutPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
  const { dispatch } = this.props;
  this.props.dispatch(userActions.getapagecontent({page:'About Us'})); 
  window.scrollTo(0,0);
  }

  render() {
	  if(this.props.users && this.props.users.items){
		  console.log("test",this.props.users);
      if(this.props.users.items[0]){
		  var abouttitle = entities.decode(this.props.users.items[0].page);
		  var aboutpage = entities.decode(this.props.users.items[0].content);
		  }
    }
    return (
		<div>
			 <section className="intro-single">
				<div className="container">
				  <div className="row">
					<div className="col-md-12 col-lg-8">
					  <div className="title-single-box">
						<h1 className="title-single">About Us</h1> 
					<span className="color-text-a"></span>	
					  </div>
					</div>
					<div className="col-md-12 col-lg-4">
					  <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
						<ol className="breadcrumb">
						  <li className="breadcrumb-item">
							<a href="index.html">Home</a>
						  </li>
						  <li className="breadcrumb-item active" aria-current="page">
							About Us
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
						  Listing Reach was created to provide an affordable solution for real estate professionals to “e” market properties to their target market… “other” real estate professionals.
							</p>
							
							ListingReach.com offers:
							<ul>
							<li>The ability to email your listings by selecting agents by Real Estate Boards Affiliation</li>
							<li>Maximum Exposure for your listings</li>
							<li>More Brokers Who Bring More Offers</li>
							<li>The MOST Affordable BLASTING service on the Market</li>
							<li>Fully Automated, Easy to Navigate User Interface</li>
							<li>Fast Execution of your BLAST… We Get it and We Blast it!</li>
							<li>A Data Base of Thousands of Active Real Estate Agents… AND GROWING !</li>
							<li>No membership fees, set up fees or minimums.</li>
							<li>Over 1,000,000 real estate brokers and agents in our national data base and growing daily.</li>
							</ul>
							
							 <p className="color-text-a">
							We offer a “user interface” site. Begin by clicking on “sign in” and then click create an account on the right side of that page to create your personal user account.
							</p>
							 <p className="color-text-a">
							Ready to use “fill in the blank” templates are available for you or you can use your own flyer or html. Simply click on “Send New Blast” and then select the template option that meets your needs.
						  </p>
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

const connectedAboutPage = connect(mapStateToProps)(AboutPage);
export { connectedAboutPage as AboutPage };
