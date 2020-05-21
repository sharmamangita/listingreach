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
class FlyersPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
  const { dispatch } = this.props;
 // this.props.dispatch(userActions.getapagecontent({page:'About Us'})); 
  window.scrollTo(0,0);
 //$('#example').DataTable();
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
				<h3 className="title-d">Saved Flyers</h3>
				</div>
				</div>
			</section>
			<section className="news-grid grid">
				<div className="container">
					<table id="example" className="table table-striped table-bordered" style={{width:"100%"}}>
						<thead>
							<tr>
								<th>Flyer ID</th>
								<th>Subject</th>
								<th>Value</th>
								<th>Created On</th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							<tr>
							<td><Link to="CreateFlyerPage">LR001</Link></td>
							<td>Residential Property</td>
							<td>$90</td>
							<td>04/29/2020</td>
							<td>Draft</td>
							<td><Link to="CreateFlyerPage" title="Complete Your Order"><i className="fa fa-edit"></i></Link> &nbsp; &nbsp;<i className="fa fa-trash" aria-hidden="true" title="Delete Flyer"></i></td>
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

const connectedFlyersPage = connect(mapStateToProps)(FlyersPage);
export { connectedFlyersPage as FlyersPage };
