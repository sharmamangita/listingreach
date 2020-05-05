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
class DisclaimerPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
  const { dispatch } = this.props;
  this.props.dispatch(userActions.getapagecontent({page:'Disclaimer'})); 
  window.scrollTo(0,0);
  }

  render() {
	  if(this.props.users && this.props.users.items){
		  console.log("test",this.props.users);
       if(this.props.users.items[0]){
		  var disclaimertitle = entities.decode(this.props.users.items[0].page);
		  var disclaimerpage = entities.decode(this.props.users.items[0].content);
		  }
    }
    return (
      <div className="site-section bg-light">
        <div className="container">
          <div className="text-center mb-5 section-heading">
            <h2>{disclaimertitle}</h2>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-12 mb-5">
              <div className="p-5 bg-white">
                <div className="mr-5">
                  <div className="job-post-item-header d-flex align-items-center">
                  </div>
                </div>
                { ReactHtmlParser(disclaimerpage) }
              </div>
            </div>
          </div>
        </div>
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

const connectedDisclaimerPage = connect(mapStateToProps)(DisclaimerPage);
export { connectedDisclaimerPage as DisclaimerPage };
