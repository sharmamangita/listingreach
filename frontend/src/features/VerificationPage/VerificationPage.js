import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Select from 'react-select'
import { userActions } from '../../actions';
import * as qs from 'query-string';

class VerificationPage extends React.Component {
    constructor(props) {
        super(props);
        
        /*this.props.dispatch(userActions.logout());*/
        this.state = {
          user: this.props.user,
          selectedMenu:""
        };
    }
    componentDidMount() {
        console.log("in verification");
        const { dispatch } = this.props;
        dispatch(userActions.getVerification(this.props.match.params.token));
   }
    
    render() {
        const { registering } = this.props;
        const { username,  submitted } = this.state;

        return (
            <div className="col-md-8 col-md-offset-2">
               
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}
const connectedVerificationPage = connect(mapStateToProps)(VerificationPage);
export { connectedVerificationPage as VerificationPage };
