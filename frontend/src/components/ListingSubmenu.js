import React from 'react';
import { Link,Redirect } from 'react-router-dom';
import { browserHistory } from 'react-router'
import { userActions } from '../actions';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, NavLink } from 'react-bootstrap';
import { authHeader ,history} from '../helpers';
const axios = require("axios");
import config from 'config';
import { Button,Modal } from 'react-bootstrap';


class ListingSubmenu extends React.Component {
    constructor(props) {
        super(props);
        this.navId = '';
        let user  = JSON.parse(localStorage.getItem('user'));
        
        this.state = {
          selectedMenu:"",
          user: user,
          menu: this.props.selectedMenu,
          selectedTab: null,
          menuList:"",
          activeclass:"",
          dispatchval:this.props.dispatch,
          confirm: false, 
          show:false 
        };
       //this.logoutuser=this.logoutuser.bind(this);
       //this.handleClose = this.handleClose.bind(this);
       this.resetForm = this.resetForm.bind(this);
       this.confirmbox = this.confirmbox.bind(this);
       

    }
    confirmbox(e){
       this.setState({show:true});
    }
    
    handleCheck(e) {
       this.setState({selectedTab: e.currentTarget.id});
    }
    componentDidMount() {
        if(this.state.user){
          const { dispatch } = this.state.user.userId;
        }
    }
    
    resetForm(e){
      history.push('/CreateFlyerPage');
      window.location.reload()

    }
    render() {
     
    if(this.state.user && this.state.user.roles== 'agents' && this.state.user.email !== null ){
    
    return (
      <section className="intro-single" style={{padding: "9rem 0 3rem"}}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="topnav" id="myTopnav">
                <Link to="AgentDashboardPage" className="nav-link">Dashboard</Link>
				        <Link to="CreateFlyerPage" className="nav-link" onClick={this.resetForm.bind(this)} >Create New Flyer</Link>
                <Link to="FlyersPage" className="nav-link"  >My Saved Flyers</Link>
				        <Link to="DesignsPage" className="nav-link">Design Ideas</Link>
                <Link to="BillingPage" className="nav-link">My Billing</Link>
                <Link to="ProfilePage">Account Details</Link>
                <a href="javascript:void(0);" className="icon">
                <i className="fa fa-bars"></i>
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>
    );
  } 
  
  }
}


export default ListingSubmenu;

