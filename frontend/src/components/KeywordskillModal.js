import React from 'react';
import config from 'config';
import { Link } from 'react-router-dom';
import { userActions } from '../actions';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, NavLink } from 'react-bootstrap';
import Modal from 'react-bootstrap4-modal';
import { connect } from 'react-redux';
import { common } from '../helpers';
import moment from "moment";
class KeywordskillModal extends React.Component {
  constructor(props, context) {
      super(props);
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      var user  = JSON.parse(localStorage.getItem('user'));
      this.state = {
		   submitbtn:false, 
  	     skills: Object.assign({
            keywordval: ''
        }),
  	    user:user,
        dispatchval:this.props.dispatchval.dispatch,
        modalkeywordskill: this.props.modalkeywordskill ? this.props.modalkeywordskill: '',
        show: this.props.showkeywordskill, 
        restoreFocus:true,
        submitted: false,
        employee: Object.assign({
        skills:[]
        }, this.props.profile  ? this.props.profile : '' ),
      };
  }
   componentDidMount() {
      var skillsbyId=[];
      /*for (let i = 0; i <= this.state.employee.skills.length; i++) {
        if(this.state.employee.skills[i]){
          if(this.state.employee.skills[i]._id==this.state.modalidstr){
             skillsbyId.push(this.state.employee.skills[i]);
             
          }
        }
      }*/
      var filteredkeyword = this.state.employee.skills.filter(item => {
        return item._id==this.props.modalkeywordskill;
      });
      if(filteredkeyword){
        skillsbyId.push(filteredkeyword);
      }
      
      if(skillsbyId.length>0){
        this.setState({ 
          skills:skillsbyId[0]
        });
      }
      
    }
 
    handleClose() {
      this.setState({ show: false,skills: Object.assign({
				keywordval: ''
			}) 
        });
    }
    
    handleSubmit(event) {
     event.preventDefault();
     this.setState({ submitted: true });
      const {user,keywordval,employee,skills} = this.state;
      const { dispatch } = this.props.dispatchval.dispatch;
        if(this.state.modalidstr){
          var skillswithId = this.state.employee.skills.find(item => {
            return item._id == this.state.modalidstr
          });
          skillswithId = Object.assign(skillswithId,this.state.skills);
        }else{
		      employee.skills.push(this.state.skills);
        }
        employee.id=user.userId;
        var employeval=[];
        var  arraysend = {"id":employee.id,"skills":employee.skills};
        if(skills.keywordval){
		      var userid =  user.userId;
          dispatch(userActions.update(userid,{employeeval:arraysend}));
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
         if(event.target.name=='keywordval'){
		  let compare = this.props.profile.skills;
      console.log("compare",compare);
		  let level = event.target.value;
      if(compare && compare.length>0){
       var valueexit = compare.filter(itemone => { 
          return itemone.keywordval.trim().toLowerCase() == level.trim().toLowerCase();
        });
      }

      if(valueexit && valueexit.length > 0){
        this.setState({submitbtn:true});
      } else { this.setState({submitbtn:false}); }

      console.log("comarae12",valueexit);
		 /* for (var i=0; i < compare.length; i++) {
        if(compare[i].keywordval){
          if(compare[i].keywordval.toLowerCase() == level.toLowerCase()){
           this.setState({submitbtn:true});
           break;
          } else { this.setState({submitbtn:false}); }
        }
			  
		  } */
        this.setState({
          skills:{
            ...skills,
            keywordval: level
          }
        });
      }
        const { name, value } = event.target;
        const { user,  employee, skills } = this.state;
        this.setState({
            skills:{
              ...skills,
              [name]:value
            },
            employee:{
              ...employee,
              [name]: value
            }
        });  
    }
    
    render() {
    var profileuser= "";
    profileuser=this.props.profile;
    const {employee,skills,keywordval,submitted,modalkeywordskill } = this.state;
    return (
	  <div>
      <Modal {...this.props} >
        <div className="modal-header">
         <h4 className="modal-title">Keyword/ Skills</h4>
         <button type="button" className="close" data-dismiss="modal" onClick={this.props.onClickBackdrop}>&times;</button>
        </div>
        <div className="modal-body">
        <form  className="p-3 bg-white" onSubmit={this.handleSubmit} >
          <div className="row form-group">
            <div className="col-md-12 col-lg-12 mb-3 mb-md-0">
              <label className="font-weight-bold" htmlFor="Keyword">Add New Keyword</label>
              <input type="text" id="keywordval" name="keywordval" value={skills.keywordval || ''} onChange={this.handleChange} className="form-control" placeholder="Keyword" />
              {submitted && !skills.keywordval &&
              <div className="help-block red">Keyword is required</div>
              } <div className="help-block red">{this.state.submitbtn==true?'This keyword already exist':'' }</div>
            </div>
          </div>	 
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary" disabled={this.state.submitbtn} >Add</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.onClickBackdrop}>Close</button>
          </div>
       </form>
      </div>
      </Modal>
    </div>    
    );
  }
}

export default KeywordskillModal;
