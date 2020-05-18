import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import config from "config";
import { Alert } from "reactstrap";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { userActions } from "../../actions";
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
class RefundPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
  const { dispatch } = this.props;
  //this.props.dispatch(userActions.getapagecontent({page:'Privacy'})); 
  window.scrollTo(0,0);
  }

  render() {
	  if(this.props.users && this.props.users.items){
		  console.log("test",this.props.users);
       if(this.props.users.items[0]){
		  var privacytitle = entities.decode(this.props.users.items[0].page);
		  var privacypage = entities.decode(this.props.users.items[0].content);
		  }
    }
    return (
		<div>
			<section className="intro-single">
				<div className="container">
				  <div className="row">
					<div className="col-md-12 col-lg-8">
					  <div className="title-single-box">
						<h1 className="title-single">Refund Policy</h1> 
					<span className="color-text-a"></span>	
					  </div>
					</div>
					<div className="col-md-12 col-lg-4">
					  <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
						<ol className="breadcrumb">
						  <li className="breadcrumb-item">
							<a href="index.html">Home</a>
						  </li>
						  <li className="breadcrumb-item active" aria-current="page">
							Refund Policy
						  </li>
						</ol>
					  </nav>
					</div>
				  </div>
				</div>
			</section>
			<section className="contact">
				<div className="container">
				  <div className="row">       
					<div className="col-sm-12 section-t2">
					  <div className="row">
            <div className="col-md-12">
             
			  <div className="col-xs-10 col-xs-offset-1">
        <p>ListingReach.com does not issue refunds for the following conditions</p>
        <ol>
            <li>ListingReach.com does not issue refunds or credits for customer errors. Electronic proofs are provided in advance of member/user distribution. It is your responsibility to review your proof for accuracy prior to distribution.</li>
            <li>In the event that ListingReach.com makes an error while fulfilling an order, it will resend the order at no charge. ListingReach.com may also issue credits for future purchases but no refunds will be given.</li>
        </ol>
        <br />
        <p>We reserve the right to refuse any advertisement we believe is incompatible with our mission. Full refunds will be issued under the following conditions:</p>
        <ol>
            <li>If the content is found unsuitable for broadcast, we will inform you to remove the objectionable content. In case you do not make suitable changes, we will cancel your order and issue a full refund to you.</li>
            <li>If we find that the content is illegible and too difficult to read, the email blast will be refused and a refund will be issued.</li>
            <li>If content is deemed to be of a competitive nature to ListingReach.com and its affiliates, the email blast will be refused and a refund will be issued.</li>
            <li>If the service is not 100% dedicated to the business of facilitating real estate brokerage, the email blast will be refused and a refund will be issued.</li>
        </ol>
        <br />
        <p>ListingReach.com and its affiliates will not accept advertising that, in our sole opinion, is not in good taste. We will not permit the placement of</p>
        <ul>
            <li>advertising for illegal or objectionable products or services</li>
            <li>or advertising that is offensive to any individual or group of individuals based on age, color, national origin, race, religion, sex, sexual orientation, or handicap.</li>
        </ul>
        <h4>Disclaimer of Warranties</h4>
        <p>The site is provided by ListingReach.com on an 'as is' and on an 'as available' basis.  To the fullest extent permitted by applicable law, ListingReach.com makes no representations or warranties of any kind, express or implied, regarding the use or the results of this web site in terms of its correctness, accuracy, reliability, or otherwise.  ListingReach.com shall have no liability for any interruptions in the use of this Website.  ListingReach.com disclaims all warranties with regard to the information provided, including the implied warranties of merchantability and fitness for a particular purpose, and non-infringement.</p>
    </div>
            </div>
           
          </div>
					</div>
				  </div>
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

const connectedRefundPage = connect(mapStateToProps)(RefundPage);
export { connectedRefundPage as RefundPage };
