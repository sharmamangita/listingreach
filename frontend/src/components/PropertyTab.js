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
    this.propertyError = [
      {
        propertyDetails: {
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
            garageSize: "",
          },
        },
      },
    ];

    this.property = [
      {
        blast_id:'',
        userId: "",
        propertyId: "",
        Email: {
          formSubject: "",
          formLine: "",
          formReply: "",
        },
        blastHeadline: "",
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
      },
    ];

    this.state = {
      userId: "",
      blast_id:'',
      propertyCount:1,
      templateId:"",
      disabled: true,
      alert: {
        alertIsOpenHouse: false,
        alertlink: false,
        type: "",
        message: "",
      },
      error: {
        Email: {
          formSubject: "",
          formLine: "",
          formReply: "",
        },
        blastHeadline: "",
        agentData:{
          name:'',
          phone_number:'',
          company_details:'',
        }
      },

      Email: {
        formSubject: "",
        formLine: "",
        formReply: "",
      },
      blastHeadline: "",

      profile: Object.assign(
        {
          companyName: "",
          mobileno: "",
          city: "",
          country: "",
          state: "",
          zipcode: "",

          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        },
        this.props.profile
      ),
      agentData: Object.assign(
        {
          name: "",
          designation: "",
          email: "",
          website_url: "",
          phone_number: "",
          company_details: "",
          other_information: "",
          image_url: "",
          logo_url: "",
        },
        this.props.agentData
      ),

      errors: [
        {
          propertyDetails: {
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
              garageSize: "",
            },
          },
        },
      ],

      propertyDetails: [
        {
          userId: "",
          propertyId: "",
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
        },
      ],
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
    this.addProperty = this.addProperty.bind(this);
    this.deleteProperty = this.deleteProperty.bind(this);

    let user = JSON.parse(localStorage.getItem("user"));
    if (user && user.userId && this.props && this.props.dispatchval) {
      const { dispatch } = this.props.dispatchval.dispatch;
      dispatch(userActions.getById(user.userId));
    }
  }

  addProperty(index) {
    this.property.push({
      userId: "",
      blast_id:'',
      propertyId: "",
      Email: {
        formSubject: "",
        formLine: "",
        formReply: "",
      },
      blastHeadline: "",
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
    });
    this.propertyError.push({
      propertyDetails: {
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
          garageSize: "",
        },
      },
    });
