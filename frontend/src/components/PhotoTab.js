import React from "react";
import { userActions } from "../actions";
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
      blast_id: "",
      properties: [],
      template: {},

      imageData: Object.assign(
        {
          url: "",
        },
        this.props.imageData
      ),
      visible: false,
      divCount: [],
      submited: false,
    };

    this.openUpload = this.openUpload.bind(this);
    this.imageChange = this.imageChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.modelClose = this.modelClose.bind(this);
    this.updateImages = this.updateImages.bind(this);
    this.nextPage = this.nextPage.bind(this);

  }

  updateImages(e) {
    e.preventDefault();
    var { properties } = this.state;
    const { dispatch } = this.props.dispatchval.dispatch;
    if (properties) {
      dispatch(userActions.saveImages(properties));
      this.setState({ submited: true })
    }
  }

  nextPage() {
    this.props.moveTab("preview");
  }

  openUpload(e) {
    const { id } = e.target;
    $(".imgupload" + id).trigger("click");
  }

  showModal(e, count) {
    let properties = this.state.properties;
    if (properties && count) {
      properties[0].propertyImages=[];
      for(let i=1;i<=count;i++){
        properties[0].propertyImages.push({imageUrl:"",imageId:""});
      }
      this.setState({ visible: true, properties });
    }
  }

  modelClose() {
    this.setState({ visible: false });
  }

  imageChange(e, property, imageIndex) {
    const { id } = e.target;
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
        console.log("Image uplaod response ", response);
        let { properties } = this.state;
        let _image = {};
        _image.imageId = response.data.imageId;
        _image.imageUrl = response.data.url;

        const index = properties.indexOf(property);
        if (properties[index].propertyImages.length > 0) {
          properties[index].propertyImages[imageIndex] = _image;
        } else {
          properties[index].propertyImages.push(_image);
        }
        this.setState({ properties });
      })
      .catch(() => {
      });
    this.setState({ submited: false });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeTab == "photo") {
      console.log("nextProps in Photo Tab ", nextProps)
      this.setState({
        template: nextProps.template,
        blast_id: nextProps.blast_id,
        properties: nextProps.properties,
        visible :true
      });
    }
  }

  render() {
    const { imageData, visible, updateimage, template, submited, properties } = this.state;
    console.log("state in render in Photos Tab ====", this.state);
    console.log("props in render in Photos Tab ====", this.props);
    let images = ["", "", "", ""];
    if (updateimage && updateimage.length) {
      updateimage.forEach(function (item, i) {
        if (item) {
          images[i] = config.uploadapiUrl + "/uploads/" + item;
        }
      });
    }
    return (
      <div className="tab-pane fade mt-2" id="photos"
        role="tabpanel" aria-labelledby="group-dropdown2-tab" aria-expanded="false"
      >
        {template && template.template_type == "SingleProperty" ? (
          <div>
            <h4>Property Photos</h4>
            <p>Select the Photo Layout for your property.</p>
            <div className="row">
              <div className="col-md-3 mb-3">
                <div className="form-group">
                  <img alt="Photo" className="img-square"
                    style={{ width: "200px" }}
                    src="../../../public/assets/images/1photo.png"
                  />
                </div>
                <div className="text-center">
                  <button className="btn btn-primary"
                    onClick={(e) => this.showModal(e, 1)} >
                    click here
                  </button>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="form-group">
                  <img alt="Photo" className="img-square"
                    style={{ width: "200px" }}
                    src="../../../public/assets/images/2photo.png"
                  />
                </div>
                <div className="text-center">
                  <button className="btn btn-primary"
                    onClick={(e) => this.showModal(e, 2)}
                  >
                    click here
                  </button>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="form-group">
                  <img alt="Photo" className="img-square"
                    style={{ width: "200px" }}
                    src="../../../public/assets/images/3photo.png"
                  />
                </div>
                <div className="text-center">
                  <a href="javascript:void(0)" className="btn btn-primary"
                    onClick={(e) => this.showModal(e, 3)}
                  >
                    click here
                  </a>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="form-group">
                  <img alt="Photo" className="img-square"
                    style={{ width: "200px" }}
                    src="../../../public/assets/images/4photo.png"
                  />
                </div>
                <div className="text-center">
                  <button className="btn btn-primary"
                    onClick={(e) => this.showModal(e, 4)}
                  >
                    click here
                  </button>
                </div>
              </div>
            </div>

            <div id="myModal" style={{ display: visible ? "inline" : "none" }}>
              <div className="modal-content">
                <div className="row">
                  {properties[0].propertyImages.map(function (image, index) {
                    return (
                      <div key={index} className="col-md-4 mb-3">
                        <div className="card"
                          style={{
                            width: "20rem", margin: "20px 0 24px 0", border: "dashed",
                            padding: "5px", borderColor: "#ccc",
                          }}
                        >
                          <div className="card-body">
                            <h4 className="card-title">Position {index + 1}</h4>
                          </div>
                          <img className="card-img-bottom"
                            src={
                              (image && image.imageUrl && config.uploadapiUrl + "/uploads/" + image.imageUrl) ||
                              "../../../public/assets/images/img1.jpg"
                            }
                            alt="image"
                            style={{ width: "100%" }}
                          />
                        </div>
                        <input
                          type="file" className={"imgupload" + index}
                          style={{ display: "none" }}
                          onChange={(e) => this.imageChange(e, properties[0], index)}
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
                    <div className="col-md-12 mt-4">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.updateImages}
                        disabled={submited ? true : false}
                      >
                        Save
              </button>
                      <button
                        type="button"
                        className="btn btn-primary pull-right"
                        onClick={this.nextPage}
                        disabled={submited ? false : true}
                      >
                        Next
              </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <p>Click on the image(s) below to upload your photo(s)</p> */}
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
              {properties &&
                properties.length &&
                properties.map(function (property, index) {
                  return (
                    <div key={index}>
                      <h4>Property Photos</h4>
                      <br />
                      <h4>
                        <u>Upload Photo for Property {index + 1}</u>
                      </h4>
                      <div className="row">
                        <div className="col-md-4 mb-3">
                          <div className="form-group">
                            <img alt="Photo" className="img-square"
                              style={{ width: "200px" }}
                              src="../../../public/assets/images/1photo.png"
                            />{" "}
                          </div>
                          <input type="file"
                            id={index} className={"imgupload" + index}
                            style={{ display: "none" }}
                            onChange={(e) => this.imageChange(e, property, 0)}
                          />
                          <div className="text-left">
                            <a href="javascript:void(0)"
                              className="btn btn-primary" id={index}
                              onClick={this.openUpload}
                            >
                              Upload Photo
                          </a>
                          </div>
                        </div>
                        <div className="col-md-8 mb-3">
                          <div className="card"
                            style={{
                              width: "24rem", border: "dashed", padding: "5px", borderColor: "#ccc",
                            }}
                          >
                            <img
                              className="card-img-bottom"
                              src={
                                (property.propertyImages && property.propertyImages.length > 0
                                  && config.uploadapiUrl + "/uploads/" + property.propertyImages[0].imageUrl)
                                || "../../../public/assets/images/1photo.png"
                              }
                              alt="image"
                              style={{ width: "100%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }, this)}
              <div className="col-md-12 mt-4">
                <button type="button" className="btn btn-primary"
                  onClick={this.updateImages}
                  disabled={submited ? true : false}
                >
                  Save
              </button>
                <button type="button" className="btn btn-primary pull-right"
                  onClick={this.nextPage}
                  disabled={submited ? false : true}
                >
                  Next
              </button>
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default PhotoTab;
