import React from "react";
import { connect } from "react-redux";
import ListingSubmenu from "../../components/ListingSubmenu";
import BlastTab from "../../components/BlastTab";
import AgentTemplateTab from "../../components/AgentTemplateTab";
import PropertyTab from "../../components/PropertyTab";
import PhotoTab from "../../components/PhotoTab";
import PreviewTab from "../../components/PreviewTab";
import DatabaseTab from "../../components/DatabaseTab.jsx";
import SetDateTab from "../../components/SetDateTab";
import TermsTab from "../../components/TermsTab";
import PaymentTab from "../../components/PaymentTab";
import UploadBlastTab from "../../components/UploadBlastTab";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import { userActions } from "../../actions";

const Entities = require("html-entities").XmlEntities;

class CreateFlyerPage extends React.Component {
  constructor(props) {
    super(props);

    this.dispatchval = {
      className: "",
      children: null,
      dispatch: this.props
    };


    this.state = this.newState();

    this.moveTab = this.moveTab.bind(this);
    this.setKey = this.setKey.bind(this);
    this.stateSettingsForTabs = this.stateSettingsForTabs.bind(this);
  }
  resetState() {
    console("Resetting State");
    this.setState(this.newState())
  }
  newState() {
    return {
      blast_id: '',
      profile: {},
      moveTab: "blast",
      previewData: [],
      propertyImages: [],
      propertyData: "",
      uploadBlast: "",
      property_images: '',
      scheduledDate: "",
      blastsettingData: "",
      dataBaseData: "",
      previewHtml: '',
      tabs: {
        blast: false,
        designTemplateTab: true,
        property: true,
        photo: true,
        preview: true,
        uploadblastpreview: true,
        selectdatabase: true,
        setDate: true,
        terms: true,
        payment: true
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps Create Flyer Page", nextProps);
    if (this.state.blast_id == "" && this.state.moveTab != "blast") {
      this.setState(this.newState());
    }
    const { location } = nextProps;
    if (nextProps && nextProps.users && nextProps.users.tab) {
      let tab = nextProps.users.tab;
      this.moveTab(tab);
    }

    if (location && location.savedProps && location.savedProps.moveTab) {
      this.setState({ blast_id: location.savedProps.blast_id });

      if (location.savedProps.moveTab == "property" && this.state.blast_id == "") {
        this.stateSettingsForTabs(location.savedProps);
      }
    }

    if (
      (nextProps.users != undefined && nextProps.users.blastData) ||
      (nextProps.agentData != undefined && nextProps.agentData) ||
      (nextProps.profile != undefined && nextProps.profile) ||
      (nextProps.imageData != undefined && nextProps.imageData) ||
      (nextProps.propertyImages != undefined && nextProps.propertyImages)
    ) {
      this.stateSettingsForTabs(nextProps.users);
    }
  }



  stateSettingsForTabs(nextProps) {
    if (nextProps.blastData != undefined && nextProps.blastData) {
      let blast = {};
      blast.blastData = nextProps.blastData.data;
      //  console.log("blast Dtaa ",blast);
      this.setState({ propertyData: blast, uploadBlast: blast, blast_id: nextProps.blastData.data._id, scheduledDate: nextProps.scheduledDate, blastsettingData: nextProps.blastsettingData, dataBaseData: nextProps.dataBaseData });
      //previewData:nextProps.propertyData
    }

    if (nextProps.moveTab != undefined && nextProps.moveTab) {
      let blast = {};
      blast.blast_id = nextProps.blast_id;
      blast.templateId = nextProps.templateId;
      this.setState({ moveTab: nextProps.moveTab, propertyData: blast, blast_id: nextProps.blast_id });
      const { dispatch } = this.props;
      dispatch(userActions.getTemplateOrPropertydata(nextProps.blast_id));
    }

    if (nextProps.propertyImages != undefined && nextProps.propertyImages) {
      //console.log("nextProps.propertyImages.data======",nextProps.propertyImages);
      this.setState({ previewData: nextProps.propertyImages.data, propertyImages: nextProps.propertyImages.data });
    }

    if (nextProps.templateName != undefined && nextProps.templateName) {
      let template = {};
      template.templateData = nextProps.templateName.data;
      this.setState({ propertyData: template });
    }
    if (nextProps.agentData != undefined && nextProps.agentData) {
      this.setState({ agentData: nextProps.agentData });
    }
    if (nextProps.propertyData != undefined && nextProps.propertyData) {
      this.setState({ previewData: nextProps.propertyData });
    }

    if (nextProps.previewHtml) {
      this.setState({ previewHtml: nextProps.previewHtml });
    }

  }

  moveTab(tab) {
    let { moveTab, tabs } = this.state;
    moveTab = tab;
    tabs[tab] = false;
    this.setState({ tabs, moveTab });
  }

  setKey(tab) {
    this.setState({ moveTab: tab });
  }

  render() {
    const { moveTab, previewHtml, previewData, propertyData, uploadBlast, tabs, blast_id, propertyImages, scheduledDate, blastsettingData, dataBaseData, profile, agentData } = this.state;
    console.log("State in create flayer render :", this.state);
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
                    <Tabs
                      id="tab-example"
                      activeKey={moveTab}
                      onSelect={(tab) => this.setKey(tab)}
                    >
                      <Tab eventKey="blast" title="Blast Type">
                        <BlastTab dispatchval={this.dispatchval} />
                      </Tab>

                      <Tab eventKey="designTemplateTab" title="Design Template" disabled={tabs.designTemplateTab ? true : false}>
                        <AgentTemplateTab
                          dispatchval={this.dispatchval}
                          blastType={uploadBlast}
                        />
                      </Tab>

                      <Tab eventKey="property" title="Property Details" disabled={tabs.property ? true : false}>
                        {(propertyData &&
                          propertyData.templateData &&
                          propertyData.templateData.template_type ==
                          "UploadBlast") ||
                          (propertyData &&
                            propertyData.templateData &&
                            propertyData.templateData.template_type ==
                            "UploadYourOwnBlast") ? (
                            <UploadBlastTab
                              dispatchval={this.dispatchval}
                              propertyData={propertyData}
                              blast_id={blast_id}
                              uploadBlast={uploadBlast}
                              moveTab={this.moveTab}
                              saveBlastData={users && users.saveBlastData != undefined && users.saveBlastData}
                            />
                          ) : (
                            <PropertyTab
                              dispatchval={this.dispatchval}
                              propertyData={propertyData}
                              blast_id={blast_id}
                              profile={profile}
                              agentData={agentData}
                              saveBlastData={users && users.saveBlastData != undefined && users.saveBlastData}
                            />
                          )}
                      </Tab>
                      {(propertyData &&
                        propertyData.templateData &&
                        propertyData.templateData.template_type ==
                        "UploadBlast") ||
                        (propertyData &&
                          propertyData.templateData &&
                          propertyData.templateData.template_type ==
                          "UploadYourOwnBlast") ? null : (
                          <Tab eventKey="photo" title="Photos" disabled={tabs.photo ? true : false}>
                            <PhotoTab dispatchval={this.dispatchval}
                              template={propertyData.templateData}
                              previewData={previewData}
                              blast_id={blast_id}
                              moveTab={this.moveTab} />
                          </Tab>
                        )}


                      <Tab eventKey="preview" title="Preview" disabled={tabs.preview ? true : false}>
                        <PreviewTab
                          dispatchval={this.dispatchval}
                          previewHtml={previewHtml}
                          propertyImages={propertyImages}
                          blast_id={blast_id}
                        />
                      </Tab>


                      <Tab eventKey="selectdatabase" title="Select Database" disabled={tabs.selectdatabase ? true : false}>
                        <DatabaseTab dispatchval={this.dispatchval}
                          blast_id={blast_id} />
                      </Tab>
                      <Tab eventKey="setDate" title="Set Date" disabled={tabs.setDate ? true : false}>
                        <SetDateTab dispatchval={this.dispatchval} uploadBlast={uploadBlast} />
                      </Tab>
                      <Tab eventKey="terms" title="Terms & Condition" disabled={tabs.terms ? true : false}>
                        <TermsTab dispatchval={this.dispatchval} />
                      </Tab>
                      <Tab eventKey="payment" title="Payment" disabled={tabs.payment ? true : false}>
                        <PaymentTab dispatchval={this.dispatchval} dataBaseData={dataBaseData}
                          blastsettingData={blastsettingData} scheduledDate={scheduledDate}
                          resetState={this.resetState} />
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
  const { scheduledDate } = users;
  const { blastsettingData } = users;
  const { dataBaseData } = users;
  //console.log("imageData===scheduledDate=", state);
  return {
    alert,
    users,
    profile,
    agentData,
    imageData,
    scheduledDate,
    blastsettingData,
    dataBaseData
  };
}

const connectedCreateFlyerPage = connect(mapStateToProps)(CreateFlyerPage);
export { connectedCreateFlyerPage as CreateFlyerPage };
