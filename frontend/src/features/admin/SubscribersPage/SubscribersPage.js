import React from "react";
import { connect } from "react-redux";
import { common } from "../../../helpers";
import { adminActions, subscriberActions } from "../../../actions";
import moment from "moment";
import { MDBDataTable } from "mdbreact";
import UserProfileModal from "../../../components/UserProfileModal"
import SubscriberPreferencesModal from "../../../components/SubscriberPreferencesModal";
import { Modal } from 'react-bootstrap';
class SubscriberPage extends React.Component {
	constructor(props) {
		super(props);
		// reset login status
		this.state = {
			show: false,
			subscribers: [],
			subscriberPreferences: null,
			totaldatacad: ""
		};
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.deleteUsers = this.deleteUsers.bind(this);
		this.createdDate = this.createdDate.bind(this);
		this.lastLogin = this.lastLogin.bind(this);
		this.status = this.status.bind(this);
		this.userStatus = this.userStatus.bind(this);
		//this.getById = this.getById.bind(this);
		this.deletelink = this.deletelink.bind(this);
		this.showPreferences = this.showPreferences.bind(this);
	}


	commonsearchfield(dataval) {
		if (typeof dataval !== 'undefined') {
			return (<div> {dataval[0] ? dataval[0].city + ' ' + dataval[0].country : ''}</div>);
		}
	}
	componentWillMount() {
		this.props.dispatch(adminActions.getSubscribers());

	}
	componentDidMount() {
		setTimeout(() => {
			this.setState({ subscribers: this.props.subscribers });
		}, 1000);
	}

	deletelink(id) {
		return (
			<a href="javascript:void(0)" className="pl-1" onClick={() => {
				if (window.confirm("Are you sure you wish to delete this users?"))
					this.deleteUsers(id);
			}
			}><i className="fa fa-trash" aria-hidden="true"></i>
			</a>)
	}

	deletelink(id) {
		return (
			<a href="javascript:void(0)" className="pl-1" onClick={() => {
				if (window.confirm("Are you sure you wish to delete this users?"))
					this.deleteUsers(id);
			}
			}><i className="fa fa-trash" aria-hidden="true"></i>
			</a>)
	}

	deleteUsers(id) {
		this.props.dispatch(adminActions.deletesubscriber(id));
	}

	createdDate(createdOn) {
		var expDate = new moment(createdOn, "YYYY-MM-DD");
		var created = moment(expDate).format("DD-MM-YYYY");
		return created;
	}

	lastLogin(lastlogin) {
		var expDate = new moment(lastlogin, "YYYY-MM-DD");
		var lastlogin = moment(expDate).format("DD-MM-YYYY");
		return lastlogin;
	}

	userStatus(id) {
		this.props.dispatch(adminActions.subscriberStatus(id));
	}

	status(status, id) {
		if (status == "verified") {
			return (
				<a href="javascript:void(0)"
					onClick={() => {
						if (
							window.confirm("Are you sure you wish to unverified this users?")
						)
							this.userStatus(id);
					}}>
					<i className="fa status-active fa-dot-circle-o text-success" aria-hidden="true" ></i>
				</a>
			);
		}
		else {
			return (
				<a
					href="javascript:void(0)"
					onClick={() => {
						if (window.confirm("Are you sure you wish to verified this users?"))
							this.userStatus(id);
					}} >
					<i className="fa status-active fa-dot-circle-o text-danger" aria-hidden="true" ></i>
				</a>
			);
		}
	}

	// getById(id) {
	// 	if (this.props.subscribers) {
	// 		var filteredEmployee = this.props.subscribers.filter(item => {
	// 			return item._id == id;
	// 		});
	// 		if (filteredEmployee.length > 0) {
	// 			this.setState({
	// 				profile: filteredEmployee[0]
	// 			});
	// 		}
	// 	}
	// }


