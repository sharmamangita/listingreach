import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { adminActions } from '../../../actions';
import { common } from "../../../helpers";

class DashboardPage extends React.Component {

  constructor(props) {

    super(props);
    this.registeredagentscount = 0;
    this.emailsubscriberscount = 0;
    this.totalpayments = 0;
    this.paidemailscount = 0;
    this.state = {
    };

  }
  componentWillMount() {
    console.log("test====");
     this.props.dispatch(adminActions.getAlldashboardData());
  }
  refreshcounts(){   
    this.props.dashboard.forEach(element => {
      if(element._id=="agents"){
        this.registeredagentscount=element.total;
      }
     else if(element._id=="subscriber"){
        this.emailsubscriberscount=element.total;
      }
    });
  }

  render() {
    if (this.props.dashboard) {
      { this.refreshcounts() }
    }

    return (
      <main className="col-xs-12 col-sm-8 col-lg-9 col-xl-10 pt-3 pl-4 ml-auto">      
        <section className="row">
          <div className="col-sm-12">
            <section className="row">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="jumbotron">
                      <Link to="/CandidatePage?paidOn=false">
                        <span className="dashbrd-icons"><i className="fa fa-fw fa-users"></i></span>
                        <h3>{this.registeredagentscount}</h3>
                        <h6>Registered Agents</h6>
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="jumbotron">
                      <Link to="/CandidatePage?paidOn=true">
                        <span className="dashbrd-icons"><i className="fa fa-fw fa-users"></i></span>
                        <h3>{this.emailsubscriberscount}</h3>
                        <h6>Email Subscribers</h6>
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="jumbotron">
                      <span className="dashbrd-icons"><i className="fa fa-fw fa-list-alt"></i></span>
                      <h3>{this.paidemailscount}</h3>
                      <h6>Paid Email Blasts</h6>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="jumbotron">
                      <span className="dashbrd-icons"><i className="fa fa-fw fa-money"></i></span>
                      <h3>{this.totalpayments}</h3>
                      <h6>Total Payments</h6>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    );
  }

}

function mapStateToProps(state) {
  console.log("stae11====", state);
  const { authentication, admins } = state;
  const { user } = authentication;
  const { dashboard } = admins;
  return {
    user,
    dashboard
  };
}


const connectedDashboardPage = connect(mapStateToProps)(DashboardPage);
export { connectedDashboardPage as DashboardPage };