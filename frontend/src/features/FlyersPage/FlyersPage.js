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
class FlyersPage extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    var user = JSON.parse(localStorage.getItem("user"));
    this.props.dispatch(userActions.getSavedBlast(user.userId));
    this.deleteSavedBlast = this.deleteSavedBlast.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    //$('#example').DataTable();
  }

  deleteSavedBlast(event){
  	const {id} = event.target;
  	if (window.confirm("Are you sure you wish to delete this record?")){
  		const { dispatch } = this.props;
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
              style={{ width: "100%" }}
            >
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
                      <tr>
                        <td>
                          {data.status && data.status == "Draft" ? (
                            <Link
                              to={{
                                pathname: "/CreateFlyerPage",
                                savedProps: {
                                  moveTab: "property",
                                  blast_id:data.id
                                },
                              }}
                            >
                              {" "}
                              LR00{i + 1}
                            </Link>
                          ) : (
                            "LR00" + i + 1
                          )}
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
                        <td>{data.createdon}</td>
                        <td> {data.status} </td>
                        <td>
                          {data.status && data.status == "Draft" ? (
                            <div>
                              <Link
                                to={{
                                  pathname: "/CreateFlyerPage",
                                  savedProps: {
                                    moveTab: "property",
                                    blast_id:data.id
                                  },
                                }}
                              >
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
