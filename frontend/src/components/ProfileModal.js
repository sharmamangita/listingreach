import React from 'react';
import { Link } from 'react-router-dom';
import { userActions } from '../actions';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, NavLink } from 'react-bootstrap';
import Modal from 'react-bootstrap4-modal';
import { connect } from 'react-redux';
import 'react-phone-number-input/style.css'
import 'react-responsive-ui/style.css'
import PhoneInput from 'react-phone-number-input/react-responsive-ui'
import moment from "moment";


class ProfileModal extends React.Component {
    constructor(props, context) {
        super(props);
        const { dispatch } = this.props.dispatchval.dispatch;
        this.state = {isChecked: false};
        this.handleChecked = this.handleChecked.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
       // this.createsocialMediaUI=this.createsocialMediaUI.bind(this,i);
       
        this.handleSubmit = this.handleSubmit.bind(this);
        this.buildmonths=this.buildmonths.bind(this);
        this.buildyears=this.buildyears.bind(this);
        this.handlesocialMedia=this.handlesocialMedia.bind(this);
        this.deleteextlink=this.deleteextlink.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        const Entities = require('html-entities').XmlEntities;
		    const entities = new Entities();
        let user  = JSON.parse(localStorage.getItem('user'));
        this.social_media ='';
        this.state = {
        facebookerror:'',
        twittererror:'',
        pherror:'',
        alterpherror:'',
        instagramerror:'',
        difaultlinkerror:true,
        submitbtn:false,
        alternateMobileerror:false,
        socialmediaerror:'',
        currentemp:false,
        display:false,
        displaycrcm:true,
        social_media: [{ value: null }],
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
          email: '',
          companyName:'',
          previouscompanyName:''
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
              authorization:'H1B',
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
              openTravel:'No',
              currentsalaryflag:'',
              expectedsalaryflag:'',
              designation:''
          }, this.props.profile  ? this.props.profile : ''),
          restoreFocus:true,
          submitted: false
        };
    }

 
    deleteextlink(id){
      var flag = 'socialmedia'
      const { dispatch } = this.props.dispatchval.dispatch;
      dispatch(userActions.delete(id,flag));
    }

    componentDidMount(){
      /*const {employee} = this.state;
      if(this.props.profile){
        employee.social_media = ''
        employee.social_media = this.props.profile.socialmedia + employee.social_media;
      }*/
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
        for (let i = 0; i <= 12; i++) {
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
      if(this.state.display){
      this.setState(prevState => ({ social_media: [...prevState.social_media, { value: null }]}))
      }
      this.setState({display:true});
    };

    removeClick(i){
     if(window.confirm('Are you sure you wish to delete this link?')){
       let social_media = [...this.state.social_media];
       social_media.splice(i,1);
       this.setState({ social_media });
     } 
    }

    createsocialMediaUI(){
     if(this.state.display){
      var i = [...this.state.social_media];
      console.log("socialmediainfo",this.social_media);
      if(this.props.profile.social_media && this.props.profile.social_media.length>0 && this.social_media==''){
       var k = this.props.profile.social_media.length;
         this.social_media = [...this.state.social_media];
      } else if(this.social_media && this.social_media.length>0) {
        this.social_media = [...this.state.social_media];
       var k =  this.social_media.length;
      } 
      var socialmidea = this.state.social_media.map((socialmedia, i) => (
         <div className="row form-group" key={i}>
          <div className="col-md-6"  > 
            <input type="text" id="" className="form-control"  value={socialmedia.value || ""}  name={i} onChange={this.handleChanges.bind(this, i)} />
          </div>
          <div className="col-md-6">
            <a href="javascript:void(0)" className="btn btn-primary rounded"  onClick={this.removeClick.bind(this, i)} ><span className="icon-minus-circle"></span> Remove</a>
         </div>   
        </div>       
     ));
     return socialmidea;
   }
  }
    
  handleChecked () {
    this.setState({isChecked: !this.state.isChecked});
    if (this.state.isChecked) {
        this.setState({
        permanentaddress: Object.assign({
              street1: "",
              building1: "",
              city1:"",
              state1:"",
              country1:"",
              postcode1:""
         })
        });
    } else {
  this.setState({
     permanentaddress: Object.assign({
          street1: this.state.currentaddress.street,
          building1: this.state.currentaddress.building,
          city1: this.state.currentaddress.city,
          state1: this.state.currentaddress.state,
          country1: this.state.currentaddress.country,
          postcode1: this.state.currentaddress.postcode
        })
   });
    }
  }

  handleChanges(i,event) {
      let social_media = [...this.state.social_media];
      social_media[i].value = event.target.value;

      if((/^http/.test(social_media[i].value)) && social_media[i].value && social_media[i].value!=''){
       this.setState({socialmediaerror:''});
       this.setState({ social_media });
      }  else {
       this.setState({difaultlinkerror:false,socialmediaerror:'Please enter vaild  link'})  
      }
     
  }

    handleClose() {
      this.setState({ show: false });
    } 

    handleSubmit(event) {
        event.preventDefault();
        var ftechdata = this.state.social_media;
        this.setState({ submitted: true });
        const { user,employee } = this.state;
        var currentaddress:any = [];
        var permanentaddress:any = [];
        var defoultsocial_media:any=[];
		    var tocity2 = '';
				 if(this.state.currentaddress.city){
				  tocity2= this.state.currentaddress.city.toLowerCase(); 
				} 
          console.log("test1",ftechdata);
        currentaddress.push({"street" :this.state.currentaddress.street,"building" :this.state.currentaddress.building, "city":this.state.currentaddress.city,"postcode":this.state.currentaddress.postcode,"state":this.state.currentaddress.state,"country":'US'});
        defoultsocial_media.push(this.state.defoultsocial_media);
        employee.currentaddress=currentaddress;
        employee.defoultsocial_media=defoultsocial_media;
        if(this.state.social_media[0].value!=null){
          console.log("test2",ftechdata);
          employee.social_media=ftechdata;
        }
        if(this.state.employee.permanentaddressFlag && this.state.employee.permanentaddressFlag=='on'){
          var tocity2 = '';
         if(this.state.currentaddress.city){
          tocity2= this.state.currentaddress.city.toLowerCase(); 
        } 
         permanentaddress.push({"street1" :this.state.currentaddress.street,"building1" :this.state.currentaddress.building, "city1":this.state.currentaddress.city,"postcode1":this.state.currentaddress.postcode,"state1":this.state.currentaddress.state,"country1":'US'});
          employee.permanentaddress=permanentaddress
        }else{
		     var tocity1 = '';
				 if(this.state.permanentaddress.city1){
				  tocity1 = this.state.permanentaddress.city1.toLowerCase(); 
				}
          permanentaddress.push({"street1" :this.state.permanentaddress.street1,"building1" :this.state.permanentaddress.building1, "city1":this.state.permanentaddress.city1,"postcode1":this.state.permanentaddress.postcode1,"state1":this.state.permanentaddress.state1,"country1":'US'});
          employee.permanentaddress=permanentaddress
       
        }
        const { dispatch } = this.props.dispatchval.dispatch;
        var alertnateno = this.state.alternateMobileerror;
        var difaultlinkerror = this.state.difaultlinkerror;
        if (user.firstName && user.lastName && alertnateno==false && difaultlinkerror) {
          dispatch(userActions.update(employee.id,{user: user,employeeval:employee}));
          employee.social_media = '';
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
      console.log("phone",event.target.value);
    if(event.target.name=="alternateEmail" && event.target.value == this.state.employee.email){
    	this.setState({alternateEmailerror:true,submitbtn:true});
    	return false;
    } else { this.setState({alternateEmailerror:false,submitbtn:false}); }

       if(event.target.name=="currentlyEmployed" && event.target.value=="Yes"){
          this.setState({
            displaycrcm:true
          });
      } else if(event.target.name=="currentlyEmployed" && event.target.value=="No"){
         this.setState({
            displaycrcm:false
          });
      }
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
      
     if(event.target.name=="facebook"){
       if(!(/^http/.test(event.target.value))){
        var facebookerror = 'Please enter vaild facebook link';
        this.setState({difaultlinkerror:false,facebookerror:facebookerror});
      } else { this.setState({difaultlinkerror:true,facebookerror:""}); }
    }

    if(event.target.name=="twitter"){
      if(!(/^http/.test(event.target.value))){
        var twittererror = 'Please enter vaild twitter link';
        this.setState({difaultlinkerror:false,twittererror:twittererror});
      } else { this.setState({difaultlinkerror:true,twittererror:""}); }   
    }

    if(event.target.name=="instagram"){
      if(!(/^http/.test(event.target.value))){
        var instagramerror = 'Please enter vaild instagram link';
        this.setState({difaultlinkerror:false,instagramerror:instagramerror});
      } else { this.setState({difaultlinkerror:true,instagramerror:""}); }    
    }

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

    handleCheckbox(event){
      if(event.target.value=='No'){
        this.setState({currentemp:true});
      } else { this.setState({currentemp:false}); }

    }
    
    render() {
      const { user,currentemp,currentaddress,employee,submitted,permanentaddress,defoultsocial_media,social_media,instagramerror,facebookerror,twittererror} = this.state;
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
                  <div className="col-md-6">
                      <label className="font-weight-bold" htmlFor="email">Date of Birth</label>
                      <div className={'form-group mb-3' + (submitted && !employee.dateofBirth ? ' has-error' : '')}>
                            <input type="date" className="form-control" min="1900-01-01" max="9999-12-31"  id="dateofBirth" name="dateofBirth" value={employee.dateofBirth} onChange={this.handleChange}  />
                            {submitted && !employee.dateofBirth &&
                                <div className="help-block red">Date of birth is required</div>
                            }
                      </div>
                  </div>

                  <div className="col-md-6">
                      <label className="font-weight-bold" htmlFor="email">Designation</label>
                      <div className={'form-group mb-3' + (submitted && !employee.designation ? ' has-error' : '')}>
                            <input type="text" className="form-control " id="designation" name="designation" value={employee.designation} onChange={this.handleChange} placeholder="Enter your designation"  />
                            {submitted && !employee.designation &&
                                <div className="help-block red">Designation is required</div>
                            }
                      </div>
                  </div>

              </div>
              <div className="row form-group">
                  <div className="col-md-12" name ="gender" >
                      <label className="font-weight-bold" htmlFor="gender">Gender</label>

                      <div className="form-check-inline">
                          <label className="form-check-label" htmlFor="radio1">
                              <input type="radio" className="form-check-input" id="radio1" name="gender" value="Male" checked={employee.gender === 'Male'} onChange={this.handleChange.bind(this)} />Male
                          </label>
                      </div>
                      <div className="form-check-inline">
                          <label className="form-check-label" htmlFor="radio2">
                              <input type="radio" className="form-check-input" id="radio2" name="gender" value="Female" checked={employee.gender === 'Female'} onChange={this.handleChange.bind(this)} />Female
                          </label>
                      </div>
                      <div className="form-check-inline">
                          <label className="form-check-label" htmlFor="radio3">
                              <input type="radio" className="form-check-input" id="radio3" name="gender" value="Transgender" checked={employee.gender === 'Transgender'} onChange={this.handleChange.bind(this)} />Transgender
                          </label>
                      </div>
                      <div className="form-check-inline">
                          <label className="form-check-label" htmlFor="radio4">
                              <input type="radio" className="form-check-input" id="radio4" name="gender" value="nottosay" checked={employee.gender === 'nottosay'} onChange={this.handleChange.bind(this)} />Rather not to say
                          </label>
                      </div>
                  </div>
              </div>
              <div className="row form-group">
                  <div className="col-md-12 mb-3 mb-md-0">

                      <label className="font-weight-bold" htmlFor="phone">Current Address</label>
                      <div className={'form-group mb-3' + (submitted && !currentaddress.street ? ' has-error' : '')}>
                          <input type="text" className="form-control " name="street" value={currentaddress.street}  onChange={this.handleChange} placeholder="Street" />
                      </div>
                      <div className={'form-group mb-3' + (submitted && !currentaddress.building ? ' has-error' : '')}>
                          <input type="text" className="form-control " name="building" value={currentaddress.building} onChange={this.handleChange} placeholder="Apartment/Building" />
                      </div>
                      <select  className='form-control mb-3' name="country" value={currentaddress.country} onChange={this.handleChange} >
                            <option value="">Select Country</option>
                            <option defaultValue='US' key='US' value='US'>US</option>
                      </select>

                      <div className={'form-group mb-3' + (submitted && !currentaddress.state ? ' has-error' : '')}>
                          <input type="text" className="form-control " name="state" value={currentaddress.state} onChange={this.handleChange} placeholder="State" />
                      </div>
                      <div className={'form-group mb-3' + (submitted && !currentaddress.city ? ' has-error' : '')}>
                          <input type="text" className="form-control " name="city" value={currentaddress.city} onChange={this.handleChange} placeholder="City" />
                      </div>
                      <div className={'form-group mb-3' + (submitted && !currentaddress.postcode ? ' has-error' : '')}>
                          <input type="text" className="form-control " name="postcode" value={currentaddress.postcode} onChange={this.handleChange} placeholder="Zip Code" />
                      </div>
                   </div>
              </div>
              <div className="row form-group">
                  <div className="col-md-12 mb-3 mb-md-0">
                      <label htmlFor="option-price-1">
                          <input type="checkbox" id="permanentaddressFlag"  defaultChecked={employee.permanentaddressFlag} onChange={ this.handleChecked }name="permanentaddressFlag" /> Click here if current and permanent address is same.
                      </label>
                  </div>

              </div>
              <div className="row form-group">
                  <div className="col-md-12 mb-3 mb-md-0">
                      <label className="font-weight-bold" htmlFor="phone">Permanent Address</label>
                      <div className={'form-group mb-3' + (submitted && !permanentaddress.street1 ? ' has-error' : '')}>
                          <input type="text" className="form-control " name="street1" value={permanentaddress.street1}  onChange={this.handleChange} placeholder="Street" />
                      </div>
                      <div className={'form-group mb-3' + (submitted && !permanentaddress.building1 ? ' has-error' : '')}>
                          <input type="text" className="form-control " name="building1" value={permanentaddress.building1} onChange={this.handleChange} placeholder="Apartment/Building" />
                      </div>
                      <select  className='form-control mb-3' name="country1" value={permanentaddress.country1} onChange={this.handleChange} >
                            <option value="">Select Country</option>
                            <option defaultValue='US' key='US' value='US'>US</option>
                      </select>
                      <div className={'form-group mb-3' + (submitted && !permanentaddress.state1 ? ' has-error' : '')}>
                          <input type="text" className="form-control " name="state1" value={permanentaddress.state1} onChange={this.handleChange} placeholder="State" />
                      </div>
                      <div className={'form-group mb-3' + (submitted && !permanentaddress.city1 ? ' has-error' : '')}>
                          <input type="text" className="form-control " name="city1" value={permanentaddress.city1} onChange={this.handleChange} placeholder="City" />
                      </div>
                      <div className={'form-group mb-3' + (submitted && !permanentaddress.postcode1 ? ' has-error' : '')}>
                          <input type="text" className="form-control " name="postcode1" value={permanentaddress.postcode1} onChange={this.handleChange} placeholder="Zip Code" />
                      </div>
                    </div>
              </div>
              <div className="row form-group">
                  <div className="col-md-12">
                      <label className="font-weight-bold" htmlFor="message">Professional Summary</label>
                       <div className={'form-group mb-3' + (submitted && !employee.summary ? ' has-error' : '')}>
                          <textarea type="text"   className="form-control" cols="30" rows="5" name="summary"  value={employee.summary?employee.summary:''} onChange={this.handleChange} placeholder="Say hello to us" ></textarea>
                      </div>
                  </div>
              </div>
              <hr></hr>
              <div className="row form-group">
                  <div className="col-md-6">
                      <label className="font-weight-bold" htmlFor="">Current Salary  (Yearly)</label>
                      <div className={'form-group mb-3' + (submitted && !employee.currentSalary ? ' has-error' : '')}>
                        <input type="text" className="form-control " name="currentSalary" value={employee.currentSalary} onChange={this.handleChange} placeholder="Current salary" />
                      </div>

                      <div className="mb-3 mb-md-0">
                          <label htmlFor="option-price-1">
                              <input type="checkbox" defaultChecked={employee.currentsalaryflag} onChange={this.handleChange} id="currentsalaryflag" name="currentsalaryflag"  /> Show to HR only
                          </label>
                      </div>
                  </div>

                  <div className="col-md-6">
                      <label className="font-weight-bold" htmlFor="salary">Expected Salary*  (Yearly)</label>
                      <div className={'form-group mb-3' + (submitted && !employee.expectedSalary ? ' has-error' : '')}>
                        <input type="text" className="form-control " name="expectedSalary" value={employee.expectedSalary} onChange={this.handleChange} placeholder="Expected salary (Enter N/A if not sure)" />
                      </div>
                      <div className="mb-3 mb-md-0">
                          <label htmlFor="option-price-1">
                              <input type="checkbox" id="expectedsalaryflag"  defaultChecked={employee.expectedsalaryflag} onChange={this.handleChange} name="expectedsalaryflag" /> Show to HR only
                          </label>
                      </div>
                  </div>
              </div>

              <div className="row form-group">
                  <div className="col-md-6" onChange={this.handleChange.bind(this)}>
                      <label className="font-weight-bold" htmlFor="">Currently Employed</label>
                      <br></br>
                      <div className="form-check-inline">
                          <label className="form-check-label" htmlFor="currentlyEmployed1">
                              <input type="radio" className="form-check-input" id="currentlyEmployed1" name="currentlyEmployed" value="Yes"   onChange={this.handleChange} defaultChecked />Yes
                          </label>
                      </div>
                      <div className="form-check-inline">
                          <label className="form-check-label" htmlFor="currentlyEmployed2">
                              <input type="radio" className="form-check-input" id="currentlyEmployed2" name="currentlyEmployed" value="No"  onChange={this.handleChange} />No
                          </label>
                      </div>
                  </div>

                  <div className="col-md-6" onChange={this.handleChange.bind(this)}>
                      <label className="font-weight-bold" htmlFor="salary">Open to Relocation</label>
                      <br></br>
                      <div className="form-check-inline">
                          <label className="form-check-label" htmlFor="openRelocation1">
                              <input type="radio" className="form-check-input" id="openRelocation1" name="openRelocation" value="Yes"  checked={employee.openRelocation === 'Yes'} onChange={this.handleChange.bind(this)} />Yes
                          </label>
                      </div>
                      <div className="form-check-inline">
                          <label className="form-check-label" htmlFor="openRelocation2">
                              <input type="radio" className="form-check-input" id="openRelocation2" name="openRelocation" value="No" checked={employee.openRelocation === 'No'} onChange={this.handleChange.bind(this)} />No
                          </label>
                      </div>
                  </div>
              </div>
              <div className="row form-group">
                  <div className="col-md-6">
                      <label className="font-weight-bold" htmlFor="">Open to Travel</label>
                      <br></br>
                      <select className='form-control mb-3' name="openTravel" value={employee.openTravel } onChange={this.handleChange} >
                          <option >No</option>
                          <option >10%</option>
                          <option >25%</option>
                          <option >50%</option>
                          <option >100%</option>
                      </select>
                  </div>

                  <div className="col-md-6">
                      <label className="font-weight-bold" htmlFor="salary">Work Authorization</label>
                      <select className="form-control mb-3" name="authorization" value={employee.authorization} onChange={this.handleChange} >
                          <option>H1b</option>
                          <option>OPT</option>
                          <option>Green Card</option>
                          <option>Citizen</option>

                      </select>
                  </div>
              </div>

    

            
              <div className="row form-group" >
                  <div className="col-md-6">
                      <label className="font-weight-bold" htmlFor="">Felony</label>
                      <br></br>
                      <div className="form-check-inline">
                          <label className="form-check-label" htmlFor="radio5">
                              <input type="radio" className="form-check-input"  name="felony" value="Yes" checked={employee.felony === 'Yes'} onChange={this.handleChange.bind(this)}/>Yes
                          </label>
                      </div>
                      <div className="form-check-inline">
                          <label className="form-check-label" htmlFor="radio6">
                              <input type="radio" className="form-check-input"  name="felony" value="No" checked={employee.felony === 'No'} onChange={this.handleChange.bind(this)}/>No
                          </label>
                      </div>
                  </div>

                  <div className="col-md-6">
                      <label className="font-weight-bold" htmlFor="salary">Total Years of Experience</label>
                      <br></br>
                      <div className="form-check-inline" >
                        <select className="form-control mb-3" name="experienceYear" value={employee.experienceYear} onChange={this.handleChange} >
                         {this.buildyears()}
                        </select> Years
                      </div>
                      <div className="form-check-inline">
                          <select className="form-control mr-1" id="months" name="experienceMonth"  value={employee.experienceMonth} onChange={this.handleChange}>
                             {this.buildmonths()}
                          </select> Months
                      </div>
                  </div>
              </div>
              <hr></hr>
              <div className="row form-group">
                  <div className="col-md-12 mb-3 mb-md-0">
                      <label className="font-weight-bold" htmlFor="phone">Contact Information</label>
                      <div className="row form-group">
                      <div className="col-md-6">
            						<PhoneInput
                          displayInitialValueAsLocalNumber={false}
            						  placeholder="Enter phone number"
            					    limitMaxLength={true}
            						  value={phone?phone:'+91'}
            						  onChange={ phone => this.setState({ employee:{
            						              ...employee,
            						              phone : phone
            						            }}) }
                          onKeyUp={this.handleKeyUp}           
            						 />



                        <div className="help-block red"> {this.state.pherror?this.state.pherror:''} </div>
						         </div>

              <div className="col-md-6">
							 <PhoneInput
							  placeholder="Enter alternate mobile number"
							  name = "alternateMobile_number"
							  value={alternateMobile_number?alternateMobile_number:"+91"}
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
                      <div className="row form-group">
                          <div className="col-md-6">
                              <div className={'form-group mb-3' + (submitted && !user.email ? ' has-error' : '')}>
                                <input type="email" className="form-control " name="email" value={user.email || ''} onChange={this.handleChange} placeholder="Email Address" readOnly/>
                              </div>
                          </div>
                          <div className="col-md-6">
                              <div className={'form-group mb-3' + (submitted && !employee.alternateEmail ? ' has-error' : '')}>
                                <input type="email" className="form-control " name="alternateEmail" value={employee.alternateEmail || ''} onChange={this.handleChange} placeholder="Alternate Email Address" />
                              <div className="help-block red">{this.state.alternateEmailerror ? "Please enter different email address.":''}</div>
                              </div>
                          </div>
                      </div>

                  </div>
              </div>
              <div className="row form-group">
                  <div className="col-md-12 mb-3 mb-md-0">
                      <label className="font-weight-bold" htmlFor="phone">Social Media</label>

                      <div className="row form-group">
                          <div className="col-md-6">
                              <div className="input-wrap">
                                  <span className="icon icon-facebook-square"></span>
                                  <input type="text" className="form-control px-5" id="" name="facebook" value={defoultsocial_media.facebook}  onChange={this.handleChange} placeholder="Facebook" />
                                 <div className="help-block red">{facebookerror}</div>  
                              </div>
                          </div>
                      </div>
                      <div className="row form-group">
                          <div className="col-md-6">
                              <div className="input-wrap">
                                  <span className="icon icon-twitter-square"></span>
                                  <input type="text" className="form-control px-5" id="" name="twitter" value={defoultsocial_media.twitter} onChange={this.handleChange} placeholder="Twitter" />
                                   <div className="help-block red">{twittererror}</div> 
                              </div>
                          </div>
                      </div>
                      <div className="row form-group">
                          <div className="col-md-6">
                              <div className="input-wrap">
                                  <span className="icon icon-instagram"></span>
                                  <input type="text" className="form-control px-5" id=""  name="instagram" value={defoultsocial_media.instagram} onChange={this.handleChange} placeholder="Instagram" />
                                  <div className="help-block red">{instagramerror}</div> 
                              </div>
                          </div>
                      </div>
                      {employee.social_media && employee.social_media.map(function(socialmedia, i){
                        return <div key={i}><div className="row form-group" >
                            <div className="col-md-6"  > 
                              <input type="text" id={i} className="form-control"  value={socialmedia.value || ""}  onChange={e => this.handleChanges(i, e)}/>
                            </div>
                            <div className="col-md-6">
                                <a href="javascript:void(0)" className="btn btn-primary rounded" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this link?')) this.deleteextlink(socialmedia._id) } } ><span className="icon-minus-circle"></span> Remove</a>
                            </div>    
                          </div> 
                          </div>; 
                      }, this)}
                      { this.state.display ? this.createsocialMediaUI() : ""}
                     
                      <div className="col-md-6">
                          <a href="javascript:void(0)" className="btn btn-primary rounded" onClick={this.handlesocialMedia}><span className="icon-plus-circle"></span> Add More</a>
                      </div>
                        <div className="help-block red">{this.state.socialmediaerror}</div> 
                  </div>
              </div>

          
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-primary" onClick={this.onFirePhasers} disabled={this.state.submitbtn}>
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



export default ProfileModal;
