import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
//import {FlashMessageList} from './flash/FlashMessageList';
import { history } from '../helpers';
import { alertActions, userActions,adminActions,profileActions } from '../actions';
import { PrivateRoute } from '../components';

import { LoginPage } from '../features/LoginPage';
import { HomePage } from '../features/HomePage';
import {SavedCandidatesPage} from '../features/SavedCandidatesPage'
import { RegisterPage } from '../features/RegisterPage';
import { VerificationPage } from '../features/VerificationPage';
import { ProfilePage } from '../features/ProfilePage';
import { ForgotPasswordPage } from '../features/ForgotPasswordPage';
import { ChangePasswordPage } from '../features/ChangePasswordPage';

import { AboutPage } from '../features/AboutPage';
import { PrivacyPage } from '../features/PrivacyPage';
import { DisclaimerPage } from '../features/DisclaimerPage';
import { LegalPage } from '../features/LegalPage';
import { PricingPage } from '../features/PricingPage';

import { PostreviewsPage } from '../features/PostreviewsPage';
import { PostresumePage } from '../features/PostresumePage';
import PrivateLayout from '../layouts/PrivateLayout';
import PublicLayout from '../layouts/PublicLayout';
import { ContactPage } from '../features/ContactPage';
import { HrProfilePage } from '../features/HrProfilePage';
import { SendinvitationPage } from '../features/SendinvitationPage';
import { AdminLoginPage } from './../features/admin/AdminLoginPage';
import { DashboardPage } from './../features/admin/DashboardPage';
import { EmployersPage } from './../features/admin/EmployersPage';
import { CandidatePage } from './../features/admin/CandidatePage';
import { PricePage } from './../features/admin/PricePage';
import { ContentPage } from './../features/admin/ContentPage';
import { AdminChangePasswordPage } from './../features/admin/AdminChangePasswordPage';
import AdminLayout from '../layouts/AdminLayout';   
import Footer from '../components/Footer';
import { AgentDashboardPage } from '../features/AgentDashboardPage';



class App extends React.Component {
  constructor(props) {
    super(props);
    let user  = JSON.parse(localStorage.getItem('user'));
    const { dispatch } = this.props;
    this.state={
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

  adminLayout(e){
    var urlval = window.location.pathname;
    var type= urlval.split("/");
    var typevalue='';
    if(type){
      typevalue=type[1];
    }
    if(this.state.user && this.state.user.roles !== null ){
      if(this.state.user.roles=='candidate' || this.state.user.roles=='hr'){
       return <PublicLayout >
          <Route path="/hrprofile" component={HrProfilePage} />
          <Route path="/forgotpassword" component={ForgotPasswordPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/index" component={HomePage} />
          <Route path="/savedCandidates" component={SavedCandidatesPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/verification/:token" component={VerificationPage} />
          <Route path ="/changePassword" component={ChangePasswordPage} />
          <Route path ="/contact" component={ContactPage} />
          <Route path ="/profilePage" component={ProfilePage} />
          <Route path ="/SendInvitePage" component={SendinvitationPage} />
          <Route path ="/AboutPage" component={AboutPage} />
          <Route path ="/PrivacyPage" component={PrivacyPage} />
          <Route path ="/DisclaimerPage" component={DisclaimerPage} />
          <Route path ="/LegalPage" component={LegalPage} />
          <Route path ="/PostreviewsPage" component={PostreviewsPage} />
          <Route path ="/PricingPage" component={PricingPage} /> 
		  <Route path ="/AgentDashboardPage" component={AgentDashboardPage} /> 
           
          <Route path ="/postresume" component={PostresumePage} />
          </PublicLayout>
       }else if(this.state.user.roles =='admin' ){
         require('./App.css');
         require('./react-draft-wysiwyg.css');
        return <AdminLayout>
            
            <Route path="/DashboardPage" component={DashboardPage} />
            <Route path="/EmployersPage" component={EmployersPage} />
            <Route path="/candidatePage" component={CandidatePage} />
            <Route path="/PricePage" component={PricePage} />
            <Route path="/ContentPage" component={ContentPage} />
            <Route path="/ChangePassword" component={AdminChangePasswordPage} />
          </AdminLayout>
        }
        else{
        return <PublicLayout >
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path ="/AboutPage" component={AboutPage} />
          <Route path ="/PrivacyPage" component={PrivacyPage} />
          <Route path ="/DisclaimerPage" component={DisclaimerPage} />
          <Route path ="/LegalPage" component={LegalPage} />
          <Route path ="/PricingPage" component={PricingPage} /> 
          <Route path ="/contact" component={ContactPage} />
          <Route path="/forgotpassword" component={ForgotPasswordPage} />
          <Route path="/index" component={HomePage} />
          <Route path ="/postresume" component={PostresumePage} />
          <Route path ="/profilePage" component={ProfilePage} />
          <Route path ="/PostreviewsPage" component={PostreviewsPage} />
		  <Route path ="/AgentDashboardPage" component={AgentDashboardPage} />
          </PublicLayout >
        }
      }
    else{
      if(typevalue=='adminlogin'){
        return <Route path="/adminlogin" component={AdminLoginPage} />
      }
      else{
        return  <PublicLayout >
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path ="/contact" component={ContactPage} />
        <Route path ="/AboutPage" component={AboutPage} />
        <Route path ="/PrivacyPage" component={PrivacyPage} />
        <Route path ="/DisclaimerPage" component={DisclaimerPage} />
        <Route path ="/LegalPage" component={LegalPage} />
        <Route path ="/PricingPage" component={PricingPage} /> 
        <Route path="/index" component={HomePage} />
        <Route path ="/postresume" component={PostresumePage} />
        <Route path ="/PostreviewsPage" component={PostreviewsPage} />
        <Route path ="/profilePage" component={ProfilePage} />
        <Route path="/forgotpassword" component={ForgotPasswordPage} /> 
		<Route path="/AgentDashboardPage" component={AgentDashboardPage} />
            
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
