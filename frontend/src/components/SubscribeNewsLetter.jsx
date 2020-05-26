import React from 'react'
import { connect } from "react-redux";
import { subscriberActions } from '../actions/subscriber.actions'
import { globalData } from '../constants/data.constants';
import { Modal } from 'react-bootstrap';
import { adminActions } from '../actions';
class SubscribeNewsLetter extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.resetState();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.clearAgentDataBase = this.clearAgentDataBase.bind(this);
    }

    resetState() {
        const propertyTypes = ["Single Family", "Condo/townhome/row home/co-op", "Duplex", "Farm/Ranch", "Mfd/Mobile/Modular Home", "Vacant Lot / Vacant Land", "Rental Income Property", "Buyer’s Requirement / Acquisition Needs"];
        const priceFilters = [
            { text: "Up to $299,999", min: 0, max: 299999 },
            { text: "$300,000 - $599,999", min: 300000, max: 599999 },
            { text: "$600,000 or more", min: 600000, max: 900000000 }
        ];
        const preferedVendors = ["Lender / Mortgage Broker", "Education", "Building inspection", "Closing Assistance", "Staging", "Photography / Videography", "Other, N/A"];
        const state =
        {
            show: false,
            clearForm: false,
            isFormValid: false,
            submitted: false,
            activeCampaign: {
                associations: [],
                segments: []
            },
            propertyTypes: propertyTypes,
            priceFilters: priceFilters,
            preferedVendors: preferedVendors,
            subscriber: {
                name: "",
                email: "",
                phone: "",
                city: "",
                state: "",
                state: "",
                propertyTypes: [],
                priceRanges: [],
                includeRentedProperties: false,
                includeOutsideAreaProperties: true,
                agentTypes: [],
                mailingLists: []// segment ids from activeCampaign
            }
        };
        return JSON.parse(JSON.stringify(state));// pass a copy of object
    }

    handleClose() {
        this.setState({ show: false });
    }
    clearAgentDataBase() {
        const { subscriber } = this.state;
        subscriber.mailingLists = [];
        this.setState({ subscriber: subscriber, show: false, associations: [] });
    }
    handleShow() {
        this.setState({ show: true });
        this.props.dispatch(adminActions.getActiveCampaignAssociations());
    }
    handleStateChange(e) {
        const associationid = e.target.value;
        const { activeCampaign } = this.state;
        const filteredSegments = activeCampaign.segments.filter((segment) => (
            segment.lists[associationid]
        ));
        console.log(filteredSegments)
        activeCampaign.segment = [];
        this.setState({
            activeCampaign,
            filteredSegments
        });

    }
    componentDidMount() {
        var subscribeButton = document.querySelector('#sub-button')
        if (subscribeButton) {
            subscribeButton.addEventListener('click', function () {
                document.body.classList.remove('box-collapse-closed');
                document.body.classList.add('box-collapse-open');
            });

            var closeButton = document.querySelector('.close-box-collapse, .click-closed')
            closeButton.addEventListener('click', function () {
                document.body.classList.remove('box-collapse-open');
                document.body.classList.add('box-collapse-closed');
            });
        }

    }

    handleChange(e, selectedItem) {
        const { name, value, checked } = e.target;
        var { subscriber, isFormValid } = this.state;
        switch (name) {
            case "name":
                subscriber.name = value;
                break;
            case "email":
                subscriber.email = value;
                break;
            case "phone":
                subscriber.phone = value;
                break;
            case "city":
                subscriber.city = value;
                break;
            case "state":
                subscriber.state = value;
                break;
            case "propertytypes":
                if (checked) {
                    subscriber.propertyTypes.push(selectedItem);
                } else {
                    var index = subscriber.propertyTypes.indexOf(selectedItem);
                    if (index > -1) {
                        subscriber.propertyTypes.splice(index, 1)
                    }
                }
                break;
            case "pricefilters":
                if (checked) {
                    subscriber.priceRanges.push(selectedItem);
                } else {
                    var index = subscriber.priceRanges.indexOf(selectedItem);
                    if (index > -1) {
                        subscriber.priceRanges.splice(index, 1)
                    }
                }
                break;
            case "rentedproperties":
                subscriber.includeRentedProperties = value;
                break;
            case "preferedvendor":
                if (checked) {
                    subscriber.agentTypes.push(value);
                } else {
                    var index = subscriber.agentTypes.indexOf(value);
                    if (index > -1) {
                        subscriber.agentTypes.splice(index, 1)
                    }
                }
                break;
            case "agentdatabase":
                if (checked) {
                    subscriber.mailingLists.push(value);
                } else {
                    var index = subscriber.mailingLists.indexOf(value);
                    if (index > -1) {
                        subscriber.mailingLists.splice(index, 1)
                    }
                }
                break;
            case "outsideareaproperties":
                subscriber.includeOutsideAreaProperties = value;
                break;
            default:
                break;
        }

        //console.log("eeeeeeee", e.target);
        this.setState({ subscriber: subscriber });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { subscriber } = this.state;
        if (
            subscriber.name.length > 0
            && subscriber.email.length > 0
            && subscriber.phone.length > 0
            && subscriber.city.length > 0
            && subscriber.state.length > 0 && subscriber.state !== "Select"
            && subscriber.propertyTypes.length > 0
            && subscriber.agentTypes.length > 0
            && subscriber.mailingLists.length > 0
        ) {
            this.props.dispatch(subscriberActions.register(this.state.subscriber));
        }
    }
    renderdataBaseModal() {
        const { show, activeCampaign, filteredSegments, loading } = this.state;
        console.log("state in model ", this.state)      
        return (
            <Modal show={show} onHide={this.handleClose} size="lg">;
                <Modal.Header >
                    <h4 className="modal-title">Select Databases</h4>
                </Modal.Header>
                <Modal.Body>
                    {!loading?
                    <React.Fragment>
                    <form className="form">
                        <div className="form-group col-md-6">
                            <select className="form-control form-control-a" onChange={(event) => this.handleStateChange(event)} >
                                <option>Select State</option>
                                {
                                    activeCampaign && activeCampaign.associations.map((st) => (
                                        <option key={st.id} value={st.id}>{st.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        {filteredSegments && filteredSegments.length > 0 ?
                            <div className="form-group">
                                <label htmlFor="property"><b>City wise Agents</b></label>
                                <div className="row">
                                    <div className="col-md-6 mb-2">
                                        {
                                            filteredSegments.map((segment) => (
                                                <div className="form-check" key={segment.id} >
                                                    <label className="form-check-label">
                                                        <input type="checkbox" name="agentdatabase" value={segment.id} onChange={(event) => this.handleChange(event, segment.id)} className="form-check-input" />
                                                        {segment.name}
                                                    </label>
                                                </div>)
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            : null
                        }
                    </form>
                    </React.Fragment>
                :<h4>Loading....</h4>}
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-b" onClick={this.clearAgentDataBase}>Cancel</button>
                    <button type="button" className="btn btn-b" onClick={this.handleClose} >Done</button>
                </Modal.Footer>
            </Modal>
        )
    };
    render() {
        var { subscriber, submitted, propertyTypes, priceFilters, preferedVendors } = this.state;
        console.log("state in render", this.state)
        return (
            <React.Fragment>
                <div className="box-collapse">
                    <div className="title-box-d">
                        <h3 className="title-d">Subscribe For Emails</h3>
                    </div>
                    <span className="close-box-collapse right-boxed fa fa-close fa-2x"></span>
                    <div className="box-collapse-wrap form">
                        <form onSubmit={this.handleSubmit} className="form-a">
                            <div className="row">
                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" name="name" value={subscriber.name} onChange={this.handleChange} className="form-control form-control-lg form-control-a" placeholder="Your Full Name" />
                                        {submitted && !subscriber.name &&
                                            <div className="help-block text-danger">This filed is required</div>
                                        }
                                    </div>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input type="email" required="" name="email" value={subscriber.email} onChange={this.handleChange} className="form-control form-control-lg form-control-a" placeholder="Your Email Address" />
                                        {submitted && !subscriber.email &&
                                            <div className="help-block text-danger">This filed is required</div>
                                        }
                                    </div>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone</label>
                                        <input type="text" name="phone" onChange={this.handleChange} className="form-control form-control-lg form-control-a" placeholder="Your Phone Number" />
                                        {submitted && !subscriber.phone &&
                                            <div className="help-block text-danger">This filed is required</div>
                                        }
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="city">City</label>
                                        <input type="text" name="city" onChange={this.handleChange} value={subscriber.city} className="form-control form-control-lg form-control-a" placeholder="City" />
                                        {submitted && !subscriber.city &&
                                            <div className="help-block text-danger">This filed is required</div>
                                        }
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="state">State</label>
                                        <select name="state" onChange={this.handleChange} value={subscriber.state} className="form-control form-control-lg form-control-a" id="Type">
                                            <option >Select</option>
                                            {
                                                globalData.USstates.map((stat) => (
                                                    <option key={stat} >{stat}</option>
                                                ))
                                            }
                                        </select>
                                        {submitted && !subscriber.state &&
                                            <div className="help-block text-danger">This filed is required</div>
                                        }
                                    </div>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="property"><b>What Type of Properties Do you Want to Receive?</b></label>
                                        <div className="row">
                                            <div className="col-md-6 mb-2">
                                                <div className="mb-2">Property Type</div>
                                                {
                                                    propertyTypes.map((property) => (
                                                        <div className="form-check" key={property} >
                                                            <label className="form-check-label">
                                                                <input type="checkbox" name="propertytypes" value={property} onChange={(event) => this.handleChange(event, property)} className="form-check-input" />
                                                                {property}
                                                            </label>
                                                        </div>
                                                    ))
                                                }
                                                {submitted && subscriber.propertyTypes.length < 1 &&
                                                    <div className="help-block text-danger">Select atleast 1 property type</div>
                                                }
                                            </div>
                                            <div className="col-md-6 mb-2">
                                                <div className="mb-2">Price Point</div>
                                                {
                                                    priceFilters.map((filter) => (
                                                        <div className="form-check" key={filter.text} >
                                                            <label className="form-check-label">
                                                                <input type="checkbox" name="pricefilters" value={filter} onChange={(event) => this.handleChange(event, filter)} className="form-check-input" />
                                                                {filter.text}
                                                            </label>
                                                        </div>
                                                    ))
                                                }
                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input type="checkbox" name="rentedproperties" className="form-check-input" value={subscriber.includeRentedProperties} onChange={(event) => this.handleChange(event)} />Properties For Rent
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="property"><b>What types of Preferred Vendors would you like to hear from?</b></label>
                                        <div className="row">
                                            <div className="col-md-6 mb-2">
                                                {
                                                    preferedVendors.map((vendor) => (
                                                        <div className="form-check" key={vendor} >
                                                            <label className="form-check-label">
                                                                <input type="checkbox" name="preferedvendor" value={vendor} onChange={(event) => this.handleChange(event, vendor)} className="form-check-input" />
                                                                {vendor}
                                                            </label>
                                                        </div>
                                                    ))
                                                }
                                                {submitted && subscriber.agentTypes.length < 1 &&
                                                    <div className="help-block text-danger">Select aleast 1 vendor</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="property"><b>What Areas Do You Want to Receive Properties From?</b></label>
                                        <div className="col-md-12 mb-4">
                                            Mailing lists are broken down by "realtor association affiliation". Select the mailing lists you wish to receive emails from by using the list below. You can filter the mailing lists by selecting a state from the drop down box. Listingreach.com is a privately held company and is not affiliated with any real estate boards. Emails are sent by Listingreach.com
			                            </div>
                                        <div className="row">
                                            <div className="col-md-12 mb-4">
                                                <button type="button" onClick={this.handleShow} className="btn btn_primary" data-toggle="modal" data-target="#databases">
                                                    Add Databases
                                                    </button>
                                                {submitted && subscriber.mailingLists.length < 1 &&
                                                    <div className="help-block text-danger">Select aleast 1 Database</div>
                                                }
                                            </div>

                                            <div className="col-md-12 mb-3">

                                                <div className="form-group">
                                                    <label className="check">Do NOT send Properties Out of my Area
                                                     <input type="checkbox" name="outsideareaproperties" value={!subscriber.includeOutsideAreaProperties} onChange={this.handleChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <button type="submit" className="btn btn-b">Subscribe</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {
                    this.renderdataBaseModal()
                }
            </React.Fragment>
        );
    };
    componentWillReceiveProps(props) {
        this.setState({ activeCampaign: props.activeCampaign,loading:props.loading })
        if (props.clearForm) {
            var defaultstate = this.resetState();
            this.setState(defaultstate);
        }
    }
}
function mapStateToProps(state) {
    console.log("stae11====", state);
    const { admins, registration } = state;
    const { activeCampaign, loading } = admins;
    const { clearForm } = registration;
    return {
        loading,
        clearForm,
        activeCampaign
    };
}
export default connect(mapStateToProps)(SubscribeNewsLetter);