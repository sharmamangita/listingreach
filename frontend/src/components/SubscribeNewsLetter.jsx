import React from 'react'
import { connect } from "react-redux";
import { subscriberActions } from '../actions/subscriber.actions'
import { subscriberService } from '../services';
class SubscribeNewsLetter extends React.Component {
    constructor(props) {
        super(props);
        const propertyTypes = ["Single Family", "Condo/townhome/row home/co-op", "Duplex", "Farm/Ranch", "Mfd/Mobile/Modular Home", "Vacant Lot / Vacant Land", "Rental Income Property", "Buyer’s Requirement / Acquisition Needs"];
        const priceFilters = [
            { text: "Up to $299,999", min: 0, max: 299999 },
            { text: "$300,000 - $599,999", min: 300000, max: 599999 },
            { text: "$600,000 or more", min: 600000, max: 900000000 }
        ];
        const preferedVendors = ["Lender / Mortgage Broker", "Education", "Building inspection", "Closing Assistance", "Staging", "Photography / Videography", "Other, N/A"];
        this.state =
        {
            submitted: false,
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
                mailingLists: []
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        var subscribeButton = document.querySelector('#sub-button')
        console.log('btn ',subscribeButton)
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
        var { subscriber } = this.state;
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
            case "outsideareaproperties":
                subscriber.includeOutsideAreaProperties = value;
                break;
            default:
                break;
        }

        console.log("eeeeeeee", e.target);
        this.setState({ subscriber: subscriber });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        this.props.dispatch(subscriberActions.register(this.state.subscriber));
    }

    render() {
        var { subscriber, submitted, propertyTypes, priceFilters, preferedVendors } = this.state;
        console.log("subscriber", this.state)
        return (
            <div>
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
                                            <div className="help-block red">This filed is required</div>
                                        }
                                    </div>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input type="email" required="" name="email" value={subscriber.email} onChange={this.handleChange} className="form-control form-control-lg form-control-a" placeholder="Your Email Address" />
                                        {submitted && !subscriber.email &&
                                            <div className="help-block red">This filed is required</div>
                                        }
                                    </div>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone</label>
                                        <input type="text" name="phone" onChange={this.handleChange} className="form-control form-control-lg form-control-a" placeholder="Your Phone Number" />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="city">City</label>
                                        <input type="text" name="city" onChange={this.handleChange} value={subscriber.city} className="form-control form-control-lg form-control-a" placeholder="City" />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="state">State</label>
                                        <select name="state" onChange={this.handleChange} value={subscriber.state} className="form-control form-control-lg form-control-a" id="Type">
                                            <option>Select</option>
                                            <option>Punjab</option>
                                            <option>Hryana</option>
                                            <option>Rajasthan</option>
                                        </select>
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
                                            </div></div>

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
                                                <button type="button" className="btn btn_primary" data-toggle="modal" data-target="#databases">
                                                    Add Databases
                                                    </button>
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
                <div className="modal" id="databases">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">Select Databases</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div className="modal-body">
                                <div className="form-group col-md-6">

                                    <select className="form-control form-control-a" id="Type">
                                        <option>Select State</option>
                                    </select>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-b" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        );
    };
}
export default connect()(SubscribeNewsLetter);
// function mapStateToProps(state) {
//     const { subscriber } = state;
//     //  console.log("subscriber====", subscriber);
//     return {
//         subscriber
//     };
// }

// const connectedCandidatePage = connect(mapStateToProps)(SubscribeNewsLetter);
// export { connectedCandidatePage as SubscribeNewsLetter };
