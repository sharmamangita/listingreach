import React from 'react';
import { Link } from 'react-router-dom';
import { userActions } from '../actions';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, NavLink } from 'react-bootstrap';
import Modal from 'react-bootstrap4-modal';
import { connect } from 'react-redux';
import { adminActions } from "../actions";
import 'react-phone-number-input/style.css'
import 'react-responsive-ui/style.css'
import PhoneInput from 'react-phone-number-input/react-responsive-ui'
import moment from "moment";
class UserProfileModal extends React.Component {
    constructor(props, context) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createsocialMediaUI=this.createsocialMediaUI.bind(this);
       
        this.handleSubmit = this.handleSubmit.bind(this);
        this.buildmonths=this.buildmonths.bind(this);
        this.buildyears=this.buildyears.bind(this);
        this.handlesocialMedia=this.handlesocialMedia.bind(this);
        this.handleKeyUp= this.handleKeyUp.bind(this);
        this.state = {
        pherror:'',
        alterpherror:'',
        alternateMobileerror:false,
        social_media: [],
        currentaddress: Object.assign({
          street: '',
          building: '',
          city: '',
          state: '',
          country: '',
          postcode: ''
        },this.props.profile && this.props.profile.currentaddress  ? this.props.profile.currentaddress[0] : ''),
         
        permanentaddress: Object.assign({
          street1: '',
          building1: '',
          city1: '',
          state1: '',
          country1: '',
          postcode1: ''
        },this.props.profile.permanentaddress  ? this.props.profile.permanentaddress[0] : ''),
        defoultsocial_media: Object.assign({
          facebook: '',
          twitter: '',
          instagram: ''
        },this.props.profile && this.props.profile.defoultsocial_media  ? this.props.profile.defoultsocial_media[0] : ''),
       
        user:  Object.assign({

            firstName: '',
            lastName: '',
            middleName:'',
            email: ''
          },this.props.profile),
          dispatchval:this.props.dispatchval.dispatch,
          show: this.props.show,
          employee: Object.assign({
              id:'',
              dateofBirth: '',
              gender: '',
              summary: '',
              currentSalary: '',
              currentlyEmployed: '',
              openRelocation:'',
              authorization:'',
              felony:'',
              phone:'',
              alternateMobile_number:'',
              alternateEmail:'',
              permanentaddressFlag:'',
              experienceYear:'',
              experienceMonth:'',
              expectedSalary: '',
              currentaddress:'',
              permanentaddress:'',
              defoultsocial_media:[],
              social_media:[],
              openTravel:'',
              currentsalaryflag:'',
              expectedsalaryflag:''
          }, this.props.profile  ? this.props.profile : ''),
          restoreFocus:true,
          submitted: false
        };
        
    }

       handleKeyUp(event){
        if(event.target.name=='phone'){
          let phone = event.target.value.trim();
          console.log("phone",phone.length);
          if(phone.length>6 && phone.length<=20){
            this.setState({
              pherror:"",
              submitbtn:false
            }) 
          } else {
             this.setState({
              pherror:"Please enter vaild phone number",
              submitbtn:true
            })
          }
        }

         if(event.target.name=='alternateMobile_number'){
          let alterphone = event.target.value.trim();
          if(alterphone.length==15){
            this.setState({
              alterpherror:"",
              submitbtn:false
            }) 
          } else {
             this.setState({
              alterpherror:"Please enter vaild phone number",
              submitbtn:true
            })
          }
        }

       if(this.state.employee.alternateMobile_number == this.state.employee.phone){
        this.setState({alternateMobileerror:true});
      //return false;
      } else { this.setState({alternateMobileerror:false}); }
   }

   
    buildmonths() {
        var arr = [];
        for (let i = 1; i <= 12; i++) {
            arr.push(<option key={i} >{i}</option>)
        }
        return arr; 
    }
    buildyears() {
        var arr = [];
        for (let i = 0; i <= 50; i++) {
            arr.push(<option key={i} >{i}</option>)
        }
        return arr; 
    }
    handlesocialMedia  ()  {
      this.setState(prevState => ({ social_media: [...prevState.social_media, '']}))
    };
    removeClick(i){
      console.log("this===",i);
     let social_media = [...this.state.social_media];
     console.log("social_media====",social_media);
     social_media.splice(i,1);
     this.setState({ social_media });
    }
    createsocialMediaUI(){
     return this.state.social_media.map((socialmedia, i) => 
         <div className="row form-group" key={i}>
          <div className="col-md-6"  > 
            <input type="text" id="" className="form-control"  name={socialmedia.value} value={socialmedia.value}  onChange={this.handleChanges.bind(this, i)}/>
          </div>
          <div className="col-md-6">
            <a href="javascript:void(0)" className="btn btn-primary rounded" onClick={this.removeClick.bind(this,i)}><span className="icon-minus-circle"></span> Remove</a>
         </div>   
        </div>       
     )
    }

    handleChanges(i,event) {
      console.log("this====",event.target.value);
      
       let social_media = [...this.state.social_media];
       social_media[i] = event.target.value;
       console.log("this==1==",social_media);
     
       this.setState({ social_media });
       console.log("this.setState====",this.state.social_media)

    };

    handleClose() {
      this.setState({ show: false });
     
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { user,employee } = this.state;
        var currentaddress:any = [];
        var permanentaddress:any = [];
        var defoultsocial_media:any=[];
        var socialmedia:any=[];
        currentaddress.push({"street" :this.state.currentaddress.street,"building" :this.state.currentaddress.building, "city":this.state.currentaddress.city,"postcode":this.state.currentaddress.postcode,"state":this.state.currentaddress.state,"country":'US'});
        defoultsocial_media.push(this.state.defoultsocial_media);
        employee.currentaddress=currentaddress;
        employee.defoultsocial_media=defoultsocial_media;
        if(this.state.social_media){
          console.log("this.state.social_media.length===",this.state.social_media);
          for(var i=0; i<this.state.social_media.length; i++){
            socialmedia.push(this.state.social_media[i]);
            console.log("socialmedia====",socialmedia);
         
          }
          employee.social_media=socialmedia;
          console.log('A socialmidea: ' , employee.social_media);
        }
        
        if(this.state.employee.permanentaddressFlag && this.state.employee.permanentaddressFlag=='on'){
          permanentaddress.push({"street1" :this.state.currentaddress.street,"building1" :this.state.currentaddress.building, "city1":this.state.currentaddress.city,"postcode1":this.state.currentaddress.postcode,"state1":this.state.currentaddress.state,"country1":'US'});
          employee.permanentaddress=permanentaddress
        }else{
          permanentaddress.push({"street1" :this.state.permanentaddress.street1,"building1" :this.state.permanentaddress.building1, "city1":this.state.permanentaddress.city1,"postcode1":this.state.permanentaddress.postcode1,"state1":this.state.permanentaddress.state1,"country1":'US'});
          employee.permanentaddress=permanentaddress
       
        }
        const { dispatch } = this.props.dispatchval.dispatch;
        if (user.firstName && user.lastName) {
          dispatch(adminActions.update(employee.id,{user: user,employeeval:employee}));
          
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
        
        if(event.target.name=='gender'){
          let selectedGender = event.target.value;
          this.setState({
            employee:{
              ...employee,
              gender: selectedGender
            }
          });
        }
        if(event.target.name=='relocation'){
          let selectedRelocation = event.target.value;
          this.setState({
            employee:{
              ...employee,
              openRelocation: selectedRelocation
            }
          });
        }
        if(event.target.name=='employed'){
          let selectedemployed = event.target.value;
          this.setState({
            employee:{
              ...employee,
              currentlyEmployed: selectedemployed
            }
          });
        }
        if(event.target.name=='felony'){
          let selectedFelony = event.target.value;
          this.setState({
            employee:{
              ...employee,
              felony: selectedFelony
            }
          });
        }
        const { name, value } = event.target;
        const { user, currentaddress,permanentaddress, employee, defoultsocial_media } = this.state;
         this.setState({
            user: {
                ...user,
                [name]: value
            },
            currentaddress:{
              ...currentaddress,
              [name]: value
            },
            permanentaddress:{
              ...permanentaddress,
              [name]:value
            },
            defoultsocial_media:{
              ...defoultsocial_media,
              [name]:value
            },
            employee:{
              ...employee,
              [name]: value
            }
        });
    }
    
    render() {
      const { user,currentaddress,employee,submitted,permanentaddress,defoultsocial_media,social_media } = this.state;
      const{phone,alternateMobile_number} = this.state.employee;
      var datebirth ='';
      if(this.state.employee.dateofBirth){
        var datebirthval = this.state.employee.dateofBirth;
        var datebirthvalnew = new moment(datebirthval, "YYYY/MM/DD");
        datebirth = moment(datebirthval).format("YYYY-MM-DD");
        employee.dateofBirth=datebirth;
       
      }else{
        employee.dateofBirth=moment().format("YYYY-MM-DD");
      }
     
    return (
	  <div>
      <Modal {...this.props} >
        <div className="modal-header">
         <h4 className="modal-title">Intro</h4>
         <button type="button" className="close" data-dismiss="modal" onClick={this.props.onClickBackdrop}>&times;</button>
        </div>
        <form onSubmit={this.handleSubmit} className="p-3 bg-white">
        
        <div className="modal-body">
              <div className="row form-group">
                  <div className="col-md-12 col-lg-4 mb-3 mb-md-0">
                      <label className="font-weight-bold" htmlFor="fisrtname">First Name</label>
                        <div className={'form-group mb-3' + (submitted && !user.firstName ? ' has-error' : '')}>
                            <input type="text" className="form-control " name="firstName" value={user.firstName} onChange={this.handleChange}  placeholder="First Name"/>
                            {submitted && !user.firstName &&
                                <div className="help-block red">First Name is required</div>
                            }
                        </div>
                  </div>
                  <div className="col-md-12 col-lg-4 mb-3 mb-md-0">
                      <label className="font-weight-bold" htmlFor="middlename">Middle Name</label>
                        <div className={'form-group mb-3' + (submitted && !user.middleName ? ' has-error' : '')}>
                            <input type="text" className="form-control " name="middleName" value={user.middleName} onChange={this.handleChange}  placeholder="Middle Name"/>
                        </div>
                  </div>
                  <div className="col-md-12 col-lg-4  mb-3 mb-md-0">
                      <label className="font-weight-bold" htmlFor="lastname">Last Name</label>
                        <div className={'form-group mb-3' + (submitted && !user.lastName ? ' has-error' : '')}>
                            <input type="text" className="form-control " name="lastName" value={user.lastName} onChange={this.handleChange}  placeholder="Last Name"/>
                            {submitted && !user.lastName &&
                                <div className="help-block red">Last Name is required</div>
                            }
                        </div>
                   </div>
              </div>

              <div className="row form-group">
                  <div className="col-md-12">
                      <label className="font-weight-bold" htmlFor="email">Date of Birth</label>
                      <div className={'form-group mb-3' + (submitted && !employee.dateofBirth ? ' has-error' : '')}>
                            <input type="date" className="form-control " id="dateofBirth" name="dateofBirth" value={employee.dateofBirth} onChange={this.handleChange}  />
                            {submitted && !employee.dateofBirth &&
                                <div className="help-block red">Date of birth is required</div>
                            }
                      </div>

                  </div>
              </div>
            
              <div className="row form-group">
                  <div className="col-md-6">
                      <label className="font-weight-bold" htmlFor="">Current Company Name</label>
                      <div className={'form-group mb-3' + (submitted && !user.companyName ? ' has-error' : '')}>
                        <input type="text" className="form-control " name="companyName" value={user.companyName} onChange={this.handleChange} placeholder="Current Company Name" />
                      </div>
                  </div>

                  <div className="col-md-6">
                      <label className="font-weight-bold" htmlFor="salary">Previous Company Name</label>
                      <div className={'form-group mb-3' + (submitted && !employee.previouscompanyName ? ' has-error' : '')}>
                        <input type="text" className="form-control " name="previouscompanyName" value={user.previouscompanyName} onChange={this.handleChange} placeholder="Previous Company Name" />
                      </div>
                  </div>
              </div>
              <div className="row form-group">
                  <div className="col-md-12 mb-3 mb-md-0">
                      <label className="font-weight-bold" htmlFor="phone">Contact Information</label>
                      <div className="row form-group">
                          <div className="col-md-6">
                            <div className={'form-group mb-3' + (submitted && !employee.phone ? ' has-error' : '')}>
                                    <PhoneInput
                                      placeholder="Enter phone number"
                                      value={ phone ? phone : "+91"}
                                      limitMaxLength={true}
                                      onChange={ phone => this.setState({ employee:{
                                                  ...employee,
                                                  phone : phone
                                                }}) }
                                      onKeyUp={this.handleKeyUp}           
                                   />
                              <div className="help-block red">{this.state.pherror ? "Please enter different mobile number":""}</div>  
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className={'form-group mb-3' + (submitted && !employee.alternateMobile_number ? ' has-error' : '')}>
                                           <PhoneInput
                                              placeholder="Enter phone number"
                                              value={ alternateMobile_number ? alternateMobile_number : "+91"}
                                              limitMaxLength={true}
                                              onChange={ alternateMobile_number => this.setState({ employee:{
                                                          ...employee,
                                                          alternateMobile_number : alternateMobile_number
                                                        }}) }
                                              onKeyUp={this.handleKeyUp}           
                                         />
                            <div className="help-block red">{this.state.alternateMobileerror ? "Please enter different mobile number":""}</div>
                            <div className="help-block red">{this.state.alterpherror ? this.state.alterpherror:''}</div>
                            </div>
                         </div>
                      </div>
                      <div className="row form-group">
                          <div className="col-md-6">
                              <div className={'form-group mb-3' + (submitted && !user.email ? ' has-error' : '')}>
                                <input type="email" className="form-control " name="email" value={user.email || ''} onChange={this.handleChange} placeholder="Email Address" readOnly/>
                              </div>
                          </div>
                          <div className="col-md-6">
                              <div className={'form-group mb-3' + (submitted && !employee.alternateEmail ? ' has-error' : '')}>
                                <input type="email" className="form-control " name="alternateEmail" value={employee.alternateEmail || ''} onChange={this.handleChange} placeholder="Alternate Email Address" />
                              </div>
                          </div>
                      </div>

                  </div>
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
        
      </Modal>
  </div>    
    );
  }
}



export default UserProfileModal;
