import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import { Alert } from 'reactstrap';

class ForgotPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.alermsg = '';
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
						<h1 className="title-single">Forgot Password?</h1> 
			             <span className="color-text-a">To reset your password, please enter your email address or username below.</span>	
					  </div>
					</div>
					<div className="col-md-12 col-lg-4">
					  <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
						<ol className="breadcrumb">
						  <li className="breadcrumb-item">
							<Link to="HomePage">Home</Link>
						  </li>
						  <li className="breadcrumb-item active" aria-current="page">
							Forgot Password
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
					  <form className="form-a contactForm" onSubmit={this.handleSubmit}>
						{this.alermsg.message &&
                        <div id="sendmessage"><div className="{`alert ${this.alermsg.type}`}">{this.alermsg.message}</div>
                        </div>}
						<div className="row">
							
						  <div className="col-md-12 mb-3">
							<div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
							  <input name="email" type="email" className="form-control form-control-lg form-control-a" placeholder="Enter Your Username or Email" data-rule="email" data-msg="Please enter a valid email"  value={email} onChange={this.handleChange} />
							  {submitted && !email &&
								<div className="help-block red">Email is required</div>
							  }
							</div>
						  </div>
						  <div className="col-md-12">
							<button type="submit" className="btn btn-a  mb-3">Reset Password</button>				
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
    const { loggingIn } = state.authentication;
    const { alert } = state;
    return {
        loggingIn,
        alert
    };
}

const connectedLoginPage = connect(mapStateToProps)(ForgotPasswordPage);
export { connectedLoginPage as ForgotPasswordPage }; 
