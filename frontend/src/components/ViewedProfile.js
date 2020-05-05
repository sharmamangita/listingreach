import React from 'react';
import config from 'config';
import { Link,Redirect } from 'react-router-dom';
import { browserHistory } from 'react-router'
import { userActions } from '../actions';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, NavLink } from 'react-bootstrap';
const axios = require("axios");
import { authHeader } from '../helpers';



class ViewedProfile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showmorebtn:false,
        showresultitem:10, 
        expanded:false, 
        downloadedby :"",
        submitted: false
      };
    }
    render() {
        const {downloadedby} = this.state;
        if(this.props.downloaded.result){
            var filterdownloadedcandidates = this.props.downloaded.result.filter(item => {
              return item.downloaded && item.downloaded=='true';
            }); 
            console.log("filterdownloadedcandidates===",filterdownloadedcandidates)
            var filtersavedcandidates = this.props.downloaded.result.filter(item => {
              return item.saved && item.saved=='true';
            });
           var filterviewedandidates = this.props.downloaded.result.filter(item => {
              return item.viewed && item.viewed=='true';
            });
        }   
        
        return (
            <div>
            <div className="p-4 mb-3 bg-white">
                <h3 className="h5 text-black mb-3">Who Viewed the Profile</h3>
                {filterviewedandidates && filterviewedandidates.map(function(item, i){
                return <div key={i} className="mb-3">
                    
                <div className="h-100 d-md-flex">
                    <div className="profile-pic">
                        <img src="/public/assets/images/dummy-profile-pic.png" alt="Image" className="img-fluid mx-auto" />
                    </div>
                    <div className="ml-3">
                        <b>{item.firstName} {item.lastName}</b>
                        <p className="font-13">{item.companyName ? item.companyName :''}</p>
                    </div>
                </div>
                </div>
                },this)}
            </div>

            <div className="p-4 mb-3 bg-white">
                <h3 className="h5 text-black mb-3">Profile Downloaded by</h3>
                {filterdownloadedcandidates && filterdownloadedcandidates.map(function(item, i){
                    return <div key={i} className="mb-3">
                        <div className="h-100 d-md-flex">
                            <div className="profile-pic">
                                <img src="/public/assets/images/dummy-profile-pic.png" alt="Image" className="img-fluid mx-auto" />
                            </div>
                            <div className="ml-3">
                                <b>{item.firstName} {item.lastName}</b>
                                <p className="font-13">{item.companyName ? item.companyName :''} </p>
                            </div>
                        </div>
                    </div>
                 },this)}
                

            </div>
            </div>
        );
    }
  }
export default ViewedProfile;
