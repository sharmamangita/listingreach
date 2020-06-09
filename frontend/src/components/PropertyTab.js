import React from "react";
import { userActions } from "../actions";
import config from 'config';
import { globalData } from '../constants/data.constants';
import ProfileimageModal from '../components/ProfileimageModal';
import ProfilelogoModal from '../components/ProfilelogoModal';

class PropertyTab extends React.Component {
  constructor(props) {
    super(props);
    this.navId = "";
    this.initializeState();

    this.handleChange = this.handleChange.bind(this);
    this.show = this.show.bind(this);
    this.addOpenHouse = this.addOpenHouse.bind(this);
    this.openHouseChange = this.openHouseChange.bind(this);
    this.linksToWebsitesChange = this.linksToWebsitesChange.bind(this);
    this.addLinksToWebsites = this.addLinksToWebsites.bind(this);
    this.editOrDelete = this.editOrDelete.bind(this);
    this.saveProperty = this.saveProperty.bind(this);
    this.openHouseArrayChange = this.openHouseArrayChange.bind(this);
    this.addProperty = this.addProperty.bind(this);
    this.deleteProperty = this.deleteProperty.bind(this);

  }

  initializeState() {
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
    var properties = [];
    properties.push(this.newProperty());
    var blast = {
      _id: null,
      blast_type: null,
      user_id: null,
      status: null,
      selected_template_id: null,
      scheduledDate: null
    };
    this.state = {
      showprofilelogo: false,
      showprofileimage: false,
      blast,
      userId: "",
      blast_id: "",
      disabled: true,
      submitted: false,
      profile: this.props.profile,
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
      isOpenHouse,
      openHouseAdd: false,
      linksToWebsites,
      properties
    };
  }

  newProperty() {
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
    return property;
  }

  addProperty() {
    var { properties } = this.state;
    properties.push(this.newProperty());
    this.setState({
      properties
    });
  }

  deleteProperty(i) {
    var { properties } = this.state;
    properties.splice(i, 1);
    this.setState(properties);
  }

  selectBlast(blast_type) {
    if (blast_type) {
      const { dispatch } = this.props.dispatchval.dispatch;
      const { userId } = this.state;
      dispatch(userActions.blast(blast_type, userId));
    }
  }

  addOpenHouse(property) {
    let { properties, isOpenHouse } = this.state;
    let index = properties.indexOf(property);
    if (index > -1 && isOpenHouse.houseType && isOpenHouse.date) {
      properties[index].isOpenHouse.push(isOpenHouse);
      isOpenHouse = {
        houseType: "",
        date: "",
        startTime: "",
        endTime: ""
      }
      this.setState({ properties, isOpenHouse, openHouseAdd: false });
    } else {
      this.setState({ openHouseAdd: true });
    }
  }

  openHouseArrayChange(event) {
    const { id, name, value } = event.target;
    let keys = id.split("-");
    let openHouseArray = Object.assign({}, this.state);
    openHouseArray.properties[keys[0]].isOpenHouse.openHouseData[
      keys[1]
    ].openHouseData[name] = value;
    if (
      openHouseArray.properties[keys[0]].isOpenHouse.openHouseData[keys[1]]
        .openHouseData[name]
    ) {
      openHouseArray.alert.type = "success";
      openHouseArray.alert.message = "Data is updated successfully";
      openHouseArray.alert.alertIsOpenHouse = true;
      this.setState({ disabled: false }, () => {
        window.setTimeout(() => {
          this.setState({
            disabled: true,
            ...this.state.alert,
            alertIsOpenHouse: false,
          });
        }, 2000);
      });
    } else {
      openHouseArray.alert.type = "danger";
      openHouseArray.alert.message = "Data is not updated successfully";
      openHouseArray.alert.alertIsOpenHouse = true;
    }

  }

  linkArrayDelete(linkIndex) {
    let keys = linkIndex.split("-");
    let linkArray = Object.assign({}, this.state);
    linkArray.properties[keys[0]].linksToWebsites.linkData.splice(
      [keys[1]],
      1
    );
    this.setState(linkArray);
  }

