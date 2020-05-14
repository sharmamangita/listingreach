import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(userActions.logout());
        this.alermsg = '';
        this.state = {
            email: '',
            password: '',
            submitted: false
            
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      
    }

    componentDidMount(){
         var myMainSite = window.location.href;
        var splitUrl = myMainSite.split('ref=');
        if(splitUrl[1]){
          localStorage.setItem('invitetoken', JSON.stringify(splitUrl[1]));
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        const { dispatch } = this.props;

        if (email && password) {
            dispatch(userActions.login(email, password));
            window.scrollTo(0,0);
        }
    }
    
    render() {

        const { loggingIn } = this.props;
        const registerStyle = {};
        registerStyle.width =  "245px" ;
        const { email, password, submitted } = this.state;

        const { alert } = this.props;
        if(alert && alert.message){
        	this.alermsg = alert;
        }
        return (
            <div>
            <section className="intro-single">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-8">
                            <div className="title-single-box">
                                <h1 className="title-single">Login</h1> 
                                <span className="color-text-a"> Agents Brokers can login your account.</span>   
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                            <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
                                <ol className="breadcrumb">
                                  <li className="breadcrumb-item">
                                    <a href="index.html">Home</a>
                                  </li>
                                  <li className="breadcrumb-item active" aria-current="page">
                                    Login
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
                      <form className="form-a contactForm"  onSubmit={this.handleSubmit}>
                        <div id="sendmessage">Your message has been sent. Thank you!</div>
                        <div id="errormessage">
                        {this.alermsg.message &&
                        <div className={`alert ${this.alermsg.type}`}>{this.alermsg.message}</div>
                        }</div>
                        <div className="row">
                            
                          <div className="col-md-12 mb-3">
                            <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                              <input type="text" className="form-control form-control-lg form-control-a" name="email" value={email} onChange={this.handleChange} placeholder="Email Address"/>
                                {submitted && !email &&
                                    <div className="help-block red">Email is required</div>
                                }
                            </div>
                          </div>
                          
                          <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <input type="password" className="form-control form-control-lg form-control-a" name="password" value={password} onChange={this.handleChange} placeholder="Password"/>
                                {submitted && !password &&
                                    <div className="help-block red">Password is required</div>
                                }
                            </div>
                          </div>
                         
                          <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <label className="check">Keep me signed in
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                </label>       
                            </div>
                          </div>
                          <div className="col-md-12">
                            <button type="submit" className="btn btn-a  mb-3">Login</button>
                            <br></br>
                           <Link to="/forgotpassword">Forgot Password?</Link>
                          </div>
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
    console.log("state====",this.state);
    const { loggingIn,user } = state.authentication;
    const { alert } = state;
    
    return {
        loggingIn,
        alert,
        user
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 
