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
import Moment from "moment";
import config from "config";

class PreviewTab extends React.Component {
  constructor(props) {
    super(props);
    this.navId = "";
    this.state = {
      email: "",
    };
    let user = JSON.parse(localStorage.getItem("user"));
    if (user && user.userId && this.props && this.props.dispatchval) {
      const { dispatch } = this.props.dispatchval.dispatch;
      dispatch(userActions.getById(user.userId));
    }

    this.handleChangepreview = this.handleChangepreview.bind(this);
    this.handleSubmitPreviw = this.handleSubmitPreviw.bind(this);
    this.nexttab = this.nexttab.bind(this);
    
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps====", nextProps);
    if (nextProps && nextProps.previewData && nextProps.previewData.templates) {
      console.log("nextProps====", nextProps);
    }

  }
  handleChangepreview(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmitPreviw(e) {
    e.preventDefault();

    //console.log('stateeeeeee',this.state);return false;
    const { previewData, propertyImages } = this.props;
    const { email } = this.state;
    const { dispatch } = this.props.dispatchval.dispatch;
    if (email && previewData) {
      dispatch(userActions.emailPreviewTemplate(email, propertyImages));
      //window.scrollTo(0,0);
      this.setState({
        email: "",
        submitted: false,
      });
      this.setState({ visible: true }, () => {
        window.setTimeout(() => {
          this.setState({ visible: false });
        }, 5000);
      });
    } else {
      alert("Please fill all required fields.");
    }
  }


  nexttab(){
    const { dispatch } = this.props.dispatchval.dispatch;
    dispatch(userActions.preview());
  }

  render() {
    console.log("this.props===preview== templates", this.props);

    const { previewData, propertyImages } = this.props;
    let agentData = "";
    if (previewData && previewData.length) {
      agentData = previewData[0].agentData[0].agentData;
    }
    return (
      <div
        className="tab-pane fade mt-2"
        id="preview"
        role="tabpanel"
        aria-labelledby="group-dropdown2-tab"
        aria-expanded="false">
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
                  {agentData.name} via Listingreach.com
                </div>
                <div className="col-md-4 mb-3 text-right">
                  <label>Email Subject Line:</label>
                </div>
                <div className="col-md-8 mb-3">

                  {previewData &&
                    previewData[0] &&
                    previewData[0].templates &&
                    previewData[0].templates[0] &&

                    previewData[0].templates[0].email_subject}
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

                    {previewData &&
                      previewData[0] &&
                      previewData[0].templates &&
                      previewData[0].templates[0] &&

                      previewData[0].templates[0].headline}
                  </div>
                </div>
              </div>
              {propertyImages &&
              propertyImages[0] &&
              propertyImages[0].propertyImages &&
              propertyImages[0].propertyImages.length == 1 ? (
                <div className="row">
                  <div className="col-md-12">
                    <img
                      src="public/assets/images/img1.jpg"
                      alt="image"
                      style={{ width: "100%", height: "400px" }}
                    />
                  </div>
                </div>
              ) : null}

              {propertyImages &&
              propertyImages[0] &&
              propertyImages[0].propertyImages &&
              propertyImages[0].propertyImages.length == 2 ? (
                <div className="row">
                  <div className="col-md-6 pr-1">
                    <img
                      src={
                        config.uploadapiUrl +
                        "/uploads/" +
                        propertyImages[0].propertyImages[0].imageUrl
                      }
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="col-md-6 pl-1">
                    <img
                      src={
                        config.uploadapiUrl +
                        "/uploads/" +
                        propertyImages[0].propertyImages[1].imageUrl
                      }
                      alt="image"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              ) : null}

              {propertyImages &&
              propertyImages[0] &&
              propertyImages[0].propertyImages &&
              propertyImages[0].propertyImages.length == 2 ? (
                <div className="row">
                  <div className="col-md-6 pr-1">
                    <img
                      src={
                        config.uploadapiUrl +
                        "/uploads/" +
                        propertyImages[0].propertyImages[0].imageUrl
                      }
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="col-md-6 pl-1">
                    <img
                      src={
                        config.uploadapiUrl +
                        "/uploads/" +
                        propertyImages[0].propertyImages[1].imageUrl
                      }
                      alt="image"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              ) : null}

              {propertyImages &&
              propertyImages[0] &&
              propertyImages[0].propertyImages &&
              propertyImages[0].propertyImages.length == 3 ? (
                <div className="row">
                  <div className="col-md-8 pr-0">
                    <img
                      src={
                        config.uploadapiUrl +
                        "/uploads/" +
                        propertyImages[0].propertyImages[0].imageUrl
                      }
                      alt="image"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  <div className="col-md-4 pl-0 pr-0">
                    <div className="col-md-12 pl-0">
                      <img
                        src={
                          config.uploadapiUrl +
                          "/uploads/" +
                          propertyImages[0].propertyImages[1].imageUrl
                        }
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="col-md-12 pl-0">
                      <img
                        src={
                          config.uploadapiUrl +
                          "/uploads/" +
                          propertyImages[0].propertyImages[2].imageUrl
                        }
                        alt="image"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              ) : null}

              {propertyImages &&
              propertyImages[0] &&
              propertyImages[0].propertyImages &&
              propertyImages[0].propertyImages.length == 4 ? (
                <div className="row">
                  <div className="col-md-6 pr-1 mb-1">
                    <img
                      src={
                        config.uploadapiUrl +
                        "/uploads/" +
                        propertyImages[0].propertyImages[0].imageUrl
                      }
                      alt="image"
                      style={{ width: "100%", height: "250px" }}
                    />
                  </div>
                  <div className="col-md-6 pl-0 mb-1">
                    <img
                      src={
                        config.uploadapiUrl +
                        "/uploads/" +
                        propertyImages[0].propertyImages[1].imageUrl
                      }
                      alt="image"
                      style={{ width: "100%", height: "250px" }}
                    />
                  </div>
                  <div className="col-md-6 pr-1">
                    <img
                      src={
                        config.uploadapiUrl +
                        "/uploads/" +
                        propertyImages[0].propertyImages[2].imageUrl
                      }
                      alt="image"
                      style={{ width: "100%", height: "250px" }}
                    />
                  </div>
                  <div className="col-md-6 pl-0">
                    <img
                      src={
                        config.uploadapiUrl +
                        "/uploads/" +
                        propertyImages[0].propertyImages[3].imageUrl
                      }
                      alt="image"
                      style={{ width: "100%", height: "250px" }}
                    />
                  </div>
                </div>
              ) : null}

              <div className="flyer-bg">
                <div className="row">
                  <div className="col-md-12 mt-3 mb-3 ml-3">
                    <h4>
                      Price: $

                      {previewData && previewData[0] && previewData[0].price}{" "}
                      per Square Foot

                    </h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-3 text-center">
                    <label className="flyer-label">Property Address:</label>
                    <p>
                      {previewData &&
                        previewData[0] &&
                        previewData[0].street_address}
                      , {previewData && previewData[0] && previewData[0].city},{" "}
                      {previewData && previewData[0] && previewData[0].zipcode}
                    </p>
                  </div>

                  <div className="col-md-12 text-center">
                    {previewData &&
                      previewData[0] &&
                      previewData[0].isOpenHouse &&
                      previewData[0].isOpenHouse.openHouseData != undefined &&
                      previewData[0].isOpenHouse.openHouseData.length > 0 &&
                      previewData[0].isOpenHouse.openHouseData.map(function (
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
                        previewData[0] &&
                        previewData[0].mls_number}
                    </span>
                  </div>
                  <div className="col-md-12 ml-3">
                    <label className="flyer-label">Property Description:</label>
                    <span>
                      {previewData &&
                        previewData[0] &&
                        previewData[0].property_detail}
                    </span>
                  </div>
                  <div className="col-md-12 ml-3">
                    <label className="flyer-label">Key Features:</label>
                    <ul>
                      <li>
                        Property Type:{" "}

                        {previewData &&
                          previewData[0] &&

                          previewData[0].property_type}{" "}
                      </li>
                      <li>
                        Property Style:{" "}
                        {previewData &&
                          previewData[0] &&
                          previewData[0].property_style}{" "}
                      </li>
                      <li>
                        {" "}
                        {previewData &&
                          previewData[0] &&
                          previewData.number_bedrooms}{" "}
                        Bedrooms
                      </li>
                      <li>
                        {previewData &&
                          previewData[0] &&
                          previewData[0].number_bathrooms &&
                          previewData[0].number_bathrooms[0] &&
                          previewData[0].number_bathrooms[0].full}{" "}
                        Full{" "}
                        {previewData &&
                          previewData[0] &&
                          previewData[0].number_bathrooms &&
                          previewData[0].number_bathrooms[0] &&
                          previewData[0].number_bathrooms[0].half}{" "}
                        Half Bathrooms
                      </li>
                      <li>

                        {previewData &&
                          previewData[0] &&
                          previewData[0].building_size}{" "}

                        square feet
                      </li>

                      <li>
                        ${" "}
                        {previewData && previewData[0] && previewData[0].price}{" "}
                        /sqft
                      </li>
                      <li>
                        Lot Size:{" "}
                        {previewData &&
                          previewData[0] &&
                          previewData[0].lot_size}{" "}
                        sqft
                      </li>
                      <li>
                        {" "}
                        Built{" "}

                        {previewData &&
                          previewData[0] &&

                          previewData[0].year_built}
                      </li>
                      <li>
                        Garage:
                        {previewData &&
                          previewData[0] &&
                          previewData.garageSize}{" "}
                      </li>
                      <li>
                        {" "}
                        {previewData &&
                          previewData[0] &&
                          previewData[0].number_stories}{" "}
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-12 ml-3">
                    <label className="flyer-label">Links:</label>
                    <p>
                      {previewData &&
                        previewData[0] &&
                        previewData[0].linksToWebsites &&
                        previewData[0].linksToWebsites.linkData &&
                        previewData[0].linksToWebsites.linkData.length > 0 &&
                        previewData[0].linksToWebsites.linkData.map(function (
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
                      src={
                        agentData.logo_url ||
                        "public/assets/images/dummy-logo.png"
                      }
                    />
                  </div>
                  <div className="col-md-8 text-center">
                    <b> {agentData.name} </b>
                    <br />
                    Agent
                    <br />
                    {agentData.email}
                    <br />
                    <br />
                    {agentData.phone_number}
                    <br />
                    <br />
                    <br />
                    <br />
                    {agentData.website_url}
                    <br />

                    {previewData &&
                      previewData[0] &&
                      previewData[0].street_address}
                    , {previewData && previewData[0] && previewData[0].zipcode},
                    {previewData && previewData[0] && previewData[0].city}.
                  </div>
                  <div className="col-md-2 text-center pl-0">
                    <img
                      alt="Photo"
                      className="img-circle"
                      style={{ width: "100px" }}
                      src={
                        agentData.image_url ||
                        "public/assets/images/dummy-profile.png"
                      }
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
          <a href="javascript:void(0)" className="btn btn-primary" onClick={this.nexttab}>
            Save
          </a>
          <a href="javascript:void(0)" className="btn btn-primary pull-right" onClick={this.nexttab} >
            Next
          </a>
        </div>
      </div>
    );
  }
}

export default PreviewTab;
