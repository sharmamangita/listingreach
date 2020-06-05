import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import config from "config";
import { Alert } from "reactstrap";
import ListingSubmenu from '../../components/ListingSubmenu';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { userActions } from "../../actions";
const Entities = require('html-entities').XmlEntities;
import moment from "moment";
const entities = new Entities();
class BillingPage extends React.Component {
  constructor(props) {
	    super(props);
	    var user = JSON.parse(localStorage.getItem("user"));
	    this.props.dispatch(userActions.getPayment(user.userId));
	    this.state = {
	    	payment: Object.assign({
	        InvoiceId: '',
	        date: '',
	        amount: '',
	        status:'',
	      }, this.props.payment),
	    }
	    this.createdDate = this.createdDate.bind(this);
  	}
  	componentWillReceiveProps(nextProps) {
  		console.log("nextProps====",nextProps);
	    if ((nextProps.payment != undefined && nextProps.payment) ) {
	      this.propsDataupdate(nextProps.payment);
	    }
 	}
 	propsDataupdate(data) {
	    let states = Object.assign({}, this.state);
	    let propsData = data;
	    if ((propsData != undefined && propsData) ) {
	      states.payment = propsData;
	      this.setState({ payment: states.payment });
	    }
	}
  	componentDidMount(){
	  	const { dispatch } = this.props;
		 
	}
	createdDate(createdOn) {
   		var expDate = new moment(createdOn, "YYYY-MM-DD");
   		var created = moment(expDate).format("DD-MM-YYYY");
    		return created;
 	}
 	status(status){
 		if(status=='sent'){
 			return "Email Sent"

 		}else{
 			return "Email Not Sent";
 		}
 	}
  	render() {
  	const { submitted, submittedagent, user, payment } = this.state;
	console.log("paymentData====",payment);	
	console.log("length====",payment.length);	
  	if(this.props.users && this.props.users.items){
	  	if(this.props.users.items[0]){
		  var abouttitle = entities.decode(this.props.users.items[0].page);
		  var aboutpage = entities.decode(this.props.users.items[0].content);
		}
	}
	
    return (
		<div>
			<ListingSubmenu/>
			<section>
				<div className="container">
				<div className="title-box-d">
				<h3 className="title-d">My Billing</h3>
				</div>
				</div>
			</section>
			<section className="news-grid grid">
				<div className="container">
					<table id="example" className="table table-striped table-bordered" style={{width:"100%"}}>
						<thead>
							<tr>
								<th>Invoice ID</th>
								<th>Date</th>
								<th>Total</th>
								<th>Status</th>
							</tr>
							{
		                     payment && payment.length>0 && payment.map((payments) => (
		                            <tr>
										<td>{payments.invoice_id}</td>
										<td>{this.createdDate(payments.createdOn)}</td>
										<td>{payments.amount}</td>
										<td>{this.status(payments.status)}</td>
									</tr> 
								))
                          	}  
						</thead>
						<tbody>
						
						</tbody>       
					</table>
				</div>
			</section>
		</div>
    );
  } 
}

function mapStateToProps(state) {
  const { alert,users } = state;
  const { payment } = users;
  return {
    alert,
    users,
    payment
  };
}

const connectedBillingPage = connect(mapStateToProps)(BillingPage);
export { connectedBillingPage as BillingPage };
