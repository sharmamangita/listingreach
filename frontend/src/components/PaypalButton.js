import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';
import Modal from 'react-bootstrap4-modal';
import { userActions } from '../actions';
class PaypalButton extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      modalpaymentid: this.props.modalpaymentid ? this.props.modalpaymentid : '',
      show: this.props.showpayment,
      restoreFocus:true,
      submitted: false,
      showButton: false
     
    };
    window.React = React;
    window.ReactDOM = ReactDOM;
  }
  handleShow() {
    this.setState({ 
        show: true,
        scrollable:true,
        restoreFocus:true
     });
  }
  handleClose() {
    this.setState({ show: false });
  }
  componentDidMount() {
    const {
      isScriptLoaded,
      isScriptLoadSucceed
    } = this.props;
    if (isScriptLoaded && isScriptLoadSucceed) {
      this.setState({ showButton: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      isScriptLoaded,
      isScriptLoadSucceed,
    } = nextProps;

    const isLoadedButWasntLoadedBefore =
      !this.state.showButton &&
      !this.props.isScriptLoaded &&
      isScriptLoaded;

    if (isLoadedButWasntLoadedBefore) {
      if (isScriptLoadSucceed) {
        this.setState({ showButton: true });
      }
    }
  }
  onSuccess(payment){
   console.log('Successful payment!', payment);
  
   payment.flag='download';
   console.log("this.props====",this.props);
    if(this.props.page=='candidate'){
      this.props.dispatch(userActions.updateCandidateAmount( payment));

    }else{
      this.props.dispatch(userActions.savedCandidates(payment)); 
    }
  }
  render() {
    console.log("showpayment===");
    const onError = (error) =>
    console.log('Erroneous payment OR failed to load script!', error);
    
    const onCancel = (data) =>
    console.log('Cancelled payment!', data);
    const { submitted,showpayment,modalpaymentid} = this.state;
    const { total,id,currency,env,commit,client,dispatch,page
    } = this.props;
   
    const {
      showButton,
    } = this.state;

    const payment = () =>
      paypal.rest.payment.create(env, client, {
        transactions: [
          {
            amount: {
              total,
              currency,
            }
          },
        ],
      });

    const onAuthorize = (data, actions) =>
      actions.payment.execute()
        .then(() => {
          const payment = {
            paid: true,
            cancelled: false,
            payerID: data.payerID,
            orderID:data.orderID,
            total:total,
            currency:currency,
            id:id,
            paymentID: data.paymentID,
            paymentToken: data.paymentToken,
            returnUrl: data.returnUrl,
          };
          this.props.onClickBackdrop();
          this.handleClose();
          this.onSuccess(payment);
        });

    return (
      <div>
      <Modal {...this.props} >
          <div className="modal-header">
            <h4 className="modal-title">Payment Details</h4>
          </div>
          <div className="modal-body">
            <form  className="p-3 bg-white" >
              <div className="row">
                <div className="col-md-12 col-lg-12 mb-5">
                  <div className="aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                    <span className="d-block icon flaticon-calculator mb-3 text-primary"></span>
                      <h3>According to Candidate's Experience, <br></br>your payable amount is
                      <span className="counting"> ${total}</span></h3>
                        
                    
                  </div>
                </div>
                </div>
              <div> 
              {showButton && <paypal.Button.react
              env={env}
              client={client}
              commit={commit}
              payment={payment}
              onAuthorize={onAuthorize}
              onCancel={onCancel}
             
              onError={onError}
            />}
            </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={this.props.onClickBackdrop}>
                  Cancel
              </button>
              </div>
            </form>
          </div>
      </Modal>
        
      </div>
    );
  }

}

export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PaypalButton);