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
import ProfilelogoModal from '../../components/ProfilelogoModal';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import PaypalButton from '../../components/PaypalButton';
import ListingSubmenu from '../../components/ListingSubmenu';
import { globalData } from '../../constants/data.constants';
import { Button, Modal } from 'react-bootstrap';
import { Alert } from 'reactstrap';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    let id = '';
    if (this.props.user) {
      id = this.props.user.userId;
    }
    const { dispatch } = this.props;
    console.log("this.props====", this.props);
    this.props.dispatch(userActions.getById(this.props.user.userId));
    this.alermsg = '';
    this.state = {
      submitted: false,
      submittedagent: false,
      user: this.props.user,
      showerror: true,
      profile: Object.assign({
        companyName: '',
        mobileno: '',
        city: '',
        country: '',
        state: '',
        zipcode: '',

        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      }, this.props.profile),
      agentData: Object.assign({
        name: '',
        designation: '',
        email: '',
        website_url: '',
        phone_number: '',
        company_details: '',
        other_information: '',
        image_url: '',
        logo_url: ''
      }, this.props.agentData),
      show: false,
      showprofileimage: false,
      showprofilelogo: false,
    };

    this.dispatchval = ({
      tagName: 'span',
      className: '',
      children: null,
      dispatch: this.props
    });
    this.handleShow = this.handleShow.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmits = this.handleSubmits.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
  }


  componentDidMount() {

  }
  handleShow() {
    this.setState({
      show: true,
      scrollable: true,
      showprofileimage: false,
      showprofilelogo: false,
      restoreFocus: true
    });
  }
  handleChange(event) {
    const { name, value } = event.target;
    const { agentData } = this.state;
    this.setState({
      agentData: {
        ...agentData,
        [name]: value
      }
    });
    
  }
  handleChanges(event) {
    const { name, value } = event.target;
    const { profile } = this.state;
    
    this.setState({
      profile: {
        ...profile,
        [name]: value
      }
    });

  }
  renderProfileimageModal() {
    let modalClose = () => this.setState({ showprofileimage: false });
    return (
      <ProfileimageModal modalid={this.state.modalid} dispatchval={this.dispatchval} profile={this.state.agentData} users={this.state.user} visible={this.state.showprofileimage} onClickBackdrop={modalClose} dialogClassName="modal-lg" />
    );
  }
  renderProfilelogoModal() {
    let modalClose = () => this.setState({ showprofilelogo: false });
    return (
      <ProfilelogoModal modalid={this.state.modalid} dispatchval={this.dispatchval} profile={this.state.agentData} users={this.state.user} visible={this.state.showprofilelogo} onClickBackdrop={modalClose} dialogClassName="modal-lg" />
    );
  }
  handleSubmits(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { profile } = this.state;
    const { dispatch } = this.props;
    if (profile.email) {
       console.log("srt=====",profile);
      dispatch(userActions.update(profile));
      window.scrollTo(0, 0);
      this.setState({ visible: true }, () => {
        window.setTimeout(() => {
          this.setState({ visible: false })
        }, 2000)
      });
    } else {
      this.setState((prevState, props) => {
        return { showerror: false }
      })

    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submittedagent: true });
    const { agentData } = this.state;
    const { dispatch } = this.props;
    if (agentData.name && agentData.email) {
      dispatch(userActions.saveAgents(agentData));
      window.scrollTo(0, 0);
      this.setState({ visible: true }, () => {
        window.setTimeout(() => {
          this.setState({ visible: false })
        }, 2000)
      });
    } else {
      this.setState((prevState, props) => {
        return { showerror: false }
      })

    }
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.agentData != undefined && nextProps.agentData) || nextProps.profile != undefined && nextProps.profile) {
      this.propsDataupdate(nextProps.agentData, nextProps.profile);
    }
  }
  propsDataupdate(data, profile) {
    let states = Object.assign({}, this.state);
    let propsData = data;
    let profileData = profile;
    if ((propsData != undefined && propsData) || (profileData != undefined && profileData)) {
      states.agentData = propsData;
      states.profile = profileData;
      this.setState({ agentData: states.agentData });
      this.setState({ profile: states.profile });
    }
  }
  render() {

    const { submitted, submittedagent, profile, user, agentData } = this.state;
    console.log("this.props.agentData===", agentData);
    console.log("this.props.profile===", profile);
    let modalproimageOpen = (event) => {
      var id = event.currentTarget.dataset.id;
      this.setState({ showprofileimage: true, agentData: this.props.agentData, modalid: id });
    }
    let modallogoimageOpen = (event) => {
      var id = event.currentTarget.dataset.id;
      this.setState({ showprofilelogo: true, agentData: this.props.agentData, modalid: id });
    }
    const { alert } = this.props;
    if (alert && alert.message) {

      this.alermsg = alert;
    }
    let profilepc = '';
    if (agentData && agentData.image_url) {
      profilepc = `${config.uploadapiUrl}/uploads/${agentData.image_url}`;
    } else {
      profilepc = '/public/assets/images/dummy-profile.png';
    }
    var profileimagemodal = this.state.agentData ? this.renderProfileimageModal() : (<span></span>);

    let profilelogo = '';
    if (agentData && agentData.logo_url) {
      profilelogo = `${config.uploadapiUrl}/uploads/${agentData.logo_url}`;
    } else {
      profilelogo = '/public/assets/images/dummy-logo.png';
    }

    var profilelogomodal = this.state.agentData ? this.renderProfilelogoModal() : (<span></span>);


    return (
      <div>
        <ListingSubmenu />
        <section>
          <div className="container">
            <div className="title-box-d">
              <h3 className="title-d">Account Details</h3>
            </div>
          </div>
        </section>
        <section className="news-grid grid">
          <div className="container">
		  { alert.message &&
						<Alert className={`alert ${alert.type}`} style={{textAlign:"center"}} isOpen={this.state.visible} > <button type="button" onClick={this.closebtn} className="close" >
								<span aria-hidden="true">&times;</span>
								</button>{alert.message}</Alert>
						}
            {profileimagemodal}
            {profilelogomodal}
            <div className="row">
              <div className="col-sm-12 section-t2">
                <div className="row">
                  <div className="col-md-6 border-rt">
                    <h4 className="mb-4">Update Your Account Details</h4>
                    <form onSubmit={this.handleSubmits} className="form-a contactForm">
					
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <div className="form-group">
                            <input type="text" className="form-control form-control-lg form-control-a " name="companyName" value={profile.companyName} onChange={this.handleChanges} placeholder="Company Name" />
                            {submitted && !profile.companyName &&
                              <div className="validation">Company Name is required</div>
                            }
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="form-group">
                            <input type="text" className="form-control form-control-lg form-control-a " name="firstName" value={profile.firstName} onChange={this.handleChanges} placeholder="First Name" />
                            {submitted && !profile.firstName &&
                              <div className="validation">First Name is required</div>
                            }
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="form-group">
                            <input type="text" className="form-control form-control-lg form-control-a " name="lastName" value={profile.lastName} onChange={this.handleChanges} placeholder="Last Name" />
                            {submitted && !profile.lastName &&
                              <div className="validation">Last Name is required</div>
                            }
                          </div>
                        </div>
                        <div className="col-md-12 mb-3">
                          <div className="form-group">
                            <input type="text" className="form-control form-control-lg form-control-a " name="email" value={profile.email} onChange={this.handleChanges} placeholder="Your Email" />
                            {submitted && !profile.email &&
                              <div className="validation">Email is required</div>
                            }
                          </div>
                        </div>
                        <div className="col-md-12 mb-3">
                          <div className="form-group">
                            <input type="text" className="form-control form-control-lg form-control-a " name="phone" value={profile.phone} onChange={this.handleChanges} placeholder="Your Phone Number" />
                            {submitted && !profile.phone &&
                              <div className="validation">Please enter a valid phone</div>
                            }
                          </div>
                        </div>
                        <div className="col-md-12 mb-3">
                          <div className="form-group">
                            <input type="text" className="form-control form-control-lg form-control-a " name="mobileno" value={profile.mobileno} onChange={this.handleChanges} placeholder="Your Mobile Number" />
                            {submitted && !profile.mobileno &&
                              <div className="validation">Please enter a valid phone</div>
                            }
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="form-group">
                            <input type="text" className="form-control form-control-lg form-control-a " name="city" value={profile.city} onChange={this.handleChanges} placeholder="City" />
                            {submitted && !profile.city &&
                              <div className="validation">Please enter your City</div>
                            }
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="form-group">
                            <select name="state" value={profile.state}  className="form-control form-control-lg form-control-a" onChange={this.handleChanges}>
                              <option>Select State</option>
                              {
                                globalData.USstates.map((st) => (
                                  <option key={st} >{st}</option>
                                ))
                              }
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="form-group">
                            <input type="text" className="form-control form-control-lg form-control-a " name="zipcode" value={profile.zipcode} onChange={this.handleChanges} placeholder="Zip Code" />
                            {submitted && !profile.zipcode &&
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
                          <input type="submit" value="Save" className="btn btn-a" />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-6 padding-lt">

                    <h4 className="mb-4">Auto Populate Your Agent Details</h4>
                    <p className="mb-4">The information below will auto populate in the 'Fill in the Blank' Style Templates (optional)</p>
                    <form onSubmit={this.handleSubmit} className="form-a contactForm">

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <div className="form-group">
                            <label className="check">Use Agent Photo
                          <input type="checkbox" />
                              <span className="checkmark"></span>
                            </label>
                            <a href="javascript:void(0)" className="pb-2 pr-2 pl-0" data-toggle="modal" data-id="profileimg" data-target="#profileimg" onClick={modalproimageOpen}>
                              <img src={profilepc} alt="Image" className="profile-img img-fluid" />
                            </a>
                            <br></br>
                            <span>
                              <a href="javascript:void(0)" className="pb-2 pr-2 pl-0" data-toggle="modal" data-id="profileimg" data-target="#profileimg" onClick={modalproimageOpen}>Upload Agent Photo</a>
                            </span>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="form-group">
                            <label className="check">Use Logo
                          <input type="checkbox" />
                              <span className="checkmark"></span>
                            </label>
                            <a href="javascript:void(0)" className="pb-2 pr-2 pl-0" data-toggle="modal" data-id="logoimg" data-target="#logoimg" onClick={modallogoimageOpen}>
                              <img src={profilelogo} alt="Image" className="profile-img img-fluid" />
                            </a>
                            <br></br>
                            <span>
                              <a href="javascript:void(0)" className="pb-2 pr-2 pl-0" data-toggle="modal" data-id="logoimg" data-target="#logoimg" onClick={modallogoimageOpen}>Upload Agent Logo</a>
                            </span>
                          </div>
                        </div>
                        <div className="col-md-12 mb-3">
                          <div className={'form-group' + (submittedagent && agentData && !agentData.name ? ' has-error' : '')}>
                            <input type="text" className="form-control form-control-lg form-control-a" name="name" value={agentData && agentData.name} onChange={this.handleChange} placeholder="User Name" />
                            {submittedagent && agentData && !agentData.name &&
                              <div className="validation">User Name is required</div>
                            }
                          </div>
                        </div>
                        <div className="col-md-12 mb-3">
                          <div className={'form-group' + (submittedagent && agentData && !agentData.designation ? ' has-error' : '')}>

                            <input type="text" className="form-control form-control-lg form-control-a " name="designation" value={agentData && agentData.designation} onChange={this.handleChange} placeholder="Designation" />
                            {submittedagent && agentData && !agentData.designation &&
                              <div className="validation">Please enter name</div>
                            }
                          </div>
                        </div>
                        <div className="col-md-12 mb-3">
                          <div className={'form-group' + (submittedagent && agentData && !agentData.email ? ' has-error' : '')}>

                            <input type="text" className="form-control form-control-lg form-control-a " name="email" value={agentData && agentData.email} onChange={this.handleChange} placeholder="Email" />
                            {submittedagent && agentData && !agentData.email &&
                              <div className="validation">Please enter email</div>
                            }
                          </div>
                        </div>
                        <div className="col-md-12 mb-3">
                          <div className={'form-group' + (submittedagent && agentData && !agentData.website_url ? ' has-error' : '')}>

                            <input type="text" className="form-control form-control-lg form-control-a " name="website_url" value={agentData && agentData.website_url} onChange={this.handleChange} placeholder="Website URL" />
                            {submittedagent && agentData && !agentData.website_url &&
                              <div className="validation">Please enter website URL</div>
                            }
                          </div>
                        </div>
                        <div className="col-md-12 mb-3">
                          <div className={'form-group' + (submittedagent && agentData && !agentData.phone_number ? ' has-error' : '')}>

                            <input type="text" className="form-control form-control-lg form-control-a " name="phone_number" value={agentData && agentData.phone_number} onChange={this.handleChange} placeholder="Phone Number" />
                            {submittedagent && agentData && !agentData.phone_number &&
                              <div className="validation">Please enter phone number</div>
                            }
                          </div>
                        </div>
                        <div className="col-md-12 mb-3">
                          <div className={'form-group' + (submittedagent && agentData && !agentData.company_details ? ' has-error' : '')}>

                            <textarea type="text" className="form-control" cols="45" rows="8" name="company_details" value={agentData && agentData.company_details} onChange={this.handleChange} placeholder="Company Details"></textarea>
                            {submittedagent && agentData && !agentData.company_details &&
                              <div className="validation">Please write Company details</div>
                            }
                          </div>
                        </div>
                        <div className="col-md-12 mb-3">
                          <div className={'form-group' + (submittedagent && agentData && !agentData.other_information ? ' has-error' : '')}>

                            <textarea type="text" className="form-control" cols="45" rows="8" name="other_information" value={agentData && agentData.other_information} onChange={this.handleChange} placeholder="Other Information"></textarea>
                            {submittedagent && agentData && !agentData.other_information &&
                              <div className="validation">Please write other information if any</div>
                            }
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <input type="submit" value="Save" className="btn btn-a" />
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
  const { authentication, users } = state;
  const { user } = authentication;
  const { profile } = users;
  const { agentData } = users;
  const { alert } = state;

  console.log("profile======", agentData);
  return {
    user,
    alert,
    profile,
    agentData
  };
}


const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };
