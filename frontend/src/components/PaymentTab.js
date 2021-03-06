import React from "react";
import CommonDownload from './CommonDownload'
import { globalData } from '../constants/data.constants';
import moment from "moment";
import { adminActions } from './../actions/admin.actions';
import { userActions } from "../actions";
class PaymentTab extends React.Component {
  constructor(props) {
    super(props);
    this.navId = "";
    this.state = {
      userId: "",
    };
    this.dispatchval = ({
      tagName: 'span',
      className: '',
      children: null,
      dispatch: this.props
    });
    this.createdDate = this.createdDate.bind(this);
  }
  componentWillMount() {
    this.props.dispatchval.dispatch.dispatch(userActions.getBlastSettings());
  }
  createdDate(createdOn) {
    var expDate = new moment(createdOn, "YYYY-MM-DD");
    var created = moment(expDate).format("DD-MM-YYYY");
    return created;
  }
  accept(e) {
    const { checked } = e.target;
    this.setState({ accepted: checked })
  }
  render() {
    const { accepted } = this.state;
    var scheduledDate = '';
    if (this.props.scheduledDate) {
      scheduledDate = this.props.scheduledDate;
    }
    var associations = this.props.associations;
    var per_email_blast_price = 0;
    var additional_email_blast_price = 0;
    var invoiveTotal = 0;
    var blast_type = this.props.blast_type;
    if (this.props.blastsettingData && this.props.blastsettingData.length > 0) {
      per_email_blast_price = this.props.blastsettingData[0].per_email_blast_price;
      additional_email_blast_price = this.props.blastsettingData[0].additional_email_blast_price;

      // blast_type=this.props.dataBaseData.blast_type;
      // associations=this.props.dataBaseData.associations;
      console.log("associations====", associations.length);
      associations.forEach(function () {
        if (associations.length > 1) {
          invoiveTotal = per_email_blast_price + (additional_email_blast_price * associations.length);
        } else {
          invoiveTotal = per_email_blast_price;
        }
      });
      var downloadLink =
        (
          <CommonDownload
            dispatchval={this.dispatchval}
            blast_id={this.props.blast_id}
            total={invoiveTotal}
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
          <strong className="text-scondary">Your Selected Send Date is: {this.createdDate(scheduledDate)}</strong>
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
              associations.map((result, i) => (
                i == 0 ?
                  <tr key={result.segment.name}>
                    <td>{i + 1}</td>
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
              <td className="text-right">Invoice Total</td>
              <td>${invoiveTotal}</td>
            </tr>
          </tbody>
        </table>
        <br />

        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="row">

              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label className="check">
                    I Accept the Terms &amp; Conditions
                    <input type="checkbox" onChange={(e) => this.accept(e)} />
                    <span className="checkmark"></span>
                  </label>
                </div>{" "}
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-4 text-center">
            {downloadLink && accepted ? downloadLink : ""}
          </div>

        </div>
      </div>
    );
  }
}

export default PaymentTab;