	render() {
		var { totaldata, caddata } = this.prepareTable();
		console.log('totaldata   ', totaldata)
		return (
			<main className="col-xs-12 col-sm-8 col-lg-9 col-xl-10 pt-3 pl-4 ml-auto">
				<h3 className="admin-title">  Subscribers</h3>
				<section className="row">
					<div className="col-sm-12">
						<section className="row">
							<div className="col-12">
								<MDBDataTable
									striped
									hover
									responsive
									bordered
									data={caddata} />
							</div>
						</section>
					</div>
				</section>
				{this.renderPrefrencesModal()}
			</main>
		);
	}
	showPreferences(e, id) {
		this.props.dispatch(subscriberActions.getSubscriberPreferences(id));
		this.handleShow();
	}
	prepareTable() {
		if (this.props.subscribers && this.props.subscribers.length > 0) {
			var totaldata = [];
			for (var cad = 0; cad <= this.props.subscribers.length - 1; cad++) {
				var subscriber = this.props.subscribers[cad];
				totaldata.push({
					name: subscriber.name,
					email: subscriber.email ? subscriber.email : "--",
					phone: subscriber.phone,
					city: subscriber.city,
					state: subscriber.state,
					subscribedon: this.createdDate(subscriber.createdOn),
					prefrences: (
						<a href="javascript:void(0)" className="pb-2 pr-2 pl-0" onClick={(event) => this.showPreferences(event, subscriber._id)} data-target="#intro">
							<span className="fa fa-settings"> View Prefrences</span>
						</a>
					),
					actions: (
						<span> {this.deletelink(subscriber._id)} </span>
					)
					// status: (this.status(subscriber.status, subscriber._id))
				});
			}
		}
		const caddata = {
			columns: common.subscribercolumns,
			rows: totaldata
		};
		return { totaldata, caddata };
	}

	handleClose() {
		this.setState({ show: false });
	}
	handleShow() {
		this.setState({ show: true });
	}
	renderPrefrencesModal() {
		const { show, subscriberPreferences } = this.state;
		console.log("subscriberPreferences", subscriberPreferences)

		return (
			<Modal dialogClassName="h-100" show={show} onHide={this.handleClose} size="lg">
				<Modal.Header closeButton>
					<h4 className="modal-title">Prefrences</h4>
				</Modal.Header>
				<Modal.Body >
					<div className="row">
						{
							subscriberPreferences != null ? (
								<React.Fragment>
									<div className="col-md-6">
										<ul className="list-group">
											<li className="list-group-item no-border no-padding"><h5>Mail Lists</h5></li>
											{
												subscriberPreferences.mailingLists.map((mail) => (
													<li className="list-group-item no-border no-padding" key={mail.id}>
														<span className="">
															{mail.name}
														</span>
													</li>
												))
											}
											<li className="list-group-item no-border no-padding">
												<br></br>
											</li>
										</ul>
									</div>
									<div className="col-md-6">
										<ul className="list-group">
											<li className="list-group-item no-border no-padding"><h5>Property Types</h5></li>
											{
												subscriberPreferences.propertyTypes.map((propertytype) => (
													<li className="list-group-item no-border no-padding" key={propertytype}>
														<span className="">
															{propertytype}
														</span>
													</li>
												))
											}
											<li className="list-group-item no-border no-padding">
												<br></br>
											</li>
										</ul>
									</div>
									<div className="col-md-6">
										<ul className="list-group">
											<li className="list-group-item no-border no-padding"><h5>Agent Types</h5></li>
											{
												subscriberPreferences.agentTypes.map((agetntype) => (
													<li className="list-group-item no-border no-padding" key={agetntype}>
														<span className="">
															{agetntype}
														</span>
													</li>
												))
											}
											<li className="list-group-item no-border no-padding">
												<br></br>
											</li>
										</ul>
									</div>
									<div className="col-md-6">
										<ul className="list-group">
											<li className="list-group-item no-border no-padding"><h5>Price Points</h5></li>
											{
												subscriberPreferences.priceRanges.map((pricepoint) => (
													<li className="list-group-item no-border no-padding" key={pricepoint.text}>
														<span className="">
															{pricepoint.text}
														</span>
													</li>
												))
											}
											<li className="list-group-item no-border no-padding">
												<br></br>
											</li>
										</ul>
									</div>
									<div className="col-md-6">
										<ul className="list-group">
											<li className="list-group-item no-border no-padding"><h5>Others</h5></li>
											<li className="list-group-item no-border no-padding" >
												<span className="">
													Include Outside Area Properties :	{subscriberPreferences.includeOutsideAreaProperties ? "Yes" : "No"}
												</span>
											</li>
											<li className="list-group-item no-border no-padding" >
												<span className="">
													Include Rented Properties :	{subscriberPreferences.includeRentedProperties ? "Yes" : "No"}
												</span>
											</li>
										</ul>
									</div>
								</React.Fragment>
							) : null
						}
					</div>
				</Modal.Body>
			</Modal>
		)
	};
	componentWillReceiveProps(props) {
		console.log("proooops", props);
		const { subscribers, subscriberPreferences } = props;
		this.setState({ subscribers, subscriberPreferences })
	}
}

function mapStateToProps(state) {
	console.log("mapState====", state);
	const { admins } = state;
	const { subscribers, subscriberPreferences } = admins;
	return {
		subscribers,
		subscriberPreferences
	};
}

const connectedCandidatePage = connect(mapStateToProps)(SubscriberPage);
export { connectedCandidatePage as SubscriberPage };
