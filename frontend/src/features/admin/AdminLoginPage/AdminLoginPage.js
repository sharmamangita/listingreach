import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../../actions';

class AdminLoginPage extends React.Component {
    constructor(props) {
        super(props);
        // reset login status
        this.props.dispatch(userActions.logout());
        this.state = {
            email: '',
            password: '',
            submitted: false
            
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.responseLinkedin = this.responseLinkedin.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        console.log("dispatch111====",dispatch);
        const { dispatch } = this.props;

        if (email && password) {
            dispatch(userActions.login(email, password));
        }
    }
    responseLinkedin(response) {
        var thisobj=this;
        OAuth.initialize('HwAr2OtSxRgEEnO2-JnYjsuA3tc');
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
        var logofont  = {
        'fontSize': '30px'
        }
        var logowidth  = {
        'width': '60px'
        }
        
        const { email, password, submitted } = this.state;
        const { alert } = this.props;
        return(
            <div className="container-fluid admin-login" id="wrapper">
                <div className="row mt-5 text-center">
                <div className="col-12 mb-5">
                    <span className="mb-0 site-logo" style={logofont}><img src="http://66.235.194.119/employeemirror/images/logo1-free-img-1.png" alt="" className="img-fluid mr-1"  style={logowidth} />Employee<strong className="font-weight-bold">MIRROR</strong></span>
                </div>
                </div>
                <div className="clear"></div>
                <section className="row">
                <div className="col-lg-3 col-md-12">
                
                </div>
                <div className="col-lg-6 col-md-12">
                    <div className="card mb-4">
                        <div className="card-block">

                            <form className="form" onSubmit={this.handleSubmit}>
                                <h4 className="text-center ">Admin Login</h4>
                                                                        {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                                <div className="form-group row mt-4">
                           
                                    <div className="col-md-12">
                                     <input type="text" className="form-control " name="email" value={email} onChange={this.handleChange} placeholder="Email Address"/>
                                        {submitted && !email &&
                                            <div className="help-block red">Email is required</div>
                                        }
                                    </div>
                                </div>
                                <div className="form-group row">
                                  
                                    <div className="col-md-12">
                                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} placeholder="Password"/>
                                        {submitted && !password &&
                                            <div className="help-block red">Password is required</div>
                                        }
                                     </div>
                                </div>

                                <div className="sign-btn text-center">
                                    <button className="btn btn-success">Login</button>
                                </div>
                            </form>
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

const connectedAdminLoginPage = connect(mapStateToProps)(AdminLoginPage);
export { connectedAdminLoginPage as AdminLoginPage }; 
