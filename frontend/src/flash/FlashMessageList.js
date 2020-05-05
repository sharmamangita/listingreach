import React from 'react';
import { render } from 'react-dom';
import FlashMassage from 'react-flash-message';;
import FlashMessage from ./FlashMessage;
import { connect } from 'react-redux';

class FlashMessageList extends React.Component {
		render(){
			const message =this.props.message.map(message=>
				<FlashMassage key={message.id} message={} />
			);
			return (
				<div>{message}</div>
			);
		}
	}
	FlashMassageList.propTypes={
		message:React.PropTypes.array.isRequired
	}

	function mapStateToProps(state){
		return{
			message:state.flashMessages
		}
	}
export default connect(mapStateToProps)(FlashMessageList)
