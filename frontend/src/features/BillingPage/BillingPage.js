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
const entities = new Entities();
class BillingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
  const { dispatch } = this.props;
 // this.props.dispatch(userActions.getapagecontent({page:'About Us'})); 
  window.scrollTo(0,0);
  $('#example').DataTable();
  }

  render() {
	  if(this.props.users && this.props.users.items){
		  console.log("test",this.props.users);
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
						</thead>
						<tbody>
							<tr>
								<td>LR001</td>
								<td>04/29/2020</td>
								<td>$90</td>
								<td>Email Sent</td>
							</tr>   
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
  return {
    alert,
    users
  };
}

const connectedBillingPage = connect(mapStateToProps)(BillingPage);
export { connectedBillingPage as BillingPage };
