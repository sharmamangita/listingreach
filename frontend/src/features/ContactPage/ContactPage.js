import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../actions';
import { Alert } from 'reactstrap';
class ContactPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
			fullname:'',
			email:'',
			phone:'',
			message: '',
          submitted: false,
          visible:false
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.closebtn = this.closebtn.bind(this);
      window.scrollTo(0,0);
    }

   handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    
  
  closebtn(){
	 this.setState({visible:false})
	} 
  handleSubmit(e) { 
    e.preventDefault();
    this.setState({ submitted: true });  
    const {fullname,email,phone,message} = this.state;
    const { dispatch } = this.props;
    if(fullname && email && phone && message){
      dispatch(userActions.contactForm(fullname,email,phone,message)); 
      window.scrollTo(0,0);
      this.setState({
        fullname:"",
        email:"",
        phone:"",
        message:"",
        submitted:false 
      });
      this.setState({visible:true},()=>{
        window.setTimeout(()=>{
          this.setState({visible:false})
        },5000)
      }); 
    }    
  }

  render() {
  const { loggingIn  } = this.props;
  const { fullname,email,phone,message,submitted} = this.state;
  const { alert } = this.props;
  return (
  <div className="site-section bg-light">
    <div className="container">
      <div className="text-center mb-5 section-heading">
        <h2>Contact Us</h2>
      </div>
      <div className="row">
        <div className="col-md-12 col-lg-8 mb-5">
          { alert.message &&
          <Alert className={`alert ${alert.type}`} isOpen={this.state.visible} > <button type="button" onClick={this.closebtn} className="close" >
          <span aria-hidden="true">&times;</span>
          </button>{alert.message}</Alert>
          }
          <form className="p-5 bg-white" id="contactform" onSubmit={this.handleSubmit} ref="form" >
            <div className="row form-group"> 
              <div className="col-md-12 mb-3 mb-md-0">
                <label className="font-weight-bold" htmlFor="fullname">Full Name</label>
                <input type="text" id="fullname" className="form-control" name ="fullname" ref='firstName' placeholder="Full Name" value={fullname} onChange={this.handleChange} />
                {submitted && !fullname &&
                <div className="help-block red">Fullname is required</div>
                }
              </div>
            </div>
            <div className="row form-group">
              <div className="col-md-12">
                <label className="font-weight-bold" htmlFor="email">Email</label>
                <input type="email" id="email" className="form-control" name="email" placeholder="Email Address" value={email} onChange={this.handleChange}  />
                {submitted && !email &&
                <div className="help-block red">Email is required</div>
                }
              </div>
            </div>
            <div className="row form-group">
              <div className="col-md-12 mb-3 mb-md-0">
                <label className="font-weight-bold" htmlFor="phone">Phone</label>
                <input type="text" id="phone" className="form-control" name="phone" placeholder="Phone #" value={phone} onChange={this.handleChange}  />
                  {submitted && !phone &&
                  <div className="help-block red">Phone is required</div>
                  }
              </div>
            </div>
            <div className="row form-group">
              <div className="col-md-12">
                <label className="font-weight-bold" htmlFor="message">Message</label> 
                <textarea name="message" id="message" cols="30" rows="5" name="message" className="form-control" placeholder="Say hello to us" value={message} onChange={this.handleChange} ></textarea>
                  {submitted && !message &&
                  <div className="help-block red">Message is required</div>
                }
              </div>
            </div>
           <div className="row form-group">
              <div className="col-md-12">
                <input type="submit" value="Send Message" className="btn btn-primary pill px-4 py-2" />
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-4">
          <div className="p-4 mb-3 bg-white">
            <h3 className="h5 text-black mb-3">Contact Info</h3>
            <p className="mb-0 font-weight-bold">Address</p>
            <p className="mb-4">203 Fake St. Mountain View, San Francisco, California, USA</p>
            <p className="mb-0 font-weight-bold">Phone</p>
            <p className="mb-4"><Link to="tel:+1 232 3235 324<">+1 232 3235 324</Link></p>
            <p className="mb-0 font-weight-bold">Email Address</p>
            <p className="mb-0"><Link to="mailto:youremail@domain.com">youremail@domain.com</Link></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
  }
}
function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    const { alert } = state;
    return {
        loggingIn,
        alert
    };
}
const connectedContactPage = connect(mapStateToProps)(ContactPage);
export { connectedContactPage as ContactPage }; 
