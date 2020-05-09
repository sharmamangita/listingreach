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
class DatabasesPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
  const { dispatch } = this.props;
  this.props.dispatch(userActions.getapagecontent({page:'Privacy'})); 
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
    return (
		<div>
			<section className="intro-single">
				<div className="container">
				  <div className="row">
					<div className="col-md-12 col-lg-8">
					  <div className="title-single-box">
						<h1 className="title-single">Databases</h1> 
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
							Databases
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
						  Content awaited... 
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

const connectedDatabasesPage = connect(mapStateToProps)(DatabasesPage);
export { connectedDatabasesPage as DatabasesPage };
