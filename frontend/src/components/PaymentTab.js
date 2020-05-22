import React from "react";
import { Link } from "react-router-dom";
import { userActions } from "../actions";
import CommonDownload from './CommonDownload'
import { globalData } from '../constants/data.constants';
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

class PaymentTab extends React.Component {
  constructor(props) {
    super(props);
    this.navId = "";
    this.state = {
      userId: "",
    };
    this.dispatchval = ({
      tagName : 'span',
      className : '',
      children : null,
      dispatch :this.props
    });
  }

  render() {
    var downloadLink=
      (
      <CommonDownload
        dispatchval = {this.dispatchval}
        total='20'
      />
    );
    return (
      <div
        className="tab-pane fade mt-2"
        id="payment"
        role="tabpanel"
        aria-labelledby="group-dropdown2-tab"
        aria-expanded="false"
      >
        <h4>Make Payment</h4>
        <p>
          Please review your order and make payment by filling in the form
          below.
        </p>
        <div className="alert alert-info">
          <strong>Your Selected Send Date is: Thursday, May 7, 2020</strong>
        </div>
        <div className="alert alert-success">
          <strong>Estimated Blast Email Volume: 1,352 Recipients</strong>
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
              <td>Flyer - Homes for Sale - FlyerID: 324021, BlastID: 201314</td>
              <td>$19.95</td>
            </tr>
            <tr>
              <td></td>
              <td>
                - Additional Real Estate Agent List : Bonita Springs-Estero Real
                Estate Agent List
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
          To complete your order enter your payment details in the fields below.{" "}
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
                    value=""
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
                   <select className="form-control form-control-a" >
                        <option>Select State</option>
                        {
                            globalData.USstates.map((st) => (
                                <option key={st}>{st}</option>
                            ))
                        }
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
            {downloadLink ? downloadLink:""}
          </div>
           
        </div>
      </div>
    );
  }
}

export default PaymentTab;
