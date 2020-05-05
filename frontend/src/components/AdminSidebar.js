import React from 'react';
import { Link,Redirect } from 'react-router-dom';
import { browserHistory } from 'react-router'
import { userActions } from '../actions';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, NavLink } from 'react-bootstrap';

class AdminSidebar extends React.Component {
   
    render() {
    return (
		     <div className="container-fluid" id="wrapper">
				<div className="row">
					 <nav className="sidebar col-xs-12 col-sm-4 col-lg-3 col-xl-2">
						<h1 className="site-title"><a href="index.html">Employee<b>MIRROR</b></a></h1>									
						<a href="#menu-toggle" className="btn btn-default" id="menu-toggle"><em className="fa fa-bars"></em></a>
						<ul className="nav nav-pills flex-column sidebar-nav">
							<li className="nav-item"><Link className="nav-link" to="DashboardPage"><em className="fa fa-dashboard"></em> Dashboard</Link></li>
							<li className="nav-item"><Link className="nav-link" to="EmployersPage"><em className="fa fa-group"></em> Employers</Link></li>
							<li className="nav-item"><Link className="nav-link" to="CandidatePage"><em className="fa fa-users"></em> Candidates</Link></li>
							<li className="nav-item"><Link className="nav-link" to="PricePage"><em className="fa fa-money"></em> Pricing</Link></li>
							<li className="nav-item"><Link className="nav-link" to="ContentPage"><em className="fa fa-file-text-o"></em> Content</Link></li>
							<li className="nav-item"><Link className="nav-link" to="ChangePassword"><em className="fa fa-key"></em> Change Password</Link></li>
						</ul>
					</nav>
                </div>
            </div>    
         );
     }
}



export default AdminSidebar;