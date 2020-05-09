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
      <div className="site-section bg-light">
      <div className="container">
        <div className="text-center mb-5 section-heading">
          <h2>Pricing</h2>  
          
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
