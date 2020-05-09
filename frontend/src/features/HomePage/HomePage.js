import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MainPage from '../../components/MainPage';

import { authHeader } from '../../helpers';
const axios = require("axios");
import config from 'config';
import { userActions } from '../../actions';
import { adminActions } from '../../actions';
import Slider from "react-slick";

import { Alert } from "reactstrap";
import 'react-phone-number-input/style.css'
import PhoneInput, { formatPhoneNumber,isValidPhoneNumber } from 'react-phone-number-input';
class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
  render() {
	return (
      <div className="site-blocks-cover overlay bgimag" data-aos="fade" data-stellar-background-ratio="0.5">
          <div className="container">
              <div className="row align-items-center">
                <div className="col-12" data-aos="fade">
                    fdsfsdfdsfds
            </div>
          </div>
        </div>
 
          
      </div>
      );
    }
}



function mapStateToProps(state) {
    const { loggingIn,user,admins } = state;
    const { alert } = state;
    console.log("this....===",admins);
    return {
        loggingIn,
        alert,
        user,
        admins
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage }; 
