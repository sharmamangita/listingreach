import React from "react";
import { userActions } from "../actions";
import { authHeader } from "../helpers";
const axios = require("axios");
import config from "config";
import { globalData } from '../constants/data.constants';

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
      _id: "",
      blast_id: "",
      userId: user.userId,
      isOpenHouse: [],
      pricingInfo: {
        price: "",
        priceType: "",
      },
      display_method: "",
      street_address: "",
      city: "",
      state: "",
      zipcode: "",
      board: "",
      mls_number: "",
      property_type: "",
      property_style: "",
      price: "",
      building_size: "",
      lot_size: "",
      lotType: "",
      number_bedrooms: "",
      number_bathrooms: {
        full: "",
        half: "",
      },
      year_built: "",
      number_stories: "",
      garage: false,
      garageSize: "",
      property_details: "",
      linksToWebsites: [],
      propertyImages: []
    };
    this.state = {
      showprofilelogo: false,
      showprofileimage: false,
      userId: "",
      blast_id: "",
      submitForm: true,
      blastImageUrl: "",
      templateId: "",
      disabled: true,
      agentData: Object.assign({
        name: "",
        designation: "",
        email: "",
        website_url: "",
        phone_number: "",
        company_details: "",
        other_information: "",
        image_url: "",
        logo_url: "",
      }, this.props.agentData),
      template: {
        _id: null,
        template_type: null,
        address: null,
        email_subject: null,
        from_line: null,
        headline: null
      },
      property,
      linksToWebsites,
      isOpenHouse,
      openHouseAdd: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleTemplateChange = this.handleTemplateChange.bind(this);
    this.show = this.show.bind(this);
    this.addOpenHouse = this.addOpenHouse.bind(this);
    this.openHouseChange = this.openHouseChange.bind(this);
    this.linksToWebsitesChange = this.linksToWebsitesChange.bind(this);
    this.addLinksToWebsites = this.addLinksToWebsites.bind(this);
    this.editOrDelete = this.editOrDelete.bind(this);
    this.saveProperty = this.saveProperty.bind(this);
    this.openUpload = this.openUpload.bind(this);
    this.imageChange = this.imageChange.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.isValidEmail = this.isValidEmail.bind(this);
  }
  componentWillMount() {
    this.initialize();
  }
  initialize() {
    console.log("PORPS in  Construcot ", this.props)
    if (this.props.activeTab == "property") {
      if (this.props.properties && this.props.properties.length > 0) {
        let props = this.props.properties;
        props.forEach(function (prop) {
          if (prop.isOpenHouse) {
            prop.isOpenHouse["display"] = prop.isOpenHouse.length > 0;
          }
          if (prop.linksToWebsites) {
            prop.linksToWebsites["display"] = prop.linksToWebsites.length > 0;
          }
          if (prop.mls_number) {
            prop["displayMls"] = typeof (prop.mls_number) != "undefined";
          }
        })
        this.setState({ property: this.props.properties[0] });
      }
      if (this.props.template) {
        // alert(this.props.template._id)
        this.setState({ template: this.props.template });
      }
    }
  }

  openUpload() {
    $("#imgupload").trigger("click");
  }

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
    this.setState({ submitForm: false })
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
          imageId: response.data.imageId,
          imageUrl: response.data.url,
        }
        let { blastImageUrl, property } = this.state;

        blastImageUrl = response.data.url;
        if (property.propertyImages.length > 0) {
          property.propertyImages[0] = image;
        } else {
          property.propertyImages.push(image);
        }
        this.setState({ blastImageUrl, property, submitForm: true });
        // this.render();
      })
      .catch(() => { });
  }

  nextPage() {
    this.props.moveTab("preview");
  }
  selectBlast(blast_type) {
    if (blast_type) {
      const { dispatch } = this.props.dispatchval.dispatch;
      const { userId } = this.state;
      dispatch(userActions.blast(blast_type, userId));
    }
  }

  addOpenHouse() {
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
    const { name, value } = event.target;

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

  editOrDelete(event, item) {
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

  addLinksToWebsites() {
    let { linksToWebsites, property } = this.state;
    if (linksToWebsites.url && linksToWebsites.text) {
      property.linksToWebsites.push(linksToWebsites);
      linksToWebsites = {
        text: '', url: ""
      }
      this.setState({ linksToWebsites, property });

    }
  }

  show(flag, value) {
    // let states = Object.assign({}, this.state);
    let { property } = this.state;

    switch (flag) {
      case "openHouse":
        property.isOpenHouse.display = value;
        break;
      case "mlsNumber":
        property.displayMls = value;
        break;
      case "linksToWebsites":
        property.linksToWebsites.display = value;
        break;
      case "garage":
        property.generalPropertyInformation.garage = value;
        break;
    }
    this.setState({ property });
  }
  handleChange(event, category) {
    event.preventDefault();
    const { name, value } = event.target;
    let property = this.state.property;
    if (category == "propertyPricing") {
      property.pricingInfo[name] = value;
    }
    else {
      property[name] = value;
    }

    this.setState({ property });
  }
  handleTemplateChange(event) {
    const { name, value } = event.target;
    let template = this.state.template;
    template[name] = value;
    this.setState({ template });
  }
  componentWillReceiveProps(nextProps) {

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
  isValidEmail(email) {
    return (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email));
  }
  saveProperty(event) {
    event.preventDefault();
    const { property, template } = this.state;
    const { dispatch } = this.props.dispatchval.dispatch;
    const validemail = this.isValidEmail(template.address);
    this.setState({ submitted: true });
    let isvalid = true;
    let properties = [];
    properties.push(property);
    if (properties && properties.length > 0) {
      properties.forEach(function (prop) {
        console.log(prop);
        if (!template.email_subject || !template.from_line || (!template.address || !validemail)) {
          isvalid = false;
          console.log("validation failed for email fields ");
        }

        if (!prop.pricingInfo || !prop.pricingInfo.price || !prop.pricingInfo.priceType) {
          isvalid = false;
          console.log("validation failed property pricing", prop.pricingInfo);
        }
        if (!prop.display_method || !prop.street_address || !prop.state || !prop.city) {
          isvalid = false;
          console.log("validation failed property address");
        }
        if (prop.displayMls && (!prop.board || !prop.mls_number)) {
          isvalid = false;
          console.log("validation failed property MLS Number", prop.mls_number);
        }
        if (!prop.property_type) {
          isvalid = false;
          console.log("validation failed general property info");
        }
        if (!prop.propertyImages || prop.propertyImages.length < 1) {
          isvalid = false;
          console.log("validation failed for image");
        }
      })
    } else {
      isvalid = false;
      console.log("No properties added");
    }
    if (isvalid) {
      //  alert("submitting...")
      const { blastId } = this.props;
      dispatch(userActions.saveProperty(properties, null, template, blastId));
      this.setState({ submitted: false });
    } else {
      alert("some required fields were not filled");
    }
  }

  render() {
    const { property, template, submitted, blastImageUrl,
      submitForm, linksToWebsites, isOpenHouse, openHouseAdd
    } = this.state;
    console.log("state in Uplaod Blast ", this.state);
    let propertyImg = "";
    if (blastImageUrl) {
      propertyImg = config.uploadapiUrl + "/uploads/" + blastImageUrl;
    }

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
                  name="email_subject"
                  type="text"
                  onChange={(e) => this.handleTemplateChange(e)}
                  className="form-control form-control-lg form-control-a"
                  placeholder="Subject"
                  value={template && template.email_subject}
                />
                <div className="validation">
                  {
                    (submitted && !template.email_subject && "Email is required")}
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label className="required">From Line</label>
                <input
                  name="from_line"
                  type="text"
                  onChange={(e) => this.handleTemplateChange(e)}
                  className="form-control form-control-lg form-control-a"
                  placeholder="Eg. Your Name"
                  value={template && template.from_line}
                />
                <div className="validation">
                  {(submitted && !template.from_line && "Form Line is required")}
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label className="required">Reply To Address</label>
                <input
                  name="address"
                  type="email"
                  onChange={(e) => this.handleTemplateChange(e)}
                  className="form-control form-control-lg form-control-a"
                  placeholder="name@domain.com"
                  value={template && template.address}
                />
                <div className="validation">
                  {(submitted &&
                    !template.address &&
                    "Form Reply Line is required")}
                      {submitted && template.address && !this.isValidEmail(template.address) && "Invalid email address."}
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
                    onClick={() => this.show("linksToWebsites", property, false)}                    >
                    No
                </a>
                </div>
              </div>
            </div>
            <div style={{
              display:
                property.linksToWebsites && property.linksToWebsites.display
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
                      onClick={() => this.addLinksToWebsites()}                      >
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
                    property.linksToWebsites.display &&
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
                    <img className="card-img-top"
                      src={
                        property.propertyImages.length > 0
                        && config.uploadapiUrl + "/uploads/" + property.propertyImages[0].imageUrl ||
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
                      <div className="validation">
                        {submitted &&
                          (!property.propertyImages ||
                            property.propertyImages.length < 1) && "Image is required."}
                      </div>
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
                  property.isOpenHouse && property.isOpenHouse.display
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
                      onClick={() => this.addOpenHouse()}                      >
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
                    <input type="text" name="price" onChange={(e) => this.handleChange(e, "propertyPricing")}
                      value={property.pricingInfo && property.pricingInfo.price}
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
                      value={property.pricingInfo && property.pricingInfo.priceType}
                      onChange={(e) => this.handleChange(e, "propertyPricing")}>
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
                  <select className="form-control form-control-lg form-control-a" name="display_method"
                    value={property && property.display_method}
                    onChange={(e) => this.handleChange(e, property)}>
                    <option>Select Address Display Method</option>
                    <option>Show Entire Address</option>
                    <option>Show City & State Only</option>
                    <option>DO NOT Show Address</option>
                  </select>
                </div>
                <div className="validation">
                  {submitted &&
                    (!property ||
                      !property.display_method) &&
                    "Price is required"}
                </div>
              </div>
              <div className="col-md-8 mb-3">
                <div className="form-group">
                  <label className="required">Street Address</label>
                  <input type="text" name="street_address" className="form-control form-control-lg form-control-a" placeholder="Street Address"
                    value={property && property.street_address}
                    onChange={(e) => this.handleChange(e, property)} />
                </div>
                <div className="validation">
                  {submitted &&
                    (!property ||
                      !property.street_address) &&
                    "Price is required"}
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="form-group">
                  <label className="required">City</label>
                  <input type="text" name="city" className="form-control form-control-lg form-control-a"
                    placeholder="City"
                    value={property && property.city}
                    onChange={(e) => this.handleChange(e, property)}
                  />
                </div>
                <div className="validation">
                  {submitted &&
                    (!property || !property.city) && "Price is required"}
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="form-group">
                  <label className="required">State</label>
                  <select className="form-control form-control-lg form-control-a" name="state"
                    value={property && property.state}
                    onChange={(e) => this.handleChange(e, property)}>
                    <option value="">Select State</option>
                    {globalData.USstates.map((st) =>
                      <option key={st}>{st}</option>
                    )}
                  </select>
                  <div className="validation">
                    {submitted &&
                      (!property ||
                        !property.state) && "Price is required"}
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="form-group">
                  <label>Zip Code</label>
                  <input type="text" name="zipcode" className="form-control form-control-lg form-control-a"
                    placeholder="Zip Code"
                    value={property && property.zipcode}
                    onChange={(e) => this.handleChange(e, property)}
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
                    onClick={() => this.show("mlsNumber", true)} >
                    Yes
                </a>
                  <a href="javascript:void(0)" className="btn btn-outline-danger"
                    onClick={() => this.show("mlsNumber", false)}>
                    No
                </a>
                </div>
              </div>
            </div>
            <div className="row" style={{
              display:
                property.displayMls
                  ? "flex"
                  : "none"
            }}  >
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label className="required">MLS Number</label>
                  <input type="text" name="mls_number" className="form-control form-control-lg form-control-a"
                    placeholder="Enter the MLS Number for Property" onChange={(e) => this.handleChange(e, property)}
                    value={property && property.mls_number}
                  />
                </div>
                <div className="validation">
                  {submitted && (!property || !property.mls_number) && "This field is required."}
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
                    <select className="form-control form-control-lg form-control-a" name="board"
                      value={property && property.board}
                      onChange={(e) => this.handleChange(e, property)}
                    >
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
                        (!property && !property.board) && "Price is required"}
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
                  <label className="required">Property Type:</label>
                  <div className="form-group">
                    <select
                      className="form-control form-control-lg form-control-a"
                      name="property_type"
                      value={property && property.property_type}
                      onChange={(e) => this.handleChange(e)
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
              type="button" className="btn btn-primary"
              onClick={this.saveProperty}
              disabled={!submitForm} >
              Save
              </button>
            <button
              type="button" className="btn btn-primary pull-right"
              onClick={this.saveProperty}
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
