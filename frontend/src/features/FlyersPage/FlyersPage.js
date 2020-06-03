import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ListingSubmenu from "../../components/ListingSubmenu";
import { userActions } from "../../actions";
import moment from "moment";
const Entities = require("html-entities").XmlEntities;
class FlyersPage extends React.Component {
  constructor(props) {
    super(props);
   
    this.deleteSavedBlast = this.deleteSavedBlast.bind(this);
  }

  componentDidMount() {
    
    var user = JSON.parse(localStorage.getItem("user"));
    this.props.dispatch(userActions.getSavedBlast(user.userId));
  }
  createdDate(createdOn) {
		var expDate = new moment(createdOn, "YYYY-MM-DD");
		var created = moment(expDate).format("DD-MM-YYYY");
		return created;
	}
  deleteSavedBlast(event) {
    const { id } = event.target;
    if (window.confirm("Are you sure you wish to delete this record?")) {
      this.props.dispatch(userActions.deleteSavedBlast(id));
    }
  }



  componentWillReceiveProps(nextProps) {
    console.log("nextProps==3535=====", nextProps);
  }

  render() {
    console.log("test==232===", this.props);
    let savedBlast = [];
    if (
      this.props.users &&
      this.props.users.savedBlast &&
      this.props.users.savedBlast.length
    ) {
      savedBlast = this.props.users.savedBlast;
    }
    return (
      <div>
        <ListingSubmenu />
        <section>
          <div className="container">
            <div className="title-box-d">
              <h3 className="title-d">Saved Flyers</h3>
            </div>
          </div>
        </section>
        <section className="news-grid grid">
          <div className="container">
            <table
              id="example"
              className="table table-striped table-bordered"
              style={{ width: "100%" }}            >
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
                {savedBlast &&
                  savedBlast.map(function (data, i) {
                    return (
                      <tr key={data.id}>
                        <td>
                          {data.status && data.status == "Draft" ? (
                            <Link to={{
                              pathname: "/CreateFlyerPage",
                              savedProps: {
                                moveTab: "property",
                                blast_id: data.id,
                                templateId:data.templateId
                              }
                            }} >
                              {data.id}
                            </Link>
                          ) : data.id
                          }
                        </td>
                        <td>
                          {data.subject.length && data.subject[0].headline
                            ? data.subject[0].headline
                            : "---"}
                        </td>
                        <td>
                          {" "}
                          {data.payment.length && data.payment[0].amount
                            ? "$" + data.payment[0].amount
                            : "---"}
                        </td>
                        <td>{this.createdDate(data.createdon)}</td>
                        <td> {data.status} </td>
                        <td>
                          {data.status && data.status == "Draft" ? (
                            <div>
                              <Link
                                to={{
                                  pathname: "/CreateFlyerPage",
                                  savedProps: {
                                    moveTab: "property",
                                    blast_id: data.id,
                                    templateId:data.templateId
                                  },
                                }} >
                                <i className="fa fa-edit"></i>
                              </Link>{" "}
                              &nbsp; &nbsp;
                              <i
                                className="fa fa-trash"
                                aria-hidden="true"
                                title="Delete Flyer"
                                id={data.id} onClick={this.deleteSavedBlast}
                              ></i>
                            </div>
                          ) : null}
                        </td>
                      </tr>
                    );
                  }, this)}
              </tbody>
            </table>
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

const connectedFlyersPage = connect(mapStateToProps)(FlyersPage);
export { connectedFlyersPage as FlyersPage };
