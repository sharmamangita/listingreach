
import React from 'react';
import config from 'config';
import { Link } from 'react-router-dom';
import { userActions } from '../actions';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, NavLink } from 'react-bootstrap';
import Modal from 'react-bootstrap4-modal';
import { connect } from 'react-redux';
const axios = require("axios");
import { common } from '../helpers';
import { authHeader } from '../helpers';
import moment from "moment";
import Spinner from 'react-spinner-material'; 
class SubscriberPreferencesModal extends React.Component {
    constructor(props, context) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        let user  = JSON.parse(localStorage.getItem('user'));
        this.state = {
        user:  Object.assign({
            profileimage: '',
          },this.props.profile),
          loader:false, 
          dispatchval:this.props.dispatchval.dispatch,
          show: this.props.show,
          image:null,
          restoreFocus:true,
          submitted: false,
          proimg:'/public/assets/images/dummy-profile.png' 
        };
       
        
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onfileChange = this.onfileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);  
    }
		componentDidMount() {
		const { dispatch } = this.props;
		}
		

		onfileChange(e) {
		this.setState({image:e.target.files[0]});
		}
		
		onClickHandler(){
			const configs = {
			headers: {
			 ...authHeader(), 'content-type': 'multipart/form-data'
			}
		}
		const data = new FormData() 
		data.append('myImage', this.state.image)
		this.setState({loader:true})
		axios.post(`${config.uploadapiUrl}/updatedupload/`,data,configs)
			.then((response) => {
			localStorage.setItem('profileimage', JSON.stringify(response.data.profileimg));
			this.setState({ updateprofile:response.profileimg});	
			this.setState({loader:false})
			window.location.reload();
			}).catch((error) => {
			console.log("The file is error uploaded====");
			this.setState({loader:false})
			});
		
		}
			onClickDelete(){
			var userid = this.props.profile;
			const { dispatch } = this.props.dispatchval.dispatch;
				dispatch(userActions.deleteprofilepic(userid.id));
					window.location.reload();
			}
		
		handleClose() {
		this.setState({ show: false });
		}
		
		handleShow() {
			this.setState({ 
				show: true,
				scrollable:true,
				restoreFocus:true
			 });
		}
			
		
	 handleSubmit(event) {
		event.preventDefault();
		}

    render() {
		var imgstyle  = {
    	'maxWidth': '422px'
		}
		var profileuser ='';
		profileuser=this.props.profile;
	
			
			const { user,profileimage,submitted} = this.state;
			return (
				<div>
				<Modal {...this.props} >
				<div className="modal-header">
				 <h4 className="modal-title">Change Profile Image</h4>
				 <button type="button" className="close" data-dismiss="modal" onClick={this.props.onClickBackdrop}>&times;</button>
				</div>
				<form onSubmit={this.handleSubmit} encType="multipart/form-data"  className="p-3 bg-white">
				<div className="modal-body">
				<div className="col-sm-12 text-center">
				<Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={this.state.loader} />
				<img src={(url ? url :'/public/assets/images/dummy-profile.png')}  style={imgstyle} className="img-circle" />
			</div>
             <div className="row form-group">
                <div className="col-md-12 col-lg-12 mb-3 mb-md-0">
                    <label className="font-weight-bold" htmlFor="fullname">Upload Profile Image*</label>
                    <div className={'form-group mb-3' + (submitted && !user.profileimage ? ' has-error' : '')}>
                        <input type="file" id="myImage"  accept="image/*" onChange= {this.onfileChange}   className="form-control " name="myImage" /> 
                    </div>
                </div>
            </div>
        </div>
            <div className="modal-footer">
            <button type ="button" className="btn btn-secondary float-left" onClick={this.onClickDelete}> Delete </button>
          <button type="button" className="btn btn-primary" onClick={this.onClickHandler}>
            Upload
          </button>
          <button type="button" className="btn btn-secondary" onClick={this.props.onClickBackdrop}>
            Cancel
          </button>
        </div>
        </form> 
      </Modal>
  </div>    
    );
  }
  

}



export default SubscriberPreferencesModal;
