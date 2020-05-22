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
	//console.log('stateeeeeee',this.state);return false;
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
  <div>
   <section className="intro-single">
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-lg-8">
          <div className="title-single-box">
            <h1 className="title-single">Contact US</h1> 
			<span className="color-text-a">Customer Service and Technical Support (Monday-Friday 9:00am - 5:00pm EST)</span>	
          </div>
        </div>
        <div className="col-md-12 col-lg-4">
          <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Contact
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </section>
    <section className="contact">
    <div className="container">
      <div className="row">       
        <div className="col-sm-12 section-t2">
          <div className="row">
            <div className="col-md-7">
              <form className="form-a contactForm" id="contactform" onSubmit={this.handleSubmit} ref="form">
                { alert.message &&
				  <Alert className={`alert ${alert.type}`} isOpen={this.state.visible} > <button type="button" onClick={this.closebtn} className="close" >
				  <span aria-hidden="true">&times;</span>
				  </button>{alert.message}</Alert>
				}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <input type="text" id="fullname" name="fullname" className="form-control form-control-lg form-control-a" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" value={fullname} onChange={this.handleChange} />
                      {submitted && !fullname &&
					  <div className="help-block red">Fullname is required</div>
					  }
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <input id="phone" name="phone" type="phone" className="form-control form-control-lg form-control-a" placeholder="Your Phone Number" data-rule="phone" data-msg="Please enter a valid phone" value={phone} onChange={this.handleChange} />
                      {submitted && !phone &&
					  <div className="help-block red">Phone is required</div>
					  }
                    </div>
                  </div>
				  <div className="col-md-12 mb-3">
                    <div className="form-group">
                      <input id="email" name="email" type="email" className="form-control form-control-lg form-control-a" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" value={email} onChange={this.handleChange} />
                      {submitted && !email &&
					  <div className="help-block red">Email is required</div>
					  }
                    </div>
                  </div>
                  {/*<div className="col-md-12 mb-3">
                    <div className="form-group">
                      <input type="url" name="subject" className="form-control form-control-lg form-control-a" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject"/>
                      <div className="help-block red"></div>
                    </div>
                  </div>*/}
                  <div className="col-md-12 mb-3">
                    <div className="form-group">
                      <textarea id="message" name="message" className="form-control" name="message" cols="45" rows="8" data-rule="required" data-msg="Please write something for us" placeholder="Message" value={message} onChange={this.handleChange} ></textarea>
                        {submitted && !message &&
						  <div className="help-block red">Message is required</div>
						}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <button type="submit" value="Send Message" className="btn btn-a">Send Message</button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-5 section-md-t3"> 
              <div className="icon-box">
                <div className="icon-box-icon">
                  <span className="ion-ios-redo"></span>
                </div>
                <div className="icon-box-content table-cell">
                  <div className="icon-box-title">
                    <h5 className="icon-title" style={{fontWeight:"550"}}>Have you seen our <a>FAQ page?</a></h5>
                  </div>                  
                </div>
              </div>
			   <div className="icon-box">
                <div className="icon-box-icon">
                  <span className="ion-ios-redo"></span>
                </div>
                <div className="icon-box-content table-cell">
                  <div className="icon-box-title">
                    <h5 className="icon-title" style={{fontWeight:"550"}}>Have you seen our <a>Tutorial videos?</a></h5>
                  </div>                  
                </div>
              </div>
			   <div className="icon-box">
                <div className="icon-box-icon">
                  <span className="ion-ios-redo"></span>
                </div>
                <div className="icon-box-content table-cell">
                  <div className="icon-box-title">
                    <h5 className="icon-title" style={{fontWeight:"550"}}>Do you need <a>Pricing?</a></h5>
                  </div>                  
                </div>
              </div>
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
    const { loggingIn } = state.authentication;
    const { alert } = state;
    return {
        loggingIn,
        alert
    };
}
const connectedContactPage = connect(mapStateToProps)(ContactPage);
export { connectedContactPage as ContactPage }; 
