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
       this.logoutuser=this.logoutuser.bind(this);
       this.handleClose = this.handleClose.bind(this);
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
    logoutuser(event) {
      localStorage.removeItem('user')
      this.setState({ user : null });
    } 
   

  
    handleClose() {
      this.setState({ show: false });
    }



    render() {
     
    if(this.state.user && this.state.user.roles== 'agents' && this.state.user.email !== null ){
    
    return (
      <section className="intro-single" style={{padding: "9rem 0 3rem"}}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="topnav" id="myTopnav">
                <a href="dashboard.html" className="active">Dashboard</a>
                <a href="create-flyer.html">Create New Blast</a>
                <a href="flyers.html">My Saved Blasts</a>
                <a href="designs.html">Design Ideas</a>
                <a href="billing.html">My Billing</a>
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

