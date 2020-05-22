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
  onSuccess(payment,dispatch){
    console.log('Successful payment!', payment);
    console.log("this.props.dispatchval===",dispatch.dispatchval.dispatch);
    dispatch.dispatchval.dispatch.dispatch(userActions.savePayment(payment)); 
  }
  render() {
    console.log("showpayment===");
    const { total,id,currency,env,commit,client,dispatch,page
    } = this.props;
    const onError = (error) =>
    console.log('Erroneous payment OR failed to load script!', error);
    
    const onCancel = (data) =>
    console.log('Cancelled payment!', data);
    const { submitted,showpayment,modalpaymentid} = this.state;
    
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
    console.log("dispatch=====",dispatch);
    const onAuthorize = (data, actions) =>
      actions.payment.execute()
        .then(() => {
          const payment = {
            paid: true,
            cancelled: false,
            payerID: data.payerID,
            orderID:data.orderID,
            total:total,
            dispatch:dispatch,
            currency:currency,
            id:id,
            paymentID: data.paymentID,
            paymentToken: data.paymentToken,
            returnUrl: data.returnUrl,
          };
          this.props.onClickBackdrop();
          this.handleClose();
          this.onSuccess(payment,dispatch);
        });

    return (
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
    );
  }

}

export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PaypalButton);