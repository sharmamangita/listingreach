import React from 'react';
import config from 'config';
import { Link } from 'react-router-dom';
import { userActions } from '../actions';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, NavLink } from 'react-bootstrap';
import Modal from 'react-bootstrap4-modal';
import { connect } from 'react-redux';
import { common } from '../helpers';
import moment from "moment";
class StrengthsModal extends React.Component {
    constructor(props, context) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        var user  = JSON.parse(localStorage.getItem('user'));
        this.state = {
          strengths:"",
          user:user.userId,
          dispatchval:this.props.dispatchval.dispatch,
          modalidstr: this.props.modalidstr ? this.props.modalidstr : '',
          show: this.props.showstrengths,
          restoreFocus:true,
          submitted: false,
          employee: Object.assign({
          strengths:''
          }, this.props.profile  ? this.props.profile : '' ),
        };
    }
    componentDidMount() {
		const { dispatch } = this.props;
		var profileuser="";
		profileuser=this.props.profile;
		this.setState({strengths:profileuser.strengths});
    }

    handleClose() {
      this.setState({ show: false });
    }
    handleSubmit(event) {
      event.preventDefault();
      this.setState({ submitted: true });
      const {user,strengths} = this.state;
      const { dispatch } = this.props.dispatchval.dispatch;
      console.log("dispathstrength===",dispatch);
      if(strengths){
        dispatch(userActions.update({user:user},{employeeval:{id:user,strengths:strengths}})); 
        this.props.onClickBackdrop();
        this.handleClose();
      }
    }
    handleShow() {
      this.setState({ 
          show: true,
          scrollable:true,
          restoreFocus:true
       });
    }
    
    handleChange(event) {
		const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    
    render() {
    const { user,strengths,submitted,modalidstr} = this.state;
    console.log("strengths====",strengths);
    return (
       <div>
        <Modal {...this.props} >
          <div className="modal-header">
            <h4 className="modal-title">Strengths</h4>
            <button type="button" className="close" data-dismiss="modal" onClick={this.props.onClickBackdrop}>&times;</button>
          </div>
          <div className="modal-body">
            <form  className="p-3 bg-white" onSubmit ={this.handleSubmit}>
              <div className="row form-group">
                <div className="col-md-12 col-lg-12 mb-3 mb-md-0">
                  <label className="font-weight-bold" htmlFor="fullname">Enter Strengths</label>
                  <textarea name="strengths"  value={strengths}  onChange={this.handleChange} cols="30" rows="5" className="form-control" placeholder=""></textarea><span>Max 1500 words</span>
                </div>
              </div> 
              <div className="modal-footer">
                  <button type="submit" className="btn btn-primary" onClick={this.onFirePhasers}>
                  Submit
                </button>
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



export default StrengthsModal;
