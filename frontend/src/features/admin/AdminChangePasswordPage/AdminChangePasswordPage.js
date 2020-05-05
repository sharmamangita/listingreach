import React from 'react';
import config from 'config';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../../actions';


class AdminChangePasswordPage extends React.Component{

    constructor(props) {
        super(props);
            var user  = JSON.parse(localStorage.getItem('user'));
            console.log("login user id",user);
        this.state = {
            showerror:true,
            user:user.userId,
            currentpassword: '',
            newpassword:'',
            confirmpassword:'',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

   handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    
    
  toggleError(){
    this.setState((prevState, props) => {
      return { showerror: true }
    })
  };
   
  handleSubmit(e) {AdminChangePasswordPage
    e.preventDefault();
    this.setState({ submitted: true });  
    const {newpassword,confirmpassword,currentpassword,user} = this.state;
    const { dispatch } = this.props;
     if (confirmpassword == newpassword) {
        this.setState((prevState, props) => {
         return { showerror: true }
        })
        dispatch(userActions.updatepassword(user,currentpassword,confirmpassword)); 
        this.setState({
        newpassword:"",
        confirmpassword:"",
        currentpassword:"",
        submitted:false 
      }); 

    } else { 
        
      this.setState((prevState, props) => {
         return { showerror: false }
        })
    }

    }

    render() {
     const { loggingIn  } = this.props;
        const { currentpassword,newpassword,confirmpassword, submitted,showerror } = this.state;
        const { alert } = this.props;
        var  notmatached='';
        if(this.state.showerror==false){
              notmatached = (<div className="help-block red">Password not matcehed</div>);
            } 
        return (

        <main className="col-xs-12 col-sm-8 col-lg-9 col-xl-10 pt-3 pl-4 ml-auto">
         <h3 className="admin-title">   Change Password</h3>
            <section className="row">
                <div className="col-sm-12">
                       <section className="row">
                            <div className="col-12">
                               <div className="text-center mb-5 section-heading">
                                    { alert.message &&
                                      <div className={`alert ${alert.type}`}>{alert.message}</div>
                                     }
                                </div>
                                <div className="card mb-4">
                                    <div className="card-block">                                        
                                      <form onSubmit={this.handleSubmit} className="p-5 bg-white" > 
                                      <div className="row form-group">
                                        <div className="col-md-12 mb-3 mb-md-0">
                                          <label className="font-weight-bold" htmlFor="fullname">Enter details to change the password</label>
                                          <input type="password" id="currentpassword" name="currentpassword" className='form-control mb-3' value={currentpassword} onChange={this.handleChange}  placeholder="Current Password" />
                                           {submitted && !currentpassword &&
                                              <div className="help-block red">This filed is required</div>
                                            }
                                          <input type="password" id="newpassword" name="newpassword" className="form-control mb-3" value={newpassword} onChange={this.handleChange}  placeholder="New Password" />
                                           {submitted && !newpassword &&
                                                <div className="help-block red">This filed is required</div>
                                            }
                                          <input type="password" id="confirmpassword" name="confirmpassword" className="form-control" value={confirmpassword} onChange={this.handleChange} placeholder="Re-type New Password" />
                                           {submitted && !confirmpassword &&
                                                <div className="help-block red">This filed is required</div>   
                                            }
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
                                </div>
                            </div>
                        </section>
                    </div>
                </section> 
              </main>   
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


const connectedAdminChangePasswordPage = connect(mapStateToProps)(AdminChangePasswordPage);
export { connectedAdminChangePasswordPage as AdminChangePasswordPage };