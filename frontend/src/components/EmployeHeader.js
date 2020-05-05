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
    
    if(this.state.user && this.state.user.roles== 'candidate' && this.state.user.email !== null ){
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
        <div className="site-mobile-menu">
            <div className="site-mobile-menu-header">
                <div className="site-mobile-menu-close mt-3">
                    <span className="icon-close2 js-menu-toggle"></span>
                </div>
            </div>
            <div className="site-mobile-menu-body"></div>
        </div>
        <div className="site-navbar-wrap js-site-navbar bg-white">
            <div className="container">
                <div className="site-navbar bg-light">
                    <div className="py-1">
                        <div className="row align-items-center">
                            <div className="col-2">
                                <h2 className="mb-0 site-logo"><img src="/public/assets/images/logo1-free-img-1.png" alt="" className="img-fluid" /><Link to ="index">Employee<strong className="font-weight-bold">Mirror</strong> </Link></h2>
                            </div>
                            <div className="col-10">
                                <nav className="site-navigation text-right" role="navigation">
                                    <div className="container">
                                        <div className="d-inline-block d-lg-none ml-md-0 mr-auto py-3"><a href="#" className="site-menu-toggle js-menu-toggle text-black"><span className="icon-menu h3"></span></a></div>
                                        <ul className="site-menu js-clone-nav d-none d-lg-block">
                                            <li>
                                                <Link to="profilePage">Job Profile</Link>
                                            </li>
                                            <li>
                                                <Link to="postresume">Post Resume</Link>
                                            </li>
                                            <li><Link to="SendInvitePage">Send Invite</Link></li>
                                            <li>
                                                <div className="dropdown">

                                                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                                                        My Account
                                                    </button>
                                                    <div className="dropdown-menu">
                                                        <Link className="dropdown-item" to="changePassword">Change Password</Link>
                                                        <a href="javascript:void(0)" className="dropdown-item" onClick={this.confirmbox} >Cancel Membership</a> {$logout}
                                              
     

                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                            <img src={profilepc} className="avtarimg img-fluid" ></img>
                                            </li>

                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Body>
          <h4>Are you sure you want to Cancel your Membership?</h4>
          </Modal.Body>
          <Modal.Footer>
        <button type="button" className="btn btn-secondary" name="cancel" onClick={this.handleClose}>Cancel</button>
        <button type="button" className="btn btn-primary" name="confirm" onClick={() => this.cancelmembership('unverified')}>Confirm</button>
        </Modal.Footer>
        </Modal>

    </header>
    );
  } 
  else if(this.state.user && this.state.user.roles== 'hr' && this.state.user.email !== null ){
    return(
      <header>
        <div className="site-mobile-menu">
            <div className="site-mobile-menu-header">
                <div className="site-mobile-menu-close mt-3">
                    <span className="icon-close2 js-menu-toggle"></span>
                </div>
            </div>
            <div className="site-mobile-menu-body"></div>
        </div>
        <div className="site-navbar-wrap js-site-navbar bg-white">

            <div className="container">
                <div className="site-navbar bg-light">
                    <div className="py-1">
                        <div className="row align-items-center">
                            <div className="col-2">
                                <h2 className="mb-0 site-logo">
                                <img src="/public/assets/images/logo1-free-img-1.png" alt="" className="img-fluid" />
                                <Link to ="index">Employee<strong className="font-weight-bold">Mirror</strong> </Link></h2>
                            </div>
                            <div className="col-10">
                                <nav className="site-navigation text-right" role="navigation">
                                    <div className="container">
                                        <div className="d-inline-block d-lg-none ml-md-0 mr-auto py-3">
                                          <a href="#" className="site-menu-toggle js-menu-toggle text-black" >
                                            <span className="icon-menu h3"></span>
                                          </a>
                                        </div>

                                        <ul className="site-menu js-clone-nav d-none d-lg-block">
                                            <li><Link to ="hrprofile">My Profile</Link></li>
                                            <li><Link to ="savedCandidates">Saved Candidates</Link></li>
                                            <li><Link to ="savedCandidates?page=download">Downloaded Candidates</Link></li>
                                            <li>
                                                <div className="dropdown">
                                                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                                                        My Account
                                                    </button>
                                                    <div className="dropdown-menu">
                                                        <Link className="dropdown-item" to="changePassword">Change Password</Link>
                                                        {$logout}

                                                    </div>
                                                </div>
                                            </li>

                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </header>
    )

  }

  else {
    $login= (<li><Link to="login">Login</Link></li>);
    $rigister=(<li><Link to="register">Register</Link></li>);
    return (  
    <header>
	  <nav class="navbar navbar-default navbar-trans navbar-expand-lg fixed-top">
		<div class="container">
		  <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarDefault"
			aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation">
			<span></span>
			<span></span>
			<span></span>
		  </button>
		  <a class="navbar-brand text-brand" href="index.html"><img src="public/assets/images//listing-reach-logo.png" alt="" class="img-a img-fluid"/></a>
		  <button type="button" class="btn btn-link nav-search navbar-toggle-box-collapse d-md-none" data-toggle="collapse"
			data-target="#navbarTogglerDemo01" aria-expanded="false">
			<span class="fa fa-envelope-square" aria-hidden="true"></span>
		  </button>
		  <div class="navbar-collapse collapse justify-content-center" id="navbarDefault">
			<ul class="navbar-nav">
			  <li class="nav-item">
				<a class="nav-link active" href="index.html">Home</a>
			  </li>
			  <li class="nav-item">
				<a class="nav-link" href="about.html">About</a>
			  </li>
			  <li class="nav-item">
				<a class="nav-link" href="pricing.html">Pricing</a>
			  </li>
			  <li class="nav-item">
				<a class="nav-link" href="testimonials.html">Testimonials</a>
			  </li>
			  <li class="nav-item">
				<a class="nav-link" href="register.html">Register</a>
			  </li> 
			  <li class="nav-item">
				<a class="nav-link" href="login.html">Login</a>
			  </li> 
			</ul>
		  </div> 
			<button type="button" class="btn btn-b-n navbar-toggle-box-collapse d-none d-md-block" data-toggle="collapse"
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

