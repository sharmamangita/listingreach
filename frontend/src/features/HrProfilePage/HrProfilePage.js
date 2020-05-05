import React from 'react';
import config from 'config';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../actions';
/*import {Modal,Button} from 'react-bootstrap';*/
import ProfileModal from '../../components/ProfileModal';
import EducationModal from '../../components/EducationModal';
import ProfesionalModal from '../../components/ProfesionalModal';
import ImprovementsModal from '../../components/ImprovementsModal';
import ProfileimageModal from '../../components/ProfileimageModal';
import ProfilecoverModal from '../../components/ProfilecoverModal';
import StrengthsModal from '../../components/StrengthsModal';
import KeywordskillModal from '../../components/KeywordskillModal'
import ReadMoreAndLess from 'react-read-more-less';
import moment from "moment";
import queryString from 'query-string'
import { Alert } from 'reactstrap';
class HrProfilePage extends React.Component {

  constructor(props) {
    super(props);
    var user  = JSON.parse(localStorage.getItem('user'));
     console.log("user====",user);
    this.state = {
      submitted: false,
      user:  Object.assign({
        firstName: '',
        lastName: '',
        email: '',
        companyName:'',
        
        alert:false,
      },user),
    }     
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closebtn = this.closebtn.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    const { user } = this.state;
    this.setState({
      user: {
          ...user,
          [name]: value
      }
    });  
  }

  closebtn(){
   this.setState({visible:false})
  } 
   

  handleSubmit(e) { 
      e.preventDefault();
      const {user} = this.state;
      if(user.firstName && user.lastName && user.email && user.companyName){
        const { dispatch } = this.props;
        dispatch(userActions.updateHr(user)); 
        window.scrollTo(0,0);
      }  else { this.setState({ submitted: true});  }  

  } 
    

   render() {
      const {user,submitted} = this.state;
      const { alert } = this.props;
      console.log("this....",this.state.user);
      
      return ( 
        <div className="site-section bg-light">
          <div className="container">
              <div className="text-center mb-5 section-heading">
                  <h2>My Profile</h2>
                    { alert.message &&
                    <Alert className={`alert ${alert.type}`} isOpen={this.state.visible} > <button type="button" onClick={this.closebtn} className="close">
                      <span aria-hidden="true">&times;</span>
                      </button>{alert.message}</Alert>
                     }
                  </div>
              <div className="row">
                  <div className="col-md-12 col-lg-3">
                  </div>
                  <div className="col-md-12 col-lg-6 mb-5">
                      <form onSubmit={this.handleSubmit} className="p-5 bg-white">
                          <div className="row form-group">
                              <div className="col-md-12 mb-3 mb-md-0">
                                  <label className="font-weight-bold" htmlFor="firstName">You can update your profile details:</label>
                                    <div className={'form-group mb-3' + (submitted && (!user.firstName) ? ' has-error' : '')}>
                                      <input type="text" className="form-control " name="firstName" value={user.firstName} onChange={this.handleChange}  placeholder="First Name"/>
                                      {submitted && (!user.firstName) &&
                                          <div className="help-block red">First Name is required</div>
                                      }
                                    </div>
                                    <div className={'form-group mb-3' + (submitted && (!user.lastName) ? ' has-error' : '')}>
                                      <input type="text" className="form-control " name="lastName" value={user.lastName} onChange={this.handleChange}  placeholder="Last Name"/>
                                      {submitted && (!user.lastName) &&
                                          <div className="help-block red">Last Name is required</div>
                                      }
                                    </div>
                                    <input type="text" className="form-control mb-3" name="companyName" value={user.companyName} onChange={this.handleChange}  placeholder="Company Name"/>
                                    {submitted && !user.companyName &&
                                        <div className="help-block red">Company Name is required</div>
                                    }
                                    <input type="text" className="form-control mb-3" readOnly="readOnly" name="email" value={user.email} onChange={this.handleChange}  placeholder="Email Address"/>
                                    {submitted && !user.email &&
                                        <div className="help-block red">Email address is required</div>
                                    }
                              </div>
                          </div>
                          <div className="row form-group">
                              <div className="col-md-4">
                                  <input type="submit" value="Update" className="btn btn-primary pill px-4 py-2" />
                              </div>
                          </div>
                      </form>
                  </div>
                  <div className="col-md-12 col-lg-3">
                  </div>
              </div>
          </div>
      </div>
    );
    }
}

function mapStateToProps(state) {
  const { authentication, users} = state;
  const { user } = authentication;
  const { alert } = state;
    
  return {
    user,
    alert
    
  };
}


const connectedHrProfilePage = connect(mapStateToProps)(HrProfilePage);
export { connectedHrProfilePage as HrProfilePage };
