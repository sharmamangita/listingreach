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
import { authHeader } from "../helpers";
import config from "config";
const axios = require("axios");
class PhotoTab extends React.Component {
  constructor(props) {
    super(props);
    this.updateimage = ["", "", "", ""];
    this.state = {
      userId: "",
      updateimage: [],
      email: "",
      property_ids: [],
      template: "",
      propertyImages: [{}, {}, {}, {}],
      imageData: Object.assign(
        {
          url: "",
        },
        this.props.imageData
      ),
      visible: false,
      divCount: [],
    };

    this.openUpload = this.openUpload.bind(this);
    this.imageChange = this.imageChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.modelClose = this.modelClose.bind(this);
    this.updateImages = this.updateImages.bind(this);
  }

  updateImages(e) {
    e.preventDefault();
    //console.log('stateeeeeee',this.state);return false;
    const { property_ids, propertyImages } = this.state;
    console.log(
      "property_ids, propertyImages====",
      property_ids,
      propertyImages
    );
    const { dispatch } = this.props.dispatchval.dispatch;
    dispatch(userActions.saveImages(property_ids, propertyImages));
    //window.scrollTo(0,0);
  }

  openUpload(e) {
    const { id } = e.target;
    $(".imgupload" + id).trigger("click");
  }

  showModal(e) {
    const { id } = e.target;
    var data = [];
    for (var i = 1; i <= id; i++) {
      data.push(id);
    }

    this.setState({ visible: true, divCount: data });
  }

  modelClose() {
    this.setState({ visible: false });
  }

