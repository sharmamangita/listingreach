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
	<div>
		 <section className="intro-single">
				<div className="container">
				  <div className="row">
					<div className="col-md-12 col-lg-8">
					  <div className="title-single-box">
						<h1 className="title-single">Change Password</h1> 
			             <span className="color-text-a">To change your password, please enter your old password and new password below.</span>	
					  </div>
					</div>
					<div className="col-md-12 col-lg-4">
					  <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
						<ol className="breadcrumb">
						  <li className="breadcrumb-item">
							<Link to="HomePage">Home</Link>
						  </li>
						  <li className="breadcrumb-item active" aria-current="page">
							Change Password
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
					  { alert.message &&
						<Alert className={`alert ${alert.type}`} isOpen={this.state.visible} > <button type="button" onClick={this.closebtn} className="close" >
								<span aria-hidden="true">&times;</span>
								</button>{alert.message}</Alert>
						}
						<div className="row">
							
						  <div className="col-md-12 mb-3">
						  <div class="form-group">
							<input type="password" id="currentpassword" name="currentpassword" className='form-control form-control-lg form-control-a' value={currentpassword} onChange={this.handleChange}  placeholder="Current Password" />
                      {submitted && !currentpassword &&
                        <div className="help-block red">This filed is required</div>
                      }
                      <input type="password" id="newpassword" name="newpassword" className="form-control form-control-lg form-control-a" value={newpassword} minLength={6} onChange={this.handleChange}  placeholder="New Password" />
                      {submitted && !newpassword &&
                        <div className="help-block red">This filed is required</div>
                      }
                      <div className="help-block red">
                      {passnewstr==true?'Please add one uppercase one special character.':''} </div>

                      <input type="password" id="confirmpassword" name="confirmpassword" className="form-control form-control-lg form-control-a" value={confirmpassword}  minLength={6} onChange={this.handleChange} placeholder="Re-type New Password" />
                      {submitted && !confirmpassword &&
                      <div className="help-block red">This filed is required</div>   }
                      {notmatached}
						  </div>
						  </div>
						  <div className="col-md-12">
							<button type="submit" value="Update" className="btn btn-a  mb-3" onClick={this.toggleError} >Update</button>				
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

const connectedChangePasswordPage = connect(mapStateToProps)(ChangePasswordPage);
export { connectedChangePasswordPage as ChangePasswordPage }; 
