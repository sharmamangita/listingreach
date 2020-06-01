import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';
import PaypalButton from './PaypalButton';

const CLIENT = {
  sandbox: 'AV9fn3Wb8NiVQUZx-Uu8Q_LWm3jQLe9BE8r_WAgRAAzrxtS6cJvKkkaUgNHe4-fiijv8zU_31B0bEM8h',
  production: 'xxxXXX',
};
const ENV = process.env.NODE_ENV === 'sendbox'
  ? 'production'
  : 'sandbox';
class CommonDownload extends React.Component {
  constructor(props) {
  	super(props);
  	const { dispatch } = this.props;
  	this.state = {
  		showpayment:false,
  	}
  	this.handleShow = this.handleShow.bind(this);
  }
handleShow() {
    this.setState({ 
        show: true,
        
        scrollable:true,
        
        showpayment:false,
        restoreFocus:true,
        profile:this.props
     });
}
renderPaymentModal(amount) {
 let modalClose = () => this.setState({ showpayment: false });
  if(amount && this.props.dispatchval){
  return  (
      <PaypalButton
          modalpaymentid={this.state.modalpaymentid} 
          dispatch = {this.props.dispatchval.dispatch} 
          uploadBlast={this.props.dataBaseData}
          visible={this.state.showpayment} 
          onClickBackdrop={modalClose}  
          dialogClassName="modal-lg"
          client={CLIENT}
          env={ENV}
          commit={true}
          currency={'USD'}
          id={this.state.modalpaymentid}
         
          total={amount}
         
        />
     
      );
  }
  
}
render() {
	const { status,id,total,page  } = this.props;
	const {showpayment} =this.state;
	console.log("showpayment====",showpayment);
  let modalPaymentOpen = (flag,id,amount,page) => {
    	if(amount){
	      this.setState({ showpayment: true , modalpaymentid: id ,amount:total,page:page});
	    }
  	}
  	var paymentmodal = total ? this.renderPaymentModal(total) : (<span></span>);
     
    return (
       <span>
        {paymentmodal}
	     
     	</span>
    );
  }

}

export default CommonDownload;