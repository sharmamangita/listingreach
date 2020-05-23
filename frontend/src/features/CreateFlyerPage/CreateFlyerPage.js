import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import { Alert } from "reactstrap";
import { render } from "react-dom";
import config from "config";
import { authHeader } from "../../helpers";
import ListingSubmenu from "../../components/ListingSubmenu";

import BlastTab from "../../components/BlastTab";
import AgentTemplateTab from "../../components/AgentTemplateTab";
import PropertyTab from "../../components/PropertyTab";
import PhotoTab from "../../components/PhotoTab";
import PreviewTab from "../../components/PreviewTab";
import DatabaseTab from "../../components/DatabaseTab";
import SetDateTab from "../../components/SetDateTab";
import TermsTab from "../../components/TermsTab";
import PaymentTab from "../../components/PaymentTab";
import MultiPreviewTab from "../../components/MultiPreviewTab";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import Moment from "react-moment";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import { userActions } from "../../actions";



const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

class CreateFlyerPage extends React.Component {
  constructor(props) {
    super(props);
    var user = JSON.parse(localStorage.getItem("user"));

    this.dispatchval = {
      className: "",
      children: null,
      dispatch: this.props,
    };

    this.state = {
       moveTab:'blast',
       previewData:'',
       propertyData:''
    };

    this.moveTab = this.moveTab.bind(this);
    this.setKey = this.setKey.bind(this);
    this.stateSettingsForTabs = this.stateSettingsForTabs.bind(this);
    
  }


  componentDidMount() {
     var user = JSON.parse(localStorage.getItem("user"));
     if(user && user.userId){
      const { dispatch } = this.props;
      dispatch(userActions.getTemplateOrPropertydata(user.userId))
          //window.scrollTo(0, 0);
     }

  }
 componentWillReceiveProps(nextProps) {
    console.log("nextProps==tetetete==",nextProps);  
     if(nextProps && nextProps.users && nextProps.users.tab){
         let tab = nextProps.users.tab;
         this.moveTab(tab)
     }

     if((nextProps.users!=undefined && nextProps.users.blastData ) || (nextProps.agentData!=undefined && nextProps.agentData) || (nextProps.profile!=undefined && nextProps.profile) || nextProps.imageData!=undefined &&  nextProps.imageData){
            this.stateSettingsForTabs(nextProps.users);
      }
 }

 stateSettingsForTabs(nextProps){
   if(nextProps.blastData!=undefined && nextProps.blastData){
     let blast={};
      blast.blastData = nextProps.blastData.data;
     this.setState({propertyData:blast}); 
     //previewData:nextProps.propertyData  
   }
   if(nextProps.templateName!=undefined && nextProps.templateName){
     let template={};
       template.templateData=nextProps.templateName.data;
     this.setState({propertyData:template});   
   }

   if(nextProps.propertyData!=undefined && nextProps.propertyData){
     this.setState({previewData:nextProps.propertyData});   
   }

 }

moveTab(tab){
  this.setState({moveTab:tab});
}

setKey(tab){
  this.setState({moveTab:tab});
}

  render() {
    const {
      moveTab,
      previewData,
      propertyData
    } = this.state;
    console.log("previewData=====",previewData);
    const { users } = this.props;
    return (
      <div>
        <ListingSubmenu />
        <section>
          <div className="container">
            <div className="title-box-d">
              <h3 className="title-d">Create Blast</h3>
            </div>
          </div>
        </section>
        <section className="news-grid grid">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 section-t2">
                <div className="w-100 pt-3">
                  <div className="scroller scroller-left float-left mt-2">
                    <i className="fa fa-chevron-left"></i>
                  </div>
                  <div className="scroller scroller-right float-right mt-2">
                    <i className="fa fa-chevron-right"></i>
                  </div>

                  <div className="tabs-falyer">
                    <Tabs id="tab-example" activeKey={moveTab}
                      onSelect={(tab) => this.setKey(tab)}>
                      <Tab eventKey="blast" title="Blast Type">
                        <BlastTab dispatchval={this.dispatchval} />
                      </Tab>
                      <Tab eventKey="designTemplateTab" title="Design Template">
                        <AgentTemplateTab dispatchval={this.dispatchval} />
                      </Tab>
                      <Tab eventKey="property" title="Property Details">
                        <PropertyTab dispatchval={this.dispatchval} propertyData={propertyData} />
                      </Tab>
                      <Tab eventKey="photo" title="Photos">
                        <PhotoTab dispatchval={this.dispatchval} />
                      </Tab>
                      <Tab eventKey="preview" title="Preview">
                      {previewData && previewData[0] && previewData[0].templates &&
                       previewData[0].templates[0] && previewData[0].templates[0].template_type=="MultipleProperties" ?
                        <MultiPreviewTab dispatchval={this.dispatchval} previewData={previewData} />
                        : 
                        <PreviewTab dispatchval={this.dispatchval} previewData={previewData} />
                      }
                        
                      </Tab>
                      <Tab eventKey="selectdatabase" title="Select Database">
                        <DatabaseTab dispatchval={this.dispatchval} />
                      </Tab>
                      <Tab eventKey="setDate" title="Set Date">
                        <SetDateTab dispatchval={this.dispatchval} />
                      </Tab>
                      <Tab eventKey="terms" title="Terms & Condition">
                        <TermsTab dispatchval={this.dispatchval} />
                      </Tab>
                      <Tab eventKey="payment" title="Payment">
                        <PaymentTab dispatchval={this.dispatchval} />
                      </Tab>
                    </Tabs>
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
  const { profile } = users;
  const { agentData } = users;
  const { imageData } = users;
  console.log("imageData===eeee=", imageData);
  return {
    alert,
    users,
    profile,
    agentData,
    imageData,
  };
}

const connectedCreateFlyerPage = connect(mapStateToProps)(CreateFlyerPage);
export { connectedCreateFlyerPage as CreateFlyerPage };