  openHouseChange(event) {
    event.preventDefault();
    let { isOpenHouse } = this.state;
    var { name, value } = event.target;
    if (value != "" && name != "") {
      isOpenHouse[name] = value;
      this.setState({ isOpenHouse })
      this.AddButton = true;
    } else {
      this.AddButton = false;
    }
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
  linksToWebsitesChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    let { linksToWebsites } = this.state
    if (value != "" && name != "") {
      linksToWebsites[name] = value;
      this.setState({ linksToWebsites });
    }
  }

  editOrDelete(event, property, item) {
    const { title } = event.target;
    //  console.log(event.target);
    //  console.log(event.target.title);
    let { properties } = this.state;
    let index = properties.indexOf(property);
    if (title == "linkDelete") {
      let linkIndex = properties[index].linksToWebsites.indexOf(item);
      properties[index].linksToWebsites.splice(linkIndex, 1);
    } else if (title == "openHoueDelete") {
      let openHouseIndex = properties[index].isOpenHouse.indexOf(item);
      properties[index].isOpenHouse.splice(openHouseIndex, 1);
    }
    this.setState({ properties });
  }

  addLinksToWebsites(property) {
    let { linksToWebsites, properties } = this.state;
    let index = properties.indexOf(property);
    if (index > -1 && linksToWebsites.url && linksToWebsites.text) {
      properties[index].linksToWebsites.push(linksToWebsites);
      linksToWebsites = {
        text: '', url: ""
      }
      this.setState({ linksToWebsites, properties });

    }
  }

