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

class TermsTab extends React.Component {
  constructor(props) {
    super(props);
    this.navId = "";
    this.state = {
      userId: "",
    };
      this.nexttab = this.nexttab.bind(this);
  }

    nexttab(){
    const { dispatch } = this.props.dispatchval.dispatch;
    dispatch(userActions.termsNext());
  }

  render() {
    return (
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

export default TermsTab;
