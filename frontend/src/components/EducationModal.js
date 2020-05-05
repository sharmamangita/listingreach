import React from 'react';
import { Link } from 'react-router-dom';
import { userActions } from '../actions';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, NavLink } from 'react-bootstrap';
import Modal from 'react-bootstrap4-modal';
import { connect } from 'react-redux';
import { common } from '../helpers';
import moment from "moment";

class EducationModal extends React.Component {
    constructor(props, context) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.buildmonths=this.buildmonths.bind(this);
        this.buildyears=this.buildyears.bind(this);
        this.handlechecked=this.handlechecked.bind(this);
        
        let user  = JSON.parse(localStorage.getItem('user'));
        this.state = {
          isChecked:true,
          otherfield:false,
          yearerror:false,
          education: {
            id:'',
            institute_name: '',
            degree_name: '',
            duration: '',
            percentage: '',
            major: '',
            year_from:'',
            year_to:'',
            gpaflag:false,
            othereducation:''
          },
          user:  Object.assign({
            firstName: '',
            lastName: '',
            middleName:'',
            email: ''
          },this.props.profile),
          dispatchval:this.props.dispatchval.dispatch,
          modalid: this.props.modalid ? this.props.modalid : '',
          show: this.props.showeducation,
          employee:Object.assign({
            education:[]
          },this.props.profile  ? this.props.profile : ''),
          restoreFocus:true,
          submitted: false
        };
        
    }
    
    buildmonths() {
        var arr = [];
        for (let i = 1; i <= 12; i++) {
            arr.push(<option key={i} >{i}</option>)
        }
        return arr; 
    }

    handlechecked(){
     
    }

    buildyears() {
        var arr = [];
        var year1 = moment().format('YYYY');
        var year2 = moment().year();
       
        for (let i = 1950; i <= year2; i++) {
            arr.push(<option key={i} >{i}</option>)
        }
        return arr; 
    }
   
    handleClose() {
      this.props.onClickBackdrop();
      this.setState({ show: false });
    }

    handleSubmit(event) {
        event.preventDefault();
        var thisobj=this;
        this.setState({ submitted: true });
        const { user,employee ,education} = this.state;
        if(this.props.modalid){
          /*var educationwithId = this.props.profile.education.filter(item => {
            return item._id.toString() == this.props.modalid.toString()
          });*/      
          //educationwithId = Object.assign(educationwithId,this.state.education);
            if(employee.education.length>0){
              for(var i=0; i<this.props.profile.education.length;i++){
                if(this.props.profile.education[i]._id.toString()== thisobj.props.modalid.toString()){
                  this.props.profile.education[i]=thisobj.state.education;
                }
              }
            }
            setTimeout(() => {
              var edudata = this.state.education;
              const { dispatch } = this.props.dispatchval.dispatch;
              if (user.firstName && user.lastName && edudata.institute_name && edudata.degree_name && edudata.major ) {
                dispatch(userActions.update(employee.id,{user: user,employeeval:this.props.profile}));
                this.setState({
                  education:[]
                });
                this.handleClose();
              }
          }, 400);
        } else {
         
          const { dispatch } = this.props.dispatchval.dispatch;
          var edudata = this.state.education;
            if (user.firstName && user.lastName && edudata.institute_name && edudata.degree_name && edudata.major ) {
              employee.education.push(this.state.education);
              dispatch(userActions.update(employee.id,{user: user,employeeval:employee}));
              this.setState({
                education:[]
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
    
    handleChange(event) {
      if(this.props.modalid){
          this.setState({
            education:{
              ...education,
              _id: this.props.modalid
            }
          });
        }
        if(event.target.name=='degree_name'){

          let level = event.target.value;
          this.setState({
            education:{
              ...education,
              degree_name: level
            }
          });
          if(event.target.value=="Others"){
            this.setState({
            otherfield:true
          });
          } else{
            this.setState({
            otherfield:false
          });
          }
        }
        if(event.target.name=='year_from'){
          let yearfrom = event.target.value;
          this.setState({
            education:{
              ...education,
              year_from: yearfrom
            }
          });
        }
     
        if(event.target.name=='othereducation' && this.state.otherfield){
          let othereducation = event.target.value;
          this.setState({
            education:{
              ...education,
              othereducation:othereducation
            }
          });
        }

        if(event.target.name=='year_to'){
          let yearto = event.target.value;

          if(this.state.education.year_from > event.target.value){
             this.setState({yearerror:true});
          } else {
          this.setState({
            education:{
              ...education,
              year_to: yearto
            }
          });
          this.setState({yearerror:false});
          }
        }
        if(event.target.name=='month_from'){
          let monthfrom = event.target.value;
          this.setState({
            education:{
              ...education,
              month_from: monthfrom
            }
          });
        }
         if(event.target.name=='month_to'){
          let monthto = event.target.value;
          this.setState({
            education:{
              ...education,
              month_to: monthto
            }
          });
        }
      
         
        const { name, value } = event.target;
        const { user,  employee, education } = this.state;
        console.log("this.state===",this.state);
         this.setState({
            education:{
              ...education,
              [name]:value
            },
            employee:{
              ...employee,
              [name]: value
            }
        });

             if(event.target.name=='gpaflag'){
             this.setState({isChecked: !this.state.isChecked});
                  this.setState({
                  education:{
                    ...education,
                    gpaflag: this.state.isChecked
                  }
                });
         } 

        
    }
    
    render() {
      const { user,employee,submitted,education,modalid } = this.state;
      if(this.props.profile.education){
        
         var filteredEmployee = this.props.profile.education.filter(item => {
          console.log("item._id====",item._id);
          return item._id==this.props.modalid;
        });
       

        if(filteredEmployee.length > 0 && education &&  education._id != this.props.modalid) {
          this.setState({ 
            education:filteredEmployee[0]
          });
        }
        if(filteredEmployee.length==0 && typeof education._id!='undefined'){
          this.setState({ 
            education: Object.assign({
              institute_name: '',
              degree_name: '',
              duration: '',
              percentage: '',
              major: '',
              year_from:'',
              year_to:'',
              gpaflag:false,
              othereducation:''
            })
          }); 
        }

       
        if(this.props.profile.education && this.props.profile.education.length>0){
         var submitbtn = false;
         this.props.profile.education.filter(item => {
          if(item.institute_name==this.state.education.institute_name && item.degree_name==this.state.education.degree_name && ! this.props.modalid){
            submitbtn =true;
          }
        })
      }     
    }
    
    return (
	  <div>
      <Modal {...this.props} >
        <div className="modal-header">
         <h4 className="modal-title">Education</h4>
         <button type="button" className="close" data-dismiss="modal" onClick={this.props.onClickBackdrop}>&times;</button>
        </div>
        <form onSubmit={this.handleSubmit} className="p-3 bg-white">
        
          <div className="modal-body">
            <div className="row form-group">
                <div className="col-md-12 col-lg-12 mb-3 mb-md-0">
                    <label className="font-weight-bold" htmlFor="fullname">Institute Name*</label>
                    <div className={'form-group mb-3' + (submitted && !education.institute_name ? ' has-error' : '')}>
                        <input type="text" id="instname"  className="form-control " name="institute_name" value={education.institute_name || ''} onChange={this.handleChange}  placeholder="Institute Name"/>
                        {submitted && !education.institute_name &&
                            <div className="help-block red">Institute Name is required</div>
                        }
                    </div>
                </div>
            </div>
            <div className="row form-group">
                <div className="col-md-12 col-lg-12 mb-3 mb-md-0">
                    <label className="font-weight-bold" htmlFor="fullname">Level*</label>
                    <select className="form-control mb-3" id="level" name="degree_name" value={education.degree_name || ''} onChange={this.handleChange}>
                        <option>Select</option>
                        {common.lavel && common.lavel.map((item) => <option  key={item.name} value={item.value}>{item.name}</option>)}
                    </select>

                </div>
            </div>

           {this.state.otherfield || education.degree_name=="Others" ? 
            <div className="row form-group">
                <div className="col-md-12 col-lg-12 mb-3 mb-md-0">
                    <label className="font-weight-bold" htmlFor="fullname">Other *</label>
                    <div className={'form-group mb-3' + (submitted && !education.othereducation ? ' has-error' : '')}>
                        <input type="text" id="othereducation"  className="form-control " name="othereducation" value={education.othereducation || ''} onChange={this.handleChange}  placeholder="Plese enter your education."/>
                        {submitted && !education.othereducation &&
                            <div className="help-block red">This field is required.</div>
                        }
                    </div>
                </div>
            </div>
            :''}

            <div className="row form-group">
                <div className="col-md-12 col-lg-12  mb-3 mb-md-0">
                    <label className="font-weight-bold" htmlFor="fullname">Year Attended*</label>
                    <div className="form-check-inline">
                        <select className="form-control mb-3" name="year_from" value={education.year_from || ''} onChange={this.handleChange} >
                         {this.buildyears()}
                        </select> Years
                    </div>
                    <div className="form-check-inline">
                        <select className="form-control mr-1" id="months" name="month_from"  value={education.month_from || ''} onChange={this.handleChange}>
                            {this.buildmonths()}
                        </select> Months
                    </div>
                    <b>To</b>
                    <div className="form-check-inline">
                        <select className="form-control mb-3" name="year_to" value={education.year_to || ''} onChange={this.handleChange} >
                         {this.buildyears()}
                        </select> Years
                    </div>
                    
                    <div className="form-check-inline">
                        <select className="form-control mr-1" id="months" name="month_to"  value={education.month_to || ''} onChange={this.handleChange}>
                            {this.buildmonths()}
                        </select> Months
                    </div>
                       {this.state.yearerror?
                      <div className="help-block red">To year should be greater then From year. </div>
                      :""}
                </div>
            </div>
            <div className="row form-group">

                <div className="col-md-12 col-lg-12 mb-3 mb-md-0">
                    <label className="font-weight-bold" htmlFor="fullname">Major*</label>
                    <div className={'form-group mb-3' + (submitted && !education.major ? ' has-error' : '')}>
                        <input type="text" id="instname"  className="form-control " name="major" value={education.major || ''} onChange={this.handleChange}  placeholder="Major"/>
                        {submitted && !education.major &&
                            <div className="help-block red">Major Name is required</div>
                        }
                    </div>
                </div>
            </div>
            <div className="row form-group">
                <div className="col-md-12 col-lg-12 mb-3 mb-md-0">
                    <label className="font-weight-bold" htmlFor="fullname">GPA*</label>
                    <div className={'form-group mb-3' + (submitted && !education.percentage ? ' has-error' : '')}>
                        <input type="text" id="instname"  className="form-control " name="percentage" value={education.percentage || ''} onChange={this.handleChange}  placeholder="GPA"/>
                        {submitted && !education.percentage &&
                            <div className="help-block red">GPA Name is required</div>
                        }
                    </div>
                    <label htmlFor="option-price-1">
                     {education.gpaflag ? 
                        <label htmlFor="option-price-1">
                              <input type="checkbox" defaultChecked={true}  onChange={this.handleChange} id="gpaflag" name="gpaflag"  /> <i>Won’t be shown on results page if check-marked </i>
                        </label>
                        : 
                           <label htmlFor="option-price-1">
                              <input type="checkbox" defaultChecked={false}  onChange={this.handleChange} id="gpaflag" name="gpaflag"  /> <i>Won’t be shown on results page if check-marked </i>
                        </label>
                      }
                    </label>
                </div>
            </div>
          </div>
        <div className="modal-footer">
        {submitbtn ? 
        <div className="help-block red">This education details already added.</div>
        :''}
          <button type="submit" className="btn btn-primary" onClick={this.onFirePhasers} disabled={submitbtn}>
            Submit
          </button>
          <button type="button" onClick={this.handleClose} className="btn btn-secondary" >
            Cancel
          </button>
        </div>
        </form>
        
      </Modal>
  </div>    
    );
  }
}



export default EducationModal;