  imageChange(e) {
    const { id } = e.target;
    console.log("id====", id);
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
        this.updateimage[id] = response.data.url;
        console.log("this.updateimage==", this.updateimage);
        this.setState({ updateimage: this.updateimage });

        let imageids = {};
        imageids.imageId = response.data.imageId;
        imageids.imageUrl = response.data.url;

        let setimagesData = Object.assign({}, this.state);
        setimagesData.propertyImages[id] = imageids;
        this.setState(setimagesData);
      })
      .catch((error) => {
        //this.modelClose();
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.previewData) {
      let propertyArray = nextProps.previewData;
      this.getPropertyIds(propertyArray);
    }
  }

  getPropertyIds(propertyArray) {
    let array = [];
    let template = "";
    propertyArray.length &&
      propertyArray.forEach(function (item) {
        array.push({ id: item.id });
        template = item.templates[0].template_type;
      });

    let property = Object.assign({}, this.state);
    property.property_ids = array;
    property.template = template;
    this.setState(property);
  }

  render() {
    const { imageData, visible, divCount, updateimage, template } = this.state;
    console.log("this.props=====", this.props);
    const { previewData } = this.props;
    let images = ["", "", "", ""];
    if (updateimage && updateimage.length) {
      updateimage.forEach(function (item, i) {
        if (item) {
          images[i] = config.uploadapiUrl + "/uploads/" + item;
        }
      });
    }

    return (
      <div
        className="tab-pane fade mt-2"
        id="photos"
        role="tabpanel"
        aria-labelledby="group-dropdown2-tab"
        aria-expanded="false"
      >
        {template && template == "SingleProperty" ? (
          <div>
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
                    id="1"
                    onClick={this.showModal}
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
                    id="2"
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
                    onClick={this.showModal}
                    id="3"
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
                    id="4"
                  >
                    click here
                  </button>
                </div>
              </div>
            </div>

            <div id="myModal" style={{ display: visible ? "inline" : "none" }}>
              <div className="modal-content">
                <div className="row">
                  {divCount.map(function (item, index) {
                    return (
                      <div key={index} className="col-md-4 mb-3">
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
                            <h4 className="card-title">Position {index + 1}</h4>
                          </div>
                          <img
                            className="card-img-bottom"
                            src={
                              images[index] ||
                              "../../../public/assets/images/img1.jpg"
                            }
                            alt="image"
                            style={{ width: "100%" }}
                          />
                        </div>
                        <input
                          type="file"
                          id={index}
                          className={"imgupload" + index}
                          style={{ display: "none" }}
                          onChange={this.imageChange}
                        />
                        <button
                          id={index}
                          onClick={this.openUpload}
                          className="btn btn-primary"
                        >
                          Select
                        </button>
                      </div>
                    );
                  }, this)}
                  <div className="col-md-12 mt-4">
                    <button
                      className="btn btn-primary"
                      onClick={this.updateImages}
                    >
                      {" "}
                      Save{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <p>Click on the image(s) below to upload your photo(s)</p>
            <div className="row">
              <div className="col-md-2 mb-3"></div>
              {imageData &&
                imageData.length > 0 &&
                imageData.map((image) => (
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
                        src={config.uploadapiUrl + "/uploads/" + image.url}
                        alt="image"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <a href="javascript:void(0)" className="btn btn-primary">
                      Select
                    </a>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div>
            {previewData &&
              previewData.length &&
              previewData.map(function (data, i) {
                return (
                  <div key={i}>
                    <h4>Property Photos</h4>
                    <br />
                    <h4>
                      <u>Upload Photo for Property 1</u>
                    </h4>
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <div className="form-group">
                          <img
                            alt="Photo"
                            className="img-square"
                            style={{ width: "200px" }}
                            src="../../../public/assets/images/1photo.png"
                          />{" "}
                        </div>

                        <div className="text-left">
                          <a
                            href="javascript:void(0)"
                            className="btn btn-primary"
                          >
                            Upload Photo
                          </a>
                        </div>
                      </div>
                      <div className="col-md-8 mb-3">
                        <div
                          className="card"
                          style={{
                            width: "24rem",
                            border: "dashed",
                            padding: "5px",
                            "border-color": "#ccc",
                          }}
                        >
                          <img
                            className="card-img-bottom"
                            src="../../../public/assets/images/1photo.png"
                            alt="image"
                            style={{ width: "100%" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }, this)}

            <h4>
              <u>Upload Photo for Property 2</u>
            </h4>
            <div className="row">
              <div className="col-md-4 mb-3">
                <div className="form-group">
                  <img
                    alt="Photo"
                    className="img-square"
                    style={{ width: "200px" }}
                    src="../../../public/assets/images/1photo.png"
                  />{" "}
                </div>

                <div className="text-left">
                  <a href="javascript:void(0)" className="btn btn-primary">
                    Upload Photo
                  </a>
                </div>
              </div>
              <div className="col-md-8 mb-3">
                <div
                  className="card"
                  style={{
                    width: "24rem",
                    border: "dashed",
                    padding: "5px",
                    "border-color": "#ccc",
                  }}
                >
                  <img
                    className="card-img-bottom"
                    src="../../../public/assets/images/1photo.png"
                    alt="image"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>

            <h4>
              <u>Upload Photo for Property 3</u>
            </h4>
            <div className="row">
              <div className="col-md-4 mb-3">
                <div className="form-group">
                  <img
                    alt="Photo"
                    className="img-square"
                    style={{ width: "200px" }}
                    src="../../../public/assets/images/1photo.png"
                  />{" "}
                </div>

                <div className="text-left">
                  <a href="javascript:void(0)" className="btn btn-primary">
                    Upload Photo
                  </a>
                </div>
              </div>
              <div className="col-md-8 mb-3">
                <div
                  className="card"
                  style={{
                    width: "24rem",
                    border: "dashed",
                    padding: "5px",
                    "border-color": "#ccc",
                  }}
                >
                  <img
                    className="card-img-bottom"
                    src="../../../public/assets/images/1photo.png"
                    alt="image"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>
            <h4>
              <u>Upload Photo for Property 4</u>
            </h4>
            <div className="row">
              <div className="col-md-4 mb-3">
                <div className="form-group">
                  <img
                    alt="Photo"
                    className="img-square"
                    style={{ width: "200px" }}
                    src="../../../public/assets/images/1photo.png"
                  />{" "}
                </div>

                <div className="text-left">
                  <a href="javascript:void(0)" className="btn btn-primary">
                    Upload Photo
                  </a>
                </div>
              </div>
              <div className="col-md-8 mb-3">
                <div
                  className="card"
                  style={{
                    width: "24rem",
                    border: "dashed",
                    padding: "5px",
                    "border-color": "#ccc",
                  }}
                >
                  <img
                    className="card-img-bottom"
                    src="../../../public/assets/images/1photo.png"
                    alt="image"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-4">
              <a href="javascript:void(0)" className="btn btn-primary">
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
        )}
      </div>
    );
  }
}

export default PhotoTab;
