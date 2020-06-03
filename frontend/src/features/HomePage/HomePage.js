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
import PhoneInput, { formatPhoneNumber, isValidPhoneNumber } from 'react-phone-number-input';
class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // $('.navbar-toggle-box-collapse').on('click', function () {
    //   $('body').removeClass('box-collapse-closed').addClass('box-collapse-open');
    // });
    // $('.close-box-collapse, .click-closed').on('click', function () {
    //   $('body').removeClass('box-collapse-open').addClass('box-collapse-closed');
    //   $('.menu-list ul').slideUp(700);
    // });
  }
  render() {
    const { alert } = this.props;
    return (
      <div>

        <div className="modal" id="databases">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">

              <div className="modal-header">
                <h4 className="modal-title">Select Databases</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>

              <div className="modal-body">
                <div className="form-group col-md-6">

                  <select className="form-control form-control-a" id="Type">
                    <option>Select State</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-b" data-dismiss="modal">Close</button>
              </div>

            </div>
          </div>
        </div>
        <div className="intro intro-carousel">
          <div id="carousel" className="owl-carousel owl-theme">
            <div className="carousel-item-a intro-item bg-image" style={{ backgroundImage: "url('public/assets/images/slide-3.jpg')" }}>
              <div className="overlay overlay-a"></div>
              <div className="intro-content display-table">
                <div className="table-cell">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-10">
                        <div className="intro-body">
                            { alert.message &&
                                  <Alert className={`alert ${alert.type}`} > <button type="button" className="close">
                                    </button>{alert.message}</Alert>
                            }
                          <h1 className="intro-title mb-4">
                            Market Your Listings Locally & Nationwide</h1>
                          <h2 className="intro-title mb-4">Reach More Brokers | Sell Faster</h2>
                          <p className="intro-subtitle intro-price">
                            <a href="#"><span className="price-a">Email Marketing For Residential Real Estate</span></a>
                          </p>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="section-services section-t4">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <img className="card-img-top" src="public/assets/images/img-1.jpg" alt="" />
                  <div className="card-body">
                    <h5 className="card-title">Send Listing</h5>
                    <p className="card-text">Send modern and professional marketing emails to real estate agents in any US market.</p>
                    <a href="#" className="link-c link-icon">Register now
                <span className="ion-ios-arrow-forward"></span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <img className="card-img-top" src="public/assets/images/img-2.jpg" alt="" style={{
                    height: "233px"
                  }} />
                  <div className="card-body">
                    <h5 className="card-title">Receive Offer</h5>
                    <p className="card-text" style={{ height: "71px" }}>Join our Mailing List to receive listings in your area</p>
                    <a href="#" className="link-c link-icon">Register now
                <span className="ion-ios-arrow-forward"></span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <img className="card-img-top" src="public/assets/images/img-3.jpg" alt="" />
                  <div className="card-body">
                    <h5 className="card-title">Templates</h5>
                    <p className="card-text">Use professionally designed templates to make the greatest impact possible</p>
                    <a href="#" className="link-c link-icon">Register now
                <span className="ion-ios-arrow-forward"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
        <section className="section-property section-t4">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="title-box">
                  <h2 className="title-a">Get More Offers</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <p className="about-text">
                  The fastest, most reliable way to reach real estate agents and brokers to share properties for sale. We provide designer approved templates for impactful marketing.
                  </p>
              </div>
            </div>
          </div>
        </section>
        <section className="section-testimonials section-t4 nav-arrow-a">
          <div className="container">
            <div className="row">
              <div className="col-md-12">

                <div className="title-box">
                  <h2 className="title-a">Testimonials</h2>
                </div>

              </div>
            </div>
            <div id="testimonial-carousel" className="owl-carousel owl-arrow">
              <div className="carousel-item-a">
                <div className="testimonials-box">
                  <div className="row">
                    <div className="col-sm-12 col-md-6">
                      <div className="testimonials-content">
                        <p className="testimonial-text">
                          “Listing Reach allowed me to market my luxury listing to top markets like Miami, LA, and NY. I was able to connect with another agent and close the deal. This tool is invaluable.”
                  </p>
                      </div>
                      <div className="testimonial-author-box">
                        <h5 className="testimonial-author">Lori R.</h5>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <div className="testimonials-content">
                        <p className="testimonial-text">
                          “Great product. I can now connect with more agents than I thought possible. No more tracking down email addresses one at a time. I selected my desired market and send off my listing”
                  </p>
                      </div>
                      <div className="testimonial-author-box">
                        <h5 className="testimonial-author">Brian S.</h5>
                      </div>
                    </div>
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
  const { loggingIn, user, admins } = state;
  const { alert } = state;
  console.log("this....===", admins);
  return {
    loggingIn,
    alert,
    user,
    admins
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage }; 