let propertyCount = this.state.propertyCount+1;
    this.setState({
      propertyDetails: this.property,
      propertyCount:propertyCount,
      errors: this.propertyError,
    });
  }

  deleteProperty(i) {
    let propertyArray = Object.assign({}, this.state);
    console.log("this.state.propertyCount====",this.state.propertyCount);
    let propertyCount = this.state.propertyCount-1;
    console.log("propertCount====",propertyCount);
    propertyArray.propertyDetails.splice(i, 1);
    propertyArray.propertyCount = propertyCount;
    this.setState(propertyArray);
  }

  selectBlast(e, blast_type) {
    if (blast_type) {
      const { dispatch } = this.props.dispatchval.dispatch;
      const { userId } = this.state;
      dispatch(userActions.blast(blast_type, userId));
    }
  }

  addOpenHouse(e) {
    const { id } = event.target;
    const { propertyDetails } = this.state;
    if (
      propertyDetails[id].isOpenHouse.houseType &&
      propertyDetails[id].isOpenHouse.date &&
      propertyDetails[id].isOpenHouse.startTime &&
      propertyDetails[id].isOpenHouse.endTime
    ) {
      let houseType = propertyDetails[id].isOpenHouse.houseType;
      let date = propertyDetails[id].isOpenHouse.date;
      let startTime = propertyDetails[id].isOpenHouse.startTime;
      let endTime = propertyDetails[id].isOpenHouse.endTime;

      this.openHouse.push({
        openHouseData: {
          houseType: houseType,
          date: date,
          startTime: startTime,
          endTime: endTime,
        },
      });

      let openHouse = Object.assign({}, this.state);
      openHouse.propertyDetails[id].isOpenHouse.openHouseData = this.openHouse;
      this.setState(openHouse);
    }
  }

  linkArrayChange(event) {
    const { id, name, value } = event.target;
    let keys = id.split("-");
    let linkArray = Object.assign({}, this.state);
    linkArray.propertyDetails[keys[0]].linksToWebsites.linkData[keys[1]].linksToWebsiteData[
      name
    ] = value;
  }

  openHouseArrayChange(event) {
    const { id, name, value } = event.target;
    let keys = id.split("-");
    let openHouseArray = Object.assign({}, this.state);
    openHouseArray.propertyDetails[keys[0]].isOpenHouse.openHouseData[keys[1]].openHouseData[
      name
    ] = value;
    if (
      openHouseArray.propertyDetails[keys[0]].isOpenHouse.openHouseData[keys[1]]
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

    let isState = this.setState(openHouseArray);
  }

  linkArrayDelete(event,linkIndex) {
    const { id } = event.target;
    let keys = linkIndex.split("-");
    let linkArray = Object.assign({}, this.state);
    linkArray.propertyDetails[keys[0]].linksToWebsites.linkData.splice([keys[1]], 1);
    this.setState(linkArray);
  }

  openHouseChange(event) {
    event.preventDefault();
    const { name, value, id } = event.target;
    let errors = this.state.errors;
    console.log("errors=====", errors);
    switch (name) {
      case "houseType":
        errors[id].propertyDetails.isOpenHouse.houseType =
          value.length < 5 ? "Please select house type" : "";
        break;
      case "date":
        errors[id].propertyDetails.isOpenHouse.date =
          value.length < 3 ? "Date is required" : "";
        break;
      case "startTime":
        errors[id].propertyDetails.isOpenHouse.startTime =
          value.length < 3 ? "Start time is required" : "";
        break;

      case "endTime":
        errors[id].propertyDetails.isOpenHouse.endTime =
          value.length < 3 ? "End time is required" : "";
        break;
    }

    if (value != "" && name != "") {
      let openHouse = Object.assign({}, this.state);
      openHouse.propertyDetails[id].isOpenHouse[name] = value;
      this.setState(openHouse);
      this.AddButton = true;
    } else {
      this.AddButton = false;
    }
  }

  linksToWebsitesChange(event) {
    event.preventDefault();
    const { name, value, id } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case "url":
        errors[id].propertyDetails.linksToWebsites.url =
          value.length < 5 ? "URL is required" : "";
        break;
      case "buildingSize":
        errors[id].propertyDetails.linksToWebsites.buildingSize =
          value.length < 3 ? "Building Size is required" : "";
        break;
    }
    if (value != "" && name != "") {
      let linksToWebsites = Object.assign({}, this.state);
      linksToWebsites.propertyDetails[id].linksToWebsites[name] = value;
      this.setState(linksToWebsites);
    }
  }

  editOrDelete(event, flag,indexList) {
    let keys = indexList.split("-");
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
        linkArray.propertyDetails[keys[0]].linksToWebsites.linkData.splice(keys[1], 1);
        this.setState(linkArray);
      } else if (title == "openHoueDelete") {
        let openHoueArray = Object.assign({}, this.state);
        openHoueArray.propertyDetails[keys[0]].isOpenHouse.openHouseData.splice(
          keys[1],
          1
        );
        this.setState(openHoueArray);
      }
    }
  }

  addLinksToWebsites(e) {
    let { id } = e.target;
    const { propertyDetails } = this.state;
    if (
      propertyDetails[id].linksToWebsites.url &&
      propertyDetails[id].linksToWebsites.buildingSize
    ) {
      let url = propertyDetails[id].linksToWebsites.url;
      let buildingSize = propertyDetails[id].linksToWebsites.buildingSize;

      this.linksToWebsites.push({
        linksToWebsiteData: { url: url, buildingSize: buildingSize },
      });
      let linksToWebsites = Object.assign({}, this.state);
      linksToWebsites.propertyDetails[
        id
      ].linksToWebsites.linkData = this.linksToWebsites;
      this.setState(linksToWebsites);
    }
  }

  show(flag, id) {
    let states = Object.assign({}, this.state);
    switch (flag) {
      case "openHouse":
        states.propertyDetails[id].isOpenHouse.display = true;
        break;
      case "mlsNumber":
        states.propertyDetails[id].mlsNumber.display = true;
        break;
      case "linksToWebsites":
        states.propertyDetails[id].linksToWebsites.display = true;
        break;
      case "garage":
        states.propertyDetails[id].generalPropertyInformation.garage = true;
        break;
    }
    this.setState(states);
  }

  hide(flag, id) {
    let states = Object.assign({}, this.state);
    switch (flag) {
      case "openHouse":
        states.propertyDetails[id].isOpenHouse.display = false;
        break;
      case "mlsNumber":
        states.propertyDetails[id].mlsNumber.display = false;
        break;
      case "linksToWebsites":
        states.propertyDetails[id].linksToWebsites.display = false;
        break;
      case "garage":
        states.propertyDetails[id].generalPropertyInformation.garage = false;
        break;
    }
    this.setState(states);
  }

  handleChange(flag, event) {
    event.preventDefault();
    let { id } = event.target;
    const { propertyDetails } = this.state;
    const { name, value } = event.target;
    let errors = this.state.errors;
    let error = this.state.error;
    switch (name) {
      case "formSubject":
        error.Email.formSubject =
          value.length < 3
            ? "Email Subject must be at least 3 characters long!"
            : "";
        break;
      case "formLine":
        error.Email.formLine =
          value.length < 3 ? "Name must be at least 3 characters long!" : "";
        break;
      case "formReply":
        error.Email.formReply = validEmailRegex.test(value)
          ? ""
          : "Email is not valid!";
        break;
      case "blastHeadline":
        error.blastHeadline =
          value.length < 8
            ? "Blast Head line must be at least 8 characters long!"
            : "";
        break;

        case "name":
        error.agentData.name =
          value.length < 8
            ? "Agent name must be at least 3 characters long!"
            : "";
        break;

        case "phone_number":
        error.agentData.phone_number =
          value.length < 8
            ? "Please enter vaild phone number"
            : "";
        break;

        case "company_details":
        error.agentData.company_details =
          value.length < 8
            ? "Company Detail line must be at least 8 characters long!"
            : "";
        break;

  

      case "numberProperty":
        errors[id].propertyDetails.mlsNumber.numberProperty = parseInt(value)
          ? ""
          : "Please enter valid number";
        break;

      case "pricePerSquareFoot":
        errors[
          id
        ].propertyDetails.generalPropertyInformation.pricePerSquareFoot = parseInt(
          value
        )
          ? ""
          : "Please enter valid number";
        break;

      case "buildingSize":
        errors[
          id
        ].propertyDetails.generalPropertyInformation.buildingSize = parseInt(
          value
        )
          ? ""
          : "Please enter valid number";
        break;

      case "lotSize":
        errors[
          id
        ].propertyDetails.generalPropertyInformation.lotSize = parseInt(value)
          ? ""
          : "Please enter valid number";
        break;

      case "numberOfBedrooms":
        errors[
          id
        ].propertyDetails.generalPropertyInformation.numberOfBedrooms = parseInt(
          value
        )
          ? ""
          : "Please enter valid number";
        break;

      case "full":
        errors[
          id
        ].propertyDetails.generalPropertyInformation.numberOfBathrooms.full = parseInt(
          value
        )
          ? ""
          : "Please enter valid number";
        break;

      case "half":
        errors[
          id
        ].propertyDetails.generalPropertyInformation.numberOfBathrooms.half = parseInt(
          value
        )
          ? ""
          : "Please enter valid number";
        break;

      case "propertyDetail":
        errors[id].propertyDetails.propertyDetail =
          value.length < 8 ? "Please enter your Property Detail" : "";
        break;

      case "yearBuilt":
        errors[
          id
        ].propertyDetails.generalPropertyInformation.yearBuilt = parseInt(value)
          ? ""
          : "Please enter valid number";
        break;
    }

    let states = Object.assign({}, this.state);
    this.setState(states);
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
        states.propertyDetails[id].pricingInfo[name] = value;
        this.setState(states);
        break;
      case "propertyAddress":
        states.propertyDetails[id].propertyAddress[name] = value;
           let user = JSON.parse(localStorage.getItem("user"));
            states.propertyDetails[id].userId = user.userId;
        this.setState(states);
        break;
      case "mlsNumber":
        states.propertyDetails[id].mlsNumber[name] = value;
        this.setState(states);
        break;
      case "propertyInformation":
        states.propertyDetails[id].generalPropertyInformation[name] = value;
        this.setState(states);
        break;

      case "propertyInformationBathrooms":
        states.propertyDetails[id].generalPropertyInformation.numberOfBathrooms[
          name
        ] = value;
        this.setState(states);
        break;

      case "propertyDetail":
        states.propertyDetails[id][name] = value;

        this.setState(states);
        break;

      case "AgentContactInfo":
        states.agentData[name] = value;
        this.setState(states);
        break;
    }

    this.setState({ errors, [name]: value });
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps232",nextProps);
    if(nextProps.propertyData && nextProps.propertyData.blastData){
      let blast = nextProps.propertyData;
       this.propsDataupdate(blast); 
    }

    if(nextProps.propertyData && nextProps.propertyData.templateData){
       let templateData = nextProps.propertyData;
      this.propsDataupdate(templateData);
    }
