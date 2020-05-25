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
import { authHeader } from "../helpers";
import moment from "moment";
import { Alert } from "reactstrap";
const axios = require("axios");
import config from "config";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

class UploadBlastTab extends React.Component {
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
          },
        },
      },
    ];

    this.property = [
      {
        blast_id: "",
        userId: "",
        propertyId: "",
        Email: {
          formSubject: "",
          formLine: "",
          formReply: "",
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
        },
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
      blast_id: "",
      blastImageUrl: "",
      propertyCount: 1,
      templateId: "",
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
      },

      Email: {
        formSubject: "",
        formLine: "",
        formReply: "",
      },


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
          },
          linksToWebsites: {
            display: true,
            buildingSize: "",
            url: "",
            linkData: [],
          }
        }
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
    this.openUpload = this.openUpload.bind(this);
    this.imageChange = this.imageChange.bind(this);

    let user = JSON.parse(localStorage.getItem("user"));
    if (user && user.userId && this.props && this.props.dispatchval) {
      const { dispatch } = this.props.dispatchval.dispatch;
      dispatch(userActions.getById(user.userId));
    }
  }

  openUpload() {
    $("#imgupload").trigger("click");
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
        console.log("response===", response);
        this.setState({ blastImageUrl: response.data.url });
        //alert("The file is successfully uploaded");
      })
      .catch((error) => {});
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

  handleChangepreview(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  linkArrayChange(event) {
    const { id, name, value } = event.target;
    let keys = id.split("-");
    let linkArray = Object.assign({}, this.state);
    linkArray.propertyDetails[keys[0]].linksToWebsites.linkData[
      keys[1]
    ].linksToWebsiteData[name] = value;
  }

  openHouseArrayChange(event) {
    const { id, name, value } = event.target;
    let keys = id.split("-");
    let openHouseArray = Object.assign({}, this.state);
    openHouseArray.propertyDetails[keys[0]].isOpenHouse.openHouseData[
      keys[1]
    ].openHouseData[name] = value;
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

  linkArrayDelete(event, linkIndex) {
    const { id } = event.target;
    let keys = linkIndex.split("-");
    let linkArray = Object.assign({}, this.state);
    linkArray.propertyDetails[keys[0]].linksToWebsites.linkData.splice(
      [keys[1]],
      1
    );
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

  editOrDelete(event, flag, indexList) {
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
        linkArray.propertyDetails[keys[0]].linksToWebsites.linkData.splice(
          keys[1],
          1
        );
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
    }

    let states = Object.assign({}, this.state);
    this.setState(states);
    switch (flag) {
      case "email":
        states.Email[name] = value;
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
    }

    this.setState({ errors, [name]: value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.uploadBlast && nextProps.uploadBlast.blastData) {
      alert('1');
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
      this.setState(states);
    }

    if (data && data.blastData) {
     alert(data.blastData._id);
      states.blast_id = data.blastData._id;
      this.setState(states);
    }



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
    const {
      propertyDetails,
      submitted,
      agentData,
      Email,
      blastHeadline,
      templateId,
      blast_id,
    } = this.state;
    const { dispatch } = this.props.dispatchval.dispatch;
    if (
      propertyDetails &&
      Email.formSubject &&
      Email.formReply &&
      propertyDetails[0].pricingInfo.price
    ) {
      dispatch(
        userActions.saveProperty(
          propertyDetails,
          "",
          Email,
          "",
          templateId,
          blast_id
        )
      );
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
      alert,
      submitted,
      error,
      Email,
      blastImageUrl,
    } = this.state;
    let propertyImg = "";
    if (blastImageUrl) {
      propertyImg = config.uploadapiUrl + "/uploads/" + blastImageUrl;
    }

    const { propertyData } = this.props;
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
          <hr />
          <br />
          {propertyDetails.map(function (property, i) {
            return (
              <div key={i}>
                <h5> Upload Your Own Flyer</h5>
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
                <div style={{
                    display:
                      propertyDetails &&
                      propertyDetails[i].linksToWebsites &&
                      propertyDetails[i].linksToWebsites.display != undefined &&
                      propertyDetails[i].linksToWebsites.display
                        ? "inline"
                        : "none",
                  }} >
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
                        errors[i].propertyDetails.linksToWebsites.buildingSize}
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
                      propertyDetails[i].linksToWebsites.linkData.length > 0 &&
                      propertyDetails[i].linksToWebsites.linkData.map(function (
                        linkData,
                        linkIndex
                      ) {
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
                                value={linkData.linksToWebsiteData.buildingSize}
                                disabled={disabled}
                              />
                            </td>
                            <td>
                              <a
                                href="javascript:void(0)"
                                title="Edit"
                                onClick={(e) =>
                                  this.editOrDelete(
                                    e,
                                    "edit",
                                    i + "-" + linkIndex
                                  )
                                }
                              >
                                <i className="fa fa-edit"></i>
                              </a>{" "}
                              &nbsp; &nbsp;
                              <i
                                className="fa fa-trash"
                                aria-hidden="true"
                                id={i + "-" + linkIndex}
                                name="linkData"
                                onClick={(e) =>
                                  this.editOrDelete(
                                    e,
                                    "delete",
                                    i + "-" + linkIndex
                                  )
                                }
                                title="linkDelete"
                              ></i>
                            </td>
                          </tr>
                        );
                      },
                      this)}
                  </tbody>
                </table>
                <h5> Upload Flyer</h5>
                <div className="col-md-12 mb-3">
                  <span className="red">
                    *The following file formats can be uploaded. jpg, png, gif,
                    eps and pdf
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
                                      id={i + "-" + openHouseIndex}
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
                                    id={i + "-" + openHouseIndex}
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
                                    id={i + "-" + openHouseIndex}
                                    className="form-control form-control-lg form-control-a"
                                    value={openHouse.openHouseData.startTime}
                                    disabled={disabled}
                                  />{" "}
                                  -{" "}
                                  <input
                                    type="time"
                                    id={i + "-" + openHouseIndex}
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
                                      this.editOrDelete(
                                        e,
                                        "edit",
                                        i + "-" + openHouseIndex
                                      )
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
                                      this.editOrDelete(
                                        e,
                                        "delete",
                                        i + "-" + openHouseIndex
                                      )
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
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label>Street Address</label>
                      <input
                        type="text"
                        name="address"
                        className="form-control form-control-lg form-control-a"
                        placeholder="Street Address"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
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
                  <div className="col-md-6 mb-3">
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
                  <div className="col-md-6 mb-3">
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

export default UploadBlastTab;
