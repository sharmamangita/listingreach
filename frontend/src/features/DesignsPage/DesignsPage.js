import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import config from "config";
import { Alert } from "reactstrap";
import ListingSubmenu from "../../components/ListingSubmenu";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import { userActions } from "../../actions";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();
class DesignsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.props.dispatch(userActions.getapagecontent({ page: "About Us" }));
    window.scrollTo(0, 0);
  }

  render() {
    if (this.props.users && this.props.users.items) {
      console.log("test", this.props.users);
      if (this.props.users.items[0]) {
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
			<h3 className="title-d">Template Designs</h3>
			</div>
			</div>
		</section>
        <section className="contact">
    <div className="container">
      <div className="row">       
        <div className="col-sm-12 section-t2">
          <div className="row">
            <div className="col-md-12">
              <div className="col-xs-12">
                <h4>PropertyBlastHomes.com offers</h4>
                <ul>
                    <li>Single Property Templates featuring 1, 2, 3 or 4 property photos</li>
                    <li>Multi-Property Template featuring up to 4 properties in 1 flyer</li>
                    <li>Upload Your Own Flyer: Quickly upload your own flyer and insert a hyperlink into it too</li>
                    <li>Use Your Own HTML code: Do you have HTML code from a 3rd party piece of software? No Problem. Paste it in and you are ready to BLAST</li>
                </ul>
            </div>
			
            <div className="col-xs-12">
                <h4>Template Features</h4>
                <ul>
                    <li className="col-xs-12 col-md-6">Background Color Selection</li>
                    <li className="col-xs-12 col-md-6">Key Feature Bullet Points</li>
                    <li className="col-xs-12 col-md-6">Unlimited Property Description</li>
                    <li className="col-xs-12 col-md-6">Logo/Broker Photo Photo or Banner Style Available on Every Template</li>
                    <li className="col-xs-12 col-md-6">Header Text Color Selection</li>
                    <li className="col-xs-12 col-md-6">Links to Supporting Information</li>
                    <li className="col-xs-12 col-md-6">Agent Contact Information</li>
                    <li className="col-xs-12 col-md-6">Open House Feature</li>
                </ul>
            </div>
       <div className="row ">
            <div className="col-xs-12 col-md-6 text-center">
                <img src="public/assets/images/Template-1.png" alt="Single Photo Blast Sample" className="thumbnail img-responsive" style={{width: "95%"}} />
            </div>
            <div className="col-xs-12 col-md-6 text-center">
                <img src="public/assets/images/Template-2.png" alt="Two Photo Blast Sample" className="thumbnail img-responsive" style={{width: "95%"}} />
            </div>
        </div>
		 <div className="row mt-4">
            <div className="col-xs-12 col-md-6 text-center">
                <img src="public/assets/images/Template-3.png" alt="Single Photo Blast Sample" className="thumbnail img-responsive" style={{width: "95%"}} />
            </div>
            <div className="col-xs-12 col-md-6 text-center">
                <img src="public/assets/images/Template-4.png" alt="Two Photo Blast Sample" className="thumbnail img-responsive" style={{width: "95%"}} />
            </div>
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
  const { alert, users } = state;
  return {
    alert,
    users,
  };
}

const connectedDesignsPage = connect(mapStateToProps)(DesignsPage);
export { connectedDesignsPage as DesignsPage };
