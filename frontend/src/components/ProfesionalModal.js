import React from 'react';
import { Link } from 'react-router-dom';
import { userActions } from '../actions';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, NavLink } from 'react-bootstrap';
import Modal from 'react-bootstrap4-modal';
import { connect } from 'react-redux';
import { common } from '../helpers';
import moment from "moment";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
class ProfesionalModal extends React.Component {
    constructor(props, context) {
      super(props);
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      let user  = JSON.parse(localStorage.getItem('user'));
      this.state = {
      professionalSummary: Object.assign({
          company_name: '',
          title:'',
          technology: '',
          department: '',
          startDate: '',
          endDate: '',
          project_details:'',
          currentlyEmployed:'No',
          
        }),
        user:  Object.assign({
          firstName: '',
          lastName: '',
          middleName:'',
          email: ''
        },this.props.profile),
        dispatchval:this.props.dispatchval.dispatch,
        modalidval: this.props.modalidval ? this.props.modalidval : '',
        show: this.props.showprofesional,
        employee: Object.assign({
            id:'',
            professionalSummary:[]
            
        }, this.props.profile  ? this.props.profile : ''),
        restoreFocus:true,
        submitted: false
      };
  }

     componentDidMount(){

      $(".todolist").focus(function() {
        if(document.getElementById('todolist').value ===''){
            document.getElementById('todolist').value +='• ';
        }
      });

      $(".todolist").keyup(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
          if(keycode == '13'){
              ReactHtmlParser(document.getElementById('todolist').value +='• ');
        }
        var txtval = document.getElementById('todolist').value;
        if(txtval.substr(txtval.length - 1) == '\n'){
          ReactHtmlParser(document.getElementById('todolist').value +='• ');
          document.getElementById('todolist').value = txtval.substring(0,txtval.length - 1);
        }
      });

    }
    
  handleClose() {
    this.props.onClickBackdrop();
    this.setState({ show: false });
  }
  handleSubmit(event) {
      event.preventDefault();
      var thisobj=this;
      this.setState({ submitted: true });
      const { user,employee, professionalSummary} = this.state;
      if(this.props.modalidval){
        if(employee.professionalSummary.length>0){
            for(var i=0; i<this.props.profile.professionalSummary.length;i++){
              if(this.props.profile.professionalSummary[i]._id.toString()== thisobj.props.modalidval.toString()){
                this.props.profile.professionalSummary[i]=thisobj.state.professionalSummary;
              }
            }
          }
          setTimeout(() => {
            const { dispatch } = this.props.dispatchval.dispatch;
            var prodedu = this.state.professionalSummary;
             if (user.firstName && user.lastName && prodedu.company_name && prodedu.title && prodedu.startDate) {
              dispatch(userActions.update(employee.id,{user: user,employeeval:this.props.profile}));
              this.setState({
                professionalSummary:[],
                showprofes:false
              });
              
              this.handleClose();
            }
        }, 400);
      } else {
      
        const { dispatch } = this.props.dispatchval.dispatch;
        var prodedu = this.state.professionalSummary;
        if (user.firstName && user.lastName && prodedu.company_name && prodedu.title && prodedu.startDate) {
            employee.professionalSummary.push(this.state.professionalSummary);
          dispatch(userActions.update(employee.id,{user: user,employeeval:employee}));
          this.setState({
            professionalSummary:[],
            showprofes:false
          });
          this.handleClose();
        } 
      }
    }
    handleShow() {
        this.setState({ 
            show: true,
            scrollable:true,
            restoreFocus:true
         });
    }
    handleChanges(event) {
      if(event.target.name=="currentlyEmployed" && event.target.value == "Yes"){
        this.setState({showprofes:"true",showend:true});
      } else {
        this.setState({showprofes:false});
      }
      const { name, value } = event.target;
      const { user,  employee, professionalSummary } = this.state;
      this.setState({
          professionalSummary:{
            ...professionalSummary,
            [name]:value
          },
          employee:{
            ...employee,
            [name]: value
          }
      });
    };
    handleChange(event) {
        const { name, value } = event.target;
        const { user,  employee, professionalSummary } = this.state;
        if(this.props.modalidval){
          this.setState({
            professionalSummary:{
              ...professionalSummary,
              _id: this.props.modalidval
            }
          });
        }
        this.setState({
            professionalSummary:{
              ...professionalSummary,
              [name]:value
            },
            employee:{
              ...employee,
              [name]: value
            }
        });
    }
    
    render() {
    const { user,employee,submitted,professionalSummary,modalidval,
     } = this.state;
    if(this.state.employee.professionalSummary){
      var empcurrent = '';
      var professionalSummarybyId = this.props.profile.professionalSummary.filter(item => {
        if(item.currentlyEmployed=="Yes"){
         empcurrent  = 'Yes';
        }

        return item._id==this.props.modalidval;
      });
      if(professionalSummarybyId.length>0 && professionalSummary && professionalSummary._id != this.props.modalidval) {
          this.setState({ 
            professionalSummary:professionalSummarybyId[0]
          }); 
      }
      if(professionalSummarybyId.length==0 && typeof professionalSummary._id!='undefined'){
        this.setState({ 
          professionalSummary: Object.assign({
            company_name: '',
            title:'',
            technology: '',
            department: '',
            startDate: '',
            endDate: '',
            project_details:'',
            currentcompany:'',
            currentlyEmployed:'No',
          })
        });
      }
      if(professionalSummary.startDate){
      var startdate =  professionalSummary.startDate.split('T');
      }
      if(professionalSummary.endDate){
      var enddate =  professionalSummary.endDate.split('T');
      }
    }
    return (
	  <div>
      <Modal {...this.props} >
        <div className="modal-header">
         <h4 className="modal-title">Professional Experience</h4>
         <button type="button" className="close" data-dismiss="modal" onClick={this.props.onClickBackdrop}>&times;</button>
        </div>
        <form onSubmit={this.handleSubmit} className="p-3 bg-white">
          <div className="modal-body">
           <div className="row form-group">
                <div className="col-md-12 col-lg-12 mb-3 mb-md-0">
                    <label className="font-weight-bold" htmlFor="fullname">Company Name*</label>
                     <div className={'form-group mb-3' + (submitted && !professionalSummary.company_name ? ' has-error' : '')}>
                        <input type="text" id="instname"  className="form-control " name="company_name" value={professionalSummary.company_name || ''} onChange={this.handleChange}  disabled={this.state.showprofes && empcurrent=='Yes' ? this.state.showprofes : false  }  placeholder="Company Name"/>
                        {submitted && !professionalSummary.company_name &&
                            <div className="help-block red">Company Name is required</div>
                        }
                    </div>
                </div>
            </div>

           <div className="help-block red">{this.state.showprofes && empcurrent=='Yes'? "You are already selected current company, first remove after select current company.":""}</div>
            <div className="row form-group">
               <div className="form-check-inline">
               <span>Is this your current company ? &nbsp;&nbsp; </span>
                        <label className="form-check-label" htmlFor="openRelocation1">
                            <input type="radio" className="form-check-input" name="currentlyEmployed" checked={professionalSummary.currentlyEmployed==="Yes"}   value="Yes" onChange={this.handleChanges.bind(this)} />Yes
                        </label>
                    </div>
                    <div className="form-check-inline">
                        <label className="form-check-label" htmlFor="openRelocation2">
                            <input type="radio" className="form-check-input" name="currentlyEmployed" checked={professionalSummary.currentlyEmployed==="No"} value="No" onChange={this.handleChanges.bind(this)}  />No
                        </label>
                    </div>
            </div>
  



            <div className="row form-group">
                <div className="col-md-12 col-lg-12 mb-3 mb-md-0">
                    <label className="font-weight-bold" htmlFor="fullname">Title*</label>
                    <div className={'form-group mb-3' + (submitted && !professionalSummary.title ? ' has-error' : '')}>
                        <input type="text" id="instname"  className="form-control"  disabled={this.state.showprofes && empcurrent=='Yes' ? this.state.showprofes : false  } name="title" value={professionalSummary.title || ''} onChange={this.handleChange}  placeholder="Title"/>
                        {submitted && !professionalSummary.title &&
                            <div className="help-block red">Title is required</div>
                        }
                    </div>
                 </div>
            </div>
            <div className="row form-group">
                <div className="col-md-12 col-lg-12 mb-3 mb-md-0">
                    <label className="font-weight-bold" htmlFor="fullname">Department Name</label>
                     <div className={'form-group mb-3' + (submitted && !professionalSummary.department ? ' has-error' : '')}>
                        <input type="text" id="instname"  className="form-control " name="department"  disabled={this.state.showprofes && empcurrent=='Yes' ? this.state.showprofes : false  } value={professionalSummary.department || ''} onChange={this.handleChange}  placeholder="Department Name"/>
                        {submitted && !professionalSummary.department &&
                            <div className="help-block red">Department name is required</div>
                        }
                    </div>
                 </div>
            </div>
            <div className="row form-group">
                <div className="col-md-12 col-lg-12 mb-3 mb-md-0">
                    <label className="font-weight-bold" htmlFor="fullname">Duration*</label>
                    <div className="row">
                        <div className="col-md-5 col-lg-5">
                        <input type="date" className="form-control"
                        min="1945-01-01" max="9999-12-31" name="startDate" value={startdate && startdate[0] ?startdate[0]:''}  disabled={this.state.showprofes && empcurrent=='Yes' ? this.state.showprofes : false  } onChange={this.handleChange}  />  
                         {submitted && !professionalSummary.startDate &&
                                  <div className="help-block red">Start date is required</div>
                              }
                        </div>

                    {professionalSummary.currentlyEmployed==="No"? 
                        <div className="col-md-1 col-lg-1 text-center">
                            To
                        </div> 
                        :''} 
                      {professionalSummary.currentlyEmployed==="No"?  
                        <div className="col-md-5 col-lg-5" >
                            <input type="date" className="form-control" min="1945-01-01" max="9999-12-31" name="endDate" value={enddate && enddate[0]?enddate[0]:''} disabled={this.state.showprofes && empcurrent=='Yes' ? this.state.showprofes : false  } onChange={this.handleChange}/>
                              {submitted && !professionalSummary.endDate &&
                                  <div className="help-block red">End date is required</div>
                              } 
                        </div>
                       
                        : ''}

                    </div>
                </div>
            </div>

            <div className="row form-group">

                <div className="col-md-12 col-lg-12 mb-3 mb-md-0">
                    <label className="font-weight-bold" htmlFor="fullname">Project Details</label>
                     <div className={'form-group mb-3' + (submitted && !professionalSummary.project_details ? ' has-error' : '')}>
                          <textarea type="text" className="form-control todolist" id="todolist" cols="30" rows="5" name="project_details"  disabled={this.state.showprofes && empcurrent=='Yes' ? this.state.showprofes : false  }  value={professionalSummary.project_details || ''} onChange={this.handleChange} placeholder="Enter Project Details" ></textarea>
                      </div>     
                </div>
            </div>
        </div>
        <div className="modal-footer">
          <button type="submit" disabled={this.state.showend==true && this.state.showprofes && empcurrent=='Yes' ? this.state.showprofes : false  } className="btn btn-primary">
            Submit
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



export default ProfesionalModal;
