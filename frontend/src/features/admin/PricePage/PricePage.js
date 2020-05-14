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
      blastsettings: {
        _id: '',
        per_email_blast_price: 0.0,
        additional_email_blast_price: 0.0
      },
      submitted: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onShowAlert = this.onShowAlert.bind(this);
    this.closebtn = this.closebtn.bind(this);

  }

  componentDidMount() {
    this.props.dispatch(adminActions.getBlastSettings());
    this.setState({ visible: true }, () => {
      window.setTimeout(() => {
        this.setState({ visible: false, });
        this.setState({
          blastsettings:
          {
            _id: this.props.blastsettings._id,
            per_email_blast_price: this.props.blastsettings.per_email_blast_price,
            additional_email_blast_price: this.props.blastsettings.additional_email_blast_price
          }
        })
      }, 2000)
    });
  }
  handleChange(event) {
    console.log("targetname ", event.target.name);
    console.log('props', this.props.blastsettings);
    if (event.target.name == 'peremailprice') {
      this.props.blastsettings.per_email_blast_price = Number(event.target.value)
    }
    if (event.target.name == 'addiitionalprice') {
      this.props.blastsettings.additional_email_blast_price = Number(event.target.value)
    }
    this.setState({
      blastsettings:
      {
        _id: this.props.blastsettings._id,
        per_email_blast_price: this.props.blastsettings.per_email_blast_price,
        additional_email_blast_price: this.props.blastsettings.additional_email_blast_price
      }
    })
  }

  closebtn() {
    this.setState({ visible: false })
  }


  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    const { blastsettings } = this.state;
    const { dispatch } = this.props;

    if (blastsettings.per_email_blast_price && blastsettings.additional_email_blast_price) {
      dispatch(adminActions.updateBlastSettings(blastsettings));
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
    const { submitted, blastsettings } = this.state;
    console.log("BL  ", blastsettings)
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
                        <div className={'col-md-4 price' + (submitted && !blastsettings.per_email_blast_price ? ' has-error' : '')}>
                          <span className="mt-2 mr-1">$</span> <span>
                            <input className="form-control" type="number" name="peremailprice" value={blastsettings.per_email_blast_price || 0} onChange={this.handleChange} placeholder="Price" />
                            {submitted && !blastsettings.per_email_blast_price &&
                              <div className="help-block red">Amount is required</div>
                            }</span>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-md-3 col-form-label"><b>Additional Per Email Blast Price</b></label>
                        <div className={'col-md-4 price' + (submitted && !blastsettings.additional_email_blast_price ? ' has-error' : '')}>
                          <span className="mt-2 mr-1">$</span> <span>
                            <input className="form-control" type="number" name="addiitionalprice" value={blastsettings.additional_email_blast_price || 0} onChange={this.handleChange} placeholder="Price" />
                            {submitted && !blastsettings.additional_email_blast_price &&
                              <div className="help-block red">Amount is required</div>
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
  const { alert, admins, authentication } = state;
  console.log("this=======", state);
  const { user } = authentication;
  const { blastsettings } = admins;
  return {
    user,
    alert,
    blastsettings
  };
}



const connectedPricePage = connect(mapStateToProps)(PricePage);
export { connectedPricePage as PricePage };

