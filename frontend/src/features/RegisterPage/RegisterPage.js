import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Select from 'react-select'
import config from 'config';
import { Alert } from 'reactstrap';
import { userActions } from '../../actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                userName:'',
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmpassword:'',
                phoneno:'',
                country:''
                
            },
            submitted: false,
            isChecked: false,
            agreemsg:'',
            visible:false
        };


          
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.closebtn = this.closebtn.bind(this);
    }


   handleCheck() {
        this.setState({
            isChecked: !this.state.isChecked,
        });

        if(this.state.isChecked==true){
            this.setState({agreemsg:'Please checked terms and conditions'});
        } else {
            this.setState({agreemsg:''});
        }
    }
  
    componentDidMount(){
    let user  = JSON.parse(localStorage.getItem('user'));
        if(user && user.userId){
            this.props.dispatch(userActions.logout());
            window.location.reload();
        }

	    var myMainSite = window.location.href;
        var splitUrl = myMainSite.split('ref=');
        if(splitUrl[1]){
            var senddata =  {'token':splitUrl[1]};
            var gettokenurl = config.apiUrl+"/users/getinvitationKey";
            fetch(gettokenurl,{
                body: JSON.stringify(senddata),
                cache: 'no-cache', 
                headers: {
                'content-type': 'application/json'
                },
                method: 'POST'
            })
            .then(response => response.json()).then((json) => {
                console.log("url data get token",json.email);
                localStorage.setItem('invitetoken', JSON.stringify(splitUrl[1]));
                this.setState({ user: Object.assign({email : json.email }) });
            })
        }
	}
    handleChange(event) {
        const { name, value } = event.target;
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

    handleSubmit(event) {
    	event.preventDefault();

    	this.setState({ submitted: true });
        if (this.state.user.confirmpassword && this.state.user.confirmpassword == this.state.user.password) {
            this.setState((prevState, props) => {
              return { 
                showerror: true 
              }
            })
        }
    	if(this.state.isChecked==false){
	       this.setState({agreemsg:'Please checked terms and conditions'});
		} else {
            const { user } = this.state;
            const { dispatch } = this.props;
            user.status = "verified";
            if (user.firstName && user.lastName && user.email) {
               dispatch(userActions.register({user: user}));
                window.scrollTo(0,0);
                this.setState({visible:true},()=>{
                    window.setTimeout(()=>{
                        this.setState({visible:false})
                    },2000)
      	        });
            } else  {
			  this.setState({agree:false});
			}
		}	
    }
    
    
    render() {
        var msg;
        if(this.state.checked==true) {
             msg = this.state.agreemsg;
        } else {
            msg = this.state.agreemsg;
        }
        var  notmatached='';
        if(this.state.showerror==false){
         notmatached = (<div className="help-block red">Password not matcehed</div>);
        } 
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        const registerStyle = {};
        registerStyle.width =  "245px" ;
    	const { alert } = this.props;
        return (
            <div className="site-section bg-light">
             <div className="container">
                { alert.message &&
                   <Alert className={`alert ${alert.type}`} isOpen={this.state.visible} > <button type="button" onClick={this.closebtn} className="close">
					<span aria-hidden="true">&times;</span>
					</button>{alert.message}</Alert>
             	}
			    <section className="intro-single">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12 col-lg-8">
                      <div className="title-single-box">
                        <h1 className="title-single">Registration</h1> 
                          <span className="color-text-a">Agents/ Brokers, have to register first, its free!</span>  
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-4">
                      <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
                        <ol className="breadcrumb">
                          <li className="breadcrumb-item">
                            <a href="index.html">Home</a>
                          </li>
                          <li className="breadcrumb-item active" aria-current="page">
                            Register
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
                                    <form onSubmit={this.handleSubmit} className="form-a contactForm">
                                    
                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <div className="form-group">
                                              <input type="text" name="name" className="form-control form-control-lg form-control-a" placeholder="Your Username" data-rule="minlen:4" data-msg="Please enter unique username" />
                                              <div className="validation"></div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                                            <input type="text" className="form-control form-control-lg form-control-a" name="firstName" value={user.firstName} onChange={this.handleChange}  placeholder="First Name"/>
                                            {submitted && !user.firstName &&
                                                <div className="help-block red">First Name is required</div>
                                            }
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <div className={'form-group mb-3' + (submitted && !user.lastName ? ' has-error' : '')}>
                                            <input type="text" className="form-control form-control-lg form-control-a" name="lastName" value={user.lastName} onChange={this.handleChange}  placeholder="Last Name"/>
                                            {submitted && !user.lastName &&
                                                <div className="help-block red">Last Name is required</div>
                                            }
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className={'form-group mb-3' + (submitted && !user.email ? ' has-error' : '')}>
                                            <input type="email" className="form-control form-control-lg form-control-a" name="email"  value={user.email} onChange={this.handleChange} placeholder="Email"/>
                                            {submitted && !user.email &&
                                                <div className="help-block red">Email is required</div>
                                            }
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className={'form-group mb-3' + (submitted && !user.phoneno ? ' has-error' : '')}>
                                            <input type="text" className="form-control form-control-lg form-control-a" name="phoneno"  value={user.phoneno} onChange={this.handleChange} placeholder="Your Phone Number"/>
                                            {submitted && !user.phoneno &&
                                                <div className="help-block red">Phone Number is required</div>
                                            }
                                            </div>
                                        </div> 
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <div className="form-group">              
                                                    <select className="form-control form-control-lg form-control-a" id="city">
                                                        <option>Select Country</option>                
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                              <input type="password" name="password" className="form-control form-control-lg form-control-a" placeholder="Password" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                                              <div className="validation"></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            
                                            <div className={'form-group mb-3' + (submitted && !user.confirmpassword ? ' has-error' : '')}>
                                            <input type="password" className="form-control form-control-lg form-control-a" name="confirmpassword" minLength={6}  value={user.confirmpassword} onChange={this.handleChange} placeholder="Confirm Password"/>
                                            {submitted && !user.confirmpassword &&
                                                <div className="help-block red">Phone Number is required</div>
                                            }
                                            {notmatached}
                                            </div>
                                        </div> 
                                        
                                        <div className="col-md-12">
                                            <button type="submit" className="btn btn-a">Register</button>
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
		    </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
  	const { alert } = state;
    return {
        registering,
        alert
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
