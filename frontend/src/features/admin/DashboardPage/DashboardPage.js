import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { adminActions } from '../../../actions';
import { common } from "../../../helpers";

class DashboardPage extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      agentscount: 0,
      subscriberscount: 0,
      payments: null
    };

  }
  componentDidMount() {
    this.props.dispatch(adminActions.getCount("agents"));
    this.props.dispatch(adminActions.getCount("subscribers"));
    this.props.dispatch(adminActions.getCount("payments"));

  }

  render() {
    console.log("state :", this.props);
    return (
      <main className="col-xs-12 col-sm-8 col-lg-9 col-xl-10 pt-3 pl-4 ml-auto">
        <section className="row">
          <div className="col-sm-12">
            <section className="row">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="jumbotron">
                      <Link to="/AgentsPage">
                        <span className="dashbrd-icons"><i className="fa fa-fw fa-users"></i></span>
                        <h3>{this.props.agentscount}</h3>
                        <h6>Registered Agents</h6>
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="jumbotron">
                      <Link to="/SubscriberPage">
                        <span className="dashbrd-icons"><i className="fa fa-fw fa-users"></i></span>
                        <h3>{this.props.subscriberscount}</h3>
                        <h6>Email Subscribers</h6>
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="jumbotron">
                      <Link to="/EmailBlastsPage">
                        <span className="dashbrd-icons"><i className="fa fa-fw fa-list-alt"></i></span>
                        <h3>{this.props.payments && this.props.payments.length ? this.props.payments[0].paidBlasts : 0}</h3>
                        <h6>Paid Email Blasts</h6>
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="jumbotron">
                      <Link to="/PaymentsPage">
                        <span className="dashbrd-icons"><i className="fa fa-fw fa-money"></i></span>
                        <h3>${ this.props.payments && this.props.payments.length ? this.props.payments[0].totalAmount : 0}</h3>
                        <h6>Total Payments</h6>
                      </Link>
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
  const { authentication, admins } = state;
  const { user } = authentication;
  const { agentscount, subscriberscount, payments } = admins;
  return {
    user,
    agentscount, subscriberscount, payments
  };
}


const connectedDashboardPage = connect(mapStateToProps)(DashboardPage);
export { connectedDashboardPage as DashboardPage };