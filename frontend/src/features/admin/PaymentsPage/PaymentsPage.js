import React from "react";
import { connect } from "react-redux";
import { common } from "../../../helpers";
import { adminActions } from "../../../actions";
import { userActions } from "../../../actions";
import moment from "moment";
import { MDBDataTable } from "mdbreact";
import UserProfileModal from "../../../components/UserProfileModal"
import Modal from 'react-bootstrap4-modal';
class PaymentsPage extends React.Component {
	constructor(props) {
		super(props);
		// reset login status
		this.state = {
			show: false,
			payments: this.props.payments,
			prefrences: {},
			totaldatacad: "",
			showModel:false
		};
		this.handleShow = this.handleShow.bind(this);
		this.createdDate = this.createdDate.bind(this);
		this.getById = this.getById.bind(this);
		this.hideModel= this.hideModel.bind(this);
		this.getEmailTemplate= this.getEmailTemplate.bind(this);
	}
	hideModel(){
		this.setState({showModel:false});
	}

	getEmailTemplate(id){
		this.props.dispatch(userActions.getPreviewhtml(id));
		this.setState({showModel:true});
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
		this.props.dispatch(adminActions.getPayments());
	}
	componentDidMount() {
	}


	createdDate(createdOn) {
		var expDate = new moment(createdOn, "YYYY-MM-DD");
		var created = moment(expDate).format("DD-MM-YYYY");
		return created;
	}
	
	getById(id) {
		if (this.props.payments) {
			var filteredEmployee = this.props.payments.filter(item => {
				return item._id == id;
			});
			if (filteredEmployee.length > 0) {
				this.setState({
					profile: filteredEmployee[0]
				});
			}
		}
	}


	
	
	render() {
		var { totaldata, caddata } = this.prepareTable();
		var { previewHtml }  = this.props;
		var {showModel}=this.state;
		return (
			<main className="col-xs-12 col-sm-8 col-lg-9 col-xl-10 pt-3 pl-4 ml-auto">
				<h3 className="admin-title">Payments</h3>
				
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
				<Modal visible={showModel} dialogClassName="modal-lg">
					{previewHtml && <Markup content={previewHtml} />}
		            <div className="modal-footer">
			          <button type="button" className="btn btn-secondary" onClick={this.hideModel}>
			            Cancel
			          </button>
		        </div>
		      </Modal>
			</main>
		);
	}

	prepareTable() {
		if (this.props.payments && this.props.payments.length > 0) {
			var totaldata = [];
			for (var cad = 0; cad <= this.props.payments.length - 1; cad++) {
				var payment = this.props.payments[cad];
				totaldata.push({
					payentId: payment.paymentID,
					paidOn: this.createdDate(payment.createdOn),
					amount: "$" + payment.amount,
					headline: "<Link to=''>"+payment.template && payment.template.length > 0 ? payment.template[0].headline : ""+"</Link>",
					agentName: payment.users && payment.users.length > 0 && payment.users[0] ? payment.users[0].firstName+' '+payment.users[0].lastName : "",
					email: payment.users && payment.users.length > 0 && payment.users[0] ? payment.users[0].email : "",
					company: payment.users && payment.users.length > 0 && payment.users[0] ? payment.users[0].companyName : "",
					sentOn: payment.blast && payment.blast.length > 0 ? this.createdDate(payment.blast[0].selected_template_date) : "",
				});
			}
		}
		const caddata = {
			columns: common.paymentcolumns,
			rows: totaldata
		};
		return { totaldata, caddata };
	}

	handleModalOpem() {

		return event => {
			var id = event.currentTarget.dataset.id;
			var filteredEmployee = this.props.payments.filter(item => {
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
	const { payments } = admins;
	const { previewHtml } = admins;
	console.log("payments====", payments);
	return {
		user,
		payments,
		previewHtml
	};
}

const connectedCandidatePage = connect(mapStateToProps)(PaymentsPage);
export { connectedCandidatePage as PaymentsPage };
