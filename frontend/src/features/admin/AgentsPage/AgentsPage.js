import React from "react";
import { connect } from "react-redux";
import { common } from "../../../helpers";
import { adminActions } from "../../../actions";
import moment from "moment";
import { MDBDataTable } from "mdbreact";
import UserProfileModal from "../../../components/UserProfileModal"
class AgentsPage extends React.Component {
	constructor(props) {
		super(props);
		// reset login status
		this.state = {
			show: false,
			agents: this.props.agents,
			profile: "",
			totaldatacad: ""
		};
		this.handleShow = this.handleShow.bind(this);
		this.deleteUsers = this.deleteUsers.bind(this);
		this.deleteAgents = this.deleteAgents.bind(this);
		this.createdDate = this.createdDate.bind(this);
		this.lastLogin = this.lastLogin.bind(this);
		this.status = this.status.bind(this);
		this.userStatus = this.userStatus.bind(this);
		this.getById = this.getById.bind(this);
		this.deletelink = this.deletelink.bind(this);
	}

	handleShow() {
		this.setState({
			show: true,
			profile: this.props
		});
	}

	commonsearchfield(dataval) {
		if (typeof dataval !== 'undefined') {
			return (<div> {dataval[0] ? dataval[0].city + ' ' + dataval[0].country : ''}</div>);
		}
	}
	componentWillMount() {
		this.props.dispatch(adminActions.getAgents());

	}
	componentDidMount() {
		setTimeout(() => {
			this.setState({ agents: this.props.agents });
			console.log('state.............', this.state);
		}, 1000);
	}

	deletelink(id) {
		return (
			<a href="javascript:void(0)" className="pl-1" onClick={() => {
				if (window.confirm("Are you sure you wish to delete this users?"))
					this.deleteAgents(id);
			}
			}><i className="fa fa-trash" aria-hidden="true"></i>
			</a>)
	}

	deleteUsers(id) {
		this.props.dispatch(adminActions.deleteusers(id));
	}
	deleteAgents(id) {
		this.props.dispatch(adminActions.deleteagents(id));
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
		this.props.dispatch(adminActions.userStatus(id));
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

	getById(id) {
		if (this.props.agents) {
			var filteredEmployee = this.props.agents.filter(item => {
				return item._id == id;
			});
			if (filteredEmployee.length > 0) {
				this.setState({
					profile: filteredEmployee[0]
				});
			}
		}
	}

	renderUserProfileModal() {
		const dispatchval = {
			tagName: "span",
			className: "",
			children: null,
			dispatch: this.props
		};
		let modalClose = () => this.setState({ show: false, profile: "" });
		return (
			<UserProfileModal
				dispatchval={dispatchval}
				profile={this.state.profile}
				users={this.state.user}
				visible={this.state.show}
				onClickBackdrop={modalClose}
				dialogClassName="modal-lg"
			/>
		);
	}
	render() {
		
		var { totaldata, caddata } = this.prepareTable();
		console.log('totaldata   ', totaldata)
		return (
			<main className="col-xs-12 col-sm-8 col-lg-9 col-xl-10 pt-3 pl-4 ml-auto">
				<h3 className="admin-title">  Agents</h3>
				{this.renderUserProfileModal()}
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
			</main>
		);
	}

	prepareTable() {
		if (this.props.agents && this.props.agents.length > 0) {
			var totaldata = [];
			for (var cad = 0; cad <= this.props.agents.length - 1; cad++) {
				var agent = this.props.agents[cad];
				totaldata.push({
					name: agent.firstName ? agent.firstName + ' ' + agent.lastName : "--",
					email: agent.email ? agent.email : "--",
					company: agent.company,
					blastssent: agent.totalBlsts,
					totalpaid: agent.totalPaid,
					registered: this.createdDate(agent.registeredOn),
					actions: (<span>
						{/* <a href="javascript:void(0)" className="pb-2 pr-2 pl-0" data-toggle="modal" data-id={cadporps.id} onClick={this.handleModalOpem()} data-target="#intro">
							<span className="fa fa-edit"></span>
						</a> */}
						{this.deletelink(agent._id)}
					</span>),
					status: (this.status(agent.status, agent._id))
				});
			}
		}
		const caddata = {
			columns: common.agentcolumns,
			rows: totaldata
		};
		return { totaldata, caddata };
	}

	handleModalOpem() {

		return event => {
			var id = event.currentTarget.dataset.id;
			var filteredEmployee = this.props.agents.filter(item => {
				return item.id == id;
			});
			if (filteredEmployee.length > 0) {
				this.setState({ show: true, profile: filteredEmployee[0] });
			}
		};
	}
}

function mapStateToProps(state) {
	const { authentication, admins } = state;
	const { user } = authentication;
	const { agents } = admins;
	console.log("agents====", agents);
	return {
		user,
		agents
	};
}

const connectedCandidatePage = connect(mapStateToProps)(AgentsPage);
export { connectedCandidatePage as AgentsPage };
