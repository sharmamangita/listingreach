import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { adminActions } from '../../../actions';
import { Alert } from 'reactstrap';
import config from 'config';
class PricePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      prices: {
        peremailblastprice: 0.0,
        additionalemailblastprice: 0.0
      },
      submitted: false,
    };
    const { dispatch } = this.props;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onShowAlert = this.onShowAlert.bind(this);
    this.closebtn = this.closebtn.bind(this);

  }

  componentDidMount() {
    this.props.dispatch(adminActions.getBlastSettings());
    this.setState({ visible: true }, () => {
      window.setTimeout(() => {
        this.setState({ visible: false })
      }, 2000)
    });
  }
  handleChange(event) {
    const { name, value } = event.target;
    const { plan, experience_one, experience_two, experience_three } = this.state;
    if (event.target.name == 'plan') {
      let selectedplan = event.target.value;
      this.setState({
        plan: {
          ...plan,
          plan: selectedplan
        }
      });
    }

  }

  closebtn() {
    this.setState({ visible: false })
  }


  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    const { prices } = this.state;
    const { dispatch } = this.props;

    if (prices.peremailblastprice && prices.additionalemailblastprice) {
      dispatch(adminActions.PlanRegister({ user: plan }));
    }
  }
  onShowAlert() {
    this.setState({ visible: true }, () => {
      window.setTimeout(() => {
        this.setState({ visible: false })
      }, 2000)
    });
  }

  render() {
    const { prices, submitted, disabled } = this.state;
    if (this.props.prices) {
      this.setState({ prices: this.props.prices })
    }

    const { alert } = this.props;
    return (
      <main className="col-xs-12 col-sm-8 col-lg-9 col-xl-10 pt-3 pl-4 ml-auto">
        <h3 className="admin-title">   Pricing</h3>
        <section className="row">
          <div className="col-sm-12">
            <section className="row">

              <div className="col-12">
                <div className="text-center mb-5 section-heading">
                  {alert.message &&
                    <Alert className={`alert ${alert.type}`} isOpen={this.state.visible} > <button type="button" onClick={this.closebtn} className="close">
                      <span aria-hidden="true">&times;</span>
                    </button>{alert.message}</Alert>
                  }
                </div>
                <div className="card mb-4">
                  <div className="card-block">
                    <form onSubmit={this.handleSubmit} className="form">
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label"><b>Price Per Email Blast</b></label>
                        <div className={'col-md-4 price' + (submitted && !prices.peremailblastprice ? ' has-error' : '')}>
                          <span className="mt-2 mr-1">$</span> <span>
                            <input className="form-control" type="text" name="plan" value={prices.peremailblastprice} onChange={this.handleChange} placeholder="Price" />
                            {submitted && !plan.plan &&
                              <div className="help-block red">Amount is required</div>
                            }</span>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-md-3 col-form-label"><b>Additional Per Email Blast Price</b></label>
                        <div className={'col-md-4 price' + (submitted && !prices.additionalemailblastprice ? ' has-error' : '')}>
                          <span className="mt-2 mr-1">$</span> <span>
                            <input className="form-control" type="text" name="price" value={prices.additionalemailblastprice} onChange={this.handleChange} placeholder="Price" />
                            {submitted && !prices.additionalemailblastprice &&
                              <div className="help-block red">Experience is required</div>
                            }</span>
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-8">
                          <div className="sign-btn">
                            <input type="submit" value="Update" onClick={() => { this.onShowAlert() }} className="btn btn-primary pill px-4 py-2" />

                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    );
  }
}

function mapStateToProps(state) {
  const { authentication, users, admins } = state;
  console.log("this=======", state);
  const { user } = authentication;
  const { alert } = state;
  const { plan } = admins;
  return {
    user,
    alert,
    plan
  };
}



const connectedPricePage = connect(mapStateToProps)(PricePage);
export { connectedPricePage as PricePage };

