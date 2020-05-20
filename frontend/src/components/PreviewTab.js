import React from "react";
import { Link } from "react-router-dom";
import { userActions } from "../actions";
import {
  Nav,
  Navbar,
  NavItem,
  NavDropdown,
  MenuItem,
  NavLink,
} from "react-bootstrap";
import Modal from "react-bootstrap4-modal";
import { connect } from "react-redux";
import { common } from "../helpers";
import moment from "moment";

class PreviewTab extends React.Component {
  constructor(props) {
    super(props);
    this.navId = "";
    this.state = {
      email: "",
    };
    let user = JSON.parse(localStorage.getItem("user"));
    if(user && user.userId &&  this.props && this.props.dispatchval){
       const { dispatch } = this.props.dispatchval.dispatch;
      dispatch(userActions.getById(user.userId));
    }
    
    this.handleChangepreview = this.handleChangepreview.bind(this);
    this.handleSubmitPreviw = this.handleSubmitPreviw.bind(this);
  }


    handleChangepreview(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmitPreviw(e) { 
    e.preventDefault();
  //console.log('stateeeeeee',this.state);return false; 
   const { previewData } = this.props;
    const {email } = this.state;
    console.log("propertyDetailswewe===",propertyDetails);
    const { dispatch } = this.props;
    if(email && previewData){
    dispatch(userActions.emailPreviewTemplate(email,previewData)); 
      //window.scrollTo(0,0);
      this.setState({
        email:"",
       submitted:false 
      });
      this.setState({visible:true},()=>{
        window.setTimeout(()=>{
          this.setState({visible:false})
        },5000)
      }); 
    } else {
      alert("Please fill all required fields.")
    }    
  }
    


  render() {
    const { previewData } = this.props;
    return (
      <div
        className="tab-pane fade mt-2"
        id="preview"
        role="tabpanel"
        aria-labelledby="group-dropdown2-tab"
        aria-expanded="false"
      >
        <h4>Preview Blast</h4>
        <p>Finalize your Blast.</p>
        <div className="row">
          <div className="col-md-12 mb-3">
            Thoroughly read the email including -
            <ul>
              <li>The "From Name"</li>
              <li>The "Email Subject Line"</li>
              <li>The entire body of the email</li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 mb-3">
            <div className="form-group">
              <label>Additional proofs may be emailed here</label>
              <input
                value={this.state.email}
                onChange={this.handleChangepreview}
                name="email"
                type="text"
                className="form-control form-control-lg form-control-a"
                placeholder="Email Address"
              />
              {!this.state.email && (
                <div className="help-block red">Email is required</div>
              )}
            </div>
          </div>
          <div className="col-md-2 mb-3">
            <div className="form-group pt-4">
              <a onClick={this.handleSubmitPreviw} className="btn btn-primary">
                Send
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="border2">
              <div className="row">
                <div className="col-md-4 mb-3 mt-3 text-right">
                  <label>From: </label>
                </div>
                <div className="col-md-8 mb-3 mt-3">
                  Agent Name via Listingreach.com
                </div>
                <div className="col-md-4 mb-3 text-right">
                  <label>Email Subject Line:</label>
                </div>
                <div className="col-md-8 mb-3">
                  {previewData && previewData.templates[0] && 
                    previewData.templates[0].email_subject}
                </div>
              </div>
            </div>
            <div className="border3">
              <div className="row">
                <div className="col-md-5 mb-3 mt-3 ml-3">
                  <i>Powered by</i> <br />
                  <img
                    src="public/assets/images/listing-reach-logo.png"
                    alt=""
                    className="img-a img-fluid"
                  />
                </div>
                <div className="col-md-3 mb-3 mt-3 text-right">
                  <button className="btn btn-primary">Reply to Sender</button>
                </div>
                <div className="col-md-3 mb-3 mt-3 text-right">
                  <button className="btn btn-primary">
                    Forward to Associate
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="flyer-header">
                  {previewData && previewData.templates[0] &&
                    previewData.templates[0].headline}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <img
                    src="public/assets/images/img1.jpg"
                    alt="image"
                    style={{ width: "100%", height: "400px" }}
                  />
                </div>
              </div>
              <div className="flyer-bg">
                <div className="row">
                  <div className="col-md-12 mt-3 mb-3 ml-3">
                    <h4>
                      Price: $
                      {previewData && previewData.price}
                      per Square Foot
                    </h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-3 text-center">
                    <label className="flyer-label">Property Address:</label>
                    <p>
                      {previewData && previewData.street_address}
                      ,{" "}
                      {previewData &&
                        previewData.city}
                      ,{" "}
                      {previewData &&
                        previewData.zipcode}
                    </p>
                  </div>

                  <div className="col-md-12 text-center">
                    {previewData.isOpenHouse &&
                      previewData.isOpenHouse.openHouseData != undefined &&
                      previewData.isOpenHouse.openHouseData.length > 0 &&
                      previewData.isOpenHouse.openHouseData.map(function (
                        data,
                        i
                      ) {
                        return (
                          <div key={i}>
                            <label className="flyer-label">
                              {data.openHouseData.houseType}:
                            </label>
                            <span>
                              <Moment parse="YYYY-MM-DD HH:mm">
                                {data.openHouseData.date},
                                {data.openHouseData.startTime},
                                {data.openHouseData.endTime}
                              </Moment>
                            </span>
                            <br />
                          </div>
                        );
                      },
                      this)}
                  </div>

                  <hr />
                  <div className="col-md-12 ml-3">
                    <label className="flyer-label">MLS#:</label>
                    <span>
                      {previewData &&
                        previewData.mls_number}
                    </span>
                  </div>
                  <div className="col-md-12 ml-3">
                    <label className="flyer-label">Property Description:</label>
                    <span>
                      {previewData && previewData.property_detail}
                    </span>
                  </div>
                  <div className="col-md-12 ml-3">
                    <label className="flyer-label">Key Features:</label>
                    <ul>
                      <li>
                        Property Type:{" "}
                        {previewData && 
                            previewData.property_type}{" "}
                      </li>
                      <li>
                        Property Style:{" "}
                        {previewData && previewData.property_style}{" "}
                      </li>
                      <li>
                        {" "}
                        {previewData &&
                          previewData.number_bedrooms}{" "}
                        Bedrooms
                      </li>
                      <li>
                        {previewData &&
                          previewData
                            .number_bathrooms[0] &&
                          previewData.number_bathrooms[0].full}{" "}
                        Full{" "}
                        {previewData &&
                          previewData.number_bathrooms[0] &&
                          previewData.number_bathrooms[0].half}{" "}
                        Half Bathrooms
                      </li>
                      <li>
                        {previewData && previewData
                            .building_size}{" "}
                        square feet
                      </li>

                      <li>$1,000.00 /sqft</li>
                      <li>
                        Lot Size:{" "}
                        {previewData &&
                          previewData.lot_size}{" "}
                        sqft
                      </li>
                      <li>
                        {" "}
                        Built{" "}
                        {previewData &&
                          previewData.year_built }
                      </li>
                      <li>
                        Garage:
                        {previewData && previewData.garageSize}{" "}
                      </li>
                      <li>
                        {" "}
                        {previewData &&
                          previewData.number_stories}{" "}
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-12 ml-3">
                    <label className="flyer-label">Links:</label>
                    <p>
                      {previewData && 
                        previewData.linksToWebsites && previewData.linksToWebsites.linkData && previewData.linksToWebsites.linkData.length > 0 &&
                        previewData.linksToWebsites.linkData.map(function (
                          data,
                          i
                        ) {
                          return (
                            <div key={i}>
                              <a href={data.linksToWebsiteData.url}>
                                <u>{data.linksToWebsiteData.buildingSize}</u>
                              </a>
                            </div>
                          );
                        },
                        this)}
                    </p>
                  </div>
                  <div className="col-md-12 text-center">
                    <h4>
                      <a href="">
                        <u>Click Here to Email Agent for More Information</u>
                      </a>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="flyer-footer">
                <div className="row mt-3">
                  <div className="col-md-2 text-center">
                    <img
                      alt="Photo"
                      className="img-square"
                      style={{ width: "100px" }}
                      src="public/assets/images/dummy-logo.png"
                    />
                  </div>
                  <div className="col-md-8 text-center">
                    <b> {previewData.firstName}</b>
                    <br />
                    Agent
                    <br />
                    abc@gmail.com
                    <br />
                    <br />
                    21212121212
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    {previewData &&
                      previewData.street_address}
                    ,{" "}
                    {previewData && previewData.zipcode}
                    ,
                    {previewData &&
                      previewData.city}
                    .
                  </div>
                  <div className="col-md-2 text-center pl-0">
                    <img
                      alt="Photo"
                      className="img-circle"
                      style={{ width: "100px" }}
                      src="public/assets/images/dummy-profile.png"
                    />
                  </div>
                </div>
              </div>
              <div className="flyer-btm">
                <div className="row">
                  <div className="col-md-12 ">
                    This e-blast was delivered by ListingReach.com, a real
                    estate email marketing service. The ListingReach.com service
                    and information provided therein, while believed to be
                    accurate, are provided "as is". ListingReach.com disclaims
                    any and all representations, warranties, or guarantees of
                    any kind. ListingReach.com assumes no liability for errors
                    or omissions.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12 mt-4">
          <a href="javascript:void(0)" className="btn btn-primary">
            Save
          </a>
          <a href="javascript:void(0)" className="btn btn-primary pull-right">
            Next
          </a>
        </div>
      </div>
    );
  }
}

export default PreviewTab;
