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
    //  this.stateSettingsForTabs = this.stateSettingsForTabs.bind(this);
  }
  resetState() {
    console.log("Resetting State");
    this.setState(this.newState())
  }
  newState() {
    console.log("New State............");
    return {
      blast_id: '',
      profile: {},
      moveTab: "blast",
      blast: null,
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
  getBlast(id) {
    this.props.dispatch(userActions.getBlast(id));
  }
  componentDidMount() {
    const { location } = this.props;
    if (location.savedProps && location.savedProps.blast_id) {
      this.getBlast(location.savedProps.blast_id);
      this.moveTab(location.savedProps.moveTab);
    } else {
      this.resetState();
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log("nextProps Create Flyer Page", nextProps);
    if (nextProps.blast && nextProps.blast.blast) {
      let confugredBlast = nextProps.blast.blast;
      confugredBlast["template"] = nextProps.blast.template;
      confugredBlast["properties"] = nextProps.blast.properties;
      this.setState({ blast: confugredBlast });
    }
    if (nextProps.tab) {
      this.moveTab(nextProps.tab);
    }
  }

  moveTab(tab) {
    let { moveTab, tabs } = this.state;
    moveTab = tab;
    tabs[tab] = false;
    this.setState({ tabs, moveTab });
    window.scrollTo(0, 0);
  }

  setKey(tab) {
    this.setState({ moveTab: tab });
  }

  render() {
    const { blast, moveTab, previewHtml, previewData, tabs, blastsettingData, dataBaseData, profile } = this.state;
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
                    <Tabs id="tab-example"
                      activeKey={moveTab}
                      onSelect={(tab) => this.setKey(tab)}>
                      <Tab eventKey="blast" title="Blast Type">
                        <BlastTab dispatchval={this.dispatchval}
                          blastId={blast && blast._id}
                          activeTab={moveTab}
                        />
                      </Tab>

                      <Tab eventKey="designTemplateTab" title="Design Template" disabled={tabs.designTemplateTab ? true : false}>
                        <AgentTemplateTab
                         activeTab={moveTab}
                          dispatchval={this.dispatchval}
                          blastId={blast && blast._id}
                          templateId={blast && blast.selected_template_id}
                        />
                      </Tab>

                      <Tab eventKey="property" title="Property Details" disabled={tabs.property ? true : false}>
                        {blast && blast.template &&
                          (blast.template.template_type == "UploadBlast" ||
                            blast.template.template_type == "UploadYourOwnBlast") ? (
                            <UploadBlastTab
                             activeTab={moveTab}
                              dispatchval={this.dispatchval}
                              properties={blast.properties}
                              blast_id={blast && blast._id}
                              moveTab={this.moveTab}
                            />
                          ) : (
                            <PropertyTab
                             activeTab={moveTab}
                              dispatchval={this.dispatchval}
                              properties={blast && blast.properties}
                              blastId={blast && blast._id}
                              template={blast && blast.template}
                              profile={profile}
                              agentData={(blast && blast.agentData) || this.props.agentData}
                            />
                          )}
                      </Tab>
                      {blast && blast.template &&
                        (blast.template.template_type == "UploadBlast" ||
                          blast.template.template_type == "UploadYourOwnBlast") ? null : (
                          <Tab eventKey="photo" title="Photos" disabled={tabs.photo ? true : false}>
                            <PhotoTab dispatchval={this.dispatchval}
                              template={blast && blast && blast.template}
                              previewData={previewData}
                              activeTab={moveTab}
                              properties={blast && blast.properties}
                              blast_id={blast && blast._id}
                              moveTab={this.moveTab} />
                          </Tab>
                        )}


                      <Tab eventKey="preview" title="Preview" disabled={tabs.preview ? true : false}>
                        <PreviewTab
                          dispatchval={this.dispatchval}
                          previewHtml={previewHtml}
                          blast_id={blast && blast._id}
                          activeTab={moveTab}
                          moveTab={this.moveTab}
                        />
                      </Tab>


                      <Tab eventKey="selectdatabase" title="Select Database" disabled={tabs.selectdatabase ? true : false}>
                        <DatabaseTab dispatchval={this.dispatchval}
                          blast_id={blast && blast._id}
                          activeTab={moveTab}
                          associations={blast && blast.associations} />
                      </Tab>
                      <Tab eventKey="setDate" title="Set Date" disabled={tabs.setDate ? true : false}>
                        <SetDateTab dispatchval={this.dispatchval}
                         activeTab={moveTab}
                        />
                      </Tab>
                      <Tab eventKey="terms" title="Terms & Condition" disabled={tabs.terms ? true : false}>
                        <TermsTab dispatchval={this.dispatchval}  activeTab={moveTab} />
                      </Tab>
                      <Tab eventKey="payment" title="Payment" disabled={tabs.payment ? true : false}>
                        <PaymentTab dispatchval={this.dispatchval} dataBaseData={dataBaseData}
                         activeTab={moveTab}
                          blastsettingData={blastsettingData} scheduledDate={blast && blast.scheduledDate}
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
  const { alert, users, agentData } = state;
  const { profile } = users;
  const { blast } = users;
  const { imageData } = users;
  const { scheduledDate } = users;
  const { blastsettingData } = users;
  const { dataBaseData, tab } = users;
  return {
    alert,
    tab,
    users,
    profile,
    agentData: users.agentData,
    imageData,
    defaultAgent: agentData,
    scheduledDate,
    blast,
    blastsettingData,
    dataBaseData
  };
}

const connectedCreateFlyerPage = connect(mapStateToProps)(CreateFlyerPage);
export { connectedCreateFlyerPage as CreateFlyerPage };
