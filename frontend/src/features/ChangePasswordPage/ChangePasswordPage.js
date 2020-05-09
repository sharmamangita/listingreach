import React from 'react';
import config from 'config';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../actions';
import { authHeader } from '../../helpers';
import { Alert } from 'reactstrap';
class ChangePasswordPage extends React.Component {
    constructor(props) {
        super(props);
        console.log("dsfafasf");
        var user  = JSON.parse(localStorage.getItem('user'));
        this.state = {
			  showerror:true,
			  user:user,
            currentpassword: '',
            newpassword:'',
            confirmpassword:'',
            submitted: false,
            visible : false,
            passnewstr:false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onShowAlert = this.onShowAlert.bind(this);
        this.closebtn = this.closebtn.bind(this);
    }

   handleChange(e) {
        const { name, value } = e.target;
		this.setState({ [name]: value });
		var passw = /^(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,20}$/;
		if(name=='newpassword'){ 
		if(value.match(passw)) 
		{ this.setState({ [name]: value,passnewstr: false });
			} else { this.setState({ passnewstr: true}); } 
		}	
    }
    
    
  toggleError(){
    this.setState((prevState, props) => {
      return { showerror: true }
    })
  };
  closebtn(){
   this.setState({visible:false})
  }
 onShowAlert(){
		this.setState({visible:true},()=>{
		window.setTimeout(()=>{
		this.setState({visible:false})
	    },2000)
	  });
  }
  handleSubmit(e) {
    ChangePasswordPage
    e.preventDefault();
    this.setState({ submitted: true });  
    const {newpassword,confirmpassword,currentpassword,user} = this.state;
    const { dispatch } = this.props;
    if (confirmpassword && confirmpassword == newpassword) {
      this.setState((prevState, props) => {
      return { 
        showerror: true 
      }
    })
    dispatch(userActions.updatepassword(user,currentpassword,confirmpassword));
    this.setState({
      newpassword:"",
      confirmpassword:"",
      currentpassword:"",
      submitted:false 
    }); 
    this.setState({visible:true},()=>{
      window.setTimeout(()=>{
      this.setState({visible:false})
      },5000)
    });
    } else { 
      this.setState((prevState, props) => {
      return { showerror: false }
      })
      this.setState({visible:true},()=>{
        window.setTimeout(()=>{
          this.setState({visible:false})
        },5000)
      });
    }
  }

  render() {
    const { loggingIn  } = this.props;
    const { passnewstr, currentpassword,newpassword,confirmpassword, submitted,showerror } = this.state;
    const { alert } = this.props;
    var  notmatached='';
    if(this.state.showerror==false){
	    notmatached = (<div className="help-block red">Password not matcehed</div>);
	  } 

    return (
      <div className="site-section bg-light">
        <div className="container">
          <div className="text-center mb-5 section-heading">
            <h2>Change Password</h2>
            { alert.message &&
          	<Alert className={`alert ${alert.type}`} isOpen={this.state.visible} > <button type="button" onClick={this.closebtn} className="close" >
				    <span aria-hidden="true">&times;</span>
				    </button>{alert.message}</Alert>
             }
          </div>
          <div className="row">
              <div className="col-md-12 col-lg-3">
              </div>
              <div className="col-md-12 col-lg-6 mb-5">
                <form onSubmit={this.handleSubmit} className="p-5 bg-white" > 
                  <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                    <label className="font-weight-bold" htmlFor="fullname">Enter details to change the password</label>
                      <input type="password" id="currentpassword" name="currentpassword" className='form-control mb-3' value={currentpassword} onChange={this.handleChange}  placeholder="Current Password" />
                      {submitted && !currentpassword &&
                        <div className="help-block red">This filed is required</div>
                      }
                      <input type="password" id="newpassword" name="newpassword" className="form-control mb-3" value={newpassword} minLength={6} onChange={this.handleChange}  placeholder="New Password" />
                      {submitted && !newpassword &&
                        <div className="help-block red">This filed is required</div>
                      }
                      <div className="help-block red">
                      {passnewstr==true?'Please add one uppercase one special character.':''} </div>

                      <input type="password" id="confirmpassword" name="confirmpassword" className="form-control" value={confirmpassword}  minLength={6} onChange={this.handleChange} placeholder="Re-type New Password" />
                      {submitted && !confirmpassword &&
                      <div className="help-block red">This filed is required</div>   }
                      {notmatached}
                    </div>
                  </div>  
                  <div className="row form-group">
                    <div className="col-md-4">
                      <input type="submit" value="Update" className="btn btn-primary pill px-4 py-2" onClick={this.toggleError} />
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
    const { loggingIn } = state.authentication;
    const { alert } = state;
    return {
        loggingIn,
        alert
    };
}

const connectedChangePasswordPage = connect(mapStateToProps)(ChangePasswordPage);
export { connectedChangePasswordPage as ChangePasswordPage }; 
