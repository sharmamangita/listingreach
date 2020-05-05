import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../../actions';

class ChangePasswordPage extends React.Component{

 constructor(props) {
        super(props);
        // reset login status
        this.state = {
        };
    }

    render() {

        return (
        <main className="col-xs-12 col-sm-8 col-lg-9 col-xl-10 pt-3 pl-4 ml-auto">
            <section className="row">
                <div className="col-sm-12">
                       <section className="row">
                            <div className="col-12">
                                <div className="card mb-4">
                                    <div className="card-block">                                        
                                        <form className="form" action="#">
                                            <div className="form-group row">
                                                <label className="col-md-3 col-form-label">Current Password</label>
                                                <div className="col-md-9">
                                                    <input className="form-control" type="password" name="pass"/>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-md-3 col-form-label">New Password</label>
                                                <div className="col-md-9">
                                                    <input className="form-control" type="password" name="pass"/>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-md-3 col-form-label">Re-type New Password</label>
                                                <div className="col-md-9">
                                                    <input className="form-control" type="password" name="pass"/>
                                                </div>
                                            </div>
                                            
                                            <div className="sign-btn text-center">
                                                <button className="btn btn-success">Change Password</button>
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
  console.log("stae====",state);
  const { authentication, users} = state;
  const { user } = authentication;
  const { employee} = users;
    
  return {
    user,
    employee
    
  };
}


const connectedChangePasswordPage = connect(mapStateToProps)(ChangePasswordPage);
export { connectedChangePasswordPage as ChangePasswordPage };