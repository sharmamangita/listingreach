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
import { Alert } from "reactstrap";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

class PropertyTab extends React.Component {
  constructor(props) {
    super(props);
    this.navId = "";
    this.openHouse = [];
    this.linksToWebsites = [];
    this.state = {
      userId: "",
      disabled: true,
      alert:{
        alertIsOpenHouse:false,
        alertlink:false,
        type:'',
        message:''
      },
        profile:Object.assign({
        companyName:'',
        mobileno:'',
        city:'',
        country:'',
        state:'',
        zipcode:'',

        firstName:'',
        lastName:'',
        email:'',
        phone:'',
      },this.props.profile),
      agentData:Object.assign({
        name:'',
        designation:'',
        email:'',
        website_url:'',
        phone_number:'',
        company_details:'',
        other_information:'',
        image_url:'',
        logo_url:''
      },this.props.agentData),

      errors: {
        propertyDetails: {
          Email: {
            formSubject: "",
            formLine: "",
            formReply: "",
          },
          blastHeadline: "",
          AgentContactInfo: {
            agentName: "",
            designation: "",
            email: "",
            websiteUrl: "",
            phone: "",
            useLogo: false,
            useAgentPhoto: false,
            companyDetail: "",
            orderInfo: "",
          },
          linksToWebsites: {
            buildingSize: "",
            url: "",
          },
          isOpenHouse: {
            houseType: "",
            date: "",
            startTime: "",
            endTime: "",
          },
          mlsNumber: {
            numberProperty: "",
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
            garageSize:''
          },
        },
      },
      propertyDetails: {
        userId:'',
        propertyId:'',
        Email: {
          formSubject: "",
          formLine: "",
          formReply: "",
        },
        blastHeadline: "",
        AgentContactInfo: {
          agentName: "",
          designation: "",
          email: "",
          websiteUrl: "",
          phone: "",
          useLogo: false,
          useAgentPhoto: false,
          companyDetail: "",
          orderInfo: "",
        },
        isOpenHouse: {
          display: true,
          houseType: "",
          date: "",
          startTime: "",
          endTime: "",
          openHouseData: [],
        },
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
        linksToWebsites: {
          display: true,
          buildingSize: "",
          url: "",
          linkData: [],
        },
      }
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
    this.linkArrayChange = this.linkArrayChange.bind(this);
    this.openHouseArrayChange = this.openHouseArrayChange.bind(this);
    this.propsDataupdate = this.propsDataupdate.bind(this);
    let user = JSON.parse(localStorage.getItem("user"));
    if(user && user.userId &&  this.props && this.props.dispatchval){
       const { dispatch } = this.props.dispatchval.dispatch;
      dispatch(userActions.getById(user.userId));
    }
    

  }


  selectBlast(e, blast_type) {
    if (blast_type) {
      const { dispatch } = this.props.dispatchval.dispatch;
      const { userId } = this.state;
      dispatch(userActions.blast(blast_type, userId));
    }
  }

    addOpenHouse() {
    const { propertyDetails } = this.state;
    if (
      propertyDetails.isOpenHouse.houseType &&
      propertyDetails.isOpenHouse.date &&
      propertyDetails.isOpenHouse.startTime &&
      propertyDetails.isOpenHouse.endTime
    ) {
      let houseType = propertyDetails.isOpenHouse.houseType;
      let date = propertyDetails.isOpenHouse.date;
      let startTime = propertyDetails.isOpenHouse.startTime;
      let endTime = propertyDetails.isOpenHouse.endTime;
      this.openHouse.push({openHouseData:{
        houseType: houseType,
        date: date,
        startTime: startTime,
        endTime: endTime
      }});
      let openHouse = Object.assign({}, this.state);
      openHouse.propertyDetails.isOpenHouse.openHouseData = this.openHouse;
      this.setState(openHouse);
    }
  }


  linkArrayChange(event) {
    const { id, name, value } = event.target;
    let linkArray = Object.assign({}, this.state);
    linkArray.propertyDetails.linksToWebsites.linkData[id].linksToWebsiteData[name] = value;
  }

  openHouseArrayChange(event) {
    const { id, name, value } = event.target;
    let openHouseArray = Object.assign({}, this.state);
    openHouseArray.propertyDetails.isOpenHouse.openHouseData[id].openHouseData[name] = value;
    if(openHouseArray.propertyDetails.isOpenHouse.openHouseData[id].openHouseData[name]){
        openHouseArray.alert.type='success';
        openHouseArray.alert.message='Data is updated successfully';
        openHouseArray.alert.alertIsOpenHouse=true;
        this.setState({disabled:false},()=>{
          window.setTimeout(()=>{
            this.setState({disabled:true,...this.state.alert, alertIsOpenHouse:false});
          },2000)
        });
    }else{
        openHouseArray.alert.type='danger';
        openHouseArray.alert.message='Data is not updated successfully'; 
        openHouseArray.alert.alertIsOpenHouse=true;
    }
    
   let isState = this.setState(openHouseArray);
  }

  linkArrayDelete(event) {
    const { id } = event.target;
    let linkArray = Object.assign({}, this.state);
    linkArray.propertyDetails.linksToWebsites.linkData.splice(index, 1);
    this.setState(linkArray);
  }

  openHouseChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case "houseType":
        errors.propertyDetails.isOpenHouse.houseType =
          value.length < 5 ? "Please select house type" : "";
        break;
      case "date":
        errors.propertyDetails.isOpenHouse.date =
          value.length < 3 ? "Date is required" : "";
        break;
      case "startTime":
        errors.propertyDetails.isOpenHouse.startTime =
          value.length < 3 ? "Start time is required" : "";
        break;

      case "endTime":
        errors.propertyDetails.isOpenHouse.endTime =
          value.length < 3 ? "End time is required" : "";
        break;
    }

