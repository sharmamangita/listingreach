import React from 'react';
import { Link,Redirect } from 'react-router-dom';
import { browserHistory } from 'react-router'
import { userActions } from '../actions';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, NavLink } from 'react-bootstrap';

class AdminHeader extends React.Component {
   constructor(props){
	   	super(props);
	   	let user  = JSON.parse(localStorage.getItem('user'));
	   	this.state={
	   		user: user
	   	},
	   	
	   	this.logoutuser=this.logoutuser.bind(this);

    }
    logoutuser(event) {
      localStorage.removeItem('user')
      this.setState({ user : null });
      window.push('adminlogin');
      location.reload();
    } 
    componentDidMount() {
        if(this.state.user){
             const { dispatch } = this.state.user.userId;
        }
    }
    render() {
    let $logout=null;
    let $login=null;
    let $rigister=null;
    if(this.state.user && this.state.user.email !== null ){
    $logout = (<Link to="adminlogin" className="dropdown-item" onClick={ this.logoutuser.bind(this) }><em className="fa fa-power-off mr-1"></em>Logout</Link>);
    }
    return (
    	<main className="col-xs-12 col-sm-8 col-lg-9 col-xl-10 pt-3 pl-4 ml-auto">
		    <header className="page-header row justify-center">
					<div className="col-md-6 col-lg-8" >
			
					</div>
					<div className="dropdown user-dropdown col-md-6 col-lg-4 text-center text-md-right">
					<a className="btn btn-stripped dropdown-toggle" href="#" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					    <div className="username mt-2">							
							<h6 className="text-muted">Super Admin</h6>
						</div>
						</a>
						<div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
						   <Link className="dropdown-item" to="ChangePassword"><em className="fa fa-key mr-1"></em> Change Password</Link>
						   {$logout}</div>
					</div>
					<div className="clear"></div>
			</header>
			</main>   
         );
      
     }
}

export default AdminHeader;