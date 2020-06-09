import React from "react";
import { userActions } from "../actions";
import { Markup } from 'interweave';

class PreviewTab extends React.Component {
  constructor(props) {
    super(props);
    this.navId = "";
    this.state = {
      email: "",
      submitted: '',
      previewHtml: null
    };


    this.handleChangepreview = this.handleChangepreview.bind(this);
    this.handleSubmitPreviw = this.handleSubmitPreviw.bind(this);
    this.nexttab = this.nexttab.bind(this);

  }
  handleChangepreview(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmitPreviw(e) {
    e.preventDefault();
    const { blast_id } = this.props;
    const { email } = this.state;
    const { dispatch } = this.props.dispatchval.dispatch;
    if (email && blast_id) {
      dispatch(userActions.emailPreviewTemplate(email, blast_id));
      window.scrollTo(0, 0);
      this.setState({
        email: "",
        submitted: false,
      });
      this.setState({ visible: true }, () => {
        window.setTimeout(() => {
          this.setState({ visible: false });
        }, 5000);
      });
    } else {
      this.setState({
        submitted: true,
      });
      //alert("Please fill all required fields.");
    }
  }

  nexttab() {
    const { dispatch } = this.props.dispatchval.dispatch;
    this.props.moveTab("selectdatabase");
    // dispatch(userActions.preview());
  }

  componentWillReceiveProps(nextProprs) {
    if (nextProprs.activeTab == "preview") {
      console.log("nextProps in Preview ", nextProprs)
      if (nextProprs.blast_id != this.state.blast_id) {
        this.setState({ blast_id: nextProprs.blast_id });
      }
      if (nextProprs.previewHtml != this.state.previewHtml) {
        this.setState({ previewHtml: nextProprs.previewHtml });
      }

      if (nextProprs.blast_id && nextProprs.previewHtml && this.state.previewHtml == null) {
        const { dispatch } = this.props.dispatchval.dispatch;
        let blast_id = nextProprs.blast_id;
        dispatch(userActions.getPreviewhtml(blast_id));
      }
    }
  }
  render() {
    console.log("props in render in Preview Tab ", this.props);
    const { previewHtml } = this.props;
    const { submitted, email } = this.state;

    return (
      <div className="tab-pane fade mt-2" id="preview" role="tabpanel"
        aria-labelledby="group-dropdown2-tab" aria-expanded="false">
        <h4>Preview Blast</h4>
        <p>Finalize your Blast.</p>
        <div className="row">
          <div className="col-md-12 mb-3">
            Thoroughly read the email including -
            <ul>
              <li>The "From Name"</li>
              <li>The "Email Subject Line"</li>
              <li>The entire body of the email</li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 mb-3">
            <div className="form-group">
              <label>Additional proofs may be emailed here</label>
              <input
                value={this.state.email}
                onChange={this.handleChangepreview}
                name="email" type="text" className="form-control form-control-lg form-control-a" placeholder="Email Address"
              />
              {!email && submitted && (
                <div className="help-block red" style={{ "color": "red" }}>Email is required</div>
              )}
            </div>
          </div>
          <div className="col-md-2 mb-3">
            <div className="form-group pt-4">
              <a onClick={this.handleSubmitPreviw} className="btn btn-primary">
                Send
              </a>
            </div>
          </div>
        </div>
        {previewHtml && <Markup content={previewHtml} />}
        <div className="col-md-12 mt-4">
          <a href="javascript:void(0)" className="btn btn-primary" onClick={() => this.nexttab}>
            Save
          </a>
          <a href="javascript:void(0)" className="btn btn-primary pull-right" onClick={() => this.nexttab} >
            Next
          </a>
        </div>
      </div>
    );
  }
}

export default PreviewTab;
