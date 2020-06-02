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
import Moment from "moment";
import config from "config";
import { Markup } from 'interweave';


class PreviewTab extends React.Component {
  constructor(props) {
    super(props);
    this.navId = "";
    this.state = {
      email: "",
    };
    let user = JSON.parse(localStorage.getItem("user"));
    if (user && user.userId && this.props && this.props.dispatchval) {
      const { dispatch } = this.props.dispatchval.dispatch;
      dispatch(userActions.getById(user.userId));
    }

    this.handleChangepreview = this.handleChangepreview.bind(this);
    this.handleSubmitPreviw = this.handleSubmitPreviw.bind(this);
    this.nexttab = this.nexttab.bind(this);
  
    const { dispatch } = this.props.dispatchval.dispatch;
    const { blast_id } = this.props;

  }




  handleChangepreview(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmitPreviw(e) {
    e.preventDefault();
    const { previewData, propertyImages } = this.props;
    const { email } = this.state;
    const { dispatch } = this.props.dispatchval.dispatch;
    if (email && previewData) {
      dispatch(userActions.emailPreviewTemplate(email, propertyImages));
      //window.scrollTo(0,0);
      this.setState({
        email: "",
        submitted: false,
      });
      this.setState({ visible: true }, () => {
        window.setTimeout(() => {
          this.setState({ visible: false });
        }, 5000);
      });
    } else {
      alert("Please fill all required fields.");
    }
  }


  nexttab(){
    const { dispatch } = this.props.dispatchval.dispatch;
    dispatch(userActions.preview());
  }

  render() {
    console.log("this.props4545======",this.props);
    const { previewData, propertyImages,praviewHtml } = this.props;
    let agentData = "";
    if (previewData && previewData.length) {
      agentData = previewData[0].agentData[0].agentData;
    }
      let html = '';
    if(praviewHtml && praviewHtml.html){
      html = praviewHtml.html;
    }

     // ReactDOM.render(<p>Helloasasasa asasasas</p>, document.getElementById('preview'));

    return (
      <div
        className="tab-pane fade mt-2"
        id="preview"
        role="tabpanel"
        aria-labelledby="group-dropdown2-tab"
        aria-expanded="false">
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
              <input
                value={this.state.email}
                onChange={this.handleChangepreview}
                name="email"
                type="text"
                className="form-control form-control-lg form-control-a"
                placeholder="Email Address"
              />
              {!this.state.email && (
                <div className="help-block red">Email is required</div>
              )}
            </div>
          </div>
          <div className="col-md-2 mb-3">
            <div className="form-group pt-4">
              <a onClick={this.handleSubmitPreviw} className="btn btn-primary">
                Send
              </a>
            </div>
          </div>
        </div>
          <Markup content={html} />
        <div className="col-md-12 mt-4">
          <a href="javascript:void(0)" className="btn btn-primary" onClick={this.nexttab}>
            Save
          </a>
          <a href="javascript:void(0)" className="btn btn-primary pull-right" onClick={this.nexttab} >
            Next
          </a>
        </div>
      </div>
    );
  }
}

export default PreviewTab;
