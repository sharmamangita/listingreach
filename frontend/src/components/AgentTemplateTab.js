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
class AgentTemplateTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
    };
this.selectDesignTemplate = this.selectDesignTemplate.bind(this);
  }

  componentDidMount() {
    var that = this;
    var user = JSON.parse(localStorage.getItem("user"));
    this.setState({
      userId: user.userId,
    });
  }

  selectDesignTemplate(e, designTemplate) {
    if (designTemplate) {
      const { dispatch } = this.props.dispatchval.dispatch;
      const { userId } = this.state;
      dispatch(userActions.designTemplate(designTemplate, userId));
    }
  }

  render() {
    return (
      <div
        className="tab-pane fade mt-2"
        id="temp"
        role="tabpanel"
        aria-labelledby="group-dropdown2-tab"
        aria-expanded="false"
      >
        <h4>Design Template</h4>
        <p>Choose your template design for creating a new Blast.</p>
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
                      this.selectDesignTemplate(e, "SingleProperty")
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
                  <h4 className="card-title">Multiple Properties</h4>
                  <p className="card-text">
                    - Create a Blast from Scratch <br></br>- Feature Multiple
                    Properties{" "}
                  </p>
                  <a href="javascript:void(0)"
                   className="btn btn-primary"
                    onClick={(e) =>
                      this.selectDesignTemplate(e, "MultipleProperties")
                    }>
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
                  <h4 className="card-title">Upload Your Own Blast</h4>
                  <p className="card-text">
                    Upload in seconds a Single Page Blast you already have
                  </p>
                  <a href="javascript:void(0)" className="btn btn-primary">
                    Select
                  </a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default AgentTemplateTab;
