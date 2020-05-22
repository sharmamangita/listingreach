import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { browserHistory } from 'react-router'
import { userActions } from '../actions';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, NavLink } from 'react-bootstrap';

class AdminSidebar extends React.Component {

	render() {
		return (
			<div className="container-fluid" id="wrapper">
				<div className="row">
					<nav className="sidebar col-xs-12 col-sm-4 col-lg-3 col-xl-2" style={{paddingTop:0}}>
						<div className="logo-bg">
							<img src="public/assets/images/listing-reach-logo.png" alt="" className="img-a img-fluid" />
						</div>
						
						<a href="#menu-toggle" className="btn btn-default" id="menu-toggle"><em className="fa fa-bars"></em></a>
						<ul className="nav nav-pills flex-column sidebar-nav">
							<li className="nav-item"><Link className="nav-link" to="DashboardPage"><em className="fa fa-dashboard"></em> Dashboard</Link></li>
							<li className="nav-item"><Link className="nav-link" to="PricePage"><em className="fa fa-money"></em> Update Pricing</Link></li>
							<li className="nav-item"><Link className="nav-link" to="AgentsPage"><em className="fa fa-users"></em> Agents</Link></li>
							<li className="nav-item"><Link className="nav-link" to="SubscriberPage"><em className="fa fa-users"></em> Subscribers</Link></li>
							<li className="nav-item"><Link className="nav-link" to="EmailBlastsPage"><em className="fa fa-envelope"></em> Email Blasts</Link></li>
							<li className="nav-item"><Link className="nav-link" to="PaymentsPage"><em className="fa fa-money"></em> Payments</Link></li>
							<li className="nav-item"><Link className="nav-link" to="ChangePassword"><em className="fa fa-key"></em> Change Password</Link></li>
						</ul>
					</nav>
				</div>
			</div>
		);
	}
}



export default AdminSidebar;