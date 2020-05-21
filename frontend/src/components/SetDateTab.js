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

class SetDateTab extends React.Component {
  constructor(props) {
    super(props);
    this.navId = "";
    this.state = {
      email: "",
    };
  }

  render() {
    return (
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
    );
  }
}

export default SetDateTab;
