import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { browserHistory } from 'react-router'
import { userActions } from '../actions';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, NavLink } from 'react-bootstrap';
import { authHeader, history } from '../helpers';
const axios = require("axios");
import config from 'config';
import { Button, Modal } from 'react-bootstrap';


class ListingHeader extends React.Component {
  constructor(props) {
    super(props);
    this.navId = '';
    let user = JSON.parse(localStorage.getItem('user'));

    this.state = {
      selectedMenu: "",
      user: user,
      menu: this.props.selectedMenu,
      selectedTab: null,
      menuList: "",
      activeclass: "",
      dispatchval: this.props.dispatch,
      confirm: false,
      show: false
    };
    this.logoutuser = this.logoutuser.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.confirmbox = this.confirmbox.bind(this);


  }
  confirmbox(e) {
    this.setState({ show: true });
  }

  handleCheck(e) {
    this.setState({ selectedTab: e.currentTarget.id });
  }
  componentDidMount() {
    if (this.state.user) {
      const { dispatch } = this.state.user.userId;
    }
  }
  logoutuser(event) {
    localStorage.removeItem('user')
    this.setState({ user: null });
  }



  handleClose() {
    this.setState({ show: false });
  }



  render() {
    let $logout = null;
    let $login = null;
    let $rigister = null;
    $logout = (<Link to="login" className="dropdown-item" onClick={this.logoutuser.bind(this)}>Logout</Link>);

    if (this.state.user && this.state.user.roles == 'agents' && this.state.user.email !== null) {
      let profilepc = '/public/assets/images/dummy-profile-pic.png';
      let profileimage = localStorage.getItem('profileimage');

      console.log("localStorage.getItem('profileimage')======", profileimage, typeof profileimage);
      if (profileimage != 'undefined') {
        profileimage = JSON.parse(localStorage.getItem('profileimage'));

        if (profileimage) {
          var tarea = profileimage;
          if (tarea.indexOf("http://") == 0 || tarea.indexOf("https://") == 0) {
            // do something here
            profilepc = profileimage;
          } else {
            profilepc = `${config.uploadapiUrl}/uploads/${profileimage}`;
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
              <Link className="navbar-brand text-brand" to="AgentDashboardPage"><img src="public/assets/images/listing-reach-logo.png" alt="" className="img-a img-fluid" /></Link>

              <div className="navbar-collapse collapse justify-content-center" id="navbarDefault">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="HomePage" className="nav-link">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="AboutPage" className="nav-link">About</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="PricingPage" className="nav-link">Pricing</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="TestimonialsPage" className="nav-link">Testimonials</Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle active" to="AgentDashboardPage" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      My Account
                </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link className="dropdown-item" to="changePassword">Change Password</Link>
                      {$logout}
                    </div>
                  </li>
                </ul>
              </div>

            </div>
          </nav>
        </header>
      );
    }
    else {
      $login = (<li><Link to="login" className="nav-link">Login</Link></li>);
      $rigister = (<li><Link to="register" className="nav-link">Register</Link></li>);
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
              <Link className="navbar-brand text-brand" to="HomePage"><img src="public/assets/images/listing-reach-logo.png" alt="" className="img-a img-fluid" /></Link>
              <button type="button" className="btn btn-link nav-search navbar-toggle-box-collapse d-md-none" data-toggle="collapse"
                data-target="#newsLetterSlider" aria-expanded="false">
                <span className="fa fa-envelope-square" aria-hidden="true"></span>
              </button>
              <div className="navbar-collapse collapse justify-content-center" id="navbarDefault">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="HomePage" className="nav-link">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="AboutPage" className="nav-link">About</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="PricingPage" className="nav-link">Pricing</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="TestimonialsPage" className="nav-link">Testimonials</Link>
                  </li>
                  <li className="nav-item">
                    {$rigister}
                  </li>
                  <li className="nav-item">
                    {$login}
                  </li>
                </ul>
              </div>
              <button type="button" id="sub-button" className="btn btn-b-n navbar-toggle-box-collapse d-none d-md-block" data-toggle="collapse"
                data-target="#newsLetterSlider" aria-expanded="false">
                Subscribe Newsletter
		           </button>
            </div>
          </nav>
        </header>
      );
    }
  }
}


export default ListingHeader;

