import React from 'react';
import config from 'config';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../actions';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

import ReadMoreAndLess from 'react-read-more-less';

import moment from "moment";
import queryString from 'query-string';
import ProfileimageModal from '../../components/ProfileimageModal';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import PaypalButton from '../../components/PaypalButton';
import ListingSubmenu from '../../components/ListingSubmenu';

import { Button,Modal } from 'react-bootstrap';
import { Alert } from 'reactstrap';

class ProfilePage extends React.Component {
constructor(props) {
  super(props);
  let id='';
  if(this.props.user){
     id= this.props.user.userId; 
  }
  const { dispatch } = this.props;
 
  this.state = {
      submitted: false,
      user: this.props.user,
      profile: this.props.profile,
      userdata:'' ,
      show: false,
      showprofileimage:false,
  };
  this.dispatchval = ({
      tagName : 'span',
      className : '',
      children : null,
      dispatch :this.props
  });
  this.handleShow = this.handleShow.bind(this);
  this.handleChange = this.handleChange.bind(this);
}
componentDidMount(){
   this.props.dispatch(userActions.getById(this.props.user.userId));
}
handleShow() {
    this.setState({ 
        show: true,
        scrollable:true,
        showprofileimage:false,
        restoreFocus:true
     });
}
handleChange(event) {
}
renderProfileimageModal() {
  console.log("test====");
  let modalClose = () => this.setState({ showprofileimage: false });
  return (
    <ProfileimageModal modalid={this.state.modalid} dispatchval = {this.dispatchval} profile={this.state.profile} users={this.state.user} visible={this.state.showprofileimage} onClickBackdrop={modalClose}  dialogClassName="modal-lg"/>
  );
}

  
handleSubmit(event) {
  event.preventDefault();
  var ftechdata = this.state.social_media;
  this.setState({ submitted: true });
}

render() {
  const {profile } = this.props;
  console.log("test===");
  this.state.userdata=Object.assign({
    companyName:'',
    mobileno:'',
    city:'',
    country:'',
    state:'',
    zipcode:'',

  },profile);
  const {submitted,userdata,user}=this.state;
  let modalproimageOpen = (event) => {
     var id = event.currentTarget.dataset.id;
     this.setState({ showprofileimage: true , profile:this.props.profile, modalid: id});
  }
 
 
  let profilepc ='/public/assets/images/dummy-profile.png';
  var profileimagemodal = this.state.profile ? this.renderProfileimageModal() : (<span></span>);
    
  
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
       {profileimagemodal}
        <div className="row">
          <div className="col-sm-12 section-t2">
            <div className="row">
              <div className="col-md-6 border-rt">
                <h4 className="mb-4">Update Your Account Details</h4>
                <form className="form-a contactForm" action="" method="post" role="form">
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                         <input type="text" className="form-control form-control-lg form-control-a " name="companyName" value={userdata.companyName} onChange={this.handleChange}  placeholder="Company Name"/>
                          {submitted && !userdata.companyName &&
                              <div className="validation">Company Name is required</div>
                          }
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <input type="text" className="form-control form-control-lg form-control-a " name="firstName" value={userdata.firstName} onChange={this.handleChange}  placeholder="First Name"/>
                        {submitted && !userdata.firstName &&
                            <div className="validation">First Name is required</div>
                        }
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <input type="text" className="form-control form-control-lg form-control-a " name="lastName" value={userdata.lastName} onChange={this.handleChange}  placeholder="Last Name"/>
                        {submitted && !userdata.lastName &&
                            <div className="validation">Last Name is required</div>
                        }
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                        <input type="text" className="form-control form-control-lg form-control-a " name="email" value={userdata.email} onChange={this.handleChange}  placeholder="Your Email"/>
                        {submitted && !userdata.email &&
                            <div className="validation">Email is required</div>
                        }
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                        <input type="text" className="form-control form-control-lg form-control-a " name="phone" value={userdata.phone} onChange={this.handleChange}  placeholder="Your Phone Number"/>
                        {submitted && !userdata.phone &&
                            <div className="validation">Please enter a valid phone</div>
                        }
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                        <input type="text" className="form-control form-control-lg form-control-a " name="mobileno" value={userdata.mobileno} onChange={this.handleChange}  placeholder="Your Mobile Number"/>
                        {submitted && !userdata.mobileno &&
                            <div className="validation">Please enter a valid phone</div>
                        }
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                          <input type="text" className="form-control form-control-lg form-control-a " name="city" value={userdata.city} onChange={this.handleChange}  placeholder="City"/>
                          {submitted && !userdata.city &&
                              <div className="validation">Please enter your City</div>
                          }
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
                        <input type="text" className="form-control form-control-lg form-control-a " name="zipcode" value={userdata.zipcode} onChange={this.handleChange}  placeholder="Zip Code"/>
                        {submitted && !userdata.zipcode &&
                            <div className="validation">Please enter your zipcode</div>
                        }
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
                         {userdata && userdata.roles=='agents'  ? 
                          <a href="javascript:void(0)" className="pb-2 pr-2 pl-0" data-toggle="modal" data-target="#profileimg"  onClick={modalproimageOpen}>
                          <img src={profilepc} alt="Image" className="profile-img img-fluid" />
                          </a>
                        : <img src={profilepc} alt="Image" className="profile-img img-fluid" />}
                        
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
                        <img alt="Logo" className="img-circle logo"  src="images/dummy-logo.png" />
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
  
  console.log("profile======",users);
  return {
    user,
    alert,
    profile
  };
}


const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };
