import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
//import {FlashMessageList} from './flash/FlashMessageList';
import { history } from '../helpers';
import { alertActions, userActions, adminActions, profileActions } from '../actions';

import { LoginPage } from '../features/LoginPage';
import { HomePage } from '../features/HomePage';

import { RegisterPage } from '../features/RegisterPage';
import { VerificationPage } from '../features/VerificationPage';
import { ProfilePage } from '../features/ProfilePage';
import { ForgotPasswordPage } from '../features/ForgotPasswordPage';
import { ChangePasswordPage } from '../features/ChangePasswordPage';

import { AboutPage } from '../features/AboutPage';
import { PrivacyPage } from '../features/PrivacyPage';
import { RefundPage } from '../features/RefundPage';
import { TestimonialsPage } from '../features/TestimonialsPage';
import { FaqsPage } from '../features/FaqsPage';
import { DatabasesPage } from '../features/DatabasesPage';

import { LegalPage } from '../features/LegalPage';
import { PricingPage } from '../features/PricingPage';


import PrivateLayout from '../layouts/PrivateLayout';
import PublicLayout from '../layouts/PublicLayout';
import { ContactPage } from '../features/ContactPage';
import { SendinvitationPage } from '../features/SendinvitationPage';
import { AdminLoginPage } from './../features/admin/AdminLoginPage';
import { DashboardPage } from './../features/admin/DashboardPage';
import { AgentsPage } from './../features/admin/AgentsPage';
import { PricePage } from './../features/admin/PricePage';
import { SubscriberPage } from './../features/admin/SubscribersPage';
import { EmailBlastsPage } from './../features/admin/EmailBlastsPage'
import { PaymentsPage } from './../features/admin/PaymentsPage'
import { ContentPage } from './../features/admin/ContentPage';
import { AdminChangePasswordPage } from './../features/admin/AdminChangePasswordPage';
import AdminLayout from '../layouts/AdminLayout';
import Footer from '../components/Footer';
import { AgentDashboardPage } from '../features/AgentDashboardPage';
import { CreateFlyerPage } from '../features/CreateFlyerPage';
import { FlyersPage } from '../features/FlyersPage';
import { BillingPage } from '../features/BillingPage';
import { DesignsPage } from '../features/DesignsPage';



class App extends React.Component {
  constructor(props) {
    super(props);
    let user = JSON.parse(localStorage.getItem('user'));
    const { dispatch } = this.props;
    this.state = {
      user: user
    }

    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
    this.adminLayout = this.adminLayout.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
  }

  adminLayout(e) {
    var urlval = window.location.pathname;
    var type = urlval.split("/");
    var typevalue = '';
    if (type) {
      typevalue = type[1];
    }
    if (this.state.user && this.state.user.roles !== null) {
      if (this.state.user.roles == 'agents') {
        return <PublicLayout >
          <Route path="/forgotpassword" component={ForgotPasswordPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/verification/:token" component={VerificationPage} />
          <Route path="/changePassword" component={ChangePasswordPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/profilePage" component={ProfilePage} />
          <Route path="/SendInvitePage" component={SendinvitationPage} />
          <Route path="/AboutPage" component={AboutPage} />
          <Route path="/PrivacyPage" component={PrivacyPage} />
          <Route path="/RefundPage" component={RefundPage} />
          <Route path="/TestimonialsPage" component={TestimonialsPage} />
          <Route path="/FaqsPage" component={FaqsPage} />
          <Route path="/DatabasesPage" component={DatabasesPage} />
          <Route path="/LegalPage" component={LegalPage} />
          <Route path="/PricingPage" component={PricingPage} />
          <Route path="/AgentDashboardPage" component={AgentDashboardPage} />
          <Route path="/CreateFlyerPage" component={CreateFlyerPage} />
          <Route path="/FlyersPage" component={FlyersPage} />
          <Route path="/BillingPage" component={BillingPage} />
          <Route path="/DesignsPage" component={DesignsPage} />
          <Route path={typevalue ? "/HomePage" : ""} component={HomePage} />

        </PublicLayout>
      } else if (this.state.user.roles == 'admin') {
        require('./App.css');
        require('./react-draft-wysiwyg.css');
        return <AdminLayout>
          <Route path="/PricePage" component={PricePage} />
          <Route path="/AgentsPage" component={AgentsPage} />
          <Route path="/SubscriberPage" component={SubscriberPage} />
          <Route path="/EmailBlastsPage" component={EmailBlastsPage} />
          <Route path="/PaymentsPage" component={PaymentsPage} />
          <Route path="/ContentPage" component={ContentPage} />
          <Route path="/ChangePassword" component={AdminChangePasswordPage} />
          <Route path={typevalue ? "/DashboardPage" : "" } component={DashboardPage} />
        </AdminLayout>
      }
      else {
        return <PublicLayout >
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/AboutPage" component={AboutPage} />
          <Route path="/PrivacyPage" component={PrivacyPage} />
          <Route path="/RefundPage" component={RefundPage} />
          <Route path="/TestimonialsPage" component={TestimonialsPage} />
          <Route path="/FaqsPage" component={FaqsPage} />
          <Route path="/DatabasesPage" component={DatabasesPage} />
          <Route path="/LegalPage" component={LegalPage} />
          <Route path="/PricingPage" component={PricingPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/forgotpassword" component={ForgotPasswordPage} />
          <Route path="/profilePage" component={ProfilePage} />
          <Route path={typevalue ? "/HomePage" : ""} exact component={HomePage} />

        </PublicLayout >
      }
    }
    else {
      if (typevalue == 'adminlogin') {
        return <Route path="/adminlogin" component={AdminLoginPage} />
      }
      else {
        return <PublicLayout >
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/AboutPage" component={AboutPage} />
          <Route path="/PrivacyPage" component={PrivacyPage} />
          <Route path="/RefundPage" component={RefundPage} />
          <Route path="/TestimonialsPage" component={TestimonialsPage} />
          <Route path="/FaqsPage" component={FaqsPage} />
          <Route path="/DatabasesPage" component={DatabasesPage} />
          <Route path="/LegalPage" component={LegalPage} />
          <Route path="/PricingPage" component={PricingPage} />
          <Route path="/profilePage" component={ProfilePage} />
          <Route path="/forgotpassword" component={ForgotPasswordPage} />
          <Route path={typevalue ? "/HomePage" : ""} exact component={HomePage} />

        </PublicLayout >
      }
    }
  }

  render() {
    return (
      <div className="site-wrap">

        <Router history={history}>
          <div>
            {this.adminLayout()}
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