/*    if(nextProps && nextProps.propertyData && nextProps.propertyData.data ||  nextProps.propertyData.data){
      let templateId = nextProps.propertyData.data._id;
      let blast_id = nextProps.propertyData.data.blast_id;
      this.setState({templateId:templateId,blast_id:blast_id});
    }*/
    //if((nextProps.propertyData!=undefined && nextProps.propertyData) || (nextProps.users!=undefined && nextProps.users.items )|| (nextProps.agentData!=undefined && nextProps.agentData) || (nextProps.profile!=undefined && nextProps.profile) || nextProps.imageData!=undefined &&  nextProps.imageData){
    //this.propsDataupdate(nextProps.users,nextProps.agentData, nextProps.profile,nextProps.imageData);
    //this.propsDataupdate(nextProps.propertyData);
    // }
  }

  //propsDataupdate(data, agentData, profile, images) {
    propsDataupdate(data){
    let states = Object.assign({}, this.state);
    if(data && data.blastData){
      states.blast_id = data.blastData._id;
    }

    if(data && data.templateData){
      states.templateId = data.templateData._id;
    }

    /*let propsData = data.items;
    let propsagentData = agentData;
    let profileData = profile;
    let propsimageData = images;
    if (
      (propsagentData != undefined && propsagentData) ||
      (profileData != undefined && profileData) ||
      (images != undefined && images)
    ) {
      states.agentData = propsagentData;
      states.profile = profileData;
      states.imageData = propsimageData;
      this.setState({ imageData: states.imageData });
      this.setState({ agentData: states.agentData });
      this.setState({ profile: states.profile });
    }*/


    // for edit blast case use this all properties with array
    /*if (propsData != undefined && propsData) {
      if (propsData.templates.length) { 
        let template = propsData.templates[0];
        states.propertyDetails.Email.formSubject = template.email_subject;
        states.propertyDetails.Email.formLine = template.from_line;
        states.propertyDetails.Email.formReply = template.address;
        states.propertyDetails.blastHeadline = template.headline;
      }
      if (propsData.pricingInfo.length) {
        states.propertyDetails.pricingInfo.price =
          propsData.pricingInfo[0].price;
        states.propertyDetails.pricingInfo.priceType =
          propsData.pricingInfo[0].priceType;
      }

      states.propertyDetails.propertyDetail = propsData.property_detail;
      states.propertyDetails.generalPropertyInformation.yearBuilt =
        propsData.year_built;
      states.propertyDetails.propertyId = propsData.id;

      states.propertyDetails.linksToWebsites.linkData =
        propsData.linksToWebsites;
      states.propertyDetails.isOpenHouse.openHouseData = propsData.isOpenHouse;

      states.propertyDetails.propertyAddress.zipCode = propsData.zipcode;
      states.propertyDetails.propertyAddress.city = propsData.city;
      states.propertyDetails.propertyAddress.streetAddress =
        propsData.street_address;
      states.propertyDetails.propertyAddress.displayMethod =
        propsData.display_method;

      states.propertyDetails.mlsNumber.numberProperty = propsData.mls_number;
      states.propertyDetails.mlsNumber.boardAssociation = propsData.board;

      if (propsData.number_bathrooms.length) {
        states.propertyDetails.generalPropertyInformation.numberOfBathrooms.full =
          propsData.number_bathrooms[0].full;
        states.propertyDetails.generalPropertyInformation.numberOfBathrooms.half =
          propsData.number_bathrooms[0].half;
      }

      states.propertyDetails.generalPropertyInformation.yearBuilt =
        propsData.year_built;
      states.propertyDetails.generalPropertyInformation.lotSize =
        propsData.lot_size;
      states.propertyDetails.generalPropertyInformation.buildingSize =
        propsData.building_size;
      states.propertyDetails.generalPropertyInformation.numberOfBedrooms =
        propsData.number_bedrooms;
      states.propertyDetails.generalPropertyInformation.numberOfStories =
        propsData.number_stories;
      states.propertyDetails.generalPropertyInformation.pricePerSquareFoot =
        propsData.price;
      states.propertyDetails.generalPropertyInformation.propertyType =
        propsData.property_type;
      states.propertyDetails.generalPropertyInformation.propertyStyle =
        propsData.property_style;

      //states.propertyDetails.generalPropertyInformation.numberOfBathrooms.half = propsData.price
      this.setState(states);
    }*/
    this.setState(states);
  }

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem("user"));
    const { dispatch } = this.props;
    if (user && user.userId) {
      const { dispatch } = this.props.dispatchval.dispatch;
      //dispatch(userActions.getTemplateOrPropertydata(user.userId))

      this.setState({
        userId: user.userId,
      });
      window.scrollTo(0, 0);
    }
  }

  saveProperty(event) {
    event.preventDefault();
    const { propertyDetails, submitted,agentData,Email,blastHeadline,templateId,blast_id} = this.state;
    const { dispatch } = this.props.dispatchval.dispatch;
       if (
      propertyDetails &&
      Email.formSubject &&
      Email.formReply &&
      blastHeadline &&
      propertyDetails[0].propertyDetail &&
      propertyDetails[0].pricingInfo.price
    ) {
    dispatch(userActions.saveProperty(propertyDetails,agentData,Email,blastHeadline,templateId,blast_id));
        } else {
      this.setState({ submitted: true });
    }
  }

  render() {
    var that = this;
    const {
      errors,
      propertyDetails,
      disabled,
      agentData,
      profile,
      imageData,
      alert,
      submitted,
      error,
      Email,
      propertyCount,
      blastHeadline,
    } = this.state;
    const { propertyData } = this.props;
    let profilepc = "";
    if (agentData && agentData.image_url) {
      profilepc = `${config.uploadapiUrl}/uploads/${agentData.image_url}`;
    } else {
      profilepc = "/public/assets/images/dummy-profile.png";
    }
    let profilelogo = "";
    if (agentData && agentData.logo_url) {
      profilelogo = `${config.uploadapiUrl}/uploads/${agentData.logo_url}`;
    } else {
      profilelogo = "/public/assets/images/dummy-logo.png";
    }
    console.log("this.state===", this.state);
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
                  value={Email && Email.formSubject}
                />
                <div className="validation">
                  {error.Email.formSubject ||
                    (submitted && !Email.formSubject && "Email is required")}
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
                  value={Email && Email.formLine}
                />
                <div className="validation">
                  {error.Email.formLine ||
                    (submitted && !Email.formLine && "Form Line is required")}
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
                  value={Email && Email.formReply}
                />
                <div className="validation">
                  {error.Email.formReply ||
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
                  {error.blastHeadline ||
                    (submitted &&
                      !Email.blastHeadline &&
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
                  name="name"
                  value={agentData && agentData.name}
                  className="form-control form-control-lg form-control-a"
                  placeholder="Agent Name"
                  onChange={(e) => this.handleChange("AgentContactInfo", e)}
                />
                <div className="validation">
                {error.agentData.name}
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
              <div className="validation"></div>
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
                <div className="validation"></div>
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
                <input
                  name="phone_number"
                  type="phone"
                  pattern="[0-9]{0,5}"
                  value={agentData && agentData.phone_number}
                  className="form-control form-control-lg form-control-a"
                  placeholder="Phone Number"
                  onChange={(e) => this.handleChange("AgentContactInfo", e)}
                />
                <div className="validation">
                  {error.agentData.phone_number}
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
                  name="company_details"
                  value={agentData && agentData.company_details}
                  className="form-control"
                  cols="45"
                  rows="8"
                  onChange={(e) => this.handleChange("AgentContactInfo", e)}
                  placeholder="Company Details"
                ></textarea>
                <div className="validation">
                  {error.agentData.company_details}
                </div>
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
          <hr />
          <br />
          {propertyDetails.map(function (property, i) {
            return (
              <div key={i}>
                <div
                  style={{
                    display:
                      propertyData &&
                      propertyData.templateData &&
                      propertyData.templateData.template_type &&
                      propertyData.templateData.template_type == "MultipleProperties"
                        ? "inline"
                        : "none",
                  }}
                >
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
                      propertyData.templateData.template_type == "MultipleProperties"
                      && propertyCount<4
                        ? "inline"
                        : "none",
                    }}
                  >
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
                      <a
                        href="javascript:void(0)"
                        className="btn btn-success"
                        id={i}
                        onClick={(e) => this.show("openHouse", i)}
                      >
                        Yes
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="btn btn-outline-danger"
                        id={i}
                        onClick={(e) => this.hide("openHouse", i)}
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
                      propertyDetails[i] &&
                      propertyDetails[i].isOpenHouse &&
                      propertyDetails[i].isOpenHouse.display != undefined &&
                      propertyDetails[i].isOpenHouse.display
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
                            name="houseType"
                            id={i}
                            onChange={this.openHouseChange}
                          >
                            <option value="">Select</option>
                            <option value="Open House">Open House</option>
                            <option value="Broker Open">Broker Open</option>
                            <option value="Agent Tour">Agent Tour</option>
                          </select>
                        </div>
                        <div className="validation">
                          {errors &&
                            errors[i] &&
                            errors[i].propertyDetails.isOpenHouse.houseType}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 mb-3">
                      <div className="form-group">
                        <label>Date</label>
                        <input
                          className="form-control form-control-lg form-control-a"
                          type="date"
                          id={i}
                          name="date"
                          onChange={this.openHouseChange}
                        />
                      </div>
                      <div className="validation">
                        {errors &&
                          errors[i] &&
                          errors[i].propertyDetails.isOpenHouse.date}
                      </div>
                    </div>
                    <div className="col-md-2 mb-3">
                      <div className="form-group">
                        <label>Start Time</label>
                        <input
                          className="form-control  form-control-lg form-control-a"
                          type="time"
                          name="startTime"
                          id={i}
                          onChange={this.openHouseChange}
                        />
                      </div>
                      <div className="validation">
                        {errors &&
                          errors[i] &&
                          errors[i].propertyDetails.isOpenHouse.startTime}
                      </div>
                    </div>
                    <div className="col-md-2 mb-3">
                      <div className="form-group">
                        <label>End Time</label>
                        <input
                          className="form-control  form-control-lg form-control-a"
                          type="time"
                          onChange={this.openHouseChange}
                          name="endTime"
                          id={i}
                        />
                      </div>
                      <div className="validation">
                        {errors &&
                          errors[i] &&
                          errors[i].propertyDetails.isOpenHouse.endTime}
                      </div>
                    </div>
                    <div className="col-md-2 mb-3">
                      <div className="form-group pt-4">
                        <a
                          href="javascript:void(0)"
                          className="btn btn-primary"
                          id={i}
                          onClick={(e) => this.addOpenHouse(e)}
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
                      {propertyDetails[i].isOpenHouse &&
                        propertyDetails[i].isOpenHouse.openHouseData !=
                          undefined &&
                        propertyDetails[i].isOpenHouse.openHouseData.length >
                          0 &&
                        propertyDetails[i].isOpenHouse.openHouseData.map(
                          function (openHouse, openHouseIndex) {
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
                                      id={i+"-"+openHouseIndex}
                                      name="houseType"
                                      disabled={disabled}
                                      onChange={this.openHouseArrayChange}
                                    >
                                      <option value="">Select</option>
                                      <option value="Open House">
                                        Open House
                                      </option>
                                      <option value="Broker Open">
                                        Broker Open
                                      </option>
                                      <option value="Agent Tour">
                                        Agent Tour
                                      </option>
                                    </select>
                                  )}
                                </td>
                                <td>
                                  <input
                                    type="date"
                                    name="date"
                                    onChange={this.openHouseArrayChange}
                                    id={i+"-"+openHouseIndex}
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
                                    id={i+"-"+openHouseIndex}
                                    className="form-control form-control-lg form-control-a"
                                    value={openHouse.openHouseData.startTime}
                                    disabled={disabled}
                                  />{" "}
                                  -{" "}
                                  <input
                                    type="time"
                                    id={i+"-"+openHouseIndex}
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
                                    onClick={(e) =>
                                      this.editOrDelete(e, "edit",i+"-"+openHouseIndex)
                                    }
                                  >
                                    <i className="fa fa-edit"></i>
                                  </a>{" "}
                                  &nbsp; &nbsp;
                                  <i
                                    className="fa fa-trash"
                                    aria-hidden="true"
                                    title="openHoueDelete"
                                    id={i}
                                    onClick={(e) =>
                                      this.editOrDelete(e, "delete",i+"-"+openHouseIndex)
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
                          onChange={(e) =>
                            this.handleChange("propertyPricing", e)
                          }
                          id={i}
                          value={
                            propertyDetails &&
                            propertyDetails[i].pricingInfo &&
                            propertyDetails[i].pricingInfo.price
                          }
                          className="form-control form-control-lg form-control-a"
                        />
                      </div>
                      <div className="validation">
                        {submitted &&
                          !propertyDetails[i].pricingInfo.price &&
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
                          name="priceType"
                          onChange={(e) =>
                            this.handleChange("propertyPricing", e)
                          }
                          id={i}
                          vlaue={
                            propertyDetails[i] &&
                            propertyDetails[i].pricingInfo &&
                            propertyDetails[i].pricingInfo.priceType
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
                        name="displayMethod"
                        onChange={(e) =>
                          this.handleChange("propertyAddress", e)
                        }
                        id={i}
                        value={
                          propertyDetails[i] &&
                          propertyDetails[i].propertyAddress &&
                          propertyDetails[i].propertyAddress.displayMethod
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
                        onChange={(e) =>
                          this.handleChange("propertyAddress", e)
                        }
                        id={i}
                        value={
                          propertyDetails[i] &&
                          propertyDetails[i].propertyAddress &&
                          propertyDetails[i].propertyAddress.streetAddress
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
                        id={i}
                        onChange={(e) =>
                          this.handleChange("propertyAddress", e)
                        }
                        value={
                          propertyDetails[i] &&
                          propertyDetails[i].propertyAddress &&
                          propertyDetails[i].propertyAddress.city
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="form-group">
                      <label>State</label>
                      <select
                        className="form-control form-control-lg form-control-a"
                        name="state"
                        onChange={(e) =>
                          this.handleChange("propertyAddress", e)
                        }
                        id={i}
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
                        onChange={(e) =>
                          this.handleChange("propertyAddress", e)
                        }
                        id={i}
                        value={
                          propertyDetails[i] &&
                          propertyDetails[i].propertyAddress &&
                          propertyDetails[i].propertyAddress.zipCode
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
                        id={i}
                        onClick={(e) => this.show("mlsNumber", i)}
                      >
                        Yes
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="btn btn-outline-danger"
                        id={i}
                        onClick={(e) => this.hide("mlsNumber", i)}
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
                      propertyDetails[i] &&
                      propertyDetails[i].mlsNumber &&
                      propertyDetails[i].mlsNumber.display != undefined &&
                      propertyDetails[i].mlsNumber.display
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
                          propertyDetails[i] &&
                          propertyDetails[i].mlsNumber &&
                          propertyDetails[i].mlsNumber.numberProperty
                        }
                        id={i}
                      />
                    </div>
                    <div className="validation">
                      {errors &&
                        errors[i] &&
                        errors[i].propertyDetails.mlsNumber.numberProperty}
                    </div>
                  </div>
                  <div className="col-md-12 mb-3">
                    <div className="form-group">
                      <label>
                        Which 'board / association' represents the Realtors
                        where this property is located?
                      </label>
                      <p className="red">
                        Attention: This is NOT a 'database step'. Click
                        INSTRUCTIONS on the left for more details
                      </p>
                      <div className="form-group">
                        <select
                          className="form-control form-control-lg form-control-a"
                          name="boardAssociation"
                          onChange={(e) => this.handleChange("mlsNumber", e)}
                          value={
                            propertyDetails[i] &&
                            propertyDetails[i].mlsNumber &&
                            propertyDetails[i].mlsNumber.boardAssociation
                          }
                          id={i}
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
                          id={i}
                          value={
                            propertyDetails[i] &&
                            propertyDetails[i].generalPropertyInformation &&
                            propertyDetails[i].generalPropertyInformation
                              .propertyType
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
                          name="propertyStyle"
                          onChange={(e) =>
                            this.handleChange("propertyInformation", e)
                          }
                          id={i}
                          value={
                            propertyDetails[i] &&
                            propertyDetails[i].generalPropertyInformation &&
                            propertyDetails[i].generalPropertyInformation
                              .propertyStyle
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
                          id={i}
                          value={
                            propertyDetails[i] &&
                            propertyDetails[i].generalPropertyInformation &&
                            propertyDetails[i].generalPropertyInformation
                              .pricePerSquareFoot
                          }
                        />

                        <div className="input-group-append">
                          <span className="input-group-text">/sqft</span>
                        </div>
                      </div>
                      <div className="validation">
                        {errors &&
                          errors[i] &&
                          errors[i].propertyDetails.generalPropertyInformation
                            .pricePerSquareFoot}
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
                          id={i}
                          onChange={(e) =>
                            this.handleChange("propertyInformation", e)
                          }
                          value={
                            propertyDetails[i] &&
                            propertyDetails[i].generalPropertyInformation &&
                            propertyDetails[i].generalPropertyInformation
                              .buildingSize
                          }
                        />

                        <div className="input-group-append">
                          <span className="input-group-text">/sqft</span>
                        </div>
                      </div>
                      <div className="validation">
                        {errors &&
                          errors[i] &&
                          errors[i].propertyDetails.generalPropertyInformation
                            .buildingSize}
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
                          id={i}
                          value={
                            propertyDetails[i] &&
                            propertyDetails[i].generalPropertyInformation &&
                            propertyDetails[i].generalPropertyInformation
                              .lotSize
                          }
                        />
                        <div className="input-group-append">
                          <select
                            className="form-control form-control-lg form-control-a"
                            name="lotType"
                            onChange={(e) =>
                              this.handleChange("propertyInformation", e)
                            }
                            id={i}
                          >
                            <option>Select</option>
                            <option>acres</option>
                            <option>sqft</option>
                          </select>
                        </div>
                      </div>
                      <div className="validation">
                        {errors &&
                          errors[i] &&
                          errors[i].propertyDetails.generalPropertyInformation
                            .lotSize}
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
                        onChange={(e) =>
                          this.handleChange("propertyInformation", e)
                        }
                        id={i}
                        value={
                          propertyDetails[i] &&
                          propertyDetails[i].generalPropertyInformation &&
                          propertyDetails[i].generalPropertyInformation
                            .numberOfBedrooms
                        }
                      />
                    </div>
                    <div className="validation">
                      {errors &&
                        errors[i] &&
                        errors[i].propertyDetails.generalPropertyInformation
                          .numberOfBedrooms}
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
                              propertyDetails[i] &&
                              propertyDetails[i].generalPropertyInformation &&
                              propertyDetails[i].generalPropertyInformation
                                .numberOfBathrooms &&
                              propertyDetails[i].generalPropertyInformation
                                .numberOfBathrooms.full
                            }
                            id={i}
                            onChange={(e) =>
                              this.handleChange(
                                "propertyInformationBathrooms",
                                e
                              )
                            }
                          />
                          <div className="input-group-append">
                            <span className="input-group-text">Full</span>
                          </div>
                          <div className="validation">
                            {errors &&
                              errors[i] &&
                              errors[i].propertyDetails
                                .generalPropertyInformation.numberOfBathrooms
                                .full}
                          </div>
                        </div>

                        <div className="input-group mb-3 col-md-6">
                          <input
                            type="text"
                            className="form-control form-control-lg form-control-a"
                            placeholder="0"
                            name="half"
                            value={
                              propertyDetails[i] &&
                              propertyDetails[i].generalPropertyInformation &&
                              propertyDetails[i].generalPropertyInformation
                                .numberOfBathrooms &&
                              propertyDetails[i].generalPropertyInformation
                                .numberOfBathrooms.half
                            }
                            id={i}
                            onChange={(e) =>
                              this.handleChange(
                                "propertyInformationBathrooms",
                                e
                              )
                            }
                          />
                          <div className="input-group-append">
                            <span className="input-group-text">Half</span>
                          </div>
                        </div>
                        <div className="validation">
                          {errors &&
                            errors[i] &&
                            errors[i].propertyDetails.generalPropertyInformation
                              .numberOfBathrooms.half}
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
                          propertyDetails[i] &&
                          propertyDetails[i].generalPropertyInformation &&
                          propertyDetails[i].generalPropertyInformation
                            .yearBuilt
                        }
                        id={i}
                        onChange={(e) =>
                          this.handleChange("propertyInformation", e)
                        }
                      />
                    </div>
                    <div className="validation">
                      {errors &&
                        errors[i] &&
                        errors[i].propertyDetails.generalPropertyInformation
                          .yearBuilt}
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="form-group">
                      <label>Number of Stories</label>
                      <select
                        className="form-control form-control-lg form-control-a"
                        name="numberOfStories"
                        onChange={(e) =>
                          this.handleChange("propertyInformation", e)
                        }
                        id={i}
                        value={
                          propertyDetails[i] &&
                          propertyDetails[i].generalPropertyInformation &&
                          propertyDetails[i].generalPropertyInformation
                            .numberOfStories
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
                          id={i}
                          onClick={(e) => this.show("garage", i)}
                        >
                          Yes
                        </a>
                        <a
                          href="javascript:void(0)"
                          className="btn btn-outline-danger"
                          id={i}
                          onClick={(e) => this.hide("garage", i)}
                        >
                          No
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 mb-3">
                    <div className="form-group">
                      <select
                        onChange={(e) =>
                          this.handleChange("propertyInformation", e)
                        }
                        name="garageSize"
                        style={{
                          display:
                            propertyDetails[i] &&
                            propertyDetails[i].generalPropertyInformation &&
                            propertyDetails[i].generalPropertyInformation.garage
                              ? "inline"
                              : "none",
                        }}
                        id={i}
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
                        id={i}
                        onChange={(e) => this.handleChange("propertyDetail", e)}
                      >
                        {propertyDetails && propertyDetails[i].propertyDetail}
                      </textarea>
                    </div>
                    <div className="validation">
                      {(errors &&
                        errors[i] &&
                        errors[i].propertyDetails.propertyDetail) ||
                        (submitted &&
                          !propertyDetails[i].propertyDetail &&
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
                        id={i}
                        onClick={(e) => this.show("linksToWebsites", i)}
                      >
                        Yes
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="btn btn-outline-danger"
                        id={i}
                        onClick={(e) => this.hide("linksToWebsites", i)}
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
                      propertyDetails[i].linksToWebsites &&
                      propertyDetails[i].linksToWebsites.display != undefined &&
                      propertyDetails[i].linksToWebsites.display
                        ? "inline"
                        : "none",
                  }}
                >
                  <p>
                    Add links to your property below. NOTE. Links will not be
                    saved to your blast until you Click Next
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
                          id={i}
                        />
                      </div>
                      <div className="validation">
                        {errors &&
                          errors[i] &&
                          errors[i].propertyDetails.linksToWebsites.url}
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
                          id={i}
                        />
                      </div>
                      <div className="validation">
                        {errors &&
                          errors[i] &&
                          errors[i].propertyDetails.linksToWebsites
                            .buildingSize}
                      </div>
                    </div>
                    <div className="col-md-2 mb-3">
                      <div className="form-group pt-4">
                        <a
                          href="javascript:void(0)"
                          className="btn btn-primary"
                          onClick={this.addLinksToWebsites}
                          id={i}
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
                      {propertyDetails[i].linksToWebsites &&
                        propertyDetails[i].linksToWebsites.linkData !=
                          undefined &&
                        propertyDetails[i].linksToWebsites.linkData.length >
                          0 &&
                        propertyDetails[i].linksToWebsites.linkData.map(
                          function (linkData, linkIndex) {
                            return (
                              <tr key={linkIndex}>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control form-control-lg form-control-a"
                                    id={linkIndex}
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
                                    value={
                                      linkData.linksToWebsiteData.buildingSize
                                    }
                                    disabled={disabled}
                                  />
                                </td>
                                <td>
                                  <a
                                    href="javascript:void(0)"
                                    title="Edit"
                                    onClick={(e) =>
                                      this.editOrDelete(e, "edit",i+"-"+linkIndex)
                                    }
                                  >
                                    <i className="fa fa-edit"></i>
                                  </a>{" "}
                                  &nbsp; &nbsp;
                                  <i
                                    className="fa fa-trash"
                                    aria-hidden="true"
                                    id={i+"-"+linkIndex}
                                    name="linkData"
                                    onClick={(e) =>
                                      this.editOrDelete(e, "delete",i+"-"+linkIndex)
                                    }
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
            );
          }, this)}
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
