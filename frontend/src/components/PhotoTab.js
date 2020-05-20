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
    this.navId = "";
    this.state = {
      userId: "",
      updateimage:"",
            email:'',
      imageData:Object.assign({
       url:''
      },this.props.imageData),
    };

    this.openUpload = this.openUpload.bind(this);
    this.imageChange = this.imageChange.bind(this);
    this.handleChangepreview = this.handleChangepreview.bind(this);
    this.handleSubmitPreviw = this.handleSubmitPreviw.bind(this);
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




  render() {
     const { imageData } = this.state;
    
    return (
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
              <a href="javascript:void(0)" className="btn btn-primary">
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
    );
  }
}

export default PhotoTab;