  show(flag, property, value) {
    // let states = Object.assign({}, this.state);
    let { properties } = this.state;
    var index = properties.indexOf(property);

    switch (flag) {
      case "openHouse":
        properties[index].isOpenHouse.display = value;
        break;
      case "mlsNumber":
        properties[index].displayMls = value;
        break;
      case "linksToWebsites":
        properties[index].linksToWebsites.display = value;
        break;
      case "garage":
        properties[index].garage = value;
        break;
    }
    this.setState({ properties });
  }
  componentDidMount() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user && user.userId && this.props && this.props.dispatchval) {
      const { dispatch } = this.props.dispatchval.dispatch;
      dispatch(userActions.getById(user.userId));
    }
  }
  handleTemplateChange(event) {
    const { name, value } = event.target;
    let template = this.state.template;
    template[name] = value;
    this.setState({ template });
  }
  handleAgentChange(event) {
    const { name, value } = event.target;
    let agentData = this.state.agentData;
    agentData[name] = value;
    this.setState({ agentData });
  }
  handleChange(event, property, category) {
    event.preventDefault();
    const { name, value } = event.target;
    let properties = this.state.properties;
    let index = properties.indexOf(property);
    if (category == "propertyPricing") {
      properties[index].pricingInfo[name] = value;
    }
    else if (category == "propertyInformationBathrooms") {
      properties[index].number_bathrooms[name] = value;
    }
    else {
      properties[index][name] = value;
    }

    this.setState({ properties });
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextPros in Property ", nextProps)
    if (nextProps.properties && nextProps.properties.length > 0) {
      let props = nextProps.properties;
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
      this.setState({ properties: nextProps.properties });
    }
    if (nextProps.agentData) {
      this.setState({ agentData: nextProps.agentData });
    }
    if (nextProps.template) {
      this.setState({ template: nextProps.template });
    }
  }

  saveProperty(event) {
    event.preventDefault();
    const { properties, agentData, template } = this.state;
    const { dispatch } = this.props.dispatchval.dispatch;
    this.setState({ submitted: true });
    let isvalid = true;
    if (!agentData.name || !agentData.email) {
      isvalid = false;
      console.log("validation failed for agent ", agentData);
    }
    if (properties && properties.length > 0) {
      properties.forEach(function (prop) {
        console.log(prop);
        if (!template.email_subject || !template.from_line || !template.headline || !template.address) {
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
        if (!prop.property_type || !prop.property_style || !prop.building_size ||
          !prop.lot_size || !prop.year_built) {
          isvalid = false;
          console.log("validation failed general property info");
        }
      })
    } else {
      isvalid = false;
      console.log("No properties added");
    }
    if (isvalid) {
      //  alert("submitting...")
      const { blastId } = this.props;
      dispatch(userActions.saveProperty(properties, agentData, template, blastId));
      this.setState({ submitted: false });
    } else {
      alert("some required fields were not filled");
    }

  }

  render() {
    const {
      submitted,
      template
    } = this.state;
    console.log("STATE In Property Render", this.state);
    return (
      <div className="tab-pane fade mt-2" id="details" role="tabpanel" aria-labelledby="group-dropdown2-tab" aria-expanded="false"      >
        <h4>Blast Details</h4>
        <p>Enter blast details.</p>
        <form className="form-a contactForm"          // action={this.saveProperty} 
          method="post" role="form">
          <h5> Email Settings</h5>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label className="required">Email Subject</label>
                <input name="email_subject" type="text"
                  onChange={(e) => this.handleTemplateChange(e)} className="form-control form-control-lg form-control-a"
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
                <input name="from_line" type="text" onChange={(e) => this.handleTemplateChange(e)}
                  className="form-control form-control-lg form-control-a" placeholder="Eg. Your Name"
                  value={template && template.from_line}
                />
                <div className="validation">
                  {
                    (submitted && !template.from_line && "Form Line is required")}
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label className="required">Reply To Address</label>
                <input name="address" type="email" onChange={(e) => this.handleTemplateChange(e)}
                  className="form-control form-control-lg form-control-a" placeholder="name@domain.com"
                  value={template && template.address}
                />
                <div className="validation">
                  {
                    (submitted &&
                      !template.address &&
                      "Form Reply Line is required")}
                </div>
              </div>
            </div>
          </div>
          <hr /> <br />
          <h5> Blast Headline</h5>
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <label className="required">
                  Headline Text (Hint: Do NOT enter an address or date here):
                </label>
                <input name="headline" type="text"
                  value={template && template.headline}
                  onChange={(e) => this.handleTemplateChange(e)}
                  className="form-control form-control-lg form-control-a"
                  placeholder="e.g. Triple Net Shopping Center For Sale in Atlanta"
                />
                <div className="validation">
                  {
                    (submitted &&
                      (!template || template.headline) &&
                      "Blast headline Line is required")}
                </div>
              </div>
            </div>
          </div>
          <hr />
          <br />
          {this.renderAgent()}
          <hr />
          <br />
          {this.renderProperties()}
          <div className="col-md-12 mt-4">
            <a
              href="javascript:void(0)"
              className="btn btn-primary"
              onClick={this.saveProperty}
            >
              Save
            </a>
            <a
              href="javascript:void(0)"
              className="btn btn-primary pull-right"
              onClick={this.saveProperty}            >
              Next
            </a>
          </div>
        </form>
      </div>
    );
  }
  renderProfileimageModal() {
    let modalClose = () => this.setState({ showprofileimage: false });
    return (
      <ProfileimageModal modalid={this.state.modalid} dispatchval={this.props.dispatchval} profile={this.state.agentData} users={this.state.user} visible={this.state.showprofileimage} onClickBackdrop={modalClose} dialogClassName="modal-lg" />
    );
  }
  renderProfilelogoModal() {
    let modalClose = () => this.setState({ showprofilelogo: false });
    return (
      <ProfilelogoModal modalid={this.state.modalid} dispatchval={this.props.dispatchval} profile={this.state.agentData} users={this.state.user} visible={this.state.showprofilelogo} onClickBackdrop={modalClose} dialogClassName="modal-lg" />
    );
  }
  renderAgent() {
    const { agentData, submitted } = this.state;
    let modalproimageOpen = (event) => {
      var id = event.currentTarget.dataset.id;
      this.setState({ showprofileimage: true, agentData: agentData, modalid: id });
    }
    let modallogoimageOpen = (event) => {
      console.log("here===")
      var id = event.currentTarget.dataset.id;
      this.setState({ showprofilelogo: true, agentData: agentData, modalid: id });
    }
    const { alert } = this.props;
    if (alert && alert.message) {

      this.alermsg = alert;
    }
    let profilepc = '';
    if (agentData && agentData.image_url) {
      profilepc = `${config.uploadapiUrl}/uploads/${agentData.image_url}`;
    } else {
      profilepc = '/public/assets/images/dummy-profile.png';
    }
    var profileimagemodal = this.state.agentData ? this.renderProfileimageModal() : (<span></span>);

    let profilelogo = '';
    if (agentData && agentData.logo_url) {
      profilelogo = `${config.uploadapiUrl}/uploads/${agentData.logo_url}`;
    } else {
      profilelogo = '/public/assets/images/dummy-logo.png';
    }

    var profilelogomodal = this.state.agentData ? this.renderProfilelogoModal() : (<span></span>);


    return (
      <div>
        <div>
          {profileimagemodal}
        </div>
        <div>
          {profilelogomodal}
        </div>
        <div>
          <h5> Agent Contact Info</h5>

          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <input type="text" name="name" value={agentData && agentData.name}
                  className="form-control form-control-lg form-control-a required" placeholder="Agent Name"
                  onChange={(e) => this.handleAgentChange(e)} />
                <div className="validation">
                  {submitted && !agentData.name && "This field is required"}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <input
                  type="text"
                  name="designation"
                  value={agentData && agentData.designation}
                  className="form-control form-control-lg form-control-a "
                  placeholder="Designation"
                  onChange={(e) => this.handleAgentChange(e)}
                />
              </div>
              <div className="validation"></div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <input
                  name="email"
                  type="email"
                  value={agentData && agentData.email}
                  className="form-control form-control-lg form-control-a required"
                  placeholder="Email"
                  onChange={(e) => this.handleAgentChange(e)}
                />
                <div className="validation">
                  {submitted && !agentData.email && "This field is required"}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <input
                  type="text"
                  name="website_url"
                  placeholder="Website URL"
                  value={agentData && agentData.website_url}
                  className="form-control form-control-lg form-control-a"
                  onChange={(e) => this.handleAgentChange(e)}
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <input name="phone_number" type="phone" pattern="[0-9]{0,5}"
                  value={agentData && agentData.phone_number}
                  className="form-control form-control-lg form-control-a" placeholder="Phone Number"
                  onChange={(e) => this.handleAgentChange(e)}
                />
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="form-group">
                <div className="form-group">
                  <label className="check">Use Agent Photo
                          <input type="checkbox" />
                    <span className="checkmark"></span>
                  </label>
                  <a href="javascript:void(0)" className="pb-2 pr-2 pl-0" data-toggle="modal" data-id="profileimg" data-target="#profileimg" onClick={modalproimageOpen}>
                    <img src={profilepc} alt="Image" className="profile-img img-fluid" />
                  </a>
                  <br></br>
                  <span>
                    <a href="javascript:void(0)" className="pb-2 pr-2 pl-0" data-toggle="modal" data-id="profileimg" data-target="#profileimg" onClick={modalproimageOpen}>Upload Agent Photo</a>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="form-group">
                <label className="check">
                  Use Logo
              <input
                    type="checkbox"
                    name="useLogo"
                    onChange={(e) => this.handleAgentChange(e)}
                  />
                  <span className="checkmark"></span>
                </label>
                <img
                  alt="Logo"
                  className="img-circle logo"
                  style={{ width: "120px" }}
                  src={profilelogo}
                />
                <br />
                <span>
                  <a href="javascript:void(0)" className="pb-2 pr-2 pl-0" data-toggle="modal" data-id="logoimg" data-target="#logoimg" onClick={modallogoimageOpen}>
                    Upload Agent Logo</a>
                </span>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <textarea name="company_details" placeholder="Company Details"
                  className="form-control" cols="45" rows="8"
                  value={agentData && agentData.company_details}
                  onChange={(e) => this.handleAgentChange(e)} />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <textarea
                  name="other_information"
                  value={agentData && agentData.other_information}
                  className="form-control" cols="45" rows="8"
                  onChange={(e) => this.handleAgentChange(e)}
                  placeholder="Other Information"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  renderProperties() {
    const { properties, template, submitted, isOpenHouse, openHouseAdd, linksToWebsites } = this.state;
    console.log("props ", properties)
    return (
      <React.Fragment>
        {
          properties.map((property, i) => (
            <div key={"prop_" + i}>
              <div style={{
                display:
                  property && template &&
                    template.template_type == "MultipleProperties"
                    ? "inline"
                    : "none",
              }}  >
                <p>
                  To add properties to your blast click the Add Property
                  button below. You can add up to 4 properties in this blast.
            </p>
                <button type="button"
                  className="btn btn-primary mb-3"
                  onClick={() => this.addProperty({ i })}
                  style={{
                    display:
                      property && template &&
                        template.template_type == "MultipleProperties" &&
                        properties.length < 4
                        ? "inline"
                        : "none",
                  }}  >
                  Add Property
            </button>
                <div className="row mt-4 mb-4">
                  <div className="col-md-9">
                    <h2>
                      <u>Property {i + 1}</u>
                    </h2>
                  </div>
                  <div className="col-md-3">
                    <button
                      type="button"
                      className="btn pull-right"
                      onClick={() => this.deleteProperty({ i })}
                    >
                      Delete Property
                </button>
                  </div>
                </div>
              </div>
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
                        onClick={() => this.addOpenHouse(property)}                      >
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
              <hr />
              <br />
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
                      <input type="text" name="price" onChange={(e) => this.handleChange(e, property, "propertyPricing")}
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
                        onChange={(e) => this.handleChange(e, property, "propertyPricing")}>
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
                      onChange={(e) => this.handleChange(e, property)}
                      value={property && property.street_address} />
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
                      placeholder="City" onChange={(e) => this.handleChange(e, property)}
                      value={property && property.city} />
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
                      placeholder="Zip Code" onChange={(e) => this.handleChange(e, property)}
                      value={property && property.zipcode}
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
                        onChange={(e) => this.handleChange(e, property)}
                        value={property && property.board} >
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
                      <select className="form-control form-control-lg form-control-a" name="property_type"
                        onChange={(e) => this.handleChange(e, property)}
                        value={property && property.property_type}  >
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
                      <div className="validation">
                        {submitted &&
                          (!property || !property.property_type) && "Price is required"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label className="required">Property Style:</label>
                    <div className="form-group">
                      <select className="form-control form-control-lg form-control-a" name="property_style"
                        onChange={(e) => this.handleChange(e, property)}
                        value={property && property.property_style
                        }                      >
                        <option value="" className="">
                          -- Select Property Style --
                    </option>
                        <option>Bungalow</option>
                        <option>Ranch</option>
                        <option>Cape Cod</option>
                        <option>Colonial</option>
                        <option>Contemporary</option>
                        <option>Spanish</option>
                        <option>Traditional</option>
                        <option>Tudor</option>
                        <option>Victorian</option>
                        <option>Old Florida</option>
                        <option>End Unit Townhouse</option>
                        <option>Townhouse</option>
                        <option>Log Home</option>
                        <option>Mediterranean</option>
                        <option>Other, N/A</option>
                      </select>
                      <div className="validation">
                        {submitted &&
                          (!property || !property.property_style) && "Price is required"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="form-group">
                    <label>Price per Square Foot</label>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-usd"></i>
                        </span>
                      </div>
                      <input type="text" className="form-control form-control-lg form-control-a" placeholder="0"
                        name="price" onChange={(e) => this.handleChange(e, property)}
                        value={property && property.price} />
                      <div className="input-group-append">
                        <span className="input-group-text">/sqft</span>
                      </div>
                    </div>
                    <div className="validation">
                      {submitted && (!property || !property.price)}
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="form-group">
                    <label className="required">Building Size</label>
                    <div className="input-group mb-3">
                      <input type="text" className="form-control form-control-lg form-control-a"
                        placeholder="0" name="building_size"
                        onChange={(e) => this.handleChange(e, property)}
                        value={property && property.building_size
                        } />
                      <div className="input-group-append">
                        <span className="input-group-text">/sqft</span>
                      </div>
                    </div>
                    <div className="validation">
                      {submitted && (!property || !property.building_size) && "This field is required"}
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="form-group">
                    <label className="required">Lot Size</label>
                    <div className="input-group mb-3">
                      <input type="text" className="form-control form-control-lg form-control-a"
                        placeholder="0" name="lot_size"
                        onChange={(e) => this.handleChange(e, property)}
                        value={property && property.lot_size} />
                      <div className="input-group-append">
                        <span className="input-group-text">/sqft</span>
                      </div>
                    </div>
                    <div className="validation">
                      {submitted && (!property || !property.lot_size) && "This field is required."}
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="form-group">
                    <label>Number of Bedrooms</label>
                    <input type="text" name="number_bedrooms" className="form-control form-control-lg form-control-a"
                      placeholder="eg. 2" onChange={(e) => this.handleChange(e, property)}
                      value={property && property.number_bedrooms
                      }
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="form-group">
                    <label>Number of Bathrooms</label>
                    <div className="row">
                      <div className="col-md-6 input-group mb-3">
                        <input type="text" className="form-control form-control-lg form-control-a" placeholder="0"
                          name="full" value={property && property.number_bathrooms &&
                            property.number_bathrooms.full
                          }
                          onChange={(e) => this.handleChange(e, property, "propertyInformationBathrooms")
                          }
                        />
                        <div className="input-group-append">
                          <span className="input-group-text">Full</span>
                        </div>
                      </div>
                      <div className="input-group mb-3 col-md-6">
                        <input type="text" className="form-control form-control-lg form-control-a"
                          placeholder="0" name="half"
                          value={property && property.number_bathrooms && property.number_bathrooms.half
                          }
                          onChange={(e) => this.handleChange(e, property, "propertyInformationBathrooms")
                          } />
                        <div className="input-group-append">
                          <span className="input-group-text">Half</span>
                        </div>
                      </div>
                    </div>{""}
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="form-group">
                    <label className="required">Year Built</label>
                    <input type="text" name="year_built" className="form-control form-control-lg form-control-a" placeholder="eg. 2016"
                      value={property && property.year_built}
                      onChange={(e) => this.handleChange(e, property)} />
                  </div>
                  <div className="validation">
                    {submitted && (!property || !property.year_built) && "This field is required."}
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="form-group">
                    <label>Number of Stories</label>
                    <select className="form-control form-control-lg form-control-a"
                      name="number_stories"
                      onChange={(e) => this.handleChange(e, property)}
                      value={property && property.number_stories}                    >
                      <option value="">-- Select Number of Stories --</option>
                      <option>1 Story</option>
                      <option>1.5 Stories</option>
                      <option>2 Stories</option>
                      <option>3 Stories</option>
                      <option>4 Stories</option>
                      <option>More</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="form-group">
                    <label>Garage</label>
                    <div className="form-group">
                      <a href="javascript:void(0)" className="btn btn-success"
                        onClick={() => this.show("garage", property, true)}                      >
                        Yes
                  </a>
                      <a href="javascript:void(0)" className="btn btn-outline-danger"
                        onClick={() => this.show("garage", property, false)}                      >
                        No
                  </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="form-group">
                    <select onChange={(e) => this.handleChange(e, property)}
                      name="garageSize"
                      value={property && property.garageSize}
                      style={{
                        display: property && property.garage
                          ? "inline"
                          : "none",
                      }}
                      className="form-control form-control-lg form-control-a" >
                      <option value="">-- Select Garage Size --</option>
                      <option label="1 Car">1 Car</option>
                      <option label="2 Car">2 Car</option>
                      <option label="3 Car">3 Car</option>
                      <option label="4 Car">4 Car</option>
                      <option label="5 Car">5 Car</option>
                      <option label="6 Car">6 Car</option>
                      <option label="7 Car">7 Car</option>
                      <option label="8 Car">8 Car</option>
                      <option label="9 Car">9 Car</option>
                      <option label="10+ Car">10+ Car</option>
                    </select>
                  </div>
                </div>
              </div>
              <hr />
              <br />
              <h5 className="required">Property Details</h5>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <div className="form-group">
                    <textarea name="property_details" className="form-control"
                      value={property.property_details} cols="45" rows="8" placeholder="Property Details"
                      onChange={(e) => this.handleChange(e, property)}
                    />
                  </div>
                  <div className="validation">
                    {(submitted && !property.property_details &&
                      "Property detail is required")}
                  </div>
                </div>{""}
              </div>
              <hr />
              <br />
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
                        onClick={() => this.addLinksToWebsites(property)}                      >
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
              <hr />
              <br />
            </div>
          )
          )
        }
      </React.Fragment>
    )
  }
}

export default PropertyTab;
