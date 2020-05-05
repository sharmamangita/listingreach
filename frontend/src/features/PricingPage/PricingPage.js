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
    if(this.props.plan){
      var variable = this.props.plan;
      console.log("componentWillMountdata",variable);
      var plan = variable.plan;
      var experienceone = variable.experience_one[0].price;
      var experiencetwo = variable.experience_two[0].price2;
      var experiencethree = variable.experience_three[0].price3;
   /*   this.setState({
      plan:variable.plan,
      experienceone:variable.experience_one,
      experiencetwo:variable.experience_two,
      experiencethree:variable.experience_three
      });
    */
  }
    return (
      <div className="site-section bg-light">
      <div className="container">
    <div className="text-center mb-5 section-heading">
          <h2>Pricing</h2>  
       
        </div>
    <div className="text-center"><p>Join the EmployeeMirror Premium service to get hired or to find talent</p></div>
        <div className="row">
       
          <div className="col-md-12 col-lg-6 mb-5">
           <div className="aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
            <a href="#" className="h-100 feature-item">
              <span className="d-block icon flaticon-calculator mb-3 text-primary"></span>
              <h2>Get Hired</h2>
        <ul>
        <li>
        Shows job recommendations 
        </li>
        <li>
        Shows who viewed the profile 
        </li>
        <li>
        Keyword Rating 
        </li>
        </ul>
              <span className="counting">${plan?plan:''}/month pay</span>
            </a>
          </div>
          </div>

          <div className="col-md-12 col-lg-6 mb-5">
           <div className="aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
            <a href="#" className="h-100 feature-item">
              <span className="d-block icon flaticon-calculator mb-3 text-primary"></span>
              <h2>Find Talent</h2>
        <ul>
        <li>
        Experience 0-5 years
        <span className="counting">Pay ${experienceone?experienceone:''}/search</span>
        </li>
        <li>
        Experience 5-15 years <span className="counting">Pay ${experiencetwo?experiencetwo:''}/search</span>
        </li>
        <li>
        Experience 15 years and beyond <span className="counting">Pay ${experiencethree?experiencethree:''}/search</span> 
        </li>
        </ul>
             
            </a>
          </div>
          </div>
        </div>
      </div>
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
