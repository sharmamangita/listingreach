import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import config from "config";
import { Alert } from "reactstrap";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { userActions } from "../../actions";
import { adminActions } from "../../actions";
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
class DatabasesPage extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount(){
  const { dispatch } = this.props;
  dispatch(adminActions.getActiveCampaignAssociations());
  window.scrollTo(0,0);
  }

  render() {
  	console.log("this.props=12===",this.props);
  		const {activeCampaign,loading} = this.props;
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
			<section className="contact database-page">
				<div className="container">
				  <div className="row ml-1">       
					<div className="col-sm-12 section-t2">
					  <div className="row">
						<div className="col-md-12">
						 
						  <p className="color-text-a">
						 {loading ? 
						  <h3 className="text-center">Loading ...</h3>:null}
						    <ul className="list-group row list-group-ordered">
                                {
                                    activeCampaign && activeCampaign.associations.map((st) => (
                                        <li className="list-group-item" key={st.id} value={st.id}>{st.name}</li>
                                    ))
                                }
                                 </ul>
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
  const { alert,users,admins } = state;
  const { activeCampaign, loading } = admins;
  return {
    alert,
    users,
    activeCampaign,
    loading
  };
}


const connectedDatabasesPage = connect(mapStateToProps)(DatabasesPage);
export { connectedDatabasesPage as DatabasesPage };
