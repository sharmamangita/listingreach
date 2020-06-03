import React from "react";
import { connect } from "react-redux";
import { subscriberActions } from "../actions/subscriber.actions";
import { globalData } from "../constants/data.constants";
import { Modal } from "react-bootstrap";
import { adminActions } from "../actions";
import { userActions } from "../actions";

class DatabaseTab extends React.Component {
  constructor(props) {
    super(props);
    this.associations = [];
    this.state = this.resetState();
    this.state = {
      associations: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.deleteAssociation = this.deleteAssociation.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  resetState() {
    const propertyTypes = [
      "Single Family",
      "Condo/townhome/row home/co-op",
      "Duplex",
      "Farm/Ranch",
      "Mfd/Mobile/Modular Home",
      "Vacant Lot / Vacant Land",
      "Rental Income Property",
      "Buyer’s Requirement / Acquisition Needs",
    ];
    const priceFilters = [
      { text: "Up to $299,999", min: 0, max: 299999 },
      { text: "$300,000 - $599,999", min: 300000, max: 599999 },
      { text: "$600,000 or more", min: 600000, max: 900000000 },
    ];
    const preferedVendors = [
      "Lender / Mortgage Broker",
      "Education",
      "Building inspection",
      "Closing Assistance",
      "Staging",
      "Photography / Videography",
      "Other, N/A",
    ];
    const state = {
      show: false,
      clearForm: false,
      isFormValid: false,
      submitted: false,
      activeCampaign: {
        associations: [],
        segments: [],
      },
      propertyTypes: propertyTypes,
      priceFilters: priceFilters,
      preferedVendors: preferedVendors,
    };
    return JSON.parse(JSON.stringify(state)); // pass a copy of object
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.props.dispatch(adminActions.getActiveCampaignAssociations());
    this.setState({ show: true });
  }
  handleStateChange(e) {
    const associationid = e.target.value;
    var index = e.nativeEvent.target.selectedIndex;
    const { activeCampaign } = this.state;
    const filteredSegments = activeCampaign.segments.filter(
      (segment) => segment.lists[associationid]
    );
    console.log("filteredSegments=====", filteredSegments);
    activeCampaign.segment = [];
    this.setState({
      activeCampaign,
      filteredSegments,
    });

    let states = Object.assign({}, this.state);
    this.associations.push({
      association: {
        id: associationid,
        name: e.nativeEvent.target[index].text,
      },
      segments:[],
    });
    states.associations = this.associations;
    this.setState(states);
  }
  componentDidMount() {
    var subscribeButton = document.querySelector("#sub-button");
    if (subscribeButton) {
      subscribeButton.addEventListener("click", function () {
        document.body.classList.remove("box-collapse-closed");
        document.body.classList.add("box-collapse-open");
      });

      var closeButton = document.querySelector(
        ".close-box-collapse, .click-closed"
      );
      closeButton.addEventListener("click", function () {
        document.body.classList.remove("box-collapse-open");
        document.body.classList.add("box-collapse-closed");
      });
    }
  }

  handleChange(e, selectedItem) {
    const { name, value, checked } = e.target;
    console.log("this.associations=====",e.target);
    if(this.associations){

             let i = this.associations.length-1;
              console.log("this.associations=====",this.associations);
      if (checked) {
           this.associations[i].segments.push(selectedItem);
      } else {
          var index = this.associations[i].segments.indexOf(selectedItem);
          if (index > -1) {
            this.associations[i].segments.splice(index, 1)
          }
      }


    }

  }
  deleteAssociation(e) {
    const { id } = e.target;
    let associationArray = Object.assign({}, this.state);
    associationArray.associations.splice(id, 1);
    this.setState(associationArray);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { associations } = this.state;
    const {blast_id} = this.props;
    const { dispatch } = this.props.dispatchval.dispatch;
    dispatch(userActions.selectDatabase(blast_id, associations));
  }
  renderdataBaseModal() {
    const { show, activeCampaign, filteredSegments, loading } = this.state;
    console.log("state in model ", this.state);
    return (
      <Modal show={show} onHide={this.handleClose} size="lg">
        ;
        <Modal.Header>
          <h4 className="modal-title">Select Databases</h4>
        </Modal.Header>
        <Modal.Body>
          {!loading ? (
            <React.Fragment>
              <form className="form">
                <div className="form-group col-md-6">
                  <select
                    className="form-control form-control-a"
                    onChange={(event) => this.handleStateChange(event)}
                  >
                    <option>Select State</option>
                    {activeCampaign &&
                      activeCampaign.associations.map((st) => (
                        <option key={st.id} value={st.id}>
                          {st.name}
                        </option>
                      ))}
                  </select>
                </div>

                {filteredSegments && filteredSegments.length > 0 ? (
                  <div className="form-group">
                    <label htmlFor="property">
                      <b>City wise Agents</b>
                    </label>
                    <div className="row">
                      <div className="col-md-6 mb-2">
                        {filteredSegments.map((segment) => (
                          <div className="form-check" key={segment.id}>
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                name="agentdatabase"
                                value={segment.id}
                                onChange={(event) =>
                                  this.handleChange(event, segment)
                                }
                                className="form-check-input"
                              />
                              {segment.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </form>
            </React.Fragment>
          ) : (
            <h4>Loading....</h4>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-b"
            onClick={this.handleClose}
          >
            Done
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
  render() {
    console.log("database====",this.props);
    var { submitted, associations } = this.state;
    return (
      <React.Fragment>
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
            The first database you select is included in the cost of the blast
            at $19.95. Additional databases will be charged at $15.00 each.
          </p>
          <p>
            <button
              type="button"
              onClick={this.handleShow}
              className="btn btn_primary"
              data-toggle="modal"
              data-target="#databases"
            >
              Add Databases{" "}
            </button>
          </p>
          <label>Selected Database</label>
          <table
            id="example"
            className="table table-bordered"
            style={{ width: "100%" }}
          >
            <tbody>
              {associations &&
                associations.map(function (result, i) {
                  return (
                    <tr key={i}>
                      
                      {result.segments.map(function (seg, k) {
                        return( <td>
                        {result.association.name} ---  {seg.name}
                        <span>                        <i
                          className="fa fa-trash"
                          aria-hidden="true"
                          title="Delete"
                          id={i}
                          onClick={this.deleteAssociation}
                        ></i></span>
                         </td>
                        );
                     }, this)}
                     
                    </tr>
                  );
                }, this)}
            </tbody>
          </table>
          {associations && associations.length ? (
            <button
              type="button"
              onClick={this.handleSubmit}
              className="btn btn_primary"
            >
              save{" "}
            </button>
          ) : null}
        </div>
        {this.renderdataBaseModal()}
      </React.Fragment>
    );
  }
  componentWillReceiveProps(props) {
    this.setState({
      activeCampaign: props.activeCampaign,
      loading: props.loading,
    });
    if (props.clearForm) {
      var defaultstate = this.resetState();
      this.setState(defaultstate);
    }
  }
}
function mapStateToProps(state) {
  const { admins, registration } = state;
  const { activeCampaign, loading } = admins;
  const { clearForm } = registration;
  return {
    loading,
    clearForm,
    activeCampaign,
  };
}
export default connect(mapStateToProps)(DatabaseTab);
