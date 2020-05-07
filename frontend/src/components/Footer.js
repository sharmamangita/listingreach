import React from 'react';
import { Link,Redirect } from 'react-router-dom';
import { browserHistory } from 'react-router'
import { userActions } from '../actions';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, NavLink } from 'react-bootstrap';
import config from 'config';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();


class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.navId = '';

        let user  = JSON.parse(localStorage.getItem('user'))
          this.state = {
          selectedMenu:"",
          user: user,
          menu: this.props.selectedMenu,
          selectedTab: null,
          menuList:"",
          activeclass:"",
          shorttext:''
        };
    }

  componentDidMount(){
    var that = this;
    fetch(`${config.apiUrl}/contentPage`,{
      method: 'POST',
       headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
        },
        body: JSON.stringify({page:'About Us'})
      }).then(response => {
         return response.json();
        }).then(function (result) {
            console.log("datserer",result);
            if(result[0]){
            let aboutcontent = entities.decode(result[0].content);
            const regex = /(<([^>]+)>)/ig;
            const footertext = aboutcontent.replace(regex, '');
            that.setState({shorttext:footertext});
            }
        });
     
  //const { dispatch } = this.props;
  //this.props.dispatch(userActions.getapagecontent({page:'About Us'})); 
  }
    
    handleCheck(e) {
        this.setState({selectedTab: e.currentTarget.id});
    }
  
    render() {
    const {shorttext} = this.state;
    return (
		<footer className="section-footer">
			<div className="container">
			  <div className="row">
				<div className="col-md-12">
				  <nav className="nav-footer">
					<ul className="list-inline">
					  <li className="list-inline-item">
						{/*<a href="pricing.html">Pricing</a>*/}
						<Link to="PricingPage">Pricing</Link>
					  </li>
					  <li className="list-inline-item">
						<a href="databases.html">Databases</a>
					  </li>              
					  <li className="list-inline-item">
					  {/*<a href="privacy-policy.html">Privacy Policy</a>*/}
					  <Link to="PrivacyPage">Privacy Policy</Link>
					  </li>
					  <li className="list-inline-item">
						<a href="refund-policy.html">Refund Policy</a>
					  </li>
					  <li className="list-inline-item">
						<a href="#">Mail Preferences</a>
					  </li>
					  <li className="list-inline-item">
						<a href="faq.html">FAQs</a>
					  </li>
					  <li className="list-inline-item">
					  {/*<a href="contact.html">Contact Us</a>*/}
					  <Link to="Contact">Contact Us</Link>
					  </li>
					</ul>
				  </nav>
				 
				  <div className="copyright-footer">
					<p className="copyright color-text-a">
					  Copyright &copy; 2019 Listing Reach. All Rights Reserved.              
					</p>
				  </div>
				  
				</div>
			  </div>
			</div>
		</footer>
    );
  }
}



export default Footer;
