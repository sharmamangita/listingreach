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
class TestimonialsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
  const { dispatch } = this.props;
 // this.props.dispatch(userActions.getapagecontent({page:'Privacy'})); 
  window.scrollTo(0,0);
  }

  render() {
	  if(this.props.users && this.props.users.items){
		  console.log("test",this.props.users);
       if(this.props.users.items[0]){
		  var privacytitle = entities.decode(this.props.users.items[0].page);
		  var privacypage = entities.decode(this.props.users.items[0].content);
		  }
    }
    const { alert } = this.props;
    return (
		<div>
			<section className="intro-single">
				<div className="container">
				  <div className="row">
					<div className="col-md-12 col-lg-8">
					  <div className="title-single-box">
						<h1 className="title-single">Testimonials</h1> 
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
							Testimonials
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
						{ alert.message &&
                          <Alert className={`alert ${alert.type}`} > <button type="button" className="close">
                            </button>{alert.message}</Alert>
                        }  
					  <div className="row">
						<div className="col-md-12">
						 
						 <div className="testimonials-box">
						<div className="row">          
						  <div className="col-sm-12 col-md-6">   
     
							<div className="testimonials-content">
							  <p className="testimonial-text">
							   “Listing Reach allowed me to market my luxury listing to top markets like Miami, LA, and NY. I was able to connect with another agent and close the deal. This tool is invaluable.”
							  </p>
							</div>
							<div className="testimonial-author-box">                  
							  <h5 className="testimonial-author">Lori</h5>
							</div>
						  </div>
								 <div className="col-sm-12 col-md-6">              
							<div className="testimonials-content">
							  <p className="testimonial-text">
							   “Great product. I can now connect with more agents than I thought possible. No more tracking down email addresses one at a time. I selected my desired market and send off my listing”
							  </p>
							</div>
							<div className="testimonial-author-box">                 
							  <h5 className="testimonial-author">Brian</h5>
							</div>
						  </div>
						</div>
						
						<div className="row">           
						  <div className="col-sm-12 col-md-6">         
							<div className="testimonials-content">
							  <p className="testimonial-text">
							   “Thanks so much! Your service is fantastic. Such speedy reply! Always been very happy with your service! It is typically very easy to navigate and I am impressed with your customer service…so timely!”
							  </p>
							</div>
							<div className="testimonial-author-box">                  
							  <h5 className="testimonial-author">Keller </h5>
							</div>
						  </div>
								 <div className="col-sm-12 col-md-6">              
							<div className="testimonials-content">
							  <p className="testimonial-text">
							   “Thank you for your services. ListingReach continues to keep phones ringing for our Home Inspection company and Home Inspectors.”
							  </p>
							</div>
							<div className="testimonial-author-box">                 
							  <h5 className="testimonial-author">Vince</h5>
							</div>
						  </div>
						</div>
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

const connectedTestimonialsPage = connect(mapStateToProps)(TestimonialsPage);
export { connectedTestimonialsPage as TestimonialsPage };
