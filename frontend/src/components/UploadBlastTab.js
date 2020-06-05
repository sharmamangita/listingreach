import React from "react";
import { userActions } from "../actions";
import { authHeader } from "../helpers";
import { Alert } from "reactstrap";
const axios = require("axios");
import config from "config";
import { globalData } from '../constants/data.constants';

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

class UploadBlastTab extends React.Component {
  constructor(props) {
    super(props);
    this.navId = "";
    let linksToWebsites = {
      url: "",
      text: ""
    };
    let isOpenHouse = {
      display: false,
      houseType: "",
      date: "",
      startTime: "",
      endTime: ""
    };
    let user = JSON.parse(localStorage.getItem("user"));
    let property =
    {
      blast_id: "",
      userId: user.userId,
      propertyId: "",
      Email: {
        formSubject: "",
        formLine: "",
        formReply: "",
      },
      blastHeadline: "",
      isOpenHouse: [],
      pricingInfo: {
        price: "",
        priceType: "",
      },
      propertyAddress: {
        displayMethod: "",
        streetAddress: "",
        city: "",
        State: "",
        zipCode: "",
      },
      mlsNumber: {
        display: true,
        numberProperty: "",
        boardAssociation: "",
      },
      generalPropertyInformation: {
        propertyType: "",
        propertyStyle: "",
        pricePerSquareFoot: "",
        buildingSize: "",
        lotSize: "",
        lotType: "",
        numberOfBedrooms: "",
        numberOfBathrooms: {
          full: "",
          half: "",
        },
        yearBuilt: "",
        numberOfStories: "",
        garage: false,
      },
      propertyDetail: "",
      linksToWebsites: []
    };
    this.state = {
      userId: "",
      blast_id: "",
      submitForm: false,
      blastImageUrl: "",
      propertyImages: [],
      propertyCount: 1,
      templateId: "",
      disabled: true,
      Email: {
        formSubject: "",
        formLine: "",
        formReply: "",
      },
      property,
      linksToWebsites,
      isOpenHouse,
      openHouseAdd: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.addOpenHouse = this.addOpenHouse.bind(this);
    this.openHouseChange = this.openHouseChange.bind(this);
    this.linksToWebsitesChange = this.linksToWebsitesChange.bind(this);
    this.addLinksToWebsites = this.addLinksToWebsites.bind(this);
    this.editOrDelete = this.editOrDelete.bind(this);
    this.saveProperty = this.saveProperty.bind(this);
    this.propsDataupdate = this.propsDataupdate.bind(this);
    this.openUpload = this.openUpload.bind(this);
    this.imageChange = this.imageChange.bind(this);
    this.nextPage = this.nextPage.bind(this);

    // let user = JSON.parse(localStorage.getItem("user"));
    // if (user && user.userId && this.props && this.props.dispatchval) {
    //   const { dispatch } = this.props.dispatchval.dispatch;
    //   dispatch(userActions.getById(user.userId));
    // }
  }

  openUpload() {
    $("#imgupload").trigger("click");
  }

  // nextPage() {
  //   const { dispatch } = this.props.dispatchval.dispatch;
  //   let blast_id = this.state.blast_id;
  //   dispatch(userActions.getPreviewhtml(blast_id));
  // }
  to12hourTime(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }
  imageChange(e) {
    const configs = {
      headers: {
        ...authHeader(),
        "content-type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("userid", this.state.userid);
    formData.append("myImage", e.target.files[0]);

    axios
      .post(`${config.uploadapiUrl}/propertyupload`, formData, configs)
      .then((response) => {
        let image = {
          id: response.data.imageId,
          url: response.data.url,
        }
        let { blastImageUrl, propertyImages } = this.state;

        blastImageUrl = response.data.url;
        propertyImages[0] = image;
        this.setState({ blastImageUrl, propertyImages });
        this.render();
      })
      .catch(() => { });
  }

  nextPage(){
    this.props.moveTab("preview");
  }
  selectBlast(blast_type) {
    if (blast_type) {
      const { dispatch } = this.props.dispatchval.dispatch;
      const { userId } = this.state;
      dispatch(userActions.blast(blast_type, userId));
    }
  }

  addOpenHouse(event) {
    let { property, isOpenHouse } = this.state;
    if (isOpenHouse.houseType && isOpenHouse.date) {
      property.isOpenHouse.push(isOpenHouse);
      isOpenHouse = {
        houseType: "",
        date: "",
        startTime: "",
        endTime: ""
      }
      this.setState({ property, isOpenHouse, openHouseAdd: false });
    } else {
      this.setState({ openHouseAdd: true });
    }
  }

  handleChangepreview(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }


  openHouseChange(event) {
    event.preventDefault();
    const { name, value, id } = event.target;

    if (value != "" && name != "") {
      let { isOpenHouse } = this.state;
      isOpenHouse[name] = value;
      this.setState({ isOpenHouse });
      this.AddButton = true;
    } else {
      this.AddButton = false;
    }
  }

  linksToWebsitesChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    let { linksToWebsites } = this.state
    if (value != "" && name != "") {
      linksToWebsites[name] = value;
      this.setState({ linksToWebsites });
    }
  }

  editOrDelete(event, flag, p, item) {
    const { title } = event.target;
    let { property } = this.state;
    if (title == "linkDelete") {
      let linkIndex = property.linksToWebsites.indexOf(item);
      property.linksToWebsites.splice(linkIndex, 1);
    } else if (title == "openHoueDelete") {
      let openHouseIndex = property.isOpenHouse.indexOf(item);
      property.isOpenHouse.splice(openHouseIndex, 1);
    }
    this.setState({ property });
  }

  addLinksToWebsites(e) {
    let { linksToWebsites, property } = this.state;
    if (linksToWebsites.url && linksToWebsites.text) {
      property.linksToWebsites.push(linksToWebsites);
      linksToWebsites = {
        text: '', url: ""
      }
      this.setState({ linksToWebsites, property });

    }
  }

  show(flag, id) {
    let states = Object.assign({}, this.state);
    switch (flag) {
      case "openHouse":
        states.property.isOpenHouse.display = true;
        break;
      case "mlsNumber":
        states.property.mlsNumber.display = true;
        break;
      case "linksToWebsites":
        states.property.linksToWebsites.display = true;
        break;
      case "garage":
        states.property.generalPropertyInformation.garage = true;
        break;
    }
    this.setState(states);
  }

  hide(flag, id) {
    let states = Object.assign({}, this.state);
    switch (flag) {
      case "openHouse":
        states.property.isOpenHouse.display = false;
        break;
      case "mlsNumber":
        states.property.mlsNumber.display = false;
        break;
      case "linksToWebsites":
        states.property.linksToWebsites.display = false;
        break;
      case "garage":
        states.property.generalPropertyInformation.garage = false;
        break;
    }
    this.setState(states);
  }

  handleChange(flag, event) {
    event.preventDefault();
    const { name, value } = event.target;
    let states = Object.assign({}, this.state);
    this.setState(states);
    switch (flag) {
      case "email":
        states.Email[name] = value;
        this.setState(states);
        break;
      case "propertyPricing":
        states.property.pricingInfo[name] = value;
        this.setState(states);
        break;
      case "propertyAddress":
        states.property.propertyAddress[name] = value;
        let user = JSON.parse(localStorage.getItem("user"));
        states.property.userId = user.userId;
        this.setState(states);
        break;
      case "mlsNumber":
        states.property.mlsNumber[name] = value;
        this.setState(states);
        break;
      case "propertyInformation":
        states.property.generalPropertyInformation[name] = value;
        this.setState(states);
        break;

      case "propertyInformationBathrooms":
        states.property.generalPropertyInformation.numberOfBathrooms[
          name
        ] = value;
        this.setState(states);
        break;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.uploadBlast && nextProps.uploadBlast.blastData) {
      let blast = nextProps.uploadBlast;
      this.propsDataupdate(blast);
    }

    if (nextProps.propertyData && nextProps.propertyData.templateData) {
      let templateData = nextProps.propertyData;
      this.propsDataupdate(templateData);
    }
  }

  //propsDataupdate(data, agentData, profile, images) {
  propsDataupdate(data) {
    let states = Object.assign({}, this.state);

    if (data && data.templateData) {
      states.templateId = data.templateData._id;
      this.setState({ templateId: data.templateData._id });
    }

    if (data && data.blastData) {
      states.blast_id = data.blastData._id;
      this.setState({ blast_id: data.blastData._id });
    }
  }

  componentDidMount() {
    let states = Object.assign({}, this.state);
    let user = JSON.parse(localStorage.getItem("user"));
    if (user && user.userId) {
      states.property.userId = user.userId;
      window.scrollTo(0, 0);
    }
    this.setState(states)
  }

  saveProperty(event) {
    event.preventDefault();
    const { propertyData } = this.props;
    // console.log("ids on submit", propertyData);
    const templateId = propertyData.templateData._id;
    const { blast_id } = this.props;
    const { property, Email } = this.state;
    const { dispatch } = this.props.dispatchval.dispatch;
    if (
      property &&
      Email.formSubject &&
      Email.formReply
    ) {
      let properties = [];
      properties.push(property);
      dispatch(userActions.saveProperty(properties, "", Email, "", templateId, blast_id));

      this.setState({ submitForm: true });
    } else {
      this.setState({ submitted: true });
    }
  }

  render() {
    const { errors, property, disabled, alert,
      submitted, Email, blastImageUrl, submitForm, linksToWebsites, isOpenHouse, openHouseAdd
    } = this.state;
    console.log("state in Uplaod Blast ", this.state);
    let propertyImg = "";
    if (blastImageUrl) {
      propertyImg = config.uploadapiUrl + "/uploads/" + blastImageUrl;
    }

    const { uploadBlast } = this.props;
    return (
      <div
        className="tab-pane fade mt-2"
        id="details"
        role="tabpanel"
        aria-labelledby="group-dropdown2-tab"
        aria-expanded="false"
      >
        <h4>Blast Details</h4>

        <form
          className="form-a contactForm"
          method="post"
          role="form"
        >
          <h5 className="required"> Email Subject Line, From Line & Reply to Sender</h5>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label className="required">Email Subject</label>
                <input
                  name="formSubject"
                  type="text"
                  onChange={(e) => this.handleChange("email", e)}
                  className="form-control form-control-lg form-control-a"
                  placeholder="Subject"
                  value={Email && Email.formSubject}
                />
                <div className="validation">
                  {
                    (submitted && !Email.formSubject && "Email is required")}
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label className="required">From Line</label>
                <input
                  name="formLine"
                  type="text"
                  onChange={(e) => this.handleChange("email", e)}
                  className="form-control form-control-lg form-control-a"
                  placeholder="Eg. Your Name"
                  value={Email && Email.formLine}
                />
                <div className="validation">
                  {(submitted && !Email.formLine && "Form Line is required")}
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label className="required">Reply To Address</label>
                <input
                  name="formReply"
                  type="email"
                  onChange={(e) => this.handleChange("email", e)}
                  className="form-control form-control-lg form-control-a"
                  placeholder="name@domain.com"
                  value={Email && Email.formReply}
                />
                <div className="validation">
                  {(submitted &&
                    !Email.formReply &&
                    "Form Reply Line is required")}
                </div>
              </div>
            </div>
          </div>
          <hr />
          <br />

          <div >
            <h5>Links to Websites, Virtual Tours or other Material</h5>
            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <a href="javascript:void(0)" className="btn btn-success"
                    onClick={() => this.show("linksToWebsites", property, true)}                    >
                    Yes
                </a>
                  <a href="javascript:void(0)" className="btn btn-outline-danger"
                    onClick={() => this.hide("linksToWebsites", i)}                    >
                    No
                </a>
                </div>
              </div>
            </div>
            <div style={{
              display:
                property.linksToWebsites &&
                  property.linksToWebsites.display
                  ? "inline"
                  : "none",
            }}  >
              <p>
                Add links to your property below. NOTE. Links will not be
                saved to your blast until you Click Next
            </p>
              <div className="row">
                <div className="col-md-5 mb-3">
                  <div className="form-group">
                    <label>URL</label>
                    <input type="text" name="url" className="form-control form-control-lg form-control-a"
                      placeholder="e.g. http://www.marketingpackage.com"
                      onChange={this.linksToWebsitesChange}
                      value={linksToWebsites.url}
                    />
                  </div>
                </div>
                <div className="col-md-5 mb-3">
                  <div className="form-group">
                    <label>Anchor Text</label>
                    <input type="text" name="text" className="form-control form-control-lg form-control-a"
                      placeholder="e.g. Download Our Marketing Package" onChange={this.linksToWebsitesChange}
                      value={linksToWebsites.text}
                    />
                  </div>
                </div>
                <div className="col-md-2 mb-3">
                  <div className="form-group pt-4">
                    <a href="javascript:void(0)" className="btn btn-primary"
                      onClick={(e) => this.addLinksToWebsites(e, property)}                      >
                      Add
                  </a>
                  </div>
                </div>
              </div>
              <table
                className="table table-bordered"
                style={{ width: "100%" }}  >
                <thead>
                  <tr>
                    <th>URL</th>
                    <th>Text</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {property.linksToWebsites &&
                    property.linksToWebsites.length > 0 &&
                    property.linksToWebsites.map(
                      function (linkData, linkIndex) {
                        return (
                          <tr key={linkIndex}>
                            <td>
                              {linkData.url}
                            </td>
                            <td>
                              {linkData.text}
                            </td>
                            <td>
                              <i className="fa fa-trash" aria-hidden="true" name="linkData"
                                onClick={(e) => this.editOrDelete(e, "delete", property, linkData)}
                                title="linkDelete"
                              ></i>
                            </td>
                          </tr>
                        );
                      },
                      this
                    )}
                </tbody>
              </table>
            </div>


            <div >
              <h5> Upload Flyer</h5>
              <div className="col-md-12 mb-3">
                <span className="red">
                  *The following file formats can be uploaded. jpg, png,
                  gif, eps and pdf
                      <br />
                      *Image Required
                    </span>
              </div>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <div
                    className="card"
                    style={{ width: "650px", margin: "20px 0 24px 0" }}
                  >
                    <img
                      className="card-img-top"
                      src={
                        propertyImg ||
                        "../../../public/assets/images/img-4.png"
                      }
                      alt="image"
                      style={{ width: "100%" }}
                    />

                    <div className="card-body">
                      <h4 className="card-title">Upload Your Own Flyer</h4>
                      <input
                        type="file"
                        id="imgupload"
                        style={{ display: "none" }}
                        onChange={this.imageChange}
                      />
                      <a
                        href="javascript:void(0)"
                        className="btn btn-primary"
                        id="OpenImgUpload"
                        onClick={this.openUpload}
                      >
                        Select
                          </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <br />
            <h5>Is this an Open House?</h5>
            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <a href="javascript:void(0)" className="btn btn-success"
                    onClick={() => this.show("openHouse", property, true)}   >
                    Yes
                    </a>
                  <a href="javascript:void(0)" className="btn btn-outline-danger"
                    onClick={() => this.show("openHouse", property, false)} >
                    No
                  </a>
                </div>
              </div>
            </div>

            <div
              style={{
                display:
                  property.isOpenHouse &&
                    property.isOpenHouse.display
                    ? "inline"
                    : "none",
              }}              >
              <div className="row">
                <div className="col-md-3 mb-3">
                  <div className="form-group">
                    <label className="required">Type</label>
                    <div className="form-group">
                      <select className="form-control form-control-lg form-control-a"
                        name="houseType"
                        value={isOpenHouse.houseType}
                        onChange={this.openHouseChange}                        >
                        <option value="">Select</option>
                        <option value="Open House">Open House</option>
                        <option value="Broker Open">Broker Open</option>
                        <option value="Agent Tour">Agent Tour</option>
                      </select>
                    </div>
                    <div className="validation">
                      {openHouseAdd &&
                        (!property.isOpenHouse ||
                          !property.isOpenHouse.houseType) && "This field is required"}
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="form-group">
                    <label className="required">Date</label>
                    <input className="form-control form-control-lg form-control-a" type="date"
                      name="date" onChange={this.openHouseChange}
                      value={isOpenHouse.date}
                    />
                  </div>
                  <div className="validation">
                    {openHouseAdd &&
                      (!property.isOpenHouse ||
                        !property.isOpenHouse.date) && "This field is required."}
                  </div>
                </div>
                <div className="col-md-2 mb-3">
                  <div className="form-group">
                    <label>Start Time</label>
                    <input className="form-control  form-control-lg form-control-a"
                      type="time" name="startTime"
                      onChange={this.openHouseChange}
                      value={isOpenHouse.startTime}
                    />
                  </div>
                </div>
                <div className="col-md-2 mb-3">
                  <div className="form-group">
                    <label>End Time</label>
                    <input className="form-control  form-control-lg form-control-a"
                      type="time" onChange={this.openHouseChange}
                      name="endTime" value={isOpenHouse.endTime}
                    />
                  </div>
                </div>
                <div className="col-md-2 mb-3">
                  <div className="form-group pt-4">
                    <a href="javascript:void(0)"
                      className="btn btn-primary"
                      onClick={(e) => this.addOpenHouse(e, property)}                      >
                      Add
                  </a>
                  </div>
                </div>
              </div>
              <table
                className="table table-bordered"
                style={{ width: "100%" }}                >
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {property.isOpenHouse &&
                    property.isOpenHouse.length > 0 &&
                    property.isOpenHouse.map(function (openHouse, openHouseIndex) {
                      return (
                        <tr key={openHouseIndex}>
                          <td>  {openHouse.houseType}   </td>
                          <td>  {openHouse.date}  </td>
                          <td>
                            {openHouse.startTime && this.to12hourTime(openHouse.startTime) + " to " + this.to12hourTime(openHouse.endTime)}
                          </td>
                          <td>
                            <i className="fa fa-trash" aria-hidden="true"
                              title="openHoueDelete"
                              onClick={(e) => this.editOrDelete(e, "delete", property, openHouse)
                              }
                            ></i>
                          </td>
                        </tr>
                      );
                    },
                      this
                    )}
                </tbody>
              </table>
            </div>
            <h5>Property Pricing Information</h5>
            <div className="row">
              <div className="col-md-4 mb-3">
                <div className="form-group">
                  <label className="required">Price</label>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-usd"></i>
                      </span>
                    </div>
                    <input type="text" name="price" onChange={(e) => this.handleChange("propertyPricing", e, property)}
                      value={property.pricingInfo && property.pricingInfo.price
                      }
                      className="form-control form-control-lg form-control-a"
                    />
                  </div>
                  <div className="validation">
                    {submitted &&
                      (!property.pricingInfo ||
                        !property.pricingInfo.price) &&
                      "Price is required"}
                  </div>
                </div>
              </div>
              <div className="col-md-8 mb-3">
                <div className="form-group">
                  <div className="form-group">
                    <label className="required">Price Display Type</label>
                    <select className="form-control form-control-lg form-control-a" name="priceType"
                      onChange={(e) => this.handleChange("propertyPricing", e, property)}
                      vlaue={property.pricingInfo && property.pricingInfo.priceType} >
                      <option value="">Select Price Display Type</option>
                      <option>Display Price Specified</option>
                      <option>Replace Price with 'AUCTION'</option>
                      <option>Replace Price with 'Call For Pricing'</option>
                      <option>Replace Price with 'Call For Offers'</option>
                      <option>Display Price per Square Foot</option>
                      <option>Display Price per Month</option>
                      <option>Display as Value Price Range</option>
                    </select>
                  </div>
                  <div className="validation">
                    {submitted &&
                      (!property.pricingInfo ||
                        !property.pricingInfo.priceType) &&
                      "Price is required"}
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <br />
            <h5>Property Address</h5>
            <div className="row">
              <div className="col-md-4 mb-3">
                <div className="form-group">
                  <label className="required">Address Display Method:</label>
                  <select className="form-control form-control-lg form-control-a" name="displayMethod"
                    onChange={(e) => this.handleChange("propertyAddress", e, property)}
                    value={property.propertyAddress && property.propertyAddress.displayMethod} >
                    <option>Select Address Display Method</option>
                    <option>Show Entire Address</option>
                    <option>Show City & State Only</option>
                    <option>DO NOT Show Address</option>
                  </select>
                </div>
                <div className="validation">
                  {submitted &&
                    (!property.propertyAddress ||
                      !property.propertyAddress.displayMethod) &&
                    "Price is required"}
                </div>
              </div>
              <div className="col-md-8 mb-3">
                <div className="form-group">
                  <label className="required">Street Address</label>
                  <input type="text" name="streetAddress" className="form-control form-control-lg form-control-a" placeholder="Street Address"
                    onChange={(e) => this.handleChange("propertyAddress", e, property)}
                    value={property.propertyAddress && property.propertyAddress.streetAddress} />
                </div>
                <div className="validation">
                  {submitted &&
                    (!property.propertyAddress ||
                      !property.propertyAddress.streetAddress) &&
                    "Price is required"}
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="form-group">
                  <label className="required">City</label>
                  <input type="text" name="city" className="form-control form-control-lg form-control-a"
                    placeholder="City" onChange={(e) => this.handleChange("propertyAddress", e, property)}
                    value={property.propertyAddress && property.propertyAddress.city} />
                </div>
                <div className="validation">
                  {submitted &&
                    (!property.propertyAddress ||
                      !property.propertyAddress.city) &&
                    "Price is required"}
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="form-group">
                  <label className="required">State</label>
                  <select className="form-control form-control-lg form-control-a" name="state"
                    value={property.propertyAddress && property.propertyAddress.state}
                    onChange={(e) => this.handleChange("propertyAddress", e, property)}>
                    <option value="">Select State</option>
                    {globalData.USstates.map((st) =>
                      <option key={st}>{st}</option>
                    )}
                  </select>
                  <div className="validation">
                    {submitted &&
                      (!property.propertyAddress ||
                        !property.propertyAddress.state) &&
                      "Price is required"}
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="form-group">
                  <label>Zip Code</label>
                  <input type="text" name="zipCode" className="form-control form-control-lg form-control-a"
                    placeholder="Zip Code" onChange={(e) => this.handleChange("propertyAddress", e, property)}
                    value={
                      property.propertyAddress &&
                      property.propertyAddress.zipCode
                    }
                  />
                </div>
              </div>
            </div>
            <hr />
            <br />
            <h5>Do you have a MLS Number?</h5>
            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <a href="javascript:void(0)" className="btn btn-success"
                    onClick={() => this.show("mlsNumber", property, true)} >
                    Yes
                </a>
                  <a href="javascript:void(0)" className="btn btn-outline-danger"
                    onClick={() => this.show("mlsNumber", property, false)}>
                    No
                </a>
                </div>
              </div>
            </div>
            <div className="row" style={{
              display:
                property.mlsNumber &&
                  property.mlsNumber.display
                  ? "flex"
                  : "none"
            }}  >
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label className="required">MLS Number</label>
                  <input type="text" name="numberProperty" className="form-control form-control-lg form-control-a"
                    placeholder="Enter the MLS Number for Property" onChange={(e) => this.handleChange("mlsNumber", e, property)}
                    value={property.mlsNumber && property.mlsNumber.numberProperty
                    }
                  />
                </div>
                <div className="validation">
                  {submitted && (!property.mlsNumber || !property.mlsNumber.numberProperty) && "This field is required."}
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label>
                    Which 'board / association' represents the Realtors
                    where this property is located?
                </label>
                  <p className="red required">
                    Attention: This is NOT a 'database step'. Click
                    INSTRUCTIONS on the left for more details
                </p>
                  <div className="form-group">
                    <select className="form-control form-control-lg form-control-a" name="boardAssociation"
                      onChange={(e) => this.handleChange("mlsNumber", e, property)}
                      value={property.mlsNumber && property.mlsNumber.boardAssociation} >
                      <option value="">
                        -- Please Select a board / association for our
                        'Internal Sourcing' --
                    </option>
                      <option>
                        Amelia Island-Nassau County Real Estate Agent List
                    </option>
                      <option>Bartow Real Estate Agent List</option>
                      <option>
                        Bonita Springs-Estero Real Estate Agent List
                    </option>
                      <option>
                        Broward, Palm Beaches, and St. Lucie Real Estate
                        Agent List (includes Ft Lauderdale)
                    </option>
                      <option>
                        Central Panhandle Real Estate Agent List
                    </option>
                      <option>Citrus County Real Estate Agent List</option>
                      <option>
                        Daytona Beach Area Real Estate Agent List
                    </option>
                      <option>
                        Dixie Gilchrist Levy Counties Real Estate Agent List
                    </option>
                      <option>East Pasco Real Estate Agent List</option>
                      <option>
                        East Polk County Real Estate Agent List
                    </option>
                      <option>Emerald Coast Real Estate Agent List</option>
                      <option>Englewood Area Real Estate Agent List</option>
                      <option>Flagler County Real Estate Agent List</option>
                      <option>Florida Keys Real Estate Agent List</option>
                      <option>
                        Fort Myers/Cape Coral Merger(Royal Palm Coast Real
                        Estate Agent List)
                    </option>
                      <option>
                        Franklin &amp; Gulf Counties Real Estate Agent List
                    </option>
                    </select>
                    <div className="validation">
                      {submitted &&
                        (!property.mlsNumber &&
                          !property.mlsNumber.boardAssociation) &&
                        "Price is required"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <br />
            <h5>General Property Information</h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label>Property Type:</label>
                  <div className="form-group">
                    <select
                      className="form-control form-control-lg form-control-a"
                      name="propertyType"
                      onChange={(e) =>
                        this.handleChange("propertyInformation", e)
                      }
                      value={
                        property.generalPropertyInformation &&
                        property.generalPropertyInformation
                          .propertyType
                      }
                    >
                      <option value="" className="">
                        -- Select Property Type --
                          </option>
                      <option>Single Family</option>
                      <option>Condo/townhome/row home/co-op</option>
                      <option>Duplex</option>
                      <option>Farm/Ranch</option>
                      <option>Mfd/Mobile/Modular Home</option>
                      <option>Vacant Lot / Vacant Land</option>
                      <option>Rental Income Property</option>
                      <option>Other, N/A</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <hr />
            <br />
          </div>

          <div className="col-md-12 mt-4">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.saveProperty}  >
              Save
              </button>
            <button
              type="button"
              className="btn btn-primary pull-right"
               onClick={this.nextPage}
              disabled={!submitForm}
            >
              Next
              </button>
          </div>
        </form>
      </div>
    );
  }
}

export default UploadBlastTab;
