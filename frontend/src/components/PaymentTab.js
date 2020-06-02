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
    this.createdDate = this.createdDate.bind(this);
  }
 
 createdDate(createdOn) {
    if(createdOn!==''){
      var datformt = new moment(createdOn, "YYYY-MM-DD");
      return datformt;
    }else{
      return '';
    }
      
  }
  render() {
    var  scheduledDate='';
    if(this.props.scheduledDate){
      scheduledDate = this.props.scheduledDate;
    }
    var associations='';
    var per_email_blast_price=0;
    var additional_email_blast_price=0;
    var invoiveTotal= 0;
    var blast_type='';
    if(this.props.dataBaseData && this.props.blastsettingData){
      per_email_blast_price =this.props.blastsettingData[0].per_email_blast_price;
      additional_email_blast_price =this.props.blastsettingData[0].additional_email_blast_price;
      
      blast_type=this.props.dataBaseData.blast_type;
      associations=this.props.dataBaseData.associations;
      console.log("associations====",associations.length);
      associations.forEach(function(item){
        if(associations.length>1){
          invoiveTotal=per_email_blast_price+(additional_email_blast_price*associations.length);
        }else{
          invoiveTotal=per_email_blast_price;
        }
      });
       var downloadLink=
        (
        <CommonDownload
          dispatchval = {this.dispatchval}
          dataBaseData={this.props.dataBaseData}
          total= {invoiveTotal}
        />
      );
    }
   
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
          <strong>Your Selected Send Date is: {scheduledDate}</strong>
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
            
          {associations &&
                associations.map((result, i) =>(                 
                  i == 0 ?
                    <tr key={i}>
                    <td>{i+1}</td>
                      <td>Blast Type {blast_type} -{result.association.name}</td>
                      <td>
                        ${per_email_blast_price}
                      </td>
                    </tr>
                    : <tr>
                    <td></td>
                      <td>Additional-{result.association.name}</td>
                      <td>
                        ${additional_email_blast_price}
                      </td>
                    </tr>
                ))
                }
            <tr>
              <td></td>
              <td class="text-right">Invoice Total</td>
              <td>${invoiveTotal}</td>
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
