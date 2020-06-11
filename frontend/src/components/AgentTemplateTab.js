import React from "react";
import { userActions } from "../actions";
class AgentTemplateTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      blast_id: '',
    };
    this.selectDesignTemplate = this.selectDesignTemplate.bind(this);
  }

 

  componentDidMount() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.setState({
      userId: user.userId,
    });
  }

  selectDesignTemplate(designTemplate) {
    console.log("template PROPS ",this.props)
    if (designTemplate) {
      const { dispatch } = this.props.dispatchval.dispatch;
      if (this.props.blast._id) {
        dispatch(userActions.designTemplate(designTemplate, this.props.blast._id, this.props.templateId));
      }
    }
  }

  render() {
    const { blast } = this.props;
    return (
      <div className="tab-pane fade mt-2" id="temp"
        role="tabpanel" aria-labelledby="group-dropdown2-tab" aria-expanded="false"
      >
        <h4>Design Template</h4>
        <p>Choose your template design for creating a new Blast.</p>
        <form
          className="form-a contactForm"
          action=""
          method="post"
          role="form"
        >
          {blast &&
           blast.blast_type == "RealEstateBrokerage" ? (
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div
                    className="card"
                    style={{
                      width: "20rem",
                      margin: "20px 0 24px 0",
                    }}
                  >
                    <img
                      className="card-img-top"
                      src="../../../public/assets/images/img-4.png"
                      alt="image"
                      style={{ width: "100%" }}
                    />
                    <div className="card-body">
                      <h4 className="card-title">Upload Your Own Blast</h4>
                      <p className="card-text">
                        Upload in seconds a Single Page Blast you already have
                    </p>
                      <a
                        href="javascript:void(0)"
                        className="btn btn-primary"
                        onClick={(e) =>
                          this.selectDesignTemplate("UploadYourOwnBlast")
                        }
                      >
                        Select
                    </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div
                    className="card"
                    style={{
                      width: "20rem",
                      margin: "20px 0 24px 0",
                    }}
                  >
                    <img
                      className="card-img-top"
                      src="../../../public/assets/images/img-4.png"
                      alt="image"
                      style={{ width: "100%" }}
                    />
                    <div className="card-body">
                      <h4 className="card-title">Single Property</h4>
                      <p className="card-text">
                        - Create a Blast from Scratch
                      <br />- Feature One Property
                    </p>
                      <a
                        href="javascript:void(0)"
                        className="btn btn-primary"
                        onClick={(e) =>
                          this.selectDesignTemplate("SingleProperty")
                        }
                      >
                        Select
                    </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div
                    className="card"
                    style={{
                      width: "20rem",
                      margin: "20px 0 24px 0",
                    }}
                  >
                    <img
                      className="card-img-top"
                      src="../../../public/assets/images/img-4.png"
                      alt="image"
                      style={{ width: "100%" }}
                    />
                    <div className="card-body">
                      <h4 className="card-title">Multiple Properties</h4>
                      <p className="card-text">
                        - Create a Blast from Scratch <br></br>- Feature Multiple
                      Properties{" "}
                      </p>
                      <a
                        href="javascript:void(0)"
                        className="btn btn-primary"
                        onClick={(e) =>
                          this.selectDesignTemplate("MultipleProperties")
                        }
                      >
                        Select
                    </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div
                    className="card"
                    style={{
                      width: "20rem",
                      margin: "20px 0 24px 0",
                    }}
                  >
                    <img
                      className="card-img-top"
                      src="../../../public/assets/images/img-4.png"
                      alt="image"
                      style={{ width: "100%" }}
                    />
                    <div className="card-body">
                      <h4 className="card-title">Upload Your Own Blast</h4>
                      <p className="card-text">
                        Upload in seconds a Single Page Blast you already have
                    </p>
                      <a
                        href="javascript:void(0)"
                        className="btn btn-primary"
                        onClick={(e) =>
                          this.selectDesignTemplate("UploadBlast")
                        }
                      >
                        Select
                    </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </form>
      </div>
    );
  }
}
export default AgentTemplateTab;
