import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import { Alert } from "reactstrap";
import { render } from "react-dom";
import config from 'config';
import { authHeader } from '../../helpers';
import ListingSubmenu from "../../components/ListingSubmenu";

import Moment from 'react-moment';

import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import { userActions } from "../../actions";

const axios = require("axios");

const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);



class CreateFlyerPage extends React.Component {
  constructor(props) {
    super(props);
    var user = JSON.parse(localStorage.getItem("user"));
    this.openHouse = [];
    this.linksToWebsites = [];
    this.state = {
      email:'',
      disabled: true,
      blast_type: "",
      selected_template_id: "",
      userId: "",
      updateimage:"",
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
      imageData:Object.assign({
       url:''
      },this.props.imageData),
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
      },
      preview:{
        email:''
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
    this.submit = this.editOrDelete.bind(this);
    this.saveProperty = this.saveProperty.bind(this);
    this.linkArrayChange = this.linkArrayChange.bind(this);
    this.openHouseArrayChange = this.openHouseArrayChange.bind(this);

    this.openUpload = this.openUpload.bind(this);
    this.imageChange = this.imageChange.bind(this);

    this.openUpload = this.openUpload.bind(this);
    this.imageChange = this.imageChange.bind(this);
    this.propsDataupdate = this.propsDataupdate.bind(this);
    this.handleChangepreview = this.handleChangepreview.bind(this);
    this.handleSubmitPreviw = this.handleSubmitPreviw.bind(this);
    this.props.dispatch(userActions.getById(user.userId));

  }
   handleChangepreview(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmitPreviw(e) { 
    e.preventDefault();
  //console.log('stateeeeeee',this.state);return false; 
    const {email,propertyDetails} = this.state;
    console.log("propertyDetailswewe===",propertyDetails);
    const { dispatch } = this.props;
    if(email){
    dispatch(userActions.emailPreviewTemplate(email,propertyDetails)); 
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
    }    
  }
    
  openUpload() {
    $("#imgupload").trigger("click");
  }

  imageChange(e) {
    const configs = {
      headers: {
       ...authHeader(), 'content-type': 'multipart/form-data'
      }
    }
    const formData = new FormData();
    formData.append("userid", this.state.userid);
    formData.append("myImage", e.target.files[0]);
   
    
    axios.post(`${config.uploadapiUrl}/propertyupload`,formData,configs)
    
      .then((response) => {
        console.log("response===",response);
        this.setState({updateimage:response.data.url});

        alert("The file is successfully uploaded");
      })
      .catch((error) => {});
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
    this.setState(linkArray);
  }

  openHouseArrayChange(event) {
    const { id, name, value } = event.target;
    let openHouseArray = Object.assign({}, this.state);
    openHouseArray.propertyDetails.isOpenHouse.openHouseData[id].openHouseData[name] = value;
    this.setState(openHouseArray);
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
        errors.propertyDetails.linksToWebsites.date =
          value.length < 3 ? "Date is required" : "";
        break;
      case "startTime":
        errors.propertyDetails.linksToWebsites.startTime =
          value.length < 3 ? "Start time is required" : "";
        break;

      case "endTime":
        errors.propertyDetails.linksToWebsites.endTime =
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
    switch (flag) {
      case "openHouse":
        this.setState({
          propertyDetails: {
            isOpenHouse: {
              ...this.state.display,
              display: true,
            },
          },
        });
        break;
      case "mlsNumber":
        this.setState({
          propertyDetails: {
            mlsNumber: {
              ...this.state.display,
              display: true,
            },
          },
        });
        break;
      case "linksToWebsites":
        this.setState({
          propertyDetails: {
            linksToWebsites: {
              ...this.state.display,
              display: true,
            },
          },
        });
        break;
      case "garage":
        this.setState({
          propertyDetails: {
            generalPropertyInformation: {
              ...this.state.garage,
              garage: true,
            },
          },
        });
        break;

    }
  }


  hide(flag) {
    switch (flag) {
      case "openHouse":
        this.setState({
          propertyDetails: {
            isOpenHouse: {
              ...this.state.display,
              display: false,
            },
          },
        });

        break;
      case "mlsNumber":
        this.setState({
          propertyDetails: {
            mlsNumber: {
              ...this.state.display,
              display: false,
            },
          },
        });
        break;
      case "linksToWebsites":
        this.setState({
          propertyDetails: {
            linksToWebsites: {
              ...this.state.display,
              display: false,
            },
          },
        });
        break;
      case "garage":
        this.setState({
          propertyDetails: {
            generalPropertyInformation: {
              ...this.state.garage,
              garage: false,
            },
          },
        });
        break;
    }

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
        if((nextProps.users!=undefined && nextProps.users.items )|| (nextProps.agentData!=undefined && nextProps.agentData) || (nextProps.profile!=undefined && nextProps.profile) || nextProps.imageData!=undefined &&  nextProps.imageData){
            this.propsDataupdate(nextProps.users,nextProps.agentData, nextProps.profile,nextProps.imageData);
        }
        //this.setState(nextProps);
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

            states.propertyDetails.mlsNumber.numberProperty=propsData.mls_number;
            states.propertyDetails.generalPropertyInformation.yearBuilt=propsData.year_built;
            states.propertyDetails.generalPropertyInformation.lotSize=propsData.lot_size;
            states.propertyDetails.generalPropertyInformation.buildingSize = propsData.building_size;
            states.propertyDetails.generalPropertyInformation.numberOfBedrooms = propsData.number_bedrooms;
            states.propertyDetails.generalPropertyInformation.numberOfStories = propsData.number_stories;
            states.propertyDetails.generalPropertyInformation.pricePerSquareFoot = propsData.price;
            
            this.setState(states);
        }    
  }

   componentDidMount() {
     var user = JSON.parse(localStorage.getItem("user"));
     const { dispatch } = this.props;
    this.props.dispatch(userActions.getTemplateOrPropertydata(user.userId));
    let states = Object.assign({}, this.state);
        states.propertyDetails.userId = user.userId;
        this.setState(states);
   
   this.setState({
      userId: user.userId,
    });
    window.scrollTo(0, 0);
  }

  selectResidentialListings(e, data) {
    if (data) {
      this.setState({
        blast_type: data,
      });
      this.moveNexttab();
    }
  }

  selectDesignTemplate(e, data) {
    if (data) {
      this.setState({
        selected_template_id: data,
      });
      const { blast_type, userId } = this.state;
      const { dispatch } = this.props;
      dispatch(userActions.blast(blast_type, data, userId));
      this.moveNexttab();
    }
  }

  saveProperty() {
    const { propertyDetails } = this.state;
    const { dispatch } = this.props;
    dispatch(userActions.saveProperty(propertyDetails));
    this.moveNexttab();
  }

  moveNexttab() {
    $(".nav-tabs > .active").next("a").trigger("click");
  }



  render() {
    const { errors, propertyDetails, disabled,agentData,profile,imageData } = this.state;
    const { users } = this.props;
    let firstName = '';
    //let firstpostionImage= '';
    
    /*if(imageData && imageData.length>0){
      imageData.forEach(element => {
        firstpostionImage=`${config.uploadapiUrl}/uploads/${element.url}`;
      });*/
   console.log("imagat===",imageData);
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
    //let emailSubjectLine = '';
    if(users!=undefined && users.items!=undefined){
      firstName= users.items.firstName;
      //emailSubjectLine=propertyDetails.Email.formSubject
    }
    console.log("propertyDetails====", propertyDetails);
    return (
      <div>
        <ListingSubmenu />
        <section>
          <div className="container">
            <div className="title-box-d">
              <h3 className="title-d">Create Blast</h3>
            </div>
          </div>
        </section>
        <section className="news-grid grid">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 section-t2">
                <div className="w-100 pt-3">
                  <div className="scroller scroller-left float-left mt-2">
                    <i className="fa fa-chevron-left"></i>
                  </div>
                  <div className="scroller scroller-right float-right mt-2">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                  <div className="wrapper">
                    <nav
                      className="nav nav-tabs list mt-2"
                      id="myTab"
                      role="tablist"
                    >
                      <a
                        className="nav-item nav-link active"
                        data-toggle="tab"
                        href="#type"
                        role="tab"
                        aria-controls="public"
                        aria-expanded="true"
                      >
                        Blast Type
                      </a>
                      <a
                        className="nav-item nav-link"
                        href="#temp"
                        role="tab"
                        data-toggle="tab"
                      >
                        Design Template
                      </a>
                      <a
                        className="nav-item nav-link"
                        href="#details"
                        role="tab"
                        data-toggle="tab"
                      >
                        Property Details
                      </a>
                      <a
                        className="nav-item nav-link"
                        href="#photos"
                        role="tab"
                        data-toggle="tab"
                      >
                        Photos
                      </a>
                      <a
                        className="nav-item nav-link"
                        href="#preview"
                        role="tab"
                        data-toggle="tab"
                      >
                        Preview
                      </a>
                      <a
                        className="nav-item nav-link"
                        href="#database"
                        role="tab"
                        data-toggle="tab"
                      >
                        Select Database
                      </a>
                      <a
                        className="nav-item nav-link"
                        href="#date"
                        role="tab"
                        data-toggle="tab"
                      >
                        Set Date
                      </a>
                      <a
                        className="nav-item nav-link"
                        href="#terms"
                        role="tab"
                        data-toggle="tab"
                      >
                        Terms
                      </a>
                      <a
                        className="nav-item nav-link"
                        href="#payment"
                        role="tab"
                        data-toggle="tab"
                      >
                        Payment
                      </a>
                    </nav>
                  </div>
                  <div className="tab-content p-3 border1" id="myTabContent">
                    <div
                      role="tabpanel"
                      className="tab-pane fade active show mt-2"
                      id="type"
                      aria-labelledby="public-tab"
                      aria-expanded="true"
                    >
                      <h4>Select Blast Type</h4>
                      <form
                        className="form-a contactForm"
                        action=""
                        method="post"
                        role="form"
                      >
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <div
                              className="card"
                              style={{
                                width: "30rem",
                                margin: "20px 0 24px 0",
                              }}
                            >
                              <img
                                className="card-img-top"
                                src="../../../public/assets/images/house.png"
                                alt="image"
                                style={{ width: "100%" }}
                              />
                              <div className="card-body">
                                <h4 className="card-title">
                                  Residential Listings For Sale or Lease{" "}
                                </h4>
                                <ul>
                                  <li>New Listings</li>
                                  <li>Price Changes</li>
                                  <li>Homes & Condos for Lease</li>
                                  <li>Broker Opens</li>
                                  <li>Open Houses</li>
                                  <li>Auctions</li>
                                  <li>etc...</li>
                                </ul>
                                <p>
                                  If its residential real estate for sale or
                                  lease, these are your templates
                                </p>
                                <p>
                                  * For Sale By Owner (FSBO's) are not permitted
                                </p>
                                <a
                                  href="javascript:void(0)"
                                  className="btn btn-primary"
                                  onClick={(e) =>
                                    this.selectResidentialListings(
                                      e,
                                      "ResidentialListings"
                                    )
                                  }
                                >
                                  Select
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 mb-3">
                            <div
                              className="card"
                              style={{
                                width: "30rem",
                                margin: "20px 0 24px 0",
                              }}
                            >
                              <img
                                className="card-img-top"
                                src="../../../public/assets/images/services.png"
                                alt="image"
                                style={{ width: "100%" }}
                              />
                              <div className="card-body">
                                <h4 className="card-title">
                                  Residential Real Estate Brokerage Related
                                  Services
                                </h4>
                                <ul>
                                  <li>Mortgages</li>
                                  <li>Title Companies</li>
                                  <li>Developers</li>
                                  <li>Coaches and Training</li>
                                  <li>Continuing Education</li>
                                  <li>Property Inspections</li>
                                  <li>etc...</li>
                                </ul>

                                <p>
                                  If you are advertising a residential real
                                  estate brokerage related service, these are
                                  your templates.
                                </p>

                                <p>
                                  * Repeated database selections limited to once
                                  every 14 days. * Recruitment and Referral
                                  Request Flyers are not Permitted
                                </p>

                                <a
                                  href="javascript:void(0)"
                                  className="btn btn-primary"
                                >
                                  Select
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div
                      className="tab-pane fade mt-2"
                      id="temp"
                      role="tabpanel"
                      aria-labelledby="group-dropdown2-tab"
                      aria-expanded="false"
                    >
                      <h4>Design Template</h4>
                      <p>
                        Choose your template design for creating a new Blast.
                      </p>
                      <form
                        className="form-a contactForm"
                        action=""
                        method="post"
                        role="form"
                      >
                        <div className="row">
                          <div className="col-md-4 mb-3">
                            <div
                              className="card"
                              style={{
                                width: "20rem",
                                margin: "20px 0 24px 0",
                              }}
                            >
                              <img
                                className="card-img-top"
                                src="../../../public/assets/images/img-4.png"
                                alt="image"
                                style={{ width: "100%" }}
                              />
                              <div className="card-body">
                                <h4 className="card-title">Single Property</h4>
                                <p className="card-text">
                                  - Create a Blast from Scratch
                                  <br />- Feature One Property
                                </p>
                                <a
                                  href="javascript:void(0)"
                                  className="btn btn-primary"
                                  onClick={(e) =>
                                    this.selectDesignTemplate(
                                      e,
                                      "SingleProperty"
                                    )
                                  }
                                >
                                  Select
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4 mb-3">
                            <div
                              className="card"
                              style={{
                                width: "20rem",
                                margin: "20px 0 24px 0",
                              }}
                            >
                              <img
                                className="card-img-top"
                                src="../../../public/assets/images/img-4.png"
                                alt="image"
                                style={{ width: "100%" }}
                              />
                              <div className="card-body">
                                <h4 className="card-title">
                                  Multiple Properties
                                </h4>
                                <p className="card-text">
                                  - Create a Blast from Scratch <br></br>-
                                  Feature Multiple Properties{" "}
                                </p>
                                <a
                                  href="javascript:void(0)"
                                  className="btn btn-primary"
                                >
                                  Select
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4 mb-3">
                            <div
                              className="card"
                              style={{
                                width: "20rem",
                                margin: "20px 0 24px 0",
                              }}
                            >
                              <img
                                className="card-img-top"
                                src="../../../public/assets/images/img-4.png"
                                alt="image"
                                style={{ width: "100%" }}
                              />
                              <div className="card-body">
                                <h4 className="card-title">
                                  Upload Your Own Blast
                                </h4>
                                <p className="card-text">
                                  Upload in seconds a Single Page Blast you
                                  already have
                                </p>
                                <a
                                  href="javascript:void(0)"
                                  className="btn btn-primary"
                                >
                                  Select
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
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
                        action=""
                        method="post"
                        role="form"
                      >
                        <h5>
                          {" "}
                          Email Subject Line, From Line & Reply to Sender
                        </h5>
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
                                value={propertyDetails && propertyDetails.Email && propertyDetails.Email.formSubject}
                              />
                              <div className="validation">
                                {errors.propertyDetails.Email.formSubject}
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
                                value={propertyDetails && propertyDetails.Email && propertyDetails.Email.formLine ? propertyDetails.Email.formLine:''}
                              />
                              <div className="validation">
                                {errors.propertyDetails.Email.formLine}
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
                                value={propertyDetails && propertyDetails.Email && propertyDetails.Email.formReply ? propertyDetails.Email.formReply:''}
                              />
                              <div className="validation">
                                {errors.propertyDetails.Email.formReply}
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
                                Headline Text (Hint: Do NOT enter an address or
                                date here):
                              </label>
                              <input
                                name="blastHeadline"
                                type="text"
                                onChange={(e) =>
                                  this.handleChange("blastHeadline", e)
                                }
                                value={propertyDetails.blastHeadline}
                                className="form-control form-control-lg form-control-a"
                                placeholder="e.g. Triple Net Shopping Center For Sale in Atlanta"
                              />
                              <div className="validation">
                                {errors.propertyDetails.blastHeadline}
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
                                onChange={(e) =>
                                  this.handleChange("AgentContactInfo", e)
                                }
                              />
                              <div className="validation">
                                {
                                  errors.propertyDetails.AgentContactInfo
                                    .agentName
                                }
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
                                onChange={(e) =>
                                  this.handleChange("AgentContactInfo", e)
                                }
                              />
                            </div>
                            <div className="validation">
                              {
                                errors.propertyDetails.AgentContactInfo
                                  .designation
                              }
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
                                onChange={(e) =>
                                  this.handleChange("AgentContactInfo", e)
                                }
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
                                onChange={(e) =>
                                  this.handleChange("AgentContactInfo", e)
                                }
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
                                onChange={(e) =>
                                  this.handleChange("AgentContactInfo", e)
                                }
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
                                  onChange={(e) =>
                                    this.handleChange("AgentContactInfo", e)
                                  }
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
                                  onChange={(e) =>
                                    this.handleChange("AgentContactInfo", e)
                                  }
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
                                onChange={(e) =>
                                  this.handleChange("AgentContactInfo", e)
                                }
                                placeholder="Company Details"
                              >{propertyDetails.propertyDetail}</textarea>
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
                                onChange={(e) =>
                                  this.handleChange("AgentContactInfo", e)
                                }
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
                          </div>
                        </div>
                        <div
                          style={{
                            display:
                              propertyDetails &&
                              propertyDetails.isOpenHouse &&
                              propertyDetails.isOpenHouse.display !=
                                undefined &&
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
                                </div>
                                <div className="validation">
                                  {
                                    errors.propertyDetails.linksToWebsites
                                      .houseType
                                  }
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
                                {
                                  errors.propertyDetails.linksToWebsites
                                    .startTime
                                }
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
                                <th>Sort</th>
                              </tr>
                            </thead>
                            <tbody>
                              {propertyDetails.isOpenHouse &&
                                propertyDetails.isOpenHouse.openHouseData !=
                                  undefined &&
                                propertyDetails.isOpenHouse.openHouseData
                                  .length > 0 &&
                                propertyDetails.isOpenHouse.openHouseData.map(
                                  function (openHouse, i) {
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
                                              onChange={
                                                this.openHouseArrayChange
                                              }
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
                                            onClick={(e) =>
                                              this.editOrDelete(e, "edit")
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
                                              this.editOrDelete(e, "delete")
                                            }
                                          ></i>
                                        </td>
                                        <td>
                                          <a href="" title="Up">
                                            <i className="fa fa-caret-up"></i>
                                          </a>{" "}
                                          &nbsp; &nbsp;
                                          <i
                                            className="fa fa-caret-down"
                                            aria-hidden="true"
                                            title="Down"
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
                                  value={propertyDetails && propertyDetails.pricingInfo && propertyDetails.pricingInfo.price?propertyDetails.pricingInfo.price:''}
                                  className="form-control form-control-lg form-control-a"
                                />
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
                                  onChange={(e) =>
                                    this.handleChange("propertyPricing", e)
                                  }
                                >
                                  <option value="">
                                    Select Price Display Type
                                  </option>
                                  <option value="20">
                                    Display Price Specified
                                  </option>
                                  <option value="30">
                                    Replace Price with 'AUCTION'
                                  </option>
                                  <option value="40">
                                    Replace Price with 'Call For Pricing'
                                  </option>
                                  <option value="50">
                                    Replace Price with 'Call For Offers'
                                  </option>
                                  <option value="60">
                                    Display Price per Square Foot
                                  </option>
                                  <option value="70">
                                    Display Price per Month
                                  </option>
                                  <option value="80">
                                    Display as Value Price Range
                                  </option>
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
                                onChange={(e) =>
                                  this.handleChange("propertyAddress", e)
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

                                value={propertyDetails && propertyDetails.propertyAddress && propertyDetails.propertyAddress.streetAddress ? propertyDetails.propertyAddress.streetAddress : ''}
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
                                onChange={(e) =>
                                  this.handleChange("propertyAddress", e)
                                }
                                value={propertyDetails && propertyDetails.propertyAddress && propertyDetails.propertyAddress.city}
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
                                onChange={(e) =>
                                  this.handleChange("propertyAddress", e)
                                }
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
                                value={propertyDetails && propertyDetails.propertyAddress && propertyDetails.propertyAddress.zipCode}
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
                                onChange={(e) =>
                                  this.handleChange("mlsNumber", e)
                                }
                                value={propertyDetails && propertyDetails.mlsNumber && propertyDetails.mlsNumber.numberProperty}
                              />
                            </div>
                            <div className="validation">
                              {errors.propertyDetails.mlsNumber.numberProperty}
                            </div>
                          </div>
                          <div className="col-md-12 mb-3">
                            <div className="form-group">
                              <label>
                                Which 'board / association' represents the
                                Realtors where this property is located?
                              </label>
                              <p className="red">
                                Attention: This is NOT a 'database step'. Click
                                INSTRUCTIONS on the left for more details
                              </p>
                              <div className="form-group">
                                <select
                                  className="form-control form-control-lg form-control-a"
                                  id="Type"
                                  name="boardAssociation"
                                  onChange={(e) =>
                                    this.handleChange("mlsNumber", e)
                                  }
                                >
                                  <option value="">
                                    -- Please Select a board / association for
                                    our 'Internal Sourcing' --
                                  </option>
                                  <option>
                                    Amelia Island-Nassau County Real Estate
                                    Agent List
                                  </option>
                                  <option>Bartow Real Estate Agent List</option>

                                  <option>
                                    Bonita Springs-Estero Real Estate Agent List
                                  </option>
                                  <option>
                                    Broward, Palm Beaches, and St. Lucie Real
                                    Estate Agent List (includes Ft Lauderdale)
                                  </option>
                                  <option>
                                    Central Panhandle Real Estate Agent List
                                  </option>
                                  <option>
                                    Citrus County Real Estate Agent List
                                  </option>
                                  <option>
                                    Daytona Beach Area Real Estate Agent List
                                  </option>

                                  <option>
                                    Dixie Gilchrist Levy Counties Real Estate
                                    Agent List
                                  </option>
                                  <option>
                                    East Pasco Real Estate Agent List
                                  </option>
                                  <option>
                                    East Polk County Real Estate Agent List
                                  </option>
                                  <option>

                                    Emerald Coast Real Estate Agent List
                                  </option>
                                  <option>
                                    Englewood Area Real Estate Agent List
                                  </option>
                                  <option>
                                    Flagler County Real Estate Agent List
                                  </option>
                                  <option>
                                    Florida Keys Real Estate Agent List
                                  </option>
                                  <option>
                                    Fort Myers/Cape Coral Merger(Royal Palm
                                    Coast Real Estate Agent List)
                                  </option>
                                  <option>
                                    Franklin &amp; Gulf Counties Real Estate
                                    Agent List
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

                                  value={propertyDetails && propertyDetails.generalPropertyInformation && propertyDetails.generalPropertyInformation.pricePerSquareFoot}
                                /> 

                                <div className="input-group-append">
                                  <span className="input-group-text">
                                    /sqft
                                  </span>
                                </div>
                              </div>
                              <div className="validation">
                                {
                                  errors.propertyDetails
                                    .generalPropertyInformation
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

                                  value={propertyDetails && propertyDetails.generalPropertyInformation && propertyDetails.generalPropertyInformation.buildingSize}
                                />

                                <div className="input-group-append">
                                  <span className="input-group-text">
                                    /sqft
                                  </span>
                                </div>
                              </div>
                              <div className="validation">
                                {
                                  errors.propertyDetails
                                    .generalPropertyInformation.buildingSize
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
                                  value={propertyDetails && propertyDetails.generalPropertyInformation && propertyDetails.generalPropertyInformation.lotSize}
                                />
                                <div className="input-group-append">
                                  <select
                                    className="form-control form-control-lg form-control-a"
                                    id="Type"
                                    name="lotType"
                                    onChange={(e) =>
                                      this.handleChange(
                                        "propertyInformation",
                                        e
                                      )
                                    }
                                  >
                                    <option>Select</option>
                                    <option>acres</option>
                                    <option>sqft</option>
                                  </select>
                                </div>
                              </div>
                              <div className="validation">
                                {
                                  errors.propertyDetails
                                    .generalPropertyInformation.lotSize
                                }
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
                                value={propertyDetails && propertyDetails.generalPropertyInformation && propertyDetails.generalPropertyInformation.numberOfBedrooms}
                              />
                            </div>
                            <div className="validation">
                              {
                                errors.propertyDetails
                                  .generalPropertyInformation.numberOfBedrooms
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
                                    onChange={(e) =>
                                      this.handleChange(
                                        "propertyInformationBathrooms",
                                        e
                                      )
                                    }                                    
                                  />
                                  <div className="input-group-append">
                                    <span className="input-group-text">
                                      Full
                                    </span>
                                  </div>
                                  <div className="validation">
                                    {
                                      errors.propertyDetails
                                        .generalPropertyInformation
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
                                    onChange={(e) =>
                                      this.handleChange(
                                        "propertyInformationBathrooms",
                                        e
                                      )
                                    }
                                  />
                                  <div className="input-group-append">
                                    <span className="input-group-text">
                                      Half
                                    </span>
                                  </div>
                                </div>
                                <div className="validation">
                                  {
                                    errors.propertyDetails
                                      .generalPropertyInformation
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
                                value={propertyDetails && propertyDetails.generalPropertyInformation && propertyDetails.generalPropertyInformation.yearBuilt}
                                onChange={(e) =>
                                  this.handleChange("propertyInformation", e)
                                }
                              />
                            </div>
                            <div className="validation">
                              {
                                errors.propertyDetails
                                  .generalPropertyInformation.yearBuilt
                              }
                            </div>
                          </div>
                          <div className="col-md-4 mb-3">
                            <div className="form-group">
                              <label>Number of Stories</label>
                              <select
                                className="form-control form-control-lg form-control-a"
                                id="Type"
                                name="numberOfStories"
                                onChange={(e) =>
                                  this.handleChange("propertyInformation", e)
                                }

                                value={propertyDetails && propertyDetails.generalPropertyInformation && propertyDetails.generalPropertyInformation.numberOfStories}
                              >
                                <option value="">
                                  -- Select Number of Stories --
                                </option>
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
<select onChange={(e) => this.handleChange("propertyInformation", e)} name="garageSize" style={{display:propertyDetails && propertyDetails.generalPropertyInformation && propertyDetails.generalPropertyInformation.garage ? "inline":'none'}} className="form-control form-control-lg form-control-a"><option value="">-- Select Garage Size --</option>
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
                                onChange={(e) =>
                                  this.handleChange("propertyDetail", e)
                                }
                              >
                              {propertyDetails && propertyDetails.propertyDetail}
                              </textarea>
                            </div>
                            <div className="validation">
                              {errors.propertyDetails.propertyDetail}
                            </div>
                          </div>{" "}
                        </div>
                        <hr />
                        <br />
                        <h5>
                          Links to Websites, Virtual Tours or other Material
                        </h5>
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
                              propertyDetails.linksToWebsites.display !=
                                undefined &&
                              propertyDetails.linksToWebsites.display
                                ? "inline"
                                : "none",
                          }}
                        >
                          <p>
                            Add links to your property below. NOTE. Links will
                            not be saved to your blast until you Click Next
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
                                <label>Building Size</label>
                                <input
                                  type="text"
                                  name="buildingSize"
                                  className="form-control form-control-lg form-control-a"
                                  placeholder="e.g. Download Our Marketing Package"
                                  onChange={this.linksToWebsitesChange}
                                />
                              </div>
                              <div className="validation">
                                {
                                  errors.propertyDetails.linksToWebsites
                                    .buildingSize
                                }
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
                                <th>Position</th>
                              </tr>
                            </thead>
                            <tbody>
                              {propertyDetails.linksToWebsites &&
                                propertyDetails.linksToWebsites.linkData !=
                                  undefined &&
                                propertyDetails.linksToWebsites.linkData
                                  .length > 0 &&
                                propertyDetails.linksToWebsites.linkData.map(
                                  function (linkData, i) {
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
                                            onClick={(e) =>
                                              this.editOrDelete(e, "edit")
                                            }
                                          >
                                            <i className="fa fa-edit"></i>
                                          </a>{" "}
                                          &nbsp; &nbsp;
                                          <i
                                            className="fa fa-trash"
                                            aria-hidden="true"
                                            id={i}
                                            name="linkData"
                                            onClick={(e) =>
                                              this.editOrDelete(e, "delete")
                                            }
                                            title="linkDelete"
                                          ></i>
                                        </td>
                                        <td>
                                          <a href="" title="Up">
                                            <i className="fa fa-caret-up"></i>
                                          </a>{" "}
                                          &nbsp; &nbsp;
                                          <i
                                            className="fa fa-caret-down"
                                            aria-hidden="true"
                                            title="Down"
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

                    <div
                      className="tab-pane fade mt-2"
                      id="photos"
                      role="tabpanel"
                      aria-labelledby="group-dropdown2-tab"
                      aria-expanded="false"
                    >
                      <h4>Property Photos</h4>
                      <p>Select the Photo Layout for your property.</p>
                      <div className="row">
                        <div className="col-md-3 mb-3">
                          <div className="form-group">
                            <img
                              alt="Photo"
                              className="img-square"
                              style={{ width: "200px" }}
                              src="../../../public/assets/images/1photo.png"
                            />
                          </div>
                          <div className="text-center">
                            <button
                              className="btn btn-primary"
                              onClick={this.showModal}
                              data-target="#myModal"
                              data-toggle="modal"
                            >
                              click here
                            </button>
                          </div>
                        </div>
                        <div className="col-md-3 mb-3">
                          <div className="form-group">
                            <img
                              alt="Photo"
                              className="img-square"
                              style={{ width: "200px" }}
                              src="../../../public/assets/images/2photo.png"
                            />
                          </div>
                          <div className="text-center">
                            <button
                              className="btn btn-primary"
                              onClick={this.showModal}
                              data-target="#myModal"
                              data-toggle="modal"
                            >
                              click here
                            </button>
                          </div>
                        </div>
                        <div className="col-md-3 mb-3">
                          <div className="form-group">
                            <img
                              alt="Photo"
                              className="img-square"
                              style={{ width: "200px" }}
                              src="../../../public/assets/images/3photo.png"
                            />
                          </div>
                          <div className="text-center">
                            <a
                              href="javascript:void(0)"
                              className="btn btn-primary"
                            >
                              click here
                            </a>
                          </div>
                        </div>
                        <div className="col-md-3 mb-3">
                          <div className="form-group">
                            <img
                              alt="Photo"
                              className="img-square"
                              style={{ width: "200px" }}
                              src="../../../public/assets/images/4photo.png"
                            />
                          </div>
                          <div className="text-center">
                            <button
                              className="btn btn-primary"
                              onClick={this.showModal}
                              data-target="#myModal"
                              data-toggle="modal"
                            >
                              click here
                            </button>
                          </div>
                        </div>
                      </div>

                      <div id="myModal" className="modal fade" role="dialog">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div classNames="modal-body">
                              <div className="col-md-4 mb-3">
                                <div
                                  className="card"
                                  style={{
                                    width: "20rem",
                                    margin: "20px 0 24px 0",
                                    border: "dashed",
                                    padding: "5px",
                                    borderColor: "#ccc",
                                  }}
                                >
                                  <div className="card-body">
                                    <h4 className="card-title">Position 1</h4>
                                  </div>
                                  <img
                                    className="card-img-bottom"
                                    src="../../../public/assets/images/img1.jpg"
                                    alt="image"
                                    style={{ width: "100%" }}
                                  />
                                </div>
                                <input
                                  type="file"
                                  id="imgupload"
                                  style={{ display: "none" }}
                                  onChange={this.imageChange}
                                />
                                <button
                                  id="OpenImgUpload"
                                  onClick={this.openUpload}
                                  className="btn btn-primary"
                                >
                                  Select
                                </button>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-default"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p>Click on the image(s) below to upload your photo(s)</p>
                      <div className="row">
                        <div className="col-md-2 mb-3"></div>
                        { imageData && imageData.length>0 && imageData.map((image) => (
                            
                        
                        <div className="col-md-4 mb-3">
                          <div
                            className="card"
                            style={{
                              width: "20rem",
                              margin: "20px 0 24px 0",
                              border: "dashed",
                              padding: "5px",
                              borderColor: "#ccc",
                            }}
                          >
                            <div className="card-body">
                              <h4 className="card-title">Position 1</h4>
                            </div>
                            <img
                              className="card-img-bottom"
                              src='{config.uploadapiUrl}/uploads/{image}'
                              alt="image"
                              style={{ width: "100%" }}
                            />
                          </div>
                          <a
                            href="javascript:void(0)"
                            className="btn btn-primary"
                          >
                            Select
                          </a>
                        </div>
                       ))
                     }
                      </div>
                    </div>

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
                            <input value={this.state.email} onChange={this.handleChangepreview} name="email" type="text" className="form-control form-control-lg form-control-a" placeholder="Email Address" />
                          {!this.state.email &&
                            <div className="help-block red">Email is required</div>
                          }
                          </div>
                        </div>
                        <div className="col-md-2 mb-3">
                          <div className="form-group pt-4">
                            <a onClick={this.handleSubmitPreviw}  className="btn btn-primary">Send</a>
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
                                {firstName} via Listingreach.com
                              </div>
                              <div className="col-md-4 mb-3 text-right">
                                <label>Email Subject Line:</label>
                              </div>
                              <div className="col-md-8 mb-3">
                                {propertyDetails && propertyDetails.Email && propertyDetails.Email.formSubject}
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
                                <button className="btn btn-primary">
                                  Reply to Sender
                                </button>
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
                                  Flyer Headline will come here
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
                                  <h4>Price: ${propertyDetails && propertyDetails.generalPropertyInformation && propertyDetails.generalPropertyInformation.pricePerSquareFoot} per Square Foot</h4>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12 mt-3 text-center">
                                  <label className="flyer-label">
                                    Property Address:
                                  </label>
                                  <p>
                                    {propertyDetails && propertyDetails.propertyAddress && propertyDetails.propertyAddress.streetAddress}, {propertyDetails && propertyDetails.propertyAddress && propertyDetails.propertyAddress.city}
                                    , {propertyDetails && propertyDetails.propertyAddress && propertyDetails.propertyAddress.zipcode} 
                                  </p>
                                </div>

                                <div className="col-md-12 text-center">
                                {propertyDetails.isOpenHouse &&
                                propertyDetails.isOpenHouse.openHouseData !=
                                  undefined &&
                                propertyDetails.isOpenHouse.openHouseData
                                  .length > 0 &&
                                propertyDetails.isOpenHouse.openHouseData.map(function(data, i){
                                      return  <div key={i}>
                                      
                                  <label className="flyer-label">
                                    {data.openHouseData.houseType}:
                                  </label>
                                  <span>
                                   <Moment parse="YYYY-MM-DD HH:mm" >
                                              {data.openHouseData.date},{data.openHouseData.startTime},{data.openHouseData.endTime}
                                   </Moment>
                                  </span>
                                  <br />
                                  
                                    </div>
                                      }, this)} 
                                </div>

                                <hr />
                                <div className="col-md-12 ml-3">
                                  <label className="flyer-label">MLS#:</label>
                                  <span>{propertyDetails && propertyDetails.mlsNumber && propertyDetails.mlsNumber.numberProperty}</span>
                                </div>
                                <div className="col-md-12 ml-3">
                                  <label className="flyer-label">
                                    Property Description:
                                  </label>
                                  <span>
                                   {propertyDetails && propertyDetails.propertyDetail}
                                  </span>
                                </div>
                                <div className="col-md-12 ml-3">
                                  <label className="flyer-label">
                                    Key Features:
                                  </label>
                                  <ul>
                                    <li>Property Type: {propertyDetails && propertyDetails.generalPropertyInformation && propertyDetails.generalPropertyInformation.propertyType} </li>
                                    <li>Property Style: {propertyDetails && propertyDetails.generalPropertyInformation && propertyDetails.generalPropertyInformation.propertyStyle} </li>
                                    <li> {propertyDetails && propertyDetails.generalPropertyInformation && propertyDetails.generalPropertyInformation.numberOfBedrooms} Bedrooms</li>
                                    <li>1 Full 1 Half Bathrooms</li>
                                    <li>1 Full 1 Half Bathrooms</li>
                                    <li>{propertyDetails && propertyDetails.generalPropertyInformation && propertyDetails.generalPropertyInformation.buildingSize} square feet</li>

                                    <li>$1,000.00 /sqft</li>
                                    <li>Lot Size: {propertyDetails && propertyDetails.generalPropertyInformation && propertyDetails.generalPropertyInformation.lotSize} sqft</li>
                                    <li> Built {propertyDetails && propertyDetails.generalPropertyInformation && propertyDetails.generalPropertyInformation.yearBuilt}</li>
                                    <li>1 Car Garage</li>
                                    <li> {propertyDetails && propertyDetails.generalPropertyInformation && propertyDetails.generalPropertyInformation.numberOfStories} </li>
                                  </ul>
                                </div>
                                <div className="col-md-12 ml-3">
                                  <label className="flyer-label">Links:</label>
                                  <p>
                                  {propertyDetails.linksToWebsites &&
                                propertyDetails.linksToWebsites.linkData !=
                                  undefined &&
                                propertyDetails.linksToWebsites.linkData
                                  .length > 0 &&
                                propertyDetails.linksToWebsites.linkData.map(function(data, i){
                                      return  <div key={i}>
                                    <a href={data.linksToWebsiteData.url}>
                                      <u>{data.linksToWebsiteData.buildingSize}</u>
                                    </a>
                                      </div> }, this)}
                                  </p>
                                </div>
                                <div className="col-md-12 text-center">
                                  <h4>
                                    <a href="">
                                      <u>
                                        Click Here to Email Agent for More
                                        Information
                                      </u>
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
                                  <b> {firstName}</b>
                                  <br />
                                  Agent
                                  <br />
                                  {firstName}@gmail.com
                                  <br />
                               
                                  <br />
                                  21212121212
                                  <br />
                                  <br />
                                  <br />
                               
                                  <br />
                                 
                                  <br />
                                  {propertyDetails && propertyDetails.propertyAddress && propertyDetails.propertyAddress.streetAddress}, {propertyDetails && propertyDetails.propertyAddress && propertyDetails && propertyDetails.propertyAddress && propertyDetails.propertyAddress.zipcode},{propertyDetails && propertyDetails.propertyAddress && propertyDetails.propertyAddress.city}.
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
                                  This e-blast was delivered by
                                  ListingReach.com, a real estate email
                                  marketing service. The ListingReach.com
                                  service and information provided therein,
                                  while believed to be accurate, are provided
                                  "as is". ListingReach.com disclaims any and
                                  all representations, warranties, or guarantees
                                  of any kind. ListingReach.com assumes no
                                  liability for errors or omissions.
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
                        >
                          Save
                        </a>
                        <a
                          href="javascript:void(0)"
                          className="btn btn-primary pull-right"
                        >
                          Next
                        </a>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade mt-2"
                      id="database"
                      role="tabpanel"
                      aria-labelledby="group-dropdown2-tab"
                      aria-expanded="false"
                    >
                      <h4>Select Database</h4>
                      <p>
                        Select the databases you wish to send your Blast to by
                        clicking the 'Add Databases' button. The number of
                        recipients is shown after each database name.
                      </p>
                      <p>
                        The first database you select is included in the cost of
                        the blast at $19.95. Additional databases will be
                        charged at $15.00 each.
                      </p>
                      <p>
                        <a
                          href="javascript:void(0)"
                          className="btn btn-primary"
                        >
                          Add Databases
                        </a>
                      </p>
                      <label>Selected Database</label>
                      <table
                        id="example"
                        className="table table-bordered"
                        style={{ width: "100%" }}
                      >
                        <tbody>
                          <tr>
                            <td>Anchorage Real Estate Agent List - 1232</td>
                            <td>
                              <i
                                className="fa fa-trash"
                                aria-hidden="true"
                                title="Delete"
                              ></i>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div
                      className="tab-pane fade mt-2"
                      id="date"
                      role="tabpanel"
                      aria-labelledby="group-dropdown2-tab"
                      aria-expanded="false"
                    >
                      <h4>Set Date</h4>
                      <p>Choose date for emailing the Blast.</p>
                      <div className="col-md-4 mb-3">
                        <div className="row">
                          <input
                            className="form-control form-control-lg form-control-a"
                            type="date"
                            value="2011-08-19"
                            id="example-date-input"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade mt-2"
                      id="terms"
                      role="tabpanel"
                      aria-labelledby="group-dropdown2-tab"
                      aria-expanded="false"
                    >
                      <h4>Terms & Condition</h4>
                      <p>Please read and accept Terms & Conditions.</p>
                      <p>Content awaited.</p>
                      <label className="check">
                        I Accept the Terms & Conditions
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div
                      className="tab-pane fade mt-2"
                      id="payment"
                      role="tabpanel"
                      aria-labelledby="group-dropdown2-tab"
                      aria-expanded="false"
                    >
                      <h4>Make Payment</h4>
                      <p>
                        Please review your order and make payment by filling in
                        the form below.
                      </p>
                      <div className="alert alert-info">
                        <strong>
                          Your Selected Send Date is: Thursday, May 7, 2020
                        </strong>
                      </div>
                      <div className="alert alert-success">
                        <strong>
                          Estimated Blast Email Volume: 1,352 Recipients
                        </strong>
                      </div>
                      <br />
                      <p>Order Details</p>
                      <table
                        id="example"
                        className="table table-bordered"
                        style={{ width: "100%" }}
                      >
                        <thead>
                          <tr>
                            <th>Quantity</th>
                            <th>Description</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>
                              Flyer - Homes for Sale - FlyerID: 324021, BlastID:
                              201314
                            </td>
                            <td>$19.95</td>
                          </tr>
                          <tr>
                            <td></td>
                            <td>
                              - Additional Real Estate Agent List : Bonita
                              Springs-Estero Real Estate Agent List
                            </td>
                            <td>$0.00</td>
                          </tr>
                          <tr>
                            <td></td>
                            <td className="text-right">Invoice Total</td>
                            <td>$19.95</td>
                          </tr>
                          <tr>
                            <td></td>
                            <td className="text-right">Amount Due Today</td>
                            <td>$19.95</td>
                          </tr>
                        </tbody>
                      </table>
                      <br />
                      <h5> Payment Details</h5>
                      <p>
                        To complete your order enter your payment details in the
                        fields below.{" "}
                      </p>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <div className="row">
                            <div className="col-md-12 mb-3">
                              <div className="form-group">
                                <label>Card Holders Name:</label>
                                <input
                                  type="text"
                                  name="name"
                                  className="form-control form-control-lg form-control-a"
                                  placeholder="Card Holders Name"
                                  data-rule="minlen:4"
                                  data-msg="Please enter name"
                                />
                                <div className="validation"></div>
                              </div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <img
                                className="card-img-bottom"
                                src="../../../public/assets/images/accept_credit_cards.jpg"
                                alt="image"
                                style={{ width: "72%" }}
                              />
                            </div>
                            <div className="col-md-12 mb-3">
                              <label>Card Number: (No Spaces/Dashes)</label>
                              <div className="form-group">
                                <input
                                  name="email"
                                  type="email"
                                  className="form-control form-control-lg form-control-a"
                                  placeholder=""
                                  data-rule="email"
                                  data-msg="Please enter a valid email"
                                />
                                <div className="validation"></div>
                              </div>
                            </div>
                            <div className="col-md-8 mb-3">
                              <label> Expiry Date:</label>
                              <div className="form-group">
                                <input
                                  className="form-control form-control-lg form-control-a"
                                  type="date"
                                  value="2011-08-19"
                                  id="example-date-input"
                                />
                              </div>
                            </div>
                            <div className="col-md-4 mb-3">
                              <label>CVC No.</label>
                              <div className="form-group">
                                <input
                                  name="email"
                                  type="email"
                                  className="form-control form-control-lg form-control-a"
                                  placeholder="CVC"
                                  data-rule="email"
                                  data-msg="Please enter a valid email"
                                />
                                <div className="validation"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="row">
                            <div className="col-md-12 mb-3">
                              <label>Street Address</label>
                              <div className="form-group">
                                <input
                                  name="email"
                                  type="email"
                                  className="form-control form-control-lg form-control-a"
                                  placeholder="Street Address"
                                  data-rule="email"
                                  data-msg="Please enter a valid email"
                                />
                                <div className="validation"></div>
                              </div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <label>City</label>
                              <div className="form-group">
                                <input
                                  name="email"
                                  type="email"
                                  className="form-control form-control-lg form-control-a"
                                  placeholder="City"
                                  data-rule="email"
                                  data-msg="Please enter a valid email"
                                />
                                <div className="validation"></div>
                              </div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <div className="form-group">
                                <label>State</label>
                                <select
                                  className="form-control form-control-lg form-control-a"
                                  id="Type"
                                >
                                  <option value="">-- Select a State --</option>
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
                            <div className="col-md-12 mb-3">
                              <div className="form-group">
                                <label>Zip Code</label>
                                <input
                                  type="text"
                                  name="City"
                                  className="form-control form-control-lg form-control-a"
                                  placeholder="Zip Code"
                                  data-rule="minlen:4"
                                  data-msg="Please enter your City"
                                />{" "}
                              </div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <div className="form-group">
                                <label className="check">
                                  I Accept the Terms &amp; Conditions
                                  <input type="checkbox" />
                                  <span className="checkmark"></span>
                                </label>
                              </div>{" "}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 mt-4 text-center">
                          <a
                            href="javascript:void(0)"
                            className="btn btn-primary"
                          >
                            Complete Order
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert, users } = state;
  const { profile} = users;
  const { agentData} = users;
  const { imageData }=users;
  console.log("imageData===eeee=",imageData);
  return {
    alert,
    users,
    profile,
    agentData,
    imageData
  };
}

const connectedCreateFlyerPage = connect(mapStateToProps)(CreateFlyerPage);
export { connectedCreateFlyerPage as CreateFlyerPage };
