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
        showeducation:false,
        showprofesional:false,
        showimprovements:false,
        showkeywordskill:false,
        showstrengths:false,
        scrollable:true,
        showprofileimage:false,
        showpayment:false,
        restoreFocus:true,
        profile:this.props
     });
}
renderPaymentModal(amount) {
  console.log("amount===",amount);	
  console.log("this.props.dispatchval===",this.props.dispatchval.dispatch);
  let modalClose = () => this.setState({ showpayment: false });
  if(amount && this.props.dispatchval){
  return  (
      <PaypalButton
          modalpaymentid={this.state.modalpaymentid} 
          dispatch = {this.props.dispatchval.dispatch.dispatch} 
          visible={this.state.showpayment} 
          onClickBackdrop={modalClose}  
          dialogClassName="modal-lg"
          client={CLIENT}
          env={ENV}
          commit={true}
          currency={'USD'}
          id={this.state.modalpaymentid}
          page={this.state.page}
          total={amount}
         
        />
     
      );
  }
  
}
render() {
	const { status,id,total,page  } = this.props;
	const {showpayment} =this.state;
	//console.log("showpayment====",showpayment);
    let modalPaymentOpen = (flag,id,amount,page) => {
    	if(amount){
	      this.setState({ showpayment: true , modalpaymentid: id ,amount:total,page:page});
	    }
  	}
  	var paymentmodal = total ? this.renderPaymentModal(total) : (<span></span>);
    var downloadbutton='';
    console.log("page====",page)
    if(page=='profile'){
	    downloadbutton=(<a href="javascript:void(0)" data-toggle="modal" data-target="#profilecover" onClick={() => modalPaymentOpen("download",id,total,'')}  className="pb-2 pr-2 pl-0 red"><span id="download" className="icon-download" title="Download Profile"></span></a>);
   	}
   	if(page=='profilecandidates'){
   		downloadbutton=(<a href="javascript:void(0)" data-toggle="modal" data-target="#profilecover" onClick={() => modalPaymentOpen("download",id,total,'candidate')} ><img src="/public/assets/images/paypal-button.png" alt="Image" className="img-fluid mx-auto paypalbutton" /></a>);
   	}
   	if(page=='saved'){
  	    downloadbutton=(<a href="javascript:void(0)" data-toggle="modal" data-target="#profilecover" onClick={() => modalPaymentOpen("download",id,total,'')}><span className="text-info p-2 rounded border border-info"    >Download</span></a>);
   	}
    return (
       <span>
        {paymentmodal}
	      {downloadbutton}	
     	</span>
    );
}

}

export default CommonDownload;