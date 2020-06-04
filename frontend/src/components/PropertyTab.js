import React from "react";
import { userActions } from "../actions";
import { Alert } from "reactstrap";
import config from 'config';
import { globalData } from '../constants/data.constants';
import ProfileimageModal from '../components/ProfileimageModal';
import ProfilelogoModal from '../components/ProfilelogoModal';
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

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
    this.linkArrayChange = this.linkArrayChange.bind(this);
    this.openHouseArrayChange = this.openHouseArrayChange.bind(this);
    this.propsDataupdate = this.propsDataupdate.bind(this);
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
      templateId: "",
      disabled: true,
      submitted: false,
      alert: {
        alertIsOpenHouse: false,
        alertlink: false,
        type: "",
        message: "",
      },
      Email: {
        formSubject: "",
        formLine: "",
        formReply: "",
      },
      blastHeadline: "",
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
    let propertyArray = Object.assign({}, this.state);
    propertyArray.properties.splice(i, 1);
    this.setState(propertyArray);
  }

  selectBlast(blast_type) {
    if (blast_type) {
      const { dispatch } = this.props.dispatchval.dispatch;
      const { userId } = this.state;
      dispatch(userActions.blast(blast_type, userId));
    }
  }

  addOpenHouse(event, property) {
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

  linkArrayChange(event) {
    const { id, name, value } = event.target;
    let keys = id.split("-");
    let linkArray = Object.assign({}, this.state);
    linkArray.properties[keys[0]].linksToWebsites.linkData[
      keys[1]
    ].linksToWebsiteData[name] = value;
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

  editOrDelete(event, flag, property, item) {
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

  addLinksToWebsites(e, property) {
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
        properties[index].mlsNumber.display = value;
        break;
      case "linksToWebsites":
        properties[index].linksToWebsites.display = value;
        break;
      case "garage":
        properties[index].generalPropertyInformation.garage = value;
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
  handleChange(flag, event, property) {
    event.preventDefault();
    const { name, value } = event.target;
    let states = Object.assign({}, this.state);
    let index = states.properties.indexOf(property);
    switch (flag) {
      case "email":
        states.Email[name] = value;
        this.setState(states);
        break;
      case "blastHeadline":
        states[name] = value;
        this.setState(states);
        break;
      case "propertyPricing":
        states.properties[index].pricingInfo[name] = value;
        this.setState(states);
        break;
      case "propertyAddress":
        states.properties[index].propertyAddress[name] = value;
        let user = JSON.parse(localStorage.getItem("user"));
        states.properties[index].userId = user.userId;
        this.setState(states);
        break;
      case "mlsNumber":
        states.properties[index].mlsNumber[name] = value;
        this.setState(states);
        break;
      case "propertyInformation":
        states.properties[index].generalPropertyInformation[name] = value;
        this.setState(states);
        break;

      case "propertyInformationBathrooms":
        states.properties[index].generalPropertyInformation.numberOfBathrooms[
          name
        ] = value;
        this.setState(states);
        break;

      case "propertyDetail":
        states.properties[index][name] = value;

        this.setState(states);
        break;

      case "AgentContactInfo":
        states.agentData[name] = value;
        this.setState(states);
        break;
    }

    this.setState({ [name]: value });
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextPros in Property ", nextProps)
    const { blast } = this.state;
    if (nextProps.blast && !blast._id) {
      this.setState({ blast })
    }
    if (
      (nextProps.propertyData && nextProps.propertyData.blastData) ||
      nextProps.propertyData.blast_id
    ) {
      this.propsDataupdate(blast);

      // console.log("blast_id", location.savedProps.blast_id)
      //  nextProps.dispatchval.dispatch(userActions.getBlast(nextProps.propertyData.blast_id));
    }

    if (nextProps.propertyData && nextProps.propertyData.templateData) {
      let templateData = nextProps.propertyData;
      this.propsDataupdate(templateData);
    }

    if (nextProps.saveBlastData) {
      this.propsDataupdate(nextProps);
    }

    // console.log("PROPS ", nextProps);
    if (nextProps && nextProps.propertyData && nextProps.propertyData.data) {
      let templateId = nextProps.propertyData.data._id;
      let blast_id = nextProps.propertyData.data.blast_id;
      this.setState({ templateId: templateId, blast_id: blast_id });
    }
    if (nextProps && nextProps.agentData) {

      this.setState({ agentData: nextProps.agentData });
    }
  }

  //propsDataupdate(data, agentData, profile, images) {
  propsDataupdate(data) {
    console.log("data===", data);
    let states = Object.assign({}, this.state);
    if (data && data.blastData) {
      states.blast_id = data.blastData._id;
    }
    if (data && data.templateData) {
      states.templateId = data.templateData._id;
    }
    if (data && data.blast_id) {
      states.blast_id = data.blast_id;
    }
    if (data && data.agentData) {
      states.agentData = data.agentData;
    }
    if (data && data.saveBlastData) {
      let states = Object.assign({}, this.state);
      data.saveBlastData.forEach(function (saveData, i) {
        if (saveData.templates.length > 0) {
          let templates = saveData.templates[0];
          states.Email.formSubject = templates.email_subject;
          states.Email.formLine = templates.from_line;
          states.Email.formReply = templates.address;
          states.blastHeadline = templates.headline;
        }
        // states.properties[i].propertyAddress.zipCode = saveData.zipcode;
        // states.properties[i].propertyAddress.city = saveData.city;
        // states.properties[i].propertyAddress.streetAddress =
        //   saveData.street_address;
        // states.properties[i].propertyAddress.displayMethod =
        //   saveData.display_method;

        // states.properties[i].mlsNumber.numberProperty =
        //   saveData.mls_number;
        // states.properties[i].mlsNumber.boardAssociation = saveData.board;

        // if (saveData.pricingInfo.length) {
        //   states.properties[i].pricingInfo.price =
        //     saveData.pricingInfo[0].price;
        //   states.properties[i].pricingInfo.priceType =
        //     saveData.pricingInfo[0].priceType;
        // }

        // states.properties[i].propertyDetail = saveData.property_detail;
        // states.properties[i].generalPropertyInformation.yearBuilt =
        //   saveData.year_built;
        // states.properties[i].propertyId = saveData.id;

        // states.properties[i].linksToWebsites.linkData =
        //   saveData.linksToWebsites;
        // states.properties[i].isOpenHouse.openHouseData =
        //   saveData.isOpenHouse;

        // states.properties[i].generalPropertyInformation.yearBuilt =
        //   saveData.year_built;
        // states.properties[i].generalPropertyInformation.lotSize =
        //   saveData.lot_size;
        // states.properties[i].generalPropertyInformation.buildingSize =
        //   saveData.building_size;
        // states.properties[i].generalPropertyInformation.numberOfBedrooms =
        //   saveData.number_bedrooms;
        // states.properties[i].generalPropertyInformation.numberOfStories =
        //   saveData.number_stories;
        // states.properties[
        //   i
        // ].generalPropertyInformation.pricePerSquareFoot = saveData.price;
        // states.properties[i].generalPropertyInformation.propertyType =
        //   saveData.property_type;
        // states.properties[i].generalPropertyInformation.propertyStyle =
        //   saveData.property_style;

        // if (saveData.number_bathrooms.length) {
        //   states.properties[
        //     i
        //   ].generalPropertyInformation.numberOfBathrooms.full =
        //     saveData.number_bathrooms[0].full;
        //   states.properties[
        //     i
        //   ].generalPropertyInformation.numberOfBathrooms.half =
        //     saveData.number_bathrooms[0].half;
        // }

      });
    }

    this.setState(states);
    // console.log("states====",states);
  }

  saveProperty(event) {
    event.preventDefault();
    console.log("state on submit ", this.state)
    console.log("props on submit", this.props)
    const { propertyData } = this.props;
    console.log("ids on submit", propertyData);
    const templateId = propertyData.templateData._id;
    const { blast_id } = this.props;
    const { properties, agentData, Email, blastHeadline } = this.state;
    const { dispatch } = this.props.dispatchval.dispatch;
    this.setState({ submitted: true });
    let isvalid = true;
    if (properties && Email.formSubject && Email.formReply && blastHeadline && agentData) {
      if (!agentData.name || !agentData.email) {
        isvalid = false;
        console.log("validation failed for agent ", agentData);
      }

      properties.forEach(function (prop) {
        //  console.log(prop);       
        if (!prop.pricingInfo || !prop.pricingInfo.price || !prop.pricingInfo.priceType) {
          isvalid = false;
          console.log("validation failed property pricing", prop.pricingInfo);
        }
        if (!prop.propertyAddress || !prop.propertyAddress.displayMethod
          || !prop.propertyAddress.streetAddress || !prop.propertyAddress.state
          || !prop.propertyAddress.city) {
          isvalid = false;
          console.log("validation failed property address", prop.propertyAddress);
        }
        if (prop.mlsNumber && prop.mlsNumber.display
          && (!prop.mlsNumber.boardAssociation || !prop.mlsNumber.numberProperty)) {
          isvalid = false;
          console.log("validation failed property MLS Number", prop.mlsNumber);
        }
        if (!prop.generalPropertyInformation ||
          !prop.generalPropertyInformation.propertyType ||
          !prop.generalPropertyInformation.propertyStyle ||
          !prop.generalPropertyInformation.buildingSize ||
          !prop.generalPropertyInformation.lotSize ||
          !prop.generalPropertyInformation.yearBuilt) {
          isvalid = false;
          console.log("validation failed general property info", prop.generalPropertyInformation);
        }
      })
      if (isvalid) {
        //  alert("submitting...")
        dispatch(userActions.saveProperty(properties, agentData, Email, blastHeadline, templateId, blast_id));
        this.setState({ submitted: false });
      } else {
        alert("some required fields were not filled");
      }

    } else {

    }
  }

  render() {
    const {
      submitted,
      Email,
      blastHeadline
    } = this.state;
    // console.log("this.state===", this.state);
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
                <input name="formSubject" type="text"
                  onChange={(e) => this.handleChange("email", e)} className="form-control form-control-lg form-control-a"
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
                <input name="formLine" type="text" onChange={(e) => this.handleChange("email", e)}
                  className="form-control form-control-lg form-control-a" placeholder="Eg. Your Name"
                  value={Email && Email.formLine}
                />
                <div className="validation">
                  {
                    (submitted && !Email.formLine && "Form Line is required")}
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label className="required">Reply To Address</label>
                <input name="formReply" type="email" onChange={(e) => this.handleChange("email", e)}
                  className="form-control form-control-lg form-control-a" placeholder="name@domain.com"
                  value={Email && Email.formReply}
                />
                <div className="validation">
                  {
                    (submitted &&
                      !Email.formReply &&
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
                <input name="blastHeadline" type="text"
                  onChange={(e) => this.handleChange("blastHeadline", e)} value={Email.blastHeadline}
                  className="form-control form-control-lg form-control-a"
                  placeholder="e.g. Triple Net Shopping Center For Sale in Atlanta"
                />
                <div className="validation">
                  {
                    (submitted &&
                      !blastHeadline &&
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
    const { agentData, error, submitted } = this.state;
    //  console.log("agentData==11===",agentData);
    const { profile } = this.props;
    let modalproimageOpen = (event) => {
      var id = event.currentTarget.dataset.id;
      this.setState({ showprofileimage: true, agentData: agentData, modalid: id });
    }
    let modallogoimageOpen = (event) => {
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
                  onChange={(e) => this.handleChange("AgentContactInfo", e)} />
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
                  onChange={(e) => this.handleChange("AgentContactInfo", e)}
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
                  onChange={(e) => this.handleChange("AgentContactInfo", e)}
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
                  onChange={(e) => this.handleChange("AgentContactInfo", e)}
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <input name="phone_number" type="phone" pattern="[0-9]{0,5}"
                  value={agentData && agentData.phone_number}
                  className="form-control form-control-lg form-control-a" placeholder="Phone Number"
                  onChange={(e) => this.handleChange("AgentContactInfo", e)}
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
                    onChange={(e) => this.handleChange("AgentContactInfo", e)}
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
                  <a href="javascript:void(0)">Upload Agent Logo</a>
                </span>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <textarea name="company_details" placeholder="Company Details"
                  className="form-control" cols="45" rows="8"
                  value={agentData && agentData.company_details}
                  onChange={(e) => this.handleChange("AgentContactInfo", e)} />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <textarea
                  name="other_information"
                  value={agentData && agentData.other_information}
                  className="form-control"
                  cols="45"
                  rows="8"
                  onChange={(e) => this.handleChange("AgentContactInfo", e)}
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
    const { properties, errors, submitted, alert, isOpenHouse, openHouseAdd, linksToWebsites } = this.state;
    const { propertyData } = this.props;
    //   console.log("propertyDtaa", propertyData)
    return (
      <React.Fragment>
        {
          properties.map((property, i) => (
            <div key={"prop_" + i}>
              <div style={{
                display:
                  propertyData &&
                    propertyData.templateData &&
                    propertyData.templateData.template_type &&
                    propertyData.templateData.template_type ==
                    "MultipleProperties"
                    ? "inline"
                    : "none",
              }}              >
                <p>
                  To add properties to your blast click the Add Property
                  button below. You can add up to 4 properties in this blast.
            </p>
                <button
                  type="button"
                  className="btn btn-primary mb-3"
                  onClick={() => this.addProperty({ i })}
                  style={{
                    display:
                      propertyData &&
                        propertyData.templateData &&
                        propertyData.templateData.template_type &&
                        propertyData.templateData.template_type ==
                        "MultipleProperties" &&
                        properties.length < 4
                        ? "inline"
                        : "none",
                  }}                >
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

                  <Alert
                    className={`alert ${alert.type}`}
                    isOpen={alert && alert.alertIsOpenHouse}                  >
                    {alert && alert.message}
                  </Alert>
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
                    <label className="required">Property Type:</label>
                    <div className="form-group">
                      <select className="form-control form-control-lg form-control-a" name="propertyType"
                        onChange={(e) => this.handleChange("propertyInformation", e, property)}
                        value={property.generalPropertyInformation &&
                          property.generalPropertyInformation.propertyType}  >
                        <option>Select Property Type</option>
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
                          (!property.generalPropertyInformation ||
                            !property.generalPropertyInformation.propertyType) &&
                          "Price is required"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label className="required">Property Style:</label>
                    <div className="form-group">
                      <select className="form-control form-control-lg form-control-a" name="propertyStyle"
                        onChange={(e) => this.handleChange("propertyInformation", e, property)}
                        value={property.generalPropertyInformation && property.generalPropertyInformation.propertyStyle
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
                          (!property.generalPropertyInformation ||
                            !property.generalPropertyInformation.propertyStyle) &&
                          "Price is required"}
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
                        name="pricePerSquareFoot" onChange={(e) => this.handleChange("propertyInformation", e, property)}
                        value={
                          property.generalPropertyInformation &&
                          property.generalPropertyInformation.pricePerSquareFoot
                        } />
                      <div className="input-group-append">
                        <span className="input-group-text">/sqft</span>
                      </div>
                    </div>
                    <div className="validation">
                      {submitted && (!property.generalPropertyInformation || !property.generalPropertyInformation.pricePerSquareFoot)}
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="form-group">
                    <label className="required">Building Size</label>
                    <div className="input-group mb-3">
                      <input type="text" className="form-control form-control-lg form-control-a"
                        placeholder="0" name="buildingSize"
                        onChange={(e) => this.handleChange("propertyInformation", e, property)}
                        value={
                          property.generalPropertyInformation &&
                          property.generalPropertyInformation.buildingSize
                        } />
                      <div className="input-group-append">
                        <span className="input-group-text">/sqft</span>
                      </div>
                    </div>
                    <div className="validation">
                      {submitted && (!property.generalPropertyInformation
                        || !property.generalPropertyInformation.buildingSize) && "This field is required"}
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="form-group">
                    <label className="required">Lot Size</label>
                    <div className="input-group mb-3">
                      <input type="text" className="form-control form-control-lg form-control-a"
                        placeholder="0" name="lotSize"
                        onChange={(e) => this.handleChange("propertyInformation", e, property)}
                        value={
                          property.generalPropertyInformation &&
                          property.generalPropertyInformation.lotSize
                        } />
                      <div className="input-group-append">
                        <select className="form-control form-control-lg form-control-a" name="lotType"
                          onChange={(e) => this.handleChange("propertyInformation", e, property)} >
                          <option>sqft</option>
                          <option>acres</option>
                        </select>
                      </div>
                    </div>
                    <div className="validation">
                      {submitted && (!property.generalPropertyInformation || !property.generalPropertyInformation.lotSize) && "This field is required."}
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="form-group">
                    <label>Number of Bedrooms</label>
                    <input type="text" name="numberOfBedrooms" className="form-control form-control-lg form-control-a"
                      placeholder="eg. 2" onChange={(e) => this.handleChange("propertyInformation", e, property)}
                      value={
                        property.generalPropertyInformation &&
                        property.generalPropertyInformation.numberOfBedrooms
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
                          name="full" value={
                            property.generalPropertyInformation &&
                            property.generalPropertyInformation.numberOfBathrooms &&
                            property.generalPropertyInformation.numberOfBathrooms.full
                          }
                          onChange={(e) => this.handleChange("propertyInformationBathrooms", e, property)
                          }
                        />
                        <div className="input-group-append">
                          <span className="input-group-text">Full</span>
                        </div>
                      </div>
                      <div className="input-group mb-3 col-md-6">
                        <input type="text" className="form-control form-control-lg form-control-a"
                          placeholder="0" name="half"
                          value={
                            property.generalPropertyInformation &&
                            property.generalPropertyInformation.numberOfBathrooms &&
                            property.generalPropertyInformation.numberOfBathrooms.half
                          }
                          onChange={(e) => this.handleChange("propertyInformationBathrooms", e, property)
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
                    <input type="text" name="yearBuilt" className="form-control form-control-lg form-control-a" placeholder="eg. 2016"
                      value={
                        property.generalPropertyInformation &&
                        property.generalPropertyInformation.yearBuilt
                      }
                      onChange={(e) => this.handleChange("propertyInformation", e, property)} />
                  </div>
                  <div className="validation">
                    {submitted && (!property.generalPropertyInformation || !property.generalPropertyInformation.yearBuilt) && "This field is required."}
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="form-group">
                    <label>Number of Stories</label>
                    <select className="form-control form-control-lg form-control-a"
                      name="numberOfStories"
                      onChange={(e) => this.handleChange("propertyInformation", e, property)}
                      value={
                        property.generalPropertyInformation &&
                        property.generalPropertyInformation.numberOfStories
                      }                    >
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
                    <select onChange={(e) => this.handleChange("propertyInformation", e, property)}
                      name="garageSize"
                      style={{
                        display:
                          property.generalPropertyInformation &&
                            property.generalPropertyInformation.garage
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
                    <textarea name="propertyDetail" className="form-control"
                      value={property.propertyDetail} cols="45" rows="8" placeholder="Property Details"
                      onChange={(e) => this.handleChange("propertyDetail", e, property)}
                    />
                  </div>
                  <div className="validation">
                    {(submitted && !property.propertyDetail &&
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
