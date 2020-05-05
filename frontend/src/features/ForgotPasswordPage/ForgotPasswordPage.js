import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import { Alert } from 'reactstrap';

class ForgotPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(userActions.logout());
        this.state = {
            email: '',
            submitted: false,
            visible:false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closebtn = this.closebtn.bind(this);
    }

   handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {ForgotPasswordPage
        e.preventDefault();
        this.setState({ submitted: true });
        const { email } = this.state;
        const { dispatch } = this.props;
        if (email ) {
            dispatch(userActions.forgotpassword(email));
			this.setState({visible:true},()=>{
				window.setTimeout(()=>{
				this.setState({visible:false})
				},2000)
			});
        }
    }
    
     closebtn(){
	 this.setState({visible:false})
	}
    
    render() {
        const { loggingIn  } = this.props;
        const { email, submitted } = this.state;
        const { alert } = this.props;
        return (
            <div className="site-section bg-light">
                <div className="container">
               { alert.message &&
                  <Alert className={`alert ${alert.type}`} isOpen={this.state.visible} > <button type="button" onClick={this.closebtn} className="close">
						<span aria-hidden="true">&times;</span>
							</button>{alert.message}</Alert>
                     }
                    <div className="text-center mb-5 section-heading">
                      <h2>Forgot Password?</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-lg-2">
                        </div>
                        <div className="col-md-12 col-lg-8 mb-5">
                            <form onSubmit={this.handleSubmit} className="p-5 bg-white">
                                <div className="row form-group">
                                <div className="col-md-12 mb-3 mb-md-0">
                                    <label className="font-weight-bold" htmlFor="fullname">Enter your email to reset your password.</label>
                                    <div className={'col-md-12 mb-3 mb-md-0' + (submitted && !email ? ' has-error' : '')}>
                                        <input type="text" className="form-control mb-3" name="email" value={email} onChange={this.handleChange} placeholder="Email Address"/>
                                        {submitted && !email &&
                                            <div className="help-block red">Email is required</div>
                                        }
                                        
                                    </div>

                                </div>
                              </div>  
                              <div className="row form-group">
                                <div className="col-md-4">
                                  <input type="submit" value="Submit" className="btn btn-primary pill px-4 py-2" />
                                </div>
                                <div className="col-md-8 text-right">
                                  <span className="font-13"><Link to="login">Back to Login</Link></span>
                                </div>
                              </div>             
                            </form>
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
    const { loggingIn } = state.authentication;
    const { alert } = state;
    return {
        loggingIn,
        alert
    };
}

const connectedLoginPage = connect(mapStateToProps)(ForgotPasswordPage);
export { connectedLoginPage as ForgotPasswordPage }; 
