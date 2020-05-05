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
        this.responseLinkedin = this.responseLinkedin.bind(this);
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
    responseLinkedin(response) {
        var thisobj=this;
        OAuth.initialize('cBzDnFqPnj0K7v6yq4tHf2T1zNA');
        OAuth.popup('linkedin2').then(linkedin => {
        const {password } = this.state;
        linkedin.me().then(data => {
            thisobj.setState({ submitted: true });
            const { dispatch } = thisobj.props;
             if (data.email && data.id ) {
               dispatch(userActions.login(data.email, data.id));
            }
        })
        });
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
            <div className="site-section bg-light">
            <div className="container">
                   {this.alermsg.message &&
            <div className={`alert ${this.alermsg.type}`}>{this.alermsg.message}</div>
            }
            <div className="text-center mb-5 section-heading">
                    <h2>Login</h2>
            </div>
            <div className="row">
                <div className="col-md-12 col-lg-2">
                </div>
                <div className="col-md-12 col-lg-4 mb-5">
                    <form  className="p-5 bg-white" onSubmit={this.handleSubmit}>
                        <div className="row form-group">
                            <label className="font-weight-bold" htmlFor="fullname">Enter Username & Password</label>
                            <div className={'col-md-12 mb-3 mb-md-0' + (submitted && !email ? ' has-error' : '')}>
                                <input type="text" className="form-control mb-3" name="email" value={email} onChange={this.handleChange} placeholder="Email Address"/>
                                {submitted && !email &&
                                    <div className="help-block red">Email is required</div>
                                }
                                 <input type="password" className="form-control mb-3" name="password" value={password} onChange={this.handleChange} placeholder="Password"/>
                                {submitted && !password &&
                                    <div className="help-block red">Password is required</div>
                                }
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-md-4">
                                <input type="submit" value="Login" className="btn btn-primary pill px-4 py-2" />
                            </div>
                            <div className="col-md-8 text-right">
                                <span className="font-13"><Link to="/forgotpassword"> Forgot Your Password?</Link></span>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-md-12">
                                <span>Don't have an account yet?<br></br> <Link to="/register">Sign Up</Link></span>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-lg-4">
                    <div className="p-4 mb-3 bg-white">
                        <h3 className="h5 text-black mb-3">OR</h3>
                        <p className="mb-0 font-weight-bold">Use your existing online profile</p>
                        <a id="linkedin-button"  onClick={this.responseLinkedin.bind(this)}>
                        <img src="/public/assets/images/Linkedin-customized-button.png" alt="" className="img-fluid"  style={registerStyle} />
                        </a>
                    </div>
                </div>
                <div className="col-md-12 col-lg-2">
                </div>
            </div>
            </div>
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
