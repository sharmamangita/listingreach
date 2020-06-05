import React from "react";
import { connect } from "react-redux";
import { common } from "../../../helpers";
import { adminActions } from "../../../actions";
import moment from "moment";
import { MDBDataTable } from "mdbreact";
import UserProfileModal from "../../../components/UserProfileModal"
import SubscriberPreferencesModal from "../../../components/SubscriberPreferencesModal";
class EmailBlastsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			blasts: this.props.blasts,
			prefrences: {},
			totalblasts: []
		};
		this.handleShow = this.handleShow.bind(this);
		this.deleteUsers = this.deleteUsers.bind(this);
		this.createdDate = this.createdDate.bind(this);
		this.lastLogin = this.lastLogin.bind(this);
		this.sendBlast = this.sendBlast.bind(this);
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

	componentDidMount() {
		this.props.dispatch(adminActions.getBlasts());
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
		this.props.dispatch(adminActions.deleteusers(id));
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

	sendBlast(e, id) {
		this.props.dispatch(adminActions.sendBlast(id));
	}

	getById(id) {
		if (this.props.blasts) {
			var filteredEmployee = this.props.blasts.filter(item => {
				return item._id == id;
			});
			if (filteredEmployee.length > 0) {
				this.setState({
					profile: filteredEmployee[0]
				});
			}
		}
	}


	renderSubscriberPreferencesModal() {
		const dispatchval = {
			tagName: "span",
			className: "",
			children: null,
			dispatch: this.props
		};
		let modalClose = () => this.setState({ show: false, prefrences: {} });
		return (
			<SubscriberPreferencesModal
				dispatchval={dispatchval}
				prefrences={this.state.prefrences}
				users={this.state.user}
				visible={this.state.show}
				onClickBackdrop={modalClose}
				dialogClassName="modal-lg"
			/>
		);
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
				<h3 className="admin-title"> Paid Blasts</h3>
				{/* {this.renderSubscriberPreferencesModal()} */}
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
		if (this.props.blasts && this.props.blasts.length > 0) {
			var totaldata = [];
			for (var cad = 0; cad <= this.props.blasts.length - 1; cad++) {
				var blast = this.props.blasts[cad];
				totaldata.push({
					blasttype: blast.blast_type,
					headline: blast.template && blast.template.length > 0 ? blast.template[0].headline : "",
					agent: blast.agentData ? blast.agentData.name : "",
					email: blast.agentData ? blast.agentData.email : "",
					company: blast.agentData ? blast.agentData.company_details : "",
					createddate: blast.selected_template_date ? this.createdDate(blast.selected_template_date) : "",
					totalpaid: "$" + blast.payments.amount,
					paidon: this.createdDate(blast.payments.createdOn),
					actions: (
						<span> {this.deletelink(blast._id)} </span>
					),
					sentdate: (
						blast.sentOn ? this.createdDate(blast.sentOn) :
							<button className="btn btn-success" onClick={(event) => this.sendBlast(event, blast._id)} >
								Send
						</button>
					)
				});
			}
		}
		const caddata = {
			columns: common.blastscolumns,
			rows: totaldata
		};
		return { totaldata, caddata };
	}

	handleModalOpem() {

		return event => {
			var id = event.currentTarget.dataset.id;
			var filteredEmployee = this.props.blasts.filter(item => {
				return item.id == id;
			});
			if (filteredEmployee.length > 0) {
				this.setState({ show: true, profile: filteredEmployee[0] });
			}
		};
	}
	componentWillReceiveProps(props){
		this.setState({ blasts: props.blasts });
	}
}

function mapStateToProps(state) {
	const { authentication, admins } = state;
	const { user } = authentication;
	const { blasts } = admins;
	console.log("blasts====", blasts);
	return {
		user,
		blasts
	};
}

const connectedCandidatePage = connect(mapStateToProps)(EmailBlastsPage);
export { connectedCandidatePage as EmailBlastsPage };
