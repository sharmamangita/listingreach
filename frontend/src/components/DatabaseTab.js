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

class DatabaseTab extends React.Component {
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
        id="database"
        role="tabpanel"
        aria-labelledby="group-dropdown2-tab"
        aria-expanded="false"
      >
        <h4>Select Database</h4>
        <p>
          Select the databases you wish to send your Blast to by clicking the
          'Add Databases' button. The number of recipients is shown after each
          database name.
        </p>
        <p>
          The first database you select is included in the cost of the blast at
          $19.95. Additional databases will be charged at $15.00 each.
        </p>
        <p>
          <a href="javascript:void(0)" className="btn btn-primary">
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
    );
  }
}

export default DatabaseTab;
