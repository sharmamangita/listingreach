import React from 'react';
import config from 'config';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../actions';


import ProfileimageModal from '../../components/ProfileimageModal';

import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

import ReadMoreAndLess from 'react-read-more-less';

import moment from "moment";
import queryString from 'query-string';

import PaypalExpressBtn from 'react-paypal-express-checkout';
import PaypalButton from '../../components/PaypalButton';
import ListingSubmenu from '../../components/ListingSubmenu';
var QRCode = require('qrcode.react');
import { Button,Modal } from 'react-bootstrap';
import { Alert } from 'reactstrap';

class ProfilePage extends React.Component {
constructor(props) {
  super(props);
 
}



 componentDidMount(){
  
 }


render() {
  return (
  <div>
    <ListingSubmenu/>
    <section>
      <div className="container">
        <div className="title-box-d">
            <h3 className="title-d">Account Details</h3>
          </div>
        </div>
    </section>
    <section className="news-grid grid">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 section-t2">
            <div className="row">
              <div className="col-md-6 border-rt">
                <h4 className="mb-4">Update Your Account Details</h4>
                <form className="form-a contactForm" action="" method="post" role="form">
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                        <input type="text" name="name" className="form-control form-control-lg form-control-a" placeholder="Company Name" data-rule="minlen:4" data-msg="Please enter unique username" />
                        <div className="validation"></div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <input type="text" name="name" className="form-control form-control-lg form-control-a" placeholder="First Name" data-rule="minlen:4" data-msg="Please enter your first name" />
                        <div className="validation"></div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <input name="text" type="phone" className="form-control form-control-lg form-control-a" placeholder="Last Name" data-rule="phone" data-msg="Please enter your last name" />
                        <div className="validation"></div>
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                        <input name="email" type="email" className="form-control form-control-lg form-control-a" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                        <div className="validation"></div>
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                        <input name="phone" type="phone" className="form-control form-control-lg form-control-a" placeholder="Your Phone Number" data-rule="phone" data-msg="Please enter a valid phone" />
                        <div className="validation"></div>
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                        <input name="phone" type="phone" className="form-control form-control-lg form-control-a" placeholder="Your Mobile Number" data-rule="phone" data-msg="Please enter a valid phone" />
                        <div className="validation"></div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                          <input type="text" name="City" className="form-control form-control-lg form-control-a" placeholder="City" data-rule="minlen:4" data-msg="Please enter your City" />
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <select className="form-control form-control-lg form-control-a" id="Type">
                          <option>Select State</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <input type="text" name="City" className="form-control form-control-lg form-control-a" placeholder="Zip Code" data-rule="minlen:4" data-msg="Please enter your City" />
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="form-group">
                          <div className="form-group">
                            <select className="form-control form-control-lg form-control-a" id="city">
                              <option>Select Country</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <button type="submit" className="btn btn-a">Save</button>
                      </div>
                  </div>
                </form>
              </div>
              <div className="col-md-6 padding-lt">
                <h4 className="mb-4">Auto Populate Your Agent Details</h4>
                <p className="mb-4">The information below will auto populate in the 'Fill in the Blank' Style Templates (optional)</p>
                <form className="form-a contactForm" action="" method="post" role="form">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <label className="check">Use Agent Photo 
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                        <img alt="Photo" className="img-circle logo"  src="img/dummy-profile.png" />
                        <br></br>
                        <span>
                          <a href="">Upload Agent Photo</a>
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <label className="check">Use Logo 
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                        <img alt="Logo" className="img-circle logo"  src="img/dummy-logo.png" />
                        <br></br>
                        <span>
                          <a href="">Upload Agent Logo</a>
                        </span>
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                        <input type="text" name="name" className="form-control form-control-lg form-control-a" placeholder="Agent Name" data-rule="minlen:4" data-msg="Please enter name" />
                        <div className="validation"></div>
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                        <input type="text" name="name" className="form-control form-control-lg form-control-a" placeholder="Designation" data-rule="minlen:4" />
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                        <input name="email" type="email" className="form-control form-control-lg form-control-a" placeholder="Email" data-rule="email" data-msg="Please enter a valid email" />
                        <div className="validation"></div>
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                        <input type="text" name="name" className="form-control form-control-lg form-control-a" placeholder="Website URL" data-rule="minlen:4" />
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                        <input name="phone" type="phone" className="form-control form-control-lg form-control-a" placeholder="Phone Number" data-rule="phone" data-msg="Please enter a valid phone" />
                          <div className="validation"></div>
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                        <textarea name="message" className="form-control" cols="45" rows="8" data-rule="required" data-msg="Please write Company details" placeholder="Company Details"></textarea>
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                        <textarea name="message" className="form-control" cols="45" rows="8" data-rule="required" data-msg="Please write other information if any" placeholder="Other Information"></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <button type="submit" className="btn btn-a">Save</button>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
  );
  }

  
  
}



 

function mapStateToProps(state) {
  const { authentication, users} = state;
  const { user } = authentication;
  const { profile} = users;
  const { alert } = state;
  
  console.log("profile======",profile);
  return {
    user,
    profile,
   
   
	  
    alert
    
  };
}


const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };
