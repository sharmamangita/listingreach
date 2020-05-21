import React from 'react';
import { Link } from 'react-router-dom';
import { userActions } from '../actions';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, NavLink } from 'react-bootstrap';
import Modal from 'react-bootstrap4-modal';
import { connect } from 'react-redux';
import { common } from '../helpers';
import moment from "moment";

class BlastTab extends React.Component {
  constructor(props) {
    super(props);
    this.navId = "";
    this.state = {
      userId: "",
    };

  }

  componentDidMount() {
    var that = this;
    var user = JSON.parse(localStorage.getItem("user"));
    this.setState({
      userId: user.userId,
    });
  }

   selectBlast(e, blast_type) {
    if (blast_type) {
        const { dispatch } = this.props.dispatchval.dispatch;
        const {userId} = this.state;
        dispatch(userActions.blast(blast_type,userId));
    }
  }


  render() {
    return (
      <div
        role="tabpanel"
        className="tab-pane fade active show mt-2"
        id="type"
        aria-labelledby="public-tab"
        aria-expanded="true"
      >
        <h4>Select Blast Type</h4>
        <form
          className="form-a contactForm"
          action=""
          method="post"
          role="form"
        >
          <div className="row">
            <div className="col-md-6 mb-3">
              <div
                className="card"
                style={{
                  width: "30rem",
                  margin: "20px 0 24px 0",
                }}
              >
                <img
                  className="card-img-top"
                  src="../../../public/assets/images/house.png"
                  alt="image"
                  style={{ width: "100%" }}
                />
                <div className="card-body">
                  <h4 className="card-title">
                    Residential Listings For Sale or Lease{" "}
                  </h4>
                  <ul>
                    <li>New Listings</li>
                    <li>Price Changes</li>
                    <li>Homes & Condos for Lease</li>
                    <li>Broker Opens</li>
                    <li>Open Houses</li>
                    <li>Auctions</li>
                    <li>etc...</li>
                  </ul>
                  <p>
                    If its residential real estate for sale or lease, these are
                    your templates
                  </p>
                  <p>* For Sale By Owner (FSBO's) are not permitted</p>
                  <a
                    href="javascript:void(0)"
                    className="btn btn-primary"
                    onClick={(e) =>
                      this.selectBlast(e, "ResidentialListings")
                    }
                  >
                    Select
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div
                className="card"
                style={{
                  width: "30rem",
                  margin: "20px 0 24px 0",
                }}
              >
                <img
                  className="card-img-top"
                  src="../../../public/assets/images/services.png"
                  alt="image"
                  style={{ width: "100%" }}
                />
                <div className="card-body">
                  <h4 className="card-title">
                    Residential Real Estate Brokerage Related Services
                  </h4>
                  <ul>
                    <li>Mortgages</li>
                    <li>Title Companies</li>
                    <li>Developers</li>
                    <li>Coaches and Training</li>
                    <li>Continuing Education</li>
                    <li>Property Inspections</li>
                    <li>etc...</li>
                  </ul>

                  <p>
                    If you are advertising a residential real estate brokerage
                    related service, these are your templates.
                  </p>

                  <p>
                    * Repeated database selections limited to once every 14
                    days. * Recruitment and Referral Request Flyers are not
                    Permitted
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

export default BlastTab;
