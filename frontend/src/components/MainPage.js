import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';
import Slider from "react-slick";
class MainPage extends React.Component {
    constructor(props) {
        super(props);
        // reset login status
        
        this.state = {
        };
    }

    render() {
     const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    }
    return (
        <div className="site-section site-block-feature bg-light">
          <div className="container">
            <div className="text-center mb-5 section-heading">
                <h2>Why Choose Us</h2>
            </div>

            <div className="d-block d-md-flex">
                <div className="text-center p-4 item border-right" data-aos="fade">
                    <span className="icon-rate_review display-3 mb-3 d-block text-primary"></span>
                    <h2 className="h4">Accurate Reviews & Ratings</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati reprehenderit explicabo quos fugit vitae dolorum.</p>

                </div>
                <div className="text-center p-4 item border-right" data-aos="fade">
                    <span className="icon-supervisor_account display-3 mb-3 d-block text-primary"></span>
                    <h2 className="h4">Find Right Candidates</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati reprehenderit explicabo quos fugit vitae dolorum.</p>
                </div>
                <div className="text-center p-4 item" data-aos="fade">
                    <span className="icon-stars display-3 mb-3 d-block text-primary"></span>

                    <h2 className="h4">Verified by AI and Data Science</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati reprehenderit explicabo quos fugit vitae dolorum.</p>

                </div>
            </div>
        </div>
     <div className="site-section block-15">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto text-center mb-5 section-heading">
            <h2>Our Investors</h2>
          </div>
        </div>
	    <div>
        <Slider {...settings}>
        
        <div>
          <div className="media-with-text">
              <div className="img-border-sm mb-4">
                <a href="#" className="image-play">
                  <img src="/public/assets/images/d-logo1.jpg" alt="" className="img-fluid"/>
                </a>
              </div>            
            </div>
          </div>
          
         <div>
          <div className="media-with-text">
              <div className="img-border-sm mb-4">
                <a href="#" className="image-play">
                  <img src="/public/assets/images/d-logo1.jpg" alt="" className="img-fluid"/>
                </a>
              </div>            
            </div>
          </div>
          
         <div>
           <div className="media-with-text">
              <div className="img-border-sm mb-4">
                <a href="#" className="image-play">
                  <img src="/public/assets/images/d-logo1.jpg" alt="" className="img-fluid"/>
                </a>
              </div>            
            </div>
          </div>
          
       <div>
           <div className="media-with-text">
              <div className="img-border-sm mb-4">
                <a href="#" className="image-play">
                  <img src="/public/assets/images/d-logo1.jpg" alt="" className="img-fluid"/>
                </a>
              </div>            
            </div>
          </div>
          
          <div>
           <div className="media-with-text">
              <div className="img-border-sm mb-4">
                <a href="#" className="image-play">
                  <img src="/public/assets/images/d-logo1.jpg" alt="" className="img-fluid"/>
                </a>
              </div>            
            </div>
          </div>
          
          <div>
           <div className="media-with-text">
              <div className="img-border-sm mb-4">
                <a href="#" className="image-play">
                  <img src="/public/assets/images/d-logo1.jpg" alt="" className="img-fluid"/>
                </a>
              </div>            
            </div>
          </div>
        </Slider>
      </div>
           
           </div>
          </div>
         </div>
            
        );
    }
}

export default MainPage;
 
