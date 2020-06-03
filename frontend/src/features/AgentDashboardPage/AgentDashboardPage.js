import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import config from "config";
import { Alert } from "reactstrap";
import ListingSubmenu from '../../components/ListingSubmenu';
import SubscribeNewsLetter from '../../components/SubscribeNewsLetter.jsx';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { userActions } from "../../actions";
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
class AgentDashboardPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // this.props.dispatch(userActions.getapagecontent({page:'Dashboard'})); 
    window.scrollTo(0, 0);
  }

  render() {
    if (this.props.users && this.props.users.items) {
      if (this.props.users.items[0]) {
        var abouttitle = entities.decode(this.props.users.items[0].page);
        var AgentDashboardPage = entities.decode(this.props.users.items[0].content);
      }
    }
    return (
      <div>
        <ListingSubmenu />
       
        <section className="news-grid grid">
          <div className="container">
            <div className="row mb-4">
              <div className="col-md-12 section-t2">
                <div className="card-deck">
                  <div className="card bg-light">
                    <div className="card-body text-center">
                      <i className="fa fa-file-image-o mb-2" style={{ fontSize: "38px" }}></i>
                      <p className="card-text"> <Link to="CreateFlyerPage">Create New Blast</Link></p>
                      <span className="card-text-sm"> Select Template and Creatre New Blasts</span>
                    </div>
                  </div>
                  <div className="card bg-light">
                    <div className="card-body text-center">
                      <i className="fa fa-file-text-o mb-2" style={{ fontSize: "38px" }}></i>
                      <p className="card-text"><Link to="FlyersPage">My Saved Blasts</Link></p>
                      <span className="card-text-sm"> View Saved Work, Resend Blasts, View Details & Stats.
              Edit Existing Orders Pending Delivery*</span>
                    </div>
                  </div>
                  <div className="card bg-light">
                    <div className="card-body text-center">
                      <i className="fa fa-address-book-o mb-2" style={{ fontSize: "38px" }}></i>
                      <p className="card-text"><Link to="ProfilePage">Account Details</Link></p>
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
                      <i className="fa fa-building-o mb-2" style={{ fontSize: "38px" }}></i>
                      <p className="card-text"><Link to="DesignsPage">Design Ideas</Link></p>
                      <span className="card-text-sm"> View Email Templates Designs</span>
                    </div>
                  </div>
                  <div className="card bg-light">
                    <div className="card-body text-center">
                      <i className="fa fa-list mb-2" style={{ fontSize: "38px" }}></i>
                      <p className="card-text"><Link to="BillingPage" className="nav-link">My Billing</Link></p>
                      <span className="card-text-sm">View all charges and print receipts</span>
                    </div>
                  </div>
                  <div className="card bg-light">
                    <div className="card-body text-center">
                      <i className="fa fa-envelope mb-2" style={{ fontSize: "38px" }}></i>
                      <p className="card-text"><a href="javascript:void(0)" id="sub-button" className="btn-b-n navbar-toggle-box-collapse d-none d-md-block" data-toggle="collapse"
                data-target="#newsLetterSlider" aria-expanded="false" >Subscriber Preferences</a>
                                   </p>
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
  const { alert, users } = state;
  return {
    alert,
    users
  };
}

const connectedAgentDashboardPage = connect(mapStateToProps)(AgentDashboardPage);
export { connectedAgentDashboardPage as AgentDashboardPage };
