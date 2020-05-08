import React from 'react';
import { Link,Redirect } from 'react-router-dom';
import { browserHistory } from 'react-router'
import { userActions } from '../actions';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, NavLink } from 'react-bootstrap';
import { authHeader ,history} from '../helpers';
const axios = require("axios");
import config from 'config';
import { Button,Modal } from 'react-bootstrap';


class EmployeHeader extends React.Component {
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


    cancelmembership(flag){ 
     let user  = JSON.parse(localStorage.getItem('user'));
      user.id=user.userId;
      user.status=flag;
      const configs = {
       
        headers: {
         ...authHeader(), 'content-type': 'multipart/form-data'
        },
        user
      }
      axios.put(`${config.apiUrl}/updateCandidateAmount`,configs)
      .then((response) => {
           console.log("reponse");
          history.push('/login');
          location.reload();
      }).catch((error) => {
      console.log("The file is error uploaded====");
      });
        this.setState({ show: false });
      //this.props.dispatchval.dispatch(userActions.updateCandidateAmount(user));  */
    }

    render() {
    let $logout=null;
    let $login=null;
    let $rigister=null;
    $logout = (<Link to="login" className="dropdown-item" onClick={ this.logoutuser.bind(this) }>Logout</Link>); 
    
    if(this.state.user  && this.state.user.email !== null ){
    let profilepc ='/public/assets/images/dummy-profile-pic.png';
    let profileimage = localStorage.getItem('profileimage');
     
    console.log("localStorage.getItem('profileimage')======",profileimage, typeof profileimage);
     if( profileimage != 'undefined'){ 
      profileimage = JSON.parse(localStorage.getItem('profileimage'));
     
      if(profileimage){
          var tarea = profileimage;
          if (tarea.indexOf("http://") == 0 || tarea.indexOf("https://") == 0) {
              // do something here
              profilepc=profileimage;
          }else{
              profilepc=`${config.uploadapiUrl}/uploads/${profileimage}`;
          }
      }
    }
    return (
      <header>
      <nav className="navbar navbar-default navbar-trans navbar-expand-lg fixed-top">
        <div className="container">
          <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarDefault"
            aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <a className="navbar-brand text-brand" href="index.html"><img src="public/assets/images/listing-reach-logo.png" alt="" className="img-a img-fluid" /></a>
          
          <div className="navbar-collapse collapse justify-content-center" id="navbarDefault">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="index.html">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="about.html">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pricing.html">Pricing</a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="testimonials.html">Testimonials</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="dashboard.html">My Account</a>
              </li>       
            </ul>
          </div> 
     
        </div>
      </nav>
    </header>
    );
  } 
  else {
    $login= (<li><Link to="login" className="nav-link">Login</Link></li>);
    $rigister=(<li><Link to="register" className="nav-link">Register</Link></li>);
    return (  
    <header>
	  <nav className="navbar navbar-default navbar-trans navbar-expand-lg fixed-top">
		<div className="container">
		  <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarDefault"
			aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation">
			<span></span>
			<span></span>
			<span></span>
		  </button>
		  <a className="navbar-brand text-brand" href="index.html"><img src="public/assets/images/listing-reach-logo.png" alt="" className="img-a img-fluid"/></a>
		  <button type="button" className="btn btn-link nav-search navbar-toggle-box-collapse d-md-none" data-toggle="collapse"
			data-target="#navbarTogglerDemo01" aria-expanded="false">
			<span className="fa fa-envelope-square" aria-hidden="true"></span>
		  </button>
		  <div className="navbar-collapse collapse justify-content-center" id="navbarDefault">
			<ul className="navbar-nav">
			  <li className="nav-item">
				<a className="nav-link active" href="index.html">Home</a>
			  </li>
			  <li className="nav-item">
				<Link to="AboutPage" className="nav-link">About</Link>
			  </li>
			  <li className="nav-item">
				<Link to="PricingPage" className="nav-link">Pricing</Link>
			  </li>
			  <li className="nav-item">
				<a className="nav-link" href="testimonials.html">Testimonials</a>
			  </li>
			  <li className="nav-item">
				{$rigister}
			  </li> 
			  <li className="nav-item">
				{$login}
			  </li> 
			</ul>
		  </div> 
			<button type="button" className="btn btn-b-n navbar-toggle-box-collapse d-none d-md-block" data-toggle="collapse"
			data-target="#navbarTogglerDemo01" aria-expanded="false">
			Subscribe Newsletter
		  </button>
		</div>
	</nav> 
  </header>
  );
 }
  }
}


export default EmployeHeader;

