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

import { connect } from "react-redux";
import { common } from "../helpers";

import config from "config";

class MultiPreviewTab extends React.Component {
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
    const { previewData } = this.props;
    const { email } = this.state;

    const { dispatch } = this.props.dispatchval.dispatch;
    if (email && previewData) {
      dispatch(userActions.emailPreviewTemplate(email, previewData));
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

  nexttab() {
    const { dispatch } = this.props.dispatchval.dispatch;
    dispatch(userActions.preview());
  }

  render() {
    //console.log("this.props===preview== templates", this.props);
    const { previewData, propertyImages } = this.props;
    let agentData = "";
    if (previewData && previewData.length) {
      agentData = previewData[0].agentData[0].agentData;
    }
    return (
      <div>
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
        <div
          className="blast-box"
          style={{
            "max-width": "100%",
            background: "#fff",
            "font-family": "Poppins",
            margin: "auto",
            color: "#555555",
            fontSize: "1rem",
            fontWeight: "400",
            lineHeight: "1.5",
            padding: "30px",
            display: "block",
          }}
        >
          <div style={{ display: "block", width: "60%", margin: "auto" }}>
            <div
              className="border2"
              style={{ display: "block", border: "3px solid #eee" }}
            >
              <div
                className="row"
                style={{ display: "block", display: "flex", flexWrap: "wrap" }}
              >
                <div
                  className="mb-3 mt-3 text-right"
                  style={{
                    display: "block",
                    width: "30%",
                    textAlign: "right !important",
                    marginBottom: "1rem !important",
                    marginTop: "1rem !important",
                    textAlign: "right !important",
                  }}
                >
                  <label
                    style={{ display: "inline-block", marginBottom: "0.5rem" }}
                  >
                    From:{" "}
                  </label>
                </div>
                <div
                  style={{
                    display: "block",
                    width: "66%",
                    marginBottom: "1rem !important",
                    marginLeft: "1rem !important",
                    marginTop: "1rem !important",
                  }}
                  className="mb-3 mt-3 ml-3"
                >
                  {agentData.name} via Listingreach.com
                </div>
                <div
                  className="mb-3 text-right"
                  style={{
                    display: "block",
                    width: "30%",
                    textAlign: "right !important",
                    marginBottom: "1rem !important",
                    textAlign: "right !important",
                  }}
                >
                  <label
                    style={{ display: "inline-block", marginBottom: "0.5rem" }}
                  >
                    Email Subject Line:{" "}
                    {previewData &&
                      previewData[0] &&
                      previewData[0].templates &&
                      previewData[0].templates[0] &&
                      previewData[0].templates[0].email_subject}
                  </label>
                </div>
                <div
                  className="mb-3 ml-3"
                  style={{ width: "66%", marginLeft: "1rem !important" }}
                >
                  Property for sale
                </div>
              </div>
            </div>

            <div
              className="border3"
              style={{ border: "3px solid #eee", borderTop: 0 }}
            >
              <div
                className="row"
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                <div
                  className="mb-3 mt-3 ml-3"
                  style={{
                    width: "41%",
                    marginBottom: "1rem !important",
                    marginLeft: "1rem !important",
                    marginTop: "1rem !important",
                  }}
                >
                  <i>Powered by</i> <br />
                  <img
                    src="public/assets/images/listing-reach-logo.png"
                    alt=""
                    className="img-a img-fluid"
                  />
                </div>
                <div
                  className="mb-3 mt-3 text-right"
                  style={{
                    width: "25%",
                    textAlign: "right !important",
                    marginBottom: "1rem !important",
                    marginTop: "1rem !important",
                    textAlign: "right !important",
                  }}
                >
                  <button
                    className="btn btn-primary"
                    style={{
                      backgroundColor: "#EE8C3A",
                      border: "#EE8C3A",
                      color: "#fff",
                      display: "inline-block",
                      fontWeight: "400",
                      textAlign: "center",
                      whiteSpace: "nowrap",
                      verticalAlign: "middle",
                      "-webkit-userSelect": "none",
                      "-moz-userSelect": "none",
                      "-ms-userSelect": "none",
                      userSelect: "none",
                      padding: "0.375rem 0.75rem",
                      fontSize: "1rem",
                      lineHeight: "1.5",
                      borderRadius: "0.25rem",
                      boxShadow: "0.15s ease-in-out",
                    }}
                  >
                    Reply to Sender
                  </button>
                </div>
                <div
                  className="mb-3 mt-3 text-right ml-3"
                  style={{
                    width: "25%",
                    textAlign: "right !important",
                    marginBottom: "1rem !important",
                    marginLeft: "1rem !important",
                    marginTop: "1rem !important",
                    textAlign: "right !important",
                  }}
                >
                  <button
                    className="btn btn-primary"
                    style={{
                      backgroundColor: "#EE8C3A",
                      border: "#EE8C3A",
                      color: "#fff",
                      display: "inline-block",

                      fontWeight: "400",
                      textAlign: "center",
                      whiteSpace: "nowrap",
                      verticalAlign: "middle",
                      userSelect: "none",
                      padding: "0.375rem 0.75rem",
                      fontSize: "1rem",
                      lineHeight: "1.5",
                      borderRadius: "0.25rem",
                      boxShadow: "0.15s ease-in-out",
                    }}
                  >
                    Forward to Associate
                  </button>
                </div>
              </div>
              <div
                className="row"
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                <div style={{ width: "100%" }}>
                  <div
                    className="flyer-header"
                    style={{
                      display: "block",
                      overflow: "hidden",
                      backgroundColor: "#EE8C3A",
                      color: "#fff",
                      boxShadow:
                        "0 2px rgba(17, 16, 15, 0.1), 0 2px 10px rgba(20, 19, 18, 0.1)",
                      borderTop: "4px solid #EE8C3A",
                      height: "80px",
                      textAlign: "center",
                      fontSize: "28px",
                      fontWeight: "bold",
                      padding: "10px 0",
                    }}
                  >
                    {previewData &&
                      previewData[0] &&
                      previewData[0].templates &&
                      previewData[0].templates[0] &&
                      previewData[0].templates[0].headline}
                  </div>
                </div>
              </div>

              {previewData &&
                previewData.length &&
                previewData.map(function (property, i) {
                  return (
                    <div
                      key={i}
                      className="flyer-bg"
                      style={{ background: "#f1f1f1" }}
                    >
                      <div
                        className="row"
                        style={{
                          display: "block",
                          display: "flex",
                          flexWrap: "wrap",
                          borderTop: "2px solid #ccc",
                        }}
                      >
                        <div
                          style={{
                            width: "50%",
                            display: "block",
                            background: "#f1f1f1",
                            height: "400px",
                          }}
                        >
                          {propertyImages &&
                          propertyImages[0] &&
                          propertyImages[0].propertyImages &&
                          propertyImages[0].propertyImages.length ? (
                            <img
                              src={
                                config.uploadapiUrl +
                                "/uploads/" +
                                propertyImages[0].propertyImages[0].imageUrl
                              }
                              style={{ width: "100%", height: "400px" }}
                            />
                          ) : (
                            <img
                              src="public/assets/images/img4.jpg"
                              alt="image"
                              style={{ width: "100%", height: "400px" }}
                            />
                          )}
                        </div>
                        <div
                          style={{
                            width: "50%",
                            display: "block",
                            background: "#f1f1f1",
                            height: "400px",
                          }}
                        >
                          <div
                            className="row"
                            style={{ display: "flex", flexWrap: "wrap" }}
                          >
                            <div
                              style={{
                                width: "100%",
                                marginBottom: "1rem !important",
                                marginLeft: "1rem !important",
                                marginTop: "1rem !important",
                              }}
                            >
                              <h4
                                style={{
                                  background: "#f1f1f1",
                                  fontSize: "1.5rem",
                                  marginTop: "0",
                                  marginBottom: "1rem",
                                }}
                              >
                                Price:$ {property.price} per Square Foot
                              </h4>
                            </div>
                            <div
                              className="ml-3"
                              style={{
                                width: "100%",
                                marginLeft: "1rem !important",
                              }}
                            >
                              <label
                                className="flyer-label"
                                style={{
                                  color: "#EE8C3A",
                                  fontSize: "1rem",
                                  display: "inline-block",
                                  marginBottom: "0.5rem",
                                }}
                              >
                                Key Features:
                              </label>
                              <ul>
                                <li>
                                  Property Type:{" "}
                                  {property.property_type || "--"}{" "}
                                </li>
                                <li>
                                  Property Style:{" "}
                                  {property.property_style || "--"}{" "}
                                </li>
                                <li>
                                  {" "}
                                  {property.number_bedrooms || "--"} Bedrooms
                                </li>

                                <li>
                                  {(property.number_bathrooms[0] &&
                                    property.number_bathrooms[0].full) ||
                                    "--"}{" "}
                                  Full{" "}
                                  {(property.number_bathrooms[0] &&
                                    property.number_bathrooms[0].half) ||
                                    "--"}{" "}
                                  Half Bathrooms
                                </li>
                                <li>{property.building_size} square feet</li>
                                <li>$ {property.price} /sqft</li>
                                <li>Lot Size: {property.lot_size} sqft</li>
                                <li> Built {property.year_built}</li>
                                <li>{property.garageSize}</li>
                                <li> {property.number_stories} </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="flyer-bg"
                        style={{
                          background: "#f1f1f1;borderBottom: 2px solid #ccc",
                          "padding-top": "30px",
                        }}
                      >
                        <div className="row">
                          <div
                            className="mt-3 text-center"
                            style={{
                              width: "100%",
                              marginTop: "1rem !important",
                              textAlign: "center !important",
                            }}
                          >
                            <label
                              className="flyer-label"
                              style={{
                                color: "#EE8C3A",
                                fontSize: "1rem",
                                display: "inline-block",
                                marginBottom: "0.5rem",
                              }}
                            >
                              Property Address:
                            </label>
                            <p>
                              {property.street_address}, {property.city},{" "}
                              {property.zipcode}
                            </p>
                          </div>

                          <div
                            className="text-center"
                            style={{
                              width: "100%",
                              textAlign: "center !important",
                            }}
                          >
                            {property &&
                              property.isOpenHouse &&
                              property.isOpenHouse.length > 0 &&
                              property.isOpenHouse.map(function (data, k) {
                                return (
                                  <div key={k}>
                                    <label
                                      className="flyer-label"
                                      style={{
                                        color: "#EE8C3A",
                                        fontSize: "1rem",
                                        display: "inline-block",
                                        marginBottom: "0.5rem",
                                      }}
                                    >
                                      {data.openHouseData.houseType}:
                                    </label>
                                    <span>
                                      {" "}
                                      {data.openHouseData.date} ,
                                      {data.openHouseData.startTime} ,
                                      {data.openHouseData.endTime}
                                    </span>
                                  </div>
                                );
                              }, this)}
                          </div>

                          <div
                            className="ml-3"
                            style={{
                              width: "100%",
                              marginLeft: "1rem !important",
                            }}
                          >
                            <label
                              className="flyer-label"
                              style={{
                                color: "#EE8C3A",
                                fontSize: "1rem",
                                display: "inline-block",
                                marginBottom: "0.5rem",
                              }}
                            >
                              {" "}
                              MLS#:
                            </label>
                            <span>{property.mls_number}</span>
                          </div>
                          <div
                            className="ml-3"
                            style={{
                              width: "100%",
                              marginLeft: "1rem !important",
                            }}
                          >
                            <label
                              className="flyer-label"
                              style={{
                                color: "#EE8C3A",
                                fontSize: "1rem",
                                display: "inline-block",
                                marginBottom: "0.5rem",
                              }}
                            >
                              Property Description:
                            </label>
                            <span>Property details will come here...</span>
                          </div>
                          <div
                            className="ml-3"
                            style={{
                              width: "100%",
                              marginLeft: "1rem !important",
                            }}
                          >
                            <label
                              className="flyer-label"
                              style={{
                                color: "#EE8C3A",
                                fontSize: "1rem",
                                display: "inline-block",
                                marginBottom: "0.5rem",
                              }}
                            >
                              Links:
                            </label>

                            {property &&
                              property.linksToWebsites &&
                              property.linksToWebsites.length > 0 &&
                              property.linksToWebsites.map(function (data, k) {
                                return (
                                  <div key={k}>
                                    <a href={data.linksToWebsiteData.url}>
                                      <u>
                                        {data.linksToWebsiteData.buildingSize}
                                      </u>
                                    </a>
                                  </div>
                                );
                              }, this)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }, this)}

              <div
                className="text-center flyer-bg"
                style={{ width: "100%", textAlign: "center !important" }}
              >
                <h4
                  style={{
                    background: "#f1f1f1",
                    padding: "20px 0",
                    marginTop: "0",
                    borderBottom: "2px solid #ccc",
                  }}
                >
                  <a
                    href="#"
                    style={{ color: "#000000", transition: "all .5s ease" }}
                  >
                    <u>Click Here to Email Agent for More Information</u>
                  </a>
                </h4>
              </div>

              <div className="flyer-footer">
                <div
                  className="row"
                  style={{
                    padding: "1rem 0 !important",
                    display: "flex",
                    flexWrap: "wrap",
                    background: "#fff",
                  }}
                >
                  <div
                    className="text-center"
                    style={{ width: "16%", textAlign: "center !important" }}
                  >
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
                  <div
                    className="text-center"
                    style={{ width: "66%", textAlign: "center !important" }}
                  >
                    <b> {agentData.name} </b> <br />
                    Agent <br />
                    {agentData.email}
                    <br />
                    {agentData.website_url}
                    <br />
                    {agentData.phone_number}
                    <br />
                    <br />
                    <br />
                    {previewData &&
                      previewData[0] &&
                      previewData[0].street_address}
                    , {previewData && previewData[0] && previewData[0].zipcode},
                    {previewData && previewData[0] && previewData[0].city}.
                  </div>
                  <div
                    className="text-center pl-0"
                    style={{ width: "16%", textAlign: "center !important" }}
                  >
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

              <div
                className="flyer-btm"
                style={{
                  background: "#8c8c8c",
                  padding: "10px",
                  fontSize: "0.8rem",
                  color: "#fff",
                }}
              >
                <div
                  className="row"
                  style={{ display: "flex", flexWrap: "wrap" }}
                >
                  <div style={{ width: "100%" }}>
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
          <a
            href="javascript:void(0)"
            className="btn btn-primary"
            onClick={this.nexttab}
          >
            Save
          </a>
          <a
            href="javascript:void(0)"
            className="btn btn-primary pull-right"
            onClick={this.nexttab}
          >
            Next
          </a>
        </div>
      </div>
    );
  }
}

export default MultiPreviewTab;
