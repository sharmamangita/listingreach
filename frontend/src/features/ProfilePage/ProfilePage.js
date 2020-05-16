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
      agentData: this.props.agentData,
      userdata:'' ,
      agentdataval:'',
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
  const { name, value } = event.target;
  const { agentdataval } = this.state;
  this.setState({
      agentdataval: {
          ...agentdataval,
          [name]: value
      }
  });
  console.log("srt=====",agentdataval);
}
renderProfileimageModal() {
  console.log("test==sss==",this.state.modalid);
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
  const {profile,agentData} = this.props;
 
  this.state.userdata=Object.assign({
    companyName:'',
    mobileno:'',
    city:'',
    country:'',
    state:'',
    zipcode:'',

  },profile);
  this.state.agentdataval=Object.assign({
    name:'',
    designation:'',
    email:'',
    website_url:'',
    phone_number:'',
    company_details:'',
    other_information:'',
    image_url:'',
    logo_url:''

  },agentData);
  
  const {submitted,userdata,user,agentdataval}=this.state;
  console.log("agentdataVal=====",this.state);
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
                          <a href="javascript:void(0)" className="pb-2 pr-2 pl-0" data-toggle="modal" data-id="profileimg" data-target="#profileimg"  onClick={modalproimageOpen}>
                          <img src={profilepc} alt="Image" className="profile-img img-fluid" />
                          </a>
                        <br></br>
                        <span>
                          <a href="javascript:void(0)" className="pb-2 pr-2 pl-0" data-toggle="modal" data-id="profileimg" data-target="#profileimg"  onClick={modalproimageOpen}>Upload Agent Photo</a>
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <label className="check">Use Logo 
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                        <img alt="Logo" className="img-circle logo"  src="/public/assets/images/dummy-logo.png" />
                        <br></br>
                        <span>
                          <a href="">Upload Agent Logo</a>
                        </span>
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                        <input type="text" className="form-control form-control-lg form-control-a " name="name" value={agentdataval.name} onChange={this.handleChange}  placeholder="Agent Name"/>
                        {submitted && !agentdataval.name &&
                            <div className="validation">Please enter name</div>
                        }

                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                        <input type="text" className="form-control form-control-lg form-control-a " name="designation" value={agentdataval.designation} onChange={this.handleChange}  placeholder="Designation"/>
                        {submitted && !agentdataval.designation &&
                            <div className="validation">Please enter name</div>
                        }
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                        <input type="text" className="form-control form-control-lg form-control-a " name="email" value={agentdataval.email} onChange={this.handleChange}  placeholder="Email"/>
                        {submitted && !agentdataval.email &&
                            <div className="validation">Please enter email</div>
                        }
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                        <input type="text" className="form-control form-control-lg form-control-a " name="website_url" value={agentdataval.email} onChange={this.handleChange}  placeholder="Website URL"/>
                        {submitted && !agentdataval.website_url &&
                            <div className="validation">Please enter website URL</div>
                        }
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                        <input type="text" className="form-control form-control-lg form-control-a " name="phone" value={agentdataval.phone} onChange={this.handleChange}  placeholder="Phone Number"/>
                        {submitted && !agentdataval.phone &&
                            <div className="validation">Please enter phone number</div>
                        }  
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                        <textarea type="text" className="form-control" cols="45" rows="8" name="company_details" value={agentdataval.company_details} onChange={this.handleChange}  placeholder="Company Details"></textarea>
                        {submitted && !agentdataval.company_details &&
                            <div className="validation">Please write Company details</div>
                        }  
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                        <textarea type="text" className="form-control" cols="45" rows="8" name="other_information" value={agentdataval.other_information} onChange={this.handleChange}  placeholder="Other Information"></textarea>
                        {submitted && !agentdataval.other_information &&
                            <div className="validation">Please write other information if any</div>
                        }  
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
  const { agentData} = users;
  const { alert } = state;
  console.log("profile======",agentData);
  return {
    user,
    alert,
    profile,
    agentData
  };
}


const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };
