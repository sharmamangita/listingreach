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
		<footer className="site-footer">
            <div className="container">
            <div className="row">
                <div className="col-md-5">
                    <h3 className="footer-heading mb-4 text-white">About</h3>
                  <p>{ReactHtmlParser(shorttext.substring(0,50))}</p>
                    <p><Link to="AboutPage" className="btn btn-primary pill text-white px-4">Read More</Link></p>
                </div>
                <div className="col-md-5">            
                    <h3 className="footer-heading mb-4 text-white">Quick Menu</h3>
                    <ul className="list-unstyled">
                    <li><Link to="AboutPage">About</Link></li>
                    <li><Link to="Contact">Contact</Link></li>
                    <li><Link to="PrivacyPage">Privacy</Link></li>
                    <li><Link to="DisclaimerPage">Disclaimer</Link></li>
                    <li><Link to="LegalPage">Legal</Link></li>                    
                    </ul>            
                </div>
                <div className="col-md-2">
                    <div className="col-md-12">
                        <h3 className="footer-heading mb-4 text-white">Social Icons</h3>
                    </div>
                    <div className="col-md-12">
                        <p>
                          <a href="#" className="pb-2 pr-2 pl-0"><span className="icon-facebook"></span></a>
                          <a href="#" className="p-2"><span className="icon-twitter"></span></a>
                          <a href="#" className="p-2"><span className="icon-instagram"></span></a>
                          <a href="#" className="p-2"><span className="icon-vimeo"></span></a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="row mt-5 text-center">
              <div className="col-md-12">

              </div>
              
            </div>
           </div>
        </footer>
    );
  }
}



export default Footer;