    if (value != "" && name != "") {
      let openHouse = Object.assign({}, this.state);
      openHouse.propertyDetails.isOpenHouse[name] = value;
      this.setState(openHouse);
      this.AddButton = true;
    } else {
      this.AddButton = false;
    }
  }

  linksToWebsitesChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case "url":
        errors.propertyDetails.linksToWebsites.url =
          value.length < 5 ? "URL is required" : "";
        break;
      case "buildingSize":
        errors.propertyDetails.linksToWebsites.buildingSize =
          value.length < 3 ? "Building Size is required" : "";
        break;
    }
    if (value != "" && name != "") {
      let linksToWebsites = Object.assign({}, this.state);
      linksToWebsites.propertyDetails.linksToWebsites[name] = value;
      this.setState(linksToWebsites);
    }
  }

  editOrDelete(event, flag) {
    const { id, title } = event.target;
    console.log(event.target);
    console.log(event.target.title);
    if (flag == "edit") {
      this.setState({
        disabled: false,
      });
    } else {
      if (title == "linkDelete") {
        let linkArray = Object.assign({}, this.state);
        linkArray.propertyDetails.linksToWebsites.linkData.splice(id, 1);
        this.setState(linkArray);
      } else if (title == "openHoueDelete") {
        let openHoueArray = Object.assign({}, this.state);
        openHoueArray.propertyDetails.isOpenHouse.openHouseData.splice(id, 1);
        this.setState(openHoueArray);
      }
    }
  }

  addLinksToWebsites() {
    const { propertyDetails } = this.state;
    if (
      propertyDetails.linksToWebsites.url &&
      propertyDetails.linksToWebsites.buildingSize
    ) {
      let url = propertyDetails.linksToWebsites.url;
      let buildingSize = propertyDetails.linksToWebsites.buildingSize;

      this.linksToWebsites.push({ linksToWebsiteData : {url: url, buildingSize: buildingSize }});
      let linksToWebsites = Object.assign({}, this.state);
      linksToWebsites.propertyDetails.linksToWebsites.linkData = this.linksToWebsites;
      this.setState(linksToWebsites);
    }
  }

  show(flag) {
    let states = Object.assign({}, this.state);
    switch (flag) {
      case "openHouse":
          states.propertyDetails.isOpenHouse.display = true;
        break;
      case "mlsNumber":
         states.propertyDetails.mlsNumber.display = true;
        break;
      case "linksToWebsites":
         states.propertyDetails.linksToWebsites.display = true;
        break;
      case "garage":
        states.propertyDetails.generalPropertyInformation.garage = true;
        break;
    }
    this.setState(states);
  }


  hide(flag) {
    let states = Object.assign({}, this.state);
    switch (flag) {
      case "openHouse":
          states.propertyDetails.isOpenHouse.display = false;
        break;
      case "mlsNumber":
         states.propertyDetails.mlsNumber.display = false;
        break;
      case "linksToWebsites":
         states.propertyDetails.linksToWebsites.display = false;
        break;
      case "garage":
        states.propertyDetails.generalPropertyInformation.garage = false;
        break;
    }
     this.setState(states);
  }

  handleChange(flag, event) {
    event.preventDefault();
    const { propertyDetails } = this.state;
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case "formSubject":
        errors.propertyDetails.Email.formSubject = value.length < 3 ?
           "Email Subject must be at least 3 characters long!"
          : "";
        break;
      case "formLine":
        errors.propertyDetails.Email.formLine =
          value.length < 3 ? "Name must be at least 3 characters long!" : "";
        break;
      case "formReply":
        errors.propertyDetails.Email.formReply = validEmailRegex.test(value)
          ? ""
          : "Email is not valid!";
        break;
      case "blastHeadline":
        errors.propertyDetails.blastHeadline =
          value.length < 8
            ? "Blast Head line must be at least 8 characters long!"
            : "";
        break;
      case "agentName":
        errors.propertyDetails.AgentContactInfo.agentName =
          value.length < 2 ? "Agent name is required" : "";
        break;

      case "designation":
        errors.propertyDetails.AgentContactInfo.designation =
          value.length < 2 ? "Designation is required" : "";
        break;

      case "email":
        errors.propertyDetails.AgentContactInfo.email =
          value.length < 2 ? "Email is required" : "";
        break;

      case "phone":
        errors.propertyDetails.AgentContactInfo.phone =
          value.length < 2 ? "Phone is required" : "";
        errors.propertyDetails.AgentContactInfo.phone = parseInt(value)

          ? ""
          : "Please enter valid number";
        break;
      case "numberProperty":
        errors.propertyDetails.mlsNumber.numberProperty = parseInt(value)
          ? ""
          : "Please enter valid number";
        break;

      case "pricePerSquareFoot":
        errors.propertyDetails.generalPropertyInformation.pricePerSquareFoot = parseInt(
          value
        )
          ? ""
          : "Please enter valid number";
        break;

      case "buildingSize":
        errors.propertyDetails.generalPropertyInformation.buildingSize = parseInt(
          value
        )
          ? ""
          : "Please enter valid number";
        break;

      case "lotSize":
        errors.propertyDetails.generalPropertyInformation.lotSize = parseInt(
          value
        )
          ? ""
          : "Please enter valid number";
        break;

      case "numberOfBedrooms":
        errors.propertyDetails.generalPropertyInformation.numberOfBedrooms = parseInt(
          value
        )
          ? ""
          : "Please enter valid number";
        break;

      case "full":
        errors.propertyDetails.generalPropertyInformation.numberOfBathrooms.full = parseInt(
          value
        )
          ? ""
          : "Please enter valid number";
        break;

      case "half":
        errors.propertyDetails.generalPropertyInformation.numberOfBathrooms.half = parseInt(
          value
        )
          ? ""
          : "Please enter valid number";
        break;

      case "propertyDetail":
        errors.propertyDetails.propertyDetail =
          value.length < 8 ? "Please enter your Property Detail" : "";
        break;

      case "yearBuilt":
        errors.propertyDetails.generalPropertyInformation.yearBuilt = parseInt(
          value
        )
          ? ""
          : "Please enter valid number";
        break;
    }

    let states = Object.assign({}, this.state);
    switch (flag) {
      case "email":
        states.propertyDetails.Email[name] = value;
        this.setState(states);
        break;
      case "blastHeadline":
        states.propertyDetails[name] = value;
        this.setState(states);
        break;
      case "propertyPricing":
        states.propertyDetails.pricingInfo[name] = value;
        this.setState(states);
        break;
      case "propertyAddress":
        states.propertyDetails.propertyAddress[name] = value;
        this.setState(states);
        break;
      case "mlsNumber":
        states.propertyDetails.mlsNumber[name] = value;
        this.setState(states);
        break;
      case "propertyInformation":
        states.propertyDetails.generalPropertyInformation[name] = value;
        this.setState(states);
        break;

      case "propertyInformationBathrooms":
        states.propertyDetails.generalPropertyInformation.numberOfBathrooms[name] = value;
        this.setState(states);
        break;

      case "AgentContactInfo":
        states.propertyDetails.AgentContactInfo[name] = value;
        this.setState(states);
        break;

      case "propertyDetail":
        states.propertyDetails[name] = value;
        this.setState(states);
        break;

    }

    this.setState({ errors, [name]: value });
  }

    componentWillReceiveProps(nextProps) {
      console.log("nextProps==",nextProps);
        //  let { dispatch } = this.props.dispatchval.dispatch;
        if((nextProps.users!=undefined && nextProps.users.items )|| (nextProps.agentData!=undefined && nextProps.agentData) || (nextProps.profile!=undefined && nextProps.profile) || nextProps.imageData!=undefined &&  nextProps.imageData){
            this.propsDataupdate(nextProps.users,nextProps.agentData, nextProps.profile,nextProps.imageData);
        }
    }

  propsDataupdate(data,agentData,profile,images){
      let states = Object.assign({}, this.state);
      let propsData = data.items;
      let propsagentData = agentData;
      let profileData = profile;
      let propsimageData=images;
      if((propsagentData !=undefined && propsagentData ) || (profileData !=undefined && profileData ) || (images !=undefined && images) ){
        states.agentData = propsagentData;
        states.profile = profileData;
        states.imageData = propsimageData;
        this.setState({imageData:states.imageData});
        this.setState({agentData:states.agentData});
        this.setState({profile:states.profile});
      }  
        if(propsData !=undefined && propsData){
            if(propsData.templates.length){
                let template = propsData.templates[0];
                states.propertyDetails.Email.formSubject = template.email_subject;
                states.propertyDetails.Email.formLine = template.from_line;
                states.propertyDetails.Email.formReply = template.address;
                states.propertyDetails.blastHeadline=template.headline;
            }
            if(propsData.pricingInfo.length){
              states.propertyDetails.pricingInfo.price = propsData.pricingInfo[0].price;
              states.propertyDetails.pricingInfo.priceType = propsData.pricingInfo[0].priceType;
            }

            states.propertyDetails.propertyDetail = propsData.property_detail;
            states.propertyDetails.generalPropertyInformation.yearBuilt = propsData.year_built;
            states.propertyDetails.propertyId=propsData.id;

            states.propertyDetails.linksToWebsites.linkData = propsData.linksToWebsites;
            states.propertyDetails.isOpenHouse.openHouseData = propsData.isOpenHouse;

            states.propertyDetails.propertyAddress.zipCode=propsData.zipcode;
            states.propertyDetails.propertyAddress.city=propsData.city;
            states.propertyDetails.propertyAddress.streetAddress=propsData.street_address;
            states.propertyDetails.propertyAddress.displayMethod=propsData.display_method;


            states.propertyDetails.mlsNumber.numberProperty=propsData.mls_number;
            states.propertyDetails.mlsNumber.boardAssociation= propsData.board;
              
             if(propsData.number_bathrooms.length){
               states.propertyDetails.generalPropertyInformation.numberOfBathrooms.full=propsData.number_bathrooms[0].full;
               states.propertyDetails.generalPropertyInformation.numberOfBathrooms.half=propsData.number_bathrooms[0].half;
             }

            states.propertyDetails.generalPropertyInformation.yearBuilt=propsData.year_built;
            states.propertyDetails.generalPropertyInformation.lotSize=propsData.lot_size;
            states.propertyDetails.generalPropertyInformation.buildingSize = propsData.building_size;
            states.propertyDetails.generalPropertyInformation.numberOfBedrooms = propsData.number_bedrooms;
            states.propertyDetails.generalPropertyInformation.numberOfStories = propsData.number_stories;
            states.propertyDetails.generalPropertyInformation.pricePerSquareFoot = propsData.price;
            states.propertyDetails.generalPropertyInformation.propertyType=propsData.property_type;
            states.propertyDetails.generalPropertyInformation.propertyStyle = propsData.property_style;
            
            //states.propertyDetails.generalPropertyInformation.numberOfBathrooms.half = propsData.price
            this.setState(states);
        }   
  }

   componentDidMount() {
     var user = JSON.parse(localStorage.getItem("user"));
     const { dispatch } = this.props;
     if(user && user.userId){
      const { dispatch } = this.props.dispatchval.dispatch;
      //dispatch(userActions.getTemplateOrPropertydata(user.userId))
    let states = Object.assign({}, this.state);
        states.propertyDetails.userId = user.userId;
        this.setState(states);
         
         this.setState({
            userId: user.userId,
          });
          window.scrollTo(0, 0);
     }

  }


  saveProperty(event) {
    event.preventDefault();
    const { propertyDetails,submitted } = this.state;
    const { dispatch } = this.props.dispatchval.dispatch;
      if(propertyDetails && 
        propertyDetails.Email.formSubject &&
        propertyDetails.Email.formReply &&
        propertyDetails.blastHeadline &&
        propertyDetails.propertyDetail &&
        propertyDetails.pricingInfo.price){
        console.log("propertyDetails.Email.formSubject====",propertyDetails.Email.formSubject);
        dispatch(userActions.saveProperty(propertyDetails));
      } else {
        this.setState({submitted:true});
      }
  }

  render() {
     const { errors, propertyDetails, disabled,agentData,profile,imageData,alert,submitted } = this.state;
         let profilepc ='';
    if(agentData && agentData.image_url){
      profilepc=`${config.uploadapiUrl}/uploads/${agentData.image_url}`;
    }else{
      profilepc='/public/assets/images/dummy-profile.png';
    }
    let profilelogo ='';
    if(agentData && agentData.logo_url){
      profilelogo=`${config.uploadapiUrl}/uploads/${agentData.logo_url}`;
    }else{
      profilelogo='/public/assets/images/dummy-logo.png';
    }
    return (
      <div
        className="tab-pane fade mt-2"
        id="details"
        role="tabpanel"
        aria-labelledby="group-dropdown2-tab"
        aria-expanded="false"
      >
        <h4>Single Property Details</h4>
        <p>Enter property details for sale.</p>
        <form
          className="form-a contactForm"
          action={this.saveProperty}
          method="post"
          role="form"
        >
          <h5> Email Subject Line, From Line & Reply to Sender</h5>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label>Email Subject</label>
                <input
                  name="formSubject"
                  type="text"
                  onChange={(e) => this.handleChange("email", e)}
                  className="form-control form-control-lg form-control-a"
                  placeholder="Subject"
                  value={
                    propertyDetails &&
                    propertyDetails.Email &&
                    propertyDetails.Email.formSubject
                  }
                />
                <div className="validation">
                  {errors.propertyDetails.Email.formSubject ||
                    (submitted &&
                      !propertyDetails.Email.formSubject &&
                      "Email is required")}
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label>From Line</label>
                <input
                  name="formLine"
                  type="text"
                  onChange={(e) => this.handleChange("email", e)}
                  className="form-control form-control-lg form-control-a"
                  placeholder="Eg. Your Name"
                  value={
                    propertyDetails &&
                    propertyDetails.Email &&
                    propertyDetails.Email.formLine
                  }
                />
                <div className="validation">
                  {errors.propertyDetails.Email.formLine ||
                    (submitted &&
                      !propertyDetails.Email.formLine &&
                      "Form Line is required")}
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label>Reply To Address</label>
                <input
                  name="formReply"
                  type="email"
                  onChange={(e) => this.handleChange("email", e)}
                  className="form-control form-control-lg form-control-a"
                  placeholder="name@domain.com"
                  value={
                    propertyDetails &&
                    propertyDetails.Email &&
                    propertyDetails.Email.formReply
                      ? propertyDetails.Email.formReply
                      : ""
                  }
                />
                <div className="validation">
                  {errors.propertyDetails.Email.formReply ||
                    (submitted &&
                      !propertyDetails.Email.formReply &&
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
                <label>
                  Headline Text (Hint: Do NOT enter an address or date here):
                </label>
                <input
                  name="blastHeadline"
                  type="text"
                  onChange={(e) => this.handleChange("blastHeadline", e)}
                  value={propertyDetails.blastHeadline}
                  className="form-control form-control-lg form-control-a"
                  placeholder="e.g. Triple Net Shopping Center For Sale in Atlanta"
                />
                <div className="validation">
                  {errors.propertyDetails.blastHeadline ||
                    (submitted &&
                      !propertyDetails.Email.blastHeadline &&
                      "Blast headline Line is required")}
                </div>
              </div>
            </div>
          </div>
          <hr />
          <br />
          <h5> Agent Contact Info</h5>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <input
                  type="text"
                  name="agentName"
                  value={agentData && agentData.name}
                  className="form-control form-control-lg form-control-a"
                  placeholder="Agent Name"
                  onChange={(e) => this.handleChange("AgentContactInfo", e)}
                />
                <div className="validation">
                  {errors.propertyDetails.AgentContactInfo.agentName}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <input
                  type="text"
                  name="designation"
                  value={agentData && agentData.designation}
                  className="form-control form-control-lg form-control-a"
                  placeholder="Designation"
                  onChange={(e) => this.handleChange("AgentContactInfo", e)}
                />
              </div>
              <div className="validation">
                {errors.propertyDetails.AgentContactInfo.designation}
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <input
                  name="email"
                  type="email"
                  value={agentData && agentData.email}
                  className="form-control form-control-lg form-control-a"
                  placeholder="Email"
                  onChange={(e) => this.handleChange("AgentContactInfo", e)}
                />
                <div className="validation">
                  {errors.propertyDetails.AgentContactInfo.email}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <input
                  type="text"
                  name="websiteUrl"
                  value={agentData && agentData.website_url}
                  className="form-control form-control-lg form-control-a"
                  onChange={(e) => this.handleChange("AgentContactInfo", e)}
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <input
                  name="phone"
                  type="phone"
                  pattern="[0-9]{0,5}"
                  value={agentData && agentData.phone_number}
                  className="form-control form-control-lg form-control-a"
                  placeholder="Phone Number"
                  onChange={(e) => this.handleChange("AgentContactInfo", e)}
                />
                <div className="validation">
                  {errors.propertyDetails.AgentContactInfo.phone}
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="form-group">
                <label className="check">
                  Use Agent Photo
                  <input
                    type="checkbox"
                    name="useAgentPhoto"
                    onChange={(e) => this.handleChange("AgentContactInfo", e)}
                  />
                  <span className="checkmark"></span>
                </label>
                <img
                  alt="Photo"
                  className="img-circle logo"
                  style={{ width: "120px" }}
                  src={profilepc}
                />
                <br />
                <span>
                  <a href="">Upload Agent Photo</a>
                </span>
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
                  <a href="">Upload Agent Logo</a>
                </span>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <textarea
                  name="companyDetail"
                  value={agentData && agentData.company_details}
                  className="form-control"
                  cols="45"
                  rows="8"
                  onChange={(e) => this.handleChange("AgentContactInfo", e)}
                  placeholder="Company Details"
                >
                  {propertyDetails.propertyDetail}
                </textarea>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <textarea
                  name="orderInfo"
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
          <hr />
          <br />
          <h5>Is this an Open House?</h5>
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <a
                  href="javascript:void(0)"
                  className="btn btn-success"
                  onClick={() => this.show("openHouse")}
                >
                  Yes
                </a>
                <a
                  href="javascript:void(0)"
                  className="btn btn-outline-danger"
                  onClick={() => this.hide("openHouse")}
                >
                  No
                </a>
              </div>

              <Alert
                className={`alert ${alert.type}`}
                isOpen={alert && alert.alertIsOpenHouse}
              >
                {alert && alert.message}
              </Alert>
            </div>
          </div>
          <div
            style={{
              display:
                propertyDetails &&
                propertyDetails.isOpenHouse &&
                propertyDetails.isOpenHouse.display != undefined &&
                propertyDetails.isOpenHouse.display
                  ? "inline"
                  : "none",
            }}
          >
            <div className="row">
              <div className="col-md-3 mb-3">
                <div className="form-group">
                  <label>Type</label>
                  <div className="form-group">
                    <select
                      className="form-control form-control-lg form-control-a"
                      id="Type"
                      name="houseType"
                      onChange={this.openHouseChange}
                    >
                      <option value="">Select</option>
                      <option value="Open House">Open House</option>
                      <option value="Broker Open">Broker Open</option>
                      <option value="Agent Tour">Agent Tour</option>
                    </select>
                  </div>
                  <div className="validation">
                    {errors.propertyDetails.linksToWebsites.houseType}
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    className="form-control form-control-lg form-control-a"
                    type="date"
                    id="example-date-input"
                    name="date"
                    onChange={this.openHouseChange}
                  />
                </div>
                <div className="validation">
                  {errors.propertyDetails.linksToWebsites.date}
                </div>
              </div>
              <div className="col-md-2 mb-3">
                <div className="form-group">
                  <label>Start Time</label>
                  <input
                    className="form-control  form-control-lg form-control-a"
                    type="time"
                    id="example-time-input"
                    name="startTime"
                    onChange={this.openHouseChange}
                  />
                </div>
                <div className="validation">
                  {errors.propertyDetails.linksToWebsites.startTime}
                </div>
              </div>
              <div className="col-md-2 mb-3">
                <div className="form-group">
                  <label>End Time</label>
                  <input
                    className="form-control  form-control-lg form-control-a"
                    type="time"
                    id="example-time-input"
                    onChange={this.openHouseChange}
                    name="endTime"
                  />
                </div>
                <div className="validation">
                  {errors.propertyDetails.linksToWebsites.endTime}
                </div>
              </div>
              <div className="col-md-2 mb-3">
                <div className="form-group pt-4">
                  <a
                    href="javascript:void(0)"
                    className="btn btn-primary"
                    onClick={this.addOpenHouse}
                  >
                    Add
                  </a>
                </div>
              </div>
            </div>
            <table
              id="example"
              className="table table-bordered"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {propertyDetails.isOpenHouse &&
                  propertyDetails.isOpenHouse.openHouseData != undefined &&
                  propertyDetails.isOpenHouse.openHouseData.length > 0 &&
                  propertyDetails.isOpenHouse.openHouseData.map(function (
                    openHouse,
                    i
                  ) {
                    return (
                      <tr key={i}>
                        <td>
                          {disabled ? (
                            <input
                              type="text"
                              value={openHouse.openHouseData.houseType}
                              className="form-control form-control-lg form-control-a"
                              disabled={disabled}
                            />
                          ) : (
                            <select
                              className="form-control form-control-lg form-control-a"
                              id={i}
                              name="houseType"
                              disabled={disabled}
                              onChange={this.openHouseArrayChange}
                            >
                              <option value="">Select</option>
                              <option value="Open House">Open House</option>
                              <option value="Broker Open">Broker Open</option>
                              <option value="Agent Tour">Agent Tour</option>
                            </select>
                          )}
                        </td>
                        <td>
                          <input
                            type="date"
                            name="date"
                            onChange={this.openHouseArrayChange}
                            id={i}
                            className="form-control form-control-lg form-control-a"
                            value={openHouse.openHouseData.date}
                            disabled={disabled}
                          />
                        </td>
                        <td>
                          <input
                            type="time"
                            name="startTime"
                            onChange={this.openHouseArrayChange}
                            id={i}
                            className="form-control form-control-lg form-control-a"
                            value={openHouse.openHouseData.startTime}
                            disabled={disabled}
                          />{" "}
                          -{" "}
                          <input
                            type="time"
                            id={i}
                            onChange={this.openHouseArrayChange}
                            className="form-control form-control-lg form-control-a"
                            name="endTime"
                            value={openHouse.openHouseData.endTime}
                            disabled={disabled}
                          />
                        </td>
                        <td>
                          <a
                            href="javascript:void(0)"
                            title="Edit"
                            onClick={(e) => this.editOrDelete(e, "edit")}
                          >
                            <i className="fa fa-edit"></i>
                          </a>{" "}
                          &nbsp; &nbsp;
                          <i
                            className="fa fa-trash"
                            aria-hidden="true"
                            title="openHoueDelete"
                            id={i}
                            onClick={(e) => this.editOrDelete(e, "delete")}
                          ></i>
                        </td>
                      </tr>
                    );
                  },
                  this)}
              </tbody>
            </table>
          </div>
          <hr />
          <br />
          <h5>Property Pricing Information</h5>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label>Price</label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-usd"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    name="price"
                    onChange={(e) => this.handleChange("propertyPricing", e)}
                    value={
                      propertyDetails &&
                      propertyDetails.pricingInfo &&
                      propertyDetails.pricingInfo.price
                    }
                    className="form-control form-control-lg form-control-a"
                  />
                </div>
                <div className="validation">
                  {submitted &&
                    !propertyDetails.pricingInfo.price &&
                    "Price is required"}
                </div>
              </div>
            </div>
            <div className="col-md-8 mb-3">
              <div className="form-group">
                <div className="form-group">
                  <label>Price Display Type</label>
                  <select
                    className="form-control form-control-lg form-control-a"
                    id="Type"
                    name="priceType"
                    onChange={(e) => this.handleChange("propertyPricing", e)}
                    vlaue={
                      propertyDetails &&
                      propertyDetails.pricingInfo &&
                      propertyDetails.pricingInfo.priceType
                    }
                  >
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
              </div>
            </div>
          </div>
          <hr />
          <br />
          <h5>Property Address</h5>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label>Address Display Method:</label>
                <select
                  className="form-control form-control-lg form-control-a"
                  id="Type"
                  name="displayMethod"
                  onChange={(e) => this.handleChange("propertyAddress", e)}
                  value={
                    propertyDetails &&
                    propertyDetails.propertyAddress &&
                    propertyDetails.propertyAddress.displayMethod
                  }
                >
                  <option>Select Address Display Method</option>
                  <option>Show Entire Address</option>
                  <option>Show City & State Only</option>
                  <option>DO NOT Show Address</option>
                </select>
              </div>
            </div>
            <div className="col-md-8 mb-3">
              <div className="form-group">
                <label>Street Address</label>
                <input
                  type="text"
                  name="streetAddress"
                  className="form-control form-control-lg form-control-a"
                  placeholder="Street Address"
                  onChange={(e) => this.handleChange("propertyAddress", e)}
                  value={
                    propertyDetails &&
                    propertyDetails.propertyAddress &&
                    propertyDetails.propertyAddress.streetAddress
                  }
                />
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  className="form-control form-control-lg form-control-a"
                  placeholder="City"
                  onChange={(e) => this.handleChange("propertyAddress", e)}
                  value={
                    propertyDetails &&
                    propertyDetails.propertyAddress &&
                    propertyDetails.propertyAddress.city
                  }
                />
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label>State</label>
                <select
                  className="form-control form-control-lg form-control-a"
                  id="Type"
                  name="state"
                  onChange={(e) => this.handleChange("propertyAddress", e)}
                >
                  <option>Alabama</option>
                  <option>Alaska</option>
                  <option>Arizona</option>
                  <option>Arkansas</option>
                  <option>California</option>
                  <option>Colorado</option>
                  <option>Connecticut</option>
                  <option>Delaware</option>
                  <option>District of Columbia</option>
                  <option>Florida</option>
                  <option>Georgia</option>
                  <option>Hawaii</option>
                  <option>Idaho</option>
                  <option>Illinois</option>
                  <option>Indiana</option>
                  <option>Iowa</option>
                  <option>Kansas</option>
                </select>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label>Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  className="form-control form-control-lg form-control-a"
                  placeholder="Zip Code"
                  onChange={(e) => this.handleChange("propertyAddress", e)}
                  value={
                    propertyDetails &&
                    propertyDetails.propertyAddress &&
                    propertyDetails.propertyAddress.zipCode
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
                <a
                  href="javascript:void(0)"
                  className="btn btn-success"
                  onClick={() => this.show("mlsNumber")}
                >
                  Yes
                </a>
                <a
                  href="javascript:void(0)"
                  className="btn btn-outline-danger"
                  onClick={() => this.hide("mlsNumber")}
                >
                  No
                </a>
              </div>
            </div>
          </div>
          <div
            className="row"
            style={{
              display:
                propertyDetails &&
                propertyDetails.mlsNumber &&
                propertyDetails.mlsNumber.display != undefined &&
                propertyDetails.mlsNumber.display
                  ? "flex"
                  : "none",
            }}
          >
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label>MLS Number</label>
                <input
                  type="text"
                  name="numberProperty"
                  className="form-control form-control-lg form-control-a"
                  placeholder="Enter the MLS Number for Property"
                  onChange={(e) => this.handleChange("mlsNumber", e)}
                  value={
                    propertyDetails &&
                    propertyDetails.mlsNumber &&
                    propertyDetails.mlsNumber.numberProperty
                  }
                />
              </div>
              <div className="validation">
                {errors.propertyDetails.mlsNumber.numberProperty}
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <label>
                  Which 'board / association' represents the Realtors where this
                  property is located?
                </label>
                <p className="red">
                  Attention: This is NOT a 'database step'. Click INSTRUCTIONS
                  on the left for more details
                </p>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg form-control-a"
                    id="Type"
                    name="boardAssociation"
                    onChange={(e) => this.handleChange("mlsNumber", e)}
                    value={
                      propertyDetails &&
                      propertyDetails.mlsNumber &&
                      propertyDetails.mlsNumber.boardAssociation
                    }
                  >
                    <option value="">
                      -- Please Select a board / association for our 'Internal
                      Sourcing' --
                    </option>
                    <option>
                      Amelia Island-Nassau County Real Estate Agent List
                    </option>
                    <option>Bartow Real Estate Agent List</option>

                    <option>
                      Bonita Springs-Estero Real Estate Agent List
                    </option>
                    <option>
                      Broward, Palm Beaches, and St. Lucie Real Estate Agent
                      List (includes Ft Lauderdale)
                    </option>
                    <option>Central Panhandle Real Estate Agent List</option>
                    <option>Citrus County Real Estate Agent List</option>
                    <option>Daytona Beach Area Real Estate Agent List</option>

                    <option>
                      Dixie Gilchrist Levy Counties Real Estate Agent List
                    </option>
                    <option>East Pasco Real Estate Agent List</option>
                    <option>East Polk County Real Estate Agent List</option>
                    <option>Emerald Coast Real Estate Agent List</option>
                    <option>Englewood Area Real Estate Agent List</option>
                    <option>Flagler County Real Estate Agent List</option>
                    <option>Florida Keys Real Estate Agent List</option>
                    <option>
                      Fort Myers/Cape Coral Merger(Royal Palm Coast Real Estate
                      Agent List)
                    </option>
                    <option>
                      Franklin &amp; Gulf Counties Real Estate Agent List
                    </option>
                  </select>
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
                    id="Type"
                    name="propertyType"
                    onChange={(e) =>
                      this.handleChange("propertyInformation", e)
                    }
                    value={
                      propertyDetails &&
                      propertyDetails.generalPropertyInformation &&
                      propertyDetails.generalPropertyInformation.propertyType
                    }
                  >
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
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label>Property Style:</label>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg form-control-a"
                    id="Type"
                    name="propertyStyle"
                    onChange={(e) =>
                      this.handleChange("propertyInformation", e)
                    }
                    value={
                      propertyDetails &&
                      propertyDetails.generalPropertyInformation &&
                      propertyDetails.generalPropertyInformation.propertyStyle
                    }
                  >
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
                  <input
                    type="text"
                    className="form-control form-control-lg form-control-a"
                    placeholder="0"
                    name="pricePerSquareFoot"
                    onChange={(e) =>
                      this.handleChange("propertyInformation", e)
                    }
                    value={
                      propertyDetails &&
                      propertyDetails.generalPropertyInformation &&
                      propertyDetails.generalPropertyInformation
                        .pricePerSquareFoot
                    }
                  />

                  <div className="input-group-append">
                    <span className="input-group-text">/sqft</span>
                  </div>
                </div>
                <div className="validation">
                  {
                    errors.propertyDetails.generalPropertyInformation
                      .pricePerSquareFoot
                  }
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label>Building Size</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg form-control-a"
                    placeholder="0"
                    name="buildingSize"
                    onChange={(e) =>
                      this.handleChange("propertyInformation", e)
                    }
                    value={
                      propertyDetails &&
                      propertyDetails.generalPropertyInformation &&
                      propertyDetails.generalPropertyInformation.buildingSize
                    }
                  />

                  <div className="input-group-append">
                    <span className="input-group-text">/sqft</span>
                  </div>
                </div>
                <div className="validation">
                  {
                    errors.propertyDetails.generalPropertyInformation
                      .buildingSize
                  }
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label>Lot Size</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg form-control-a"
                    placeholder="0"
                    name="lotSize"
                    onChange={(e) =>
                      this.handleChange("propertyInformation", e)
                    }
                    value={
                      propertyDetails &&
                      propertyDetails.generalPropertyInformation &&
                      propertyDetails.generalPropertyInformation.lotSize
                    }
                  />
                  <div className="input-group-append">
                    <select
                      className="form-control form-control-lg form-control-a"
                      id="Type"
                      name="lotType"
                      onChange={(e) =>
                        this.handleChange("propertyInformation", e)
                      }
                    >
                      <option>Select</option>
                      <option>acres</option>
                      <option>sqft</option>
                    </select>
                  </div>
                </div>
                <div className="validation">
                  {errors.propertyDetails.generalPropertyInformation.lotSize}
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label>Number of Bedrooms</label>
                <input
                  type="text"
                  name="numberOfBedrooms"
                  className="form-control form-control-lg form-control-a"
                  placeholder="eg. 2"
                  onChange={(e) => this.handleChange("propertyInformation", e)}
                  value={
                    propertyDetails &&
                    propertyDetails.generalPropertyInformation &&
                    propertyDetails.generalPropertyInformation.numberOfBedrooms
                  }
                />
              </div>
              <div className="validation">
                {
                  errors.propertyDetails.generalPropertyInformation
                    .numberOfBedrooms
                }
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label>Number of Bathrooms</label>
                <div className="row">
                  <div className="col-md-6 input-group mb-3">
                    <input
                      type="text"
                      className="form-control form-control-lg form-control-a"
                      placeholder="0"
                      name="full"
                      value={
                        propertyDetails &&
                        propertyDetails.generalPropertyInformation &&
                        propertyDetails.generalPropertyInformation
                          .numberOfBathrooms &&
                        propertyDetails.generalPropertyInformation
                          .numberOfBathrooms.full
                      }
                      onChange={(e) =>
                        this.handleChange("propertyInformationBathrooms", e)
                      }
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">Full</span>
                    </div>
                    <div className="validation">
                      {
                        errors.propertyDetails.generalPropertyInformation
                          .numberOfBathrooms.full
                      }
                    </div>
                  </div>

                  <div className="input-group mb-3 col-md-6">
                    <input
                      type="text"
                      className="form-control form-control-lg form-control-a"
                      placeholder="0"
                      name="half"
                      value={
                        propertyDetails &&
                        propertyDetails.generalPropertyInformation &&
                        propertyDetails.generalPropertyInformation
                          .numberOfBathrooms &&
                        propertyDetails.generalPropertyInformation
                          .numberOfBathrooms.half
                      }
                      onChange={(e) =>
                        this.handleChange("propertyInformationBathrooms", e)
                      }
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">Half</span>
                    </div>
                  </div>
                  <div className="validation">
                    {
                      errors.propertyDetails.generalPropertyInformation
                        .numberOfBathrooms.half
                    }
                  </div>
                </div>{" "}
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label>Year Built</label>
                <input
                  type="text"
                  name="yearBuilt"
                  className="form-control form-control-lg form-control-a"
                  placeholder="eg. 2016"
                  value={
                    propertyDetails &&
                    propertyDetails.generalPropertyInformation &&
                    propertyDetails.generalPropertyInformation.yearBuilt
                  }
                  onChange={(e) => this.handleChange("propertyInformation", e)}
                />
              </div>
              <div className="validation">
                {errors.propertyDetails.generalPropertyInformation.yearBuilt}
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label>Number of Stories</label>
                <select
                  className="form-control form-control-lg form-control-a"
                  id="Type"
                  name="numberOfStories"
                  onChange={(e) => this.handleChange("propertyInformation", e)}
                  value={
                    propertyDetails &&
                    propertyDetails.generalPropertyInformation &&
                    propertyDetails.generalPropertyInformation.numberOfStories
                  }
                >
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
                  <a
                    href="javascript:void(0)"
                    className="btn btn-success"
                    onClick={() => this.show("garage")}
                  >
                    Yes
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="btn btn-outline-danger"
                    onClick={() => this.hide("garage")}
                  >
                    No
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="form-group">
                <select
                  onChange={(e) => this.handleChange("propertyInformation", e)}
                  name="garageSize"
                  style={{
                    display:
                      propertyDetails &&
                      propertyDetails.generalPropertyInformation &&
                      propertyDetails.generalPropertyInformation.garage
                        ? "inline"
                        : "none",
                  }}
                  className="form-control form-control-lg form-control-a"
                >
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
          <h5>Property Details</h5>
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <textarea
                  name="propertyDetail"
                  className="form-control"
                  cols="45"
                  rows="8"
                  placeholder="Property Details"
                  onChange={(e) => this.handleChange("propertyDetail", e)}
                >
                  {propertyDetails && propertyDetails.propertyDetail}
                </textarea>
              </div>
              <div className="validation">
                {errors.propertyDetails.propertyDetail ||
                  (submitted &&
                    !propertyDetails.propertyDetail &&
                    "Property detail is required")}
              </div>
            </div>{" "}
          </div>
          <hr />
          <br />
          <h5>Links to Websites, Virtual Tours or other Material</h5>
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <a
                  href="javascript:void(0)"
                  className="btn btn-success"
                  onClick={() => this.show("linksToWebsites")}
                >
                  Yes
                </a>
                <a
                  href="javascript:void(0)"
                  className="btn btn-outline-danger"
                  onClick={() => this.hide("linksToWebsites")}
                >
                  No
                </a>
              </div>
            </div>
          </div>
          <div
            style={{
              display:
                propertyDetails &&
                propertyDetails.linksToWebsites &&
                propertyDetails.linksToWebsites.display != undefined &&
                propertyDetails.linksToWebsites.display
                  ? "inline"
                  : "none",
            }}
          >
            <p>
              Add links to your property below. NOTE. Links will not be saved to
              your blast until you Click Next
            </p>
            <div className="row">
              <div className="col-md-5 mb-3">
                <div className="form-group">
                  <label>URL</label>
                  <input
                    type="text"
                    name="url"
                    className="form-control form-control-lg form-control-a"
                    placeholder="e.g. http://www.marketingpackage.com"
                    onChange={this.linksToWebsitesChange}
                  />
                </div>
                <div className="validation">
                  {errors.propertyDetails.linksToWebsites.url}
                </div>
              </div>

              <div className="col-md-5 mb-3">
                <div className="form-group">
                  <label>Anchor Text</label>
                  <input
                    type="text"
                    name="buildingSize"
                    className="form-control form-control-lg form-control-a"
                    placeholder="e.g. Download Our Marketing Package"
                    onChange={this.linksToWebsitesChange}
                  />
                </div>
                <div className="validation">
                  {errors.propertyDetails.linksToWebsites.buildingSize}
                </div>
              </div>
              <div className="col-md-2 mb-3">
                <div className="form-group pt-4">
                  <a
                    href="javascript:void(0)"
                    className="btn btn-primary"
                    onClick={this.addLinksToWebsites}
                  >
                    Add
                  </a>
                </div>
              </div>
            </div>
            <table
              id="example"
              className="table table-bordered"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th>URL</th>
                  <th>Text</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {propertyDetails.linksToWebsites &&
                  propertyDetails.linksToWebsites.linkData != undefined &&
                  propertyDetails.linksToWebsites.linkData.length > 0 &&
                  propertyDetails.linksToWebsites.linkData.map(function (
                    linkData,
                    i
                  ) {
                    return (
                      <tr key={i}>
                        <td>
                          <input
                            type="text"
                            className="form-control form-control-lg form-control-a"
                            id={i}
                            value={linkData.linksToWebsiteData.url}
                            name="url"
                            disabled={disabled}
                            onChange={this.linkArrayChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control form-control-lg form-control-a"
                            id={i}
                            onChange={this.linkArrayChange}
                            name="buildingSize"
                            value={linkData.linksToWebsiteData.buildingSize}
                            disabled={disabled}
                          />
                        </td>
                        <td>
                          <a
                            href="javascript:void(0)"
                            title="Edit"
                            onClick={(e) => this.editOrDelete(e, "edit")}
                          >
                            <i className="fa fa-edit"></i>
                          </a>{" "}
                          &nbsp; &nbsp;
                          <i
                            className="fa fa-trash"
                            aria-hidden="true"
                            id={i}
                            name="linkData"
                            onClick={(e) => this.editOrDelete(e, "delete")}
                            title="linkDelete"
                          ></i>
                        </td>
                      </tr>
                    );
                  },
                  this)}
              </tbody>
            </table>
          </div>
          <hr />
          <br />
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
              onClick={this.saveProperty}
            >
              Next
            </a>
          </div>
        </form>
      </div>
    );
  }
}

export default PropertyTab;
