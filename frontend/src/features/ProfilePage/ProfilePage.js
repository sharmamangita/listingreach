import React from 'react';
import config from 'config';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../actions';
/*import {Modal,Button} from 'react-bootstrap';*/
import ProfileModal from '../../components/ProfileModal';
import ViewedProfile from '../../components/ViewedProfile';
import EducationModal from '../../components/EducationModal';
import ProfesionalModal from '../../components/ProfesionalModal';
import ImprovementsModal from '../../components/ImprovementsModal';
import ProfileimageModal from '../../components/ProfileimageModal';
import ProfilecoverModal from '../../components/ProfilecoverModal';
import StrengthsModal from '../../components/StrengthsModal';
import KeywordskillModal from '../../components/KeywordskillModal'
import CommonDownload from '../../components/CommonDownload'
import StarRatings from 'react-star-ratings';
import StarRatingComponent from 'react-star-rating-component';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

import ReadMoreAndLess from 'react-read-more-less';

import moment from "moment";
import queryString from 'query-string';

import PaypalExpressBtn from 'react-paypal-express-checkout';
import PaypalButton from '../../components/PaypalButton';
var QRCode = require('qrcode.react');
import { Button,Modal } from 'react-bootstrap';
import { Alert } from 'reactstrap';

class ProfilePage extends React.Component {
constructor(props) {
  super(props);
  let id='';
    this.dymskill = {};
  if(this.props.user){
     id= this.props.user.userId; 
  }
  
  const { dispatch } = this.props;
  const values = queryString.parse(this.props.location.search);
  this.candidateId='';
  if(!$.isEmptyObject(values ) ){
     id=values.id;
     this.candidateId=values.id;
  }

  var user  = JSON.parse(localStorage.getItem('user'));
  this.planPrice=''; 
  this.social_mediaicon=[];
  this.candidatesplanPrice='';
  this.props.dispatch(userActions.getById(id));
  this.props.dispatch(userActions.getdownloadedby(id));
  this.props.dispatch(userActions.getReferences(id));  
  this.navId = '';
  this.dispatchval = ({
      tagName : 'span',
      className : '',
      children : null,
      dispatch :this.props
  });
  this.state = {
    appdis:false,
    revupdate:true,
    visible : false,
    heratbeat:false,
    showconfirm:false,
    showEduItem:3,
    showKeyskillItem:3,
    showKeyskillDes:4,
    user: this.props.user,
    showProItem:3, 
    expanded:false,
    expandedrew:false,
    expandededu:false,
    expandedskill:false,
    showMore:'none',   
    showprofile:'',  
    profile:this.props.profile,
    review:this.props.review,
    downloaded:this.props.downloaded,
    show: false,
    showeducation:false,
    showstrengths:false,
    showkeywordskill:false,
    showprofesional:false,
    showimprovements:false,
    showprofileimage:false,
    showprofilecover:false,
    selectedMenu:'',
    reviewref:this.props.items,
    showsharelinks:false,
    showrewitem:3,
    statusid:'',
    user:  Object.assign({
        firstName: '',
        lastName: '',
        email: '',
        companyName:'',
        fullName:'',
        savedcandidates:'',
        flag:''
      },user)
  }; 
  this.showProMore = this.showProMore.bind(this);
  this.showrewMore = this.showrewMore.bind(this);
  this.showEduMore = this.showEduMore.bind(this);
  this.showSkillMore = this.showSkillMore.bind(this);
  this.onShowAlert = this.onShowAlert.bind(this);
  this.handleShow = this.handleShow.bind(this);
  this.approvedclick = this.approvedclick.bind(this);
  this.confirmBox = this.confirmBox.bind(this);
  this.getAge = this.getAge.bind(this);
  this.getbirth = this.getbirth.bind(this);  
  this.getsummary=this.getsummary.bind(this);
  this.showMorefun=this.showMorefun.bind(this);
  this.deleteEducationItem=this.deleteEducationItem.bind(this);
  this.deleteSkillItem=this.deleteSkillItem.bind(this);
  this.handlesharelinks = this.handlesharelinks.bind(this);
  this.registerdate =this.registerdate.bind(this);
  this.deleteProfItem=this.deleteProfItem.bind(this);
  this.editdeletebutton=this.editdeletebutton.bind(this);
  this.handleClose=this.handleClose.bind(this);
  this.closebtn = this.closebtn.bind(this);
  this.onStarClickHalfStar = this.onStarClickHalfStar.bind(this);
  this.getkeywordreview = this.getkeywordreview.bind(this);
 // this.updatetotalreview = this.updatetotalreview.bind(this);
  
  //this.skillsreviews = this.skillsreviews.bind(this);
 if(localStorage.getItem('srcid') && localStorage.getItem('srcid') !== "undefined"){
   localStorage.removeItem("srcid"); 
 }
}




onStarClickHalfStar(nextValue, prevValue, name, e) {
	if(name=='communication'){
		const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;
		if (xPos <= 0.5) {
		  nextValue -= 0.5;
		}
		this.setState({communication: nextValue});
	}
	else if(name=='ownership'){
		const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;
		if (xPos <= 0.5) {
		  nextValue -= 0.5;
		}
		this.setState({ownership: nextValue});
    } 
    else if(name=='stafdrive'){
    	const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;
		if (xPos <= 0.5) {
		  nextValue -= 0.5;
		}

		this.setState({stafdrive: nextValue}); 
    } 
    else if(name=='overall'){
    	
		const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;
		if (xPos <= 0.5) {
		  nextValue -= 0.5;
		}
		this.setState({overall: nextValue});
    } 
    else {
  		const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;
		if (xPos <= 0.5) {
		  nextValue -= 0.5;
		}

		this.technical[name] = nextValue;
  		this.setState({datalan:nextValue});
	}
}
/* update totaloverll in employee for advanced search 
updatetotalreview(reviews){
 if(reviews && this.state.revupdate){
   this.setState({revupdate:false})
   var empdata  = JSON.parse(localStorage.getItem('user'));
   var employee = [];
   employee['id'] =empdata.userId;
   if(employee){
     var updatereview = {"id":employee.id,"totaloverall":reviews};
   const { dispatch } = this.props;
   dispatch(userActions.update(employee.id,{employeeval:updatereview}));
   return true;
   }
 }
}
*/ 


/* key words skills rating */ 
getkeywordreview(getkeyword){
  if(this.props.items && this.props.items.length>0 && this.props.review){
    var count=0;
    var star=0;
    var obj = this.props.review;
    var finalstar=0;
    this.props.items.map(function(item){
      if(item.technicalexp && typeof item.technicalexp !== "undefined" ){
        var result = Object.keys(item.technicalexp).map(function(item) {
          if(item==getkeyword){
            var result = Object.keys(obj).map(function(key) {
              if(key==getkeyword){
                if(key==item){
                  count++;
                }
                finalstar=obj[key];
              }
            });
           }
        });

          let multikeyword = count*5;
           star =  (finalstar*5)/multikeyword;

        //star=finalvalue/count;
      } 
    });
    return (<div>
      <StarRatingComponent
      name="keryss"
      starColor="#ffb400"
      emptyStarColor="#ffb400"
      value={star}
      renderStarIcon={(index, value) => {
          return (
            <span>
              <i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
            </span>
          );
        }
      }
      renderStarIconHalf={() => {
        return (
          <span>
          <span style={{position: 'absolute'}}><i className="far fa-star" /></span>
          <span><i className="fas fa-star-half" /></span>
          </span>
        );
      }} />
  </div>)
    
  }
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
        restoreFocus:true,
        profile:this.props
     });
}
 componentDidMount(){
  if(this.candidateId){
    const {user} = this.state;
    const { dispatch } = this.props;
    user.savedcandidates=this.candidateId;
    user.flag="viewed";
    dispatch(userActions.viewdCandidates(user));
  }
 }

  confirmbox(e){
    this.setState({show:true});
  }

  closebtn(){
    this.setState({visible:false})
  }
     
 approvedclick(){
    var id  = this.state.appid;
      if(id){
      var reviewid = {
        'status':id
      };
  this.props.dispatch(userActions.updateStatus(reviewid));
  window.location.reload();
  this.setState({appdis:true});
  this.handleClose();
  }
 }

  showMorefun(){
     this.state.showMore='none';
     return this.state.showMore; 
  }

  confirmBox(e){
      var id = e;
    this.setState({appid:id,showconfirm:true});
    this.approvedclick();
  }

 handleClose() {
  this.setState({ showconfirm: false });
 }


  getsummary (summary) {
    return summary; 
  }
  getbirth(birth){
    var birthday = new moment(birth, "YYYY-MM-DD");
    var currDate = moment();
    var currDate = moment(birthday).format("MM/DD/YYYY");
    return currDate;
  }
  getAge(DOB) {
    var expDate = moment(DOB);
    var currDate = moment();
    var years = expDate.diff(currDate, 'year');
    currDate.add(years, 'years');
    var months = expDate.diff(currDate, 'months');
    currDate.add(months, 'months');
    var days = expDate.diff(currDate, 'days');
    
    var monthsval='';
    var daysval='';
    var yearsval ='';
    if(years!=0){
      yearsval =years + ' Years ';
      yearsval= yearsval.substring(1);
    }
    if(months!=0){
       monthsval =months + ' Months ';
       monthsval= monthsval.substring(1);
    }
    if(days!=0){
      daysval =days + ' Days ';
      daysval= daysval.substring(1)
    }
    
    return  yearsval +  monthsval+  daysval;
  }


  registerdate(dateval) {
    var datevalue = new moment(dateval, "YYYY-MM-DD");
    var currDate = moment();
    var currDate = moment(datevalue).format("MMMM Do YYYY");
    return currDate;
  }
  getexperince(startdate,enddate,currentlyEmployed) {
    var startDate = new moment(startdate, "YYYY-MM-DD");
    var startDateden = moment(startDate).format("MMM  YYYY");
    if(enddate==null){
      enddate = moment();
    }
    var endDate = new moment(enddate, "YYYY-MM-DD");
    var years = endDate.diff(startDate, 'year');
    var endDates = moment(endDate).format("MMM  YYYY");
    startDate.add(years, 'years');
    var months = endDate.diff(startDate, 'months');
    startDate.add(months, 'months');
    var startDates = moment(startDate).format("MMM  YYYY");
    if(currentlyEmployed=="Yes"  ){
       return startDateden+'-'+'Till'+', '+years + ' years ' + months + ' months '; //20-01-1985, 34 yrs & 105days
    } else {
       return startDateden+'-'+endDates+', '+years + ' years ' + months + ' months '; //20-01-1985, 34 yrs & 105days
    }
   
  }

  renderProfileModal() {
    let modalClose = () => this.setState({ show: false });
    return (
      <ProfileModal dispatchval = {this.dispatchval} profile={this.state.profile} users={this.state.user} visible={this.state.show} onClickBackdrop={modalClose}  dialogClassName="modal-lg"/>
    );
  }

  renderProfileimageModal() {
    let modalClose = () => this.setState({ showprofileimage: false });
    return (
      <ProfileimageModal modalid={this.state.modalid} dispatchval = {this.dispatchval} profile={this.state.profile} users={this.state.user} visible={this.state.showprofileimage} onClickBackdrop={modalClose}  dialogClassName="modal-lg"/>
    );
  }

  renderProfilecoverModal() {
    let modalClose = () => this.setState({ showprofilecover: false });
    return (
      <ProfilecoverModal modalid={this.state.modalid} dispatchval = {this.dispatchval} profile={this.state.profile} users={this.state.user} visible={this.state.showprofilecover} onClickBackdrop={modalClose}  dialogClassName="modal-lg"/>
    );
  }

  renderEducationModal() {
    let modalClose = () => this.setState({ showeducation: false });
    return (
        <EducationModal modalid={this.state.modalid} dispatchval = {this.dispatchval} profile={this.state.profile} users={this.state.user} visible={this.state.showeducation} onClickBackdrop={modalClose}  dialogClassName="modal-lg"/>
    );
  }

  deleteEducationItem(id,flag){
      this.props.dispatch(userActions.delete(id,flag));
  }

  deleteSkillItem(id,flag){
  	this.props.dispatch(userActions.delete(id,flag));
  }

  deleteProfItem(id,flag){
    this.props.dispatch(userActions.delete(id,flag));
  }

  renderprofesionalModal() {
    let modalClose = () => this.setState({ showprofesional: false });
    return (
      <ProfesionalModal modalidval={this.state.modalidval} dispatchval = {this.dispatchval} profile={this.state.profile} users={this.state.user} visible={this.state.showprofesional} onClickBackdrop={modalClose}  dialogClassName="modal-lg"/>
    );
  }

  renderKeywordskillModal(){
    let modalClose = () => this.setState({ showkeywordskill: false });
    return (
      <KeywordskillModal modalkeywordskill={this.state.modalkeywordskill} dispatchval = {this.dispatchval} profile={this.state.profile} users={this.state.user} visible={this.state.showkeywordskill} onClickBackdrop={modalClose}  dialogClassName="modal-lg"/>
    );
  }

  renderimprovementsModal() {
    let modalClose = () => this.setState({ showimprovements:false });
    return (
      <ImprovementsModal modalimprov={this.state.modalimprov} dispatchval = {this.dispatchval} profile={this.state.profile} users={this.state.user} visible={this.state.showimprovements} onClickBackdrop={modalClose}  dialogClassName="modal-lg"/>
    );
  }

  renderstrengthsModal(){
    let modalClose = () => this.setState({ showstrengths: false });
    return (
    <StrengthsModal modalidstr={this.state.modalidstr} dispatchval = {this.dispatchval} profile={this.state.profile} users={this.state.user} visible={this.state.showstrengths} onClickBackdrop={modalClose}  dialogClassName="modal-lg"/>
    );
  }

  handlesharelinks(e){
  	this.setState({
  	showsharelinks: !this.state.showsharelinks
  	})
  }

  editdeletebutton(educations, modalsOpen,flag) {
  	if(this.props.user && ( this.props.user.userId==this.candidateId || this.candidateId=='')  ){
      if(flag=='edu'){
        return (<div><div  className="right">
              <a href="javascript:void(0)" className="pl-1" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this education?')) this.deleteEducationItem(educations._id,'education') } } ><span className="right icon-delete font-18" name={educations._id} ></span></a>
        </div>
        <a href="javascript:void(0)" className="pl-0" data-toggle="modal" data-id={educations._id} data-target="#edu" onClick={modalsOpen} ><span className="right icon-edit font-18" name={educations._id} ></span></a></div>);
      }
      if(flag=='prof'){
         return (<div><div  className="right">
              <a href="javascript:void(0)" className="pl-1" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this Professional Experience?')) this.deleteEducationItem(educations._id,'professional') } } ><span className="right icon-delete font-18" name={educations._id} ></span></a>
         </div>
         <a href="javascript:void(0)" className="pl-0" data-toggle="modal" data-id={educations._id} data-target="#prof" onClick={modalsOpen} ><span className="right icon-edit font-18" name={educations._id} ></span></a></div>);
      }
    }
  }

  saveProfiles(flag,paidOn,id){
    const {user} = this.state;
    const { dispatch } = this.props;
    user.savedcandidates=this.candidateId;
    user.flag=flag;
    this.setState({visible:true,heratbeat:true});
    this.onShowAlert();
    if(flag=='downloaded'){
      setTimeout(() => {
        setTimeout(() => {
          window.open(`${config.uploadapiUrl}/uploads/user${this.candidateId}.pdf`, '_blank', 'location=no,height=700,width=850,scrollbars=yes,status=yes');
          
        }, 200);
      }, 100);
    }else{

      dispatch(userActions.savedCandidates(user));
    }
  }
  
  onShowAlert(){
    this.setState({visible:true},()=>{
      window.setTimeout(()=>{
        this.setState({visible:false})
      },2000)
    });
  }

render() {
  const { profile,review,plan, user,downloaded,items,downloadHr} = this.props;
  let modalOpen = () => this.setState({ show: true ,profile:this.props.profile});
  let modalsOpen = (event) => {
    var id = event.currentTarget.dataset.id;
    this.setState({ showeducation: true , profile:this.props.profile, modalid: id});
  }
  let modalprofOpen = (event) => {
     var idval = event.currentTarget.dataset.id;
     this.setState({ showprofesional: true , profile:this.props.profile, modalidval: idval});
  }
  let modalkeywordskillOpen = (event) => {
     var keywordskill = event.currentTarget.dataset.id;
     this.setState({ showkeywordskill: true , profile:this.props.profile, modalkeywordskill: keywordskill});
  }
  let modalimprovOpen = (event) => {
     var improv = event.currentTarget.dataset.id;
     this.setState({ showimprovements: true , profile:this.props.profile, modalimprov: improv});
  }
  let modalstrengthsOpen = (event) => {
     var idstr = event.currentTarget.dataset.id;
     this.setState({ showstrengths: true , profile:this.props.profile, modalidstr: idstr});
  }
  let modalproimageOpen = (event) => {
     var id = event.currentTarget.dataset.id;
     this.setState({ showprofileimage: true , profile:this.props.profile, modalid: id});
  }
  let modalprocoverOpen = (event) => {
     var id = event.currentTarget.dataset.id;
     this.setState({ showprofilecover: true , profile:this.props.profile, modalid: id});
  }
  
 
  var profileuser='';
  let profilepc ='/public/assets/images/dummy-profile-pic.png';
  let address='';
  var downloadedby='';
  if(this.props.downloaded){
    downloadedby=this.props.downloaded
  }
  var qrcode='';

  if(this.props.profile && typeof this.props.profile !=="undefined"){

    profileuser=this.props.profile;
    var street='';
    var building='';
    var state='';
    var country='';
    var postcode='';
    var socialmidea='';
    qrcode=profileuser.firstName+profileuser.lastName+profileuser.email;
    if(profileuser.defoultsocial_media){
        socialmidea=profileuser.defoultsocial_media[0];
    }
    if(profileuser.currentaddress){
        if(profileuser.currentaddress[0].street){
           street = profileuser.currentaddress[0].street+', '
        }
        if(profileuser.currentaddress[0].building){
           building = profileuser.currentaddress[0].building+', '
        }
        if(profileuser.currentaddress[0].state){
           state = profileuser.currentaddress[0].state+', '
        }
        if(profileuser.currentaddress[0].country){
           country = profileuser.currentaddress[0].country+', '
        }
        if(profileuser.currentaddress[0].postcode){
           postcode= profileuser.currentaddress[0].postcode+', '
        }
        address=street +building+state+country+postcode;
    }

    if(profileuser.profilePic){
        var tarea = profileuser.profilePic;
        if (tarea.indexOf("http://") == 0 || tarea.indexOf("https://") == 0) {
            profilepc=profileuser.profilePic;
        }else{
            profilepc=`${config.uploadapiUrl}/uploads/${profileuser.profilePic}`;
        }
    }
    if(profileuser.professionalSummary && profileuser.professionalSummary.length > 3 ){
       var prostyle = {display:'block'};
    } else { 
        var prostyle = {display:'none'};
    }
    if(profileuser.education && profileuser.education.length > 3 ){
       var edustyle = {display:'block'};
    } else { 
        var edustyle = {display:'none'};
    }
    if(profileuser.skills && profileuser.skills.length > 3 ){
       var skillstyle = {display:'block'};
     } else { 
        var skillstyle = {display:'none'};
    }
    
  }
   var ref = '';
  if(this.props.items){
    ref = this.props.items;
     if(ref && ref.length > 3 ){
       var refstyle = {display:'block'};
     } else { 
        var refstyle = {display:'none'};
    }
  }


  if(this.props && user && user.roles=='hr'){
    let saved = "saved";
    let downloaded= "downloaded";
    var paidon=false;
    var paidondata= this.props && this.props.downloadHr && this.props.downloadHr.filter(item => {
      return item && item.candidate_id && item.paidOn && item.candidate_id.toString()==this.candidateId.toString() && item.downloaded == 'true';
    });

    if(paidondata && paidondata.length>0){
       var downloadLink=(<a href="javascript:void(0)" data-toggle="modal" data-target="#profilecover" onClick={() => this.saveProfiles("downloaded",profileuser.paidOn,profileuser.id)}  className="pb-2 pr-2 pl-0 red"><span id="download" className="icon-download" title="Download Profile"></span></a>)
    } else {

    if(this.props && this.props.downloadHr){ 
      var savedata =this.props.downloadHr && this.props.downloadHr.filter(item => {
      return item && item.candidate_id  && item.candidate_id.toString() == this.candidateId.toString();
     });

      if(this.props && savedata && savedata.length>0){
      var savelink=(<a href="javascript:void(0)" onClick={() => this.saveProfiles("saved", 'false',profileuser.id)}  className="pb-2 pr-2 pl-0 green">
      <span className={savedata[0] && savedata[0].saved =='true' || this.state.heratbeat ? 'icon-favorite gray':'icon-favorite'} title="Save in Favorite List" id="saved"></span></a> );
      var downloadLink=
        (
        <CommonDownload
          dispatchval = {this.dispatchval}
          status={'download'}
          id={profileuser.id}
          page={'profile'}
          total={this.planPrice}
        />
      );
    }
  }
}
}


  

  var expericeyears='';
  var expericemonths='';
  if(profileuser.experienceYear){
     expericeyears=  profileuser.experienceYear+' years';
  } 
  if(profileuser.experienceMonth){
    expericemonths=profileuser.experienceMonth+' months';
  }    
  if (this.props.plan ) {
    var filteredEmployee = this.props.plan && this.props.plan.filter(itemone => {
      if(typeof profileuser.experienceYear=='undefined'){
        profileuser.experienceYear=0;
      }
      this.candidatesplanPrice=itemone.plan;
      if(itemone.experience_one[0].exp >= profileuser.experienceYear){
        this.planPrice=itemone.experience_one[0].price;
        return  itemone.experience_one[0].price;
      } 
      if(itemone.experience_two[0].exp2 >= profileuser.experienceYear){
        this.planPrice=itemone.experience_two[0].price2;
        return  itemone.experience_two[0].price2;
      }
      if(itemone.experience_three[0].exp3 >= profileuser.experienceYear){
        this.planPrice=itemone.experience_three[0].price3;
        return  itemone.experience_three[0].price3;
      }
      
    });
  }


// setTimeout(function(){ 
  
//},3000);

  if(items && items.length>0){
    var reviews = items;
    var totalrev =0;
    var totalskills =0;
    var totalstar = 0;

     var selfdrive = 0;
    var totalpersel = 0;
    var communication = 0;
    var totalpercomm = 0;
    var ownership = 0;
    var totalperownership = 0; 
    var overallrev = 0

    reviews.map(function(reviewper, i){ 
    if(reviewper.overall && reviewper.status=="verified"){   
      totalstar = parseFloat(reviewper.overall)+totalstar; 
      totalrev++;
    }
    if(reviewper.selfdrive){
     	totalpersel++;
     selfdrive = parseFloat(reviewper.selfdrive)+selfdrive;
     }
     if(reviewper.communication){
     	totalpercomm++;
      communication = parseFloat(reviewper.communication)+communication;	
     }
     if(reviewper.ownership){
     	totalperownership++;
      ownership = parseFloat(reviewper.ownership)+ownership;
     }

    });

     let multioverall = totalrev*5;
     var getresult =  (totalstar*5)/multioverall;
   //var getresult= 5*getoveralls/100;
     let multiselfdrive = totalpersel*5;
     var getselfdrive = (selfdrive*5)/multiselfdrive;

     let multicommunication = totalpercomm*5;
     var getcommunication = (communication*5)/multicommunication;

     let multiownership = totalperownership*5;
     var getownership = (ownership*5)/multiownership; 
   }
    var profilemodal = this.state.profile ? this.renderProfileModal() : (<span></span>);
    var profileimagemodal = this.state.profile ? this.renderProfileimageModal() : (<span></span>);
    var profilecovermodal = this.state.profile ? this.renderProfilecoverModal() : (<span></span>);
    var educationmodal = this.state.profile ? this.renderEducationModal() : (<span></span>);
    var profesionalModal = this.state.profile ? this.renderprofesionalModal() : (<span></span>);
    var improvementsModal = this.state.profile ? this.renderimprovementsModal() : (<span></span>);
    var keywordskillModal = this.state.profile ? this.renderKeywordskillModal() : (<span></span>);
    var strengthsmodal = this.state.profile ? this.renderstrengthsModal() : (<span></span>);
    
    var profilemodallink='';
    var keywordmodallink='';
    var educationmodallink='';
    var profmodallink='';
    var improvmodallink='';
    var strengthsmodallink='';
    if(this.props.user && ( this.props.user.userId==this.candidateId || this.candidateId=='')  ){
        profilemodallink=(<a href="javascript:void(0)" className="pb-2 pr-2 pl-0" data-toggle="modal" data-target="#intro"  onClick={modalOpen}><span className="right icon-edit font-18"></span></a>);
        keywordmodallink=(<a href="javascript:void(0)" className="btn btn-primary rounded right" data-toggle="modal" data-target="#keywordskill" data-id='' onClick={modalkeywordskillOpen} ><span className="icon-plus-circle"></span> Add </a>);
        improvmodallink=(<a href="javascript:void(0)" className="pl-0" data-toggle="modal" data-target="#improv"  data-id='' onClick={modalimprovOpen}><span className="right icon-edit font-18"></span></a>)
        strengthsmodallink=(<a href="javascript:void(0)" className="pl-0" data-toggle="modal" data-target="#strengths" data-id='' onClick={modalstrengthsOpen}><span className="right icon-edit font-18"></span></a>  )
       
        educationmodallink=(<a href="javascript:void(0)" className="btn btn-primary rounded right" data-toggle="modal" data-id='' data-target="#edu"  onClick={modalsOpen}><span className="icon-plus-circle"></span> Add </a>);                                                 
        profmodallink=(<a href="javascript:void(0)" className="btn btn-primary rounded right" data-toggle="modal" data-target="#prof" data-id='' onClick={modalprofOpen}><span className="icon-plus-circle"></span> Add </a>);
         
    }
    if(this.state.showsharelinks==true){
      var sharelink ={
  		display:"block"
  		};
  	} else {
  		var sharelink ={
  		  display:"none"
  		};
  	}
		
		let coverimg  = {backgroundImage:'url(/public/assets/images/img_1.jpg)'};
  	if(this.props.profile && this.props.profile.profileCover){
  		let	profilecover=`${config.uploadapiUrl}/uploads/${profileuser.profileCover}`;
  		var backgroundImage12 = 'url('+profilecover+')';
  		var coverupdated  = {backgroundImage:backgroundImage12};	
  	}
		var showmorebtn = (<div className="col-md-12 text-center mt-3">
                          <a href="javascript:void(0)" className="btn btn-secondary rounded"><span className="icon-arrow-circle-down"></span> Show More</a>
                      </div>); 
    var lessmorebtn = (<div className="col-md-12 text-center mt-3">
                          <a href="javascript:void(0)" className="btn btn-secondary rounded"><span className="icon-arrow-circle-up"></span> Show Less</a>
                      </div>); 
    if(profileuser.social_media && profileuser.social_media.length > 0 && profileuser.social_media[0] !==''){
	    var shareclass = 'p-2';
    } else { var shareclass = 'disabled'; } 

  if(profileuser.professionalSummary){
     var empcurrent = '';
     var professionalSummaryb =   profileuser.professionalSummary.filter(item => {
      if(item.currentlyEmployed =="Yes"){
       empcurrent  = 'No';
      }
    });
  }
 const { alert } = this.props;


 if(this.props.profile && this.props.profile.social_media && this.props.profile.social_media.length){
        var linkedin = '';
        var youtube = '';
        var github ='';
        var stackoverflow='';
        var quora = '';
        var kaggle = '';
        var hackerrank = '';
        var other = [];
     this.props.profile.social_media.map(function(item){ 

      if(/^(https?:\/\/)?((w{3}\.)?)linkedin.com.*/i.test(item.value)){
        linkedin = item.value;
      }  
      else if (/^(https?:\/\/)?((w{3}\.)?)youtube.com.*/i.test(item.value)){
        youtube = item.value;
      }
      else if (/^(https?:\/\/)?((w{3}\.)?)github.com.*/i.test(item.value)){
        github = item.value;
      }

      else if (/^(https?:\/\/)?((w{3}\.)?)stackoverflow.com.*/i.test(item.value)){
        stackoverflow = item.value;
      }

      else if (/^(https?:\/\/)?((w{3}\.)?)quora.com.*/i.test(item.value)){
        quora = item.value;
      }

      else if (/^(https?:\/\/)?((w{3}\.)?)kaggle.com.*/i.test(item.value)){
        kaggle = item.value;
      }

      else if (/^(https?:\/\/)?((w{3}\.)?)hackerrank.com.*/i.test(item.value)){
        hackerrank = item.value;
      } 
      else {
        other.push(item.value);
      }
    });  
  }

if(this.candidateId !="" && user && user.roles=='candidate'){
  console.log('test12');
  $(".site-menu li:first-child").click(function(){
      console.log('test13');
   window.location.reload();
});
}

console.log("thistest343",this.props); 




    return (
     <div className="site-section bg-light">
        <div className="container">
            {profilemodal} 
            {profileimagemodal}
            {profilecovermodal}
            {educationmodal} 
            {profesionalModal}
            {improvementsModal}
            {strengthsmodal}
            {keywordskillModal}
           
              <div className="row">
              <div className="text-center mb-5 section-heading">
              </div>
                    <div className="col-md-12 col-lg-8 mb-5">
                    
                      { alert.message &&
                      <Alert className={`alert ${alert.type}`} isOpen={this.state.visible} > <button type="button" onClick={this.closebtn} className="close">
                        <span aria-hidden="true">&times;</span>
                        </button>{alert.message}</Alert>
                      }
                       
                        {user && user.roles=='candidate'  && this.candidateId =='' || user && user.userId==this.candidateId ?
                          <a href="javascript:void(0)" data-toggle="modal" data-target="#profilecover"  onClick={modalprocoverOpen}>
                          <div className="bg-img" style={coverupdated?coverupdated:coverimg}>
                          </div></a>
                        : <div className="bg-img" style={coverupdated?coverupdated:coverimg}>
                          </div>}
                          
                        <div className="p-5 bg-white">
                            <div className="row">
                              <div className="col-md-12 col-lg-4 mb-3 text-center">
                                  {user && user.roles=='candidate' && this.candidateId =='' || user && user.userId==this.candidateId ? 
                                    <a href="javascript:void(0)" className="pb-2 pr-2 pl-0" data-toggle="modal" data-target="#profileimg"  onClick={modalproimageOpen}>
                                    <img src={profilepc} alt="Image" className="profile-img img-fluid" />
                                    </a>
                                  : <img src={profilepc} alt="Image" className="profile-img img-fluid" />}
                              </div>
                              <div className="col-md-12 col-lg-8">
                                  {profilemodallink}
                                  <div>
                                   <QRCode value={qrcode} size="80" className="QR_code" />
                                  </div>
                                  <div className="job-post-item-header d-flex align-items-center">
                                    <h2 className="mr-3 text-black h4">{profileuser.firstName} {profileuser.lastName}</h2>
                                  </div>
                                  {profileuser.paidOn? 
                                   <div><span class="label label-primary">Premium</span></div>:""}
                                   <div>{profileuser.designation?profileuser.designation:""}</div>
                                    {profileuser.professionalSummary && profileuser.professionalSummary.map(function(professionalsum, i){
                                    return <div key={i}>{professionalsum.company_name && professionalsum.currentlyEmployed =="Yes" ? professionalsum.company_name : ""}</div>
                                   }, this)}
                                   <div>{address}</div>

                                  

                                  

                                  <div className={profileuser.paidOn==false?"hidden-current " :"revstar-profile"}>
            											<StarRatingComponent
            													name="totaloverall"
            													starColor="#ffb400"
            													emptyStarColor="#ffb400"
            													value={getresult ? getresult :0}
            													onStarClick={this.onStarClickHalfStar.bind(this)}
            														renderStarIcon={(index, value) => {
            															return (
            																<span>
            																	<i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
            																</span>
            															);
            														}
            													}
            													renderStarIconHalf={() => {
            														return (
            															<span>
            															<span style={{position: 'absolute'}}><i className="far fa-star" /></span>
            															<span><i className="fas fa-star-half" /></span>
            															</span>
            														);
            													}} />
                                     {totalrev ? totalrev +" References":""}
                                  </div>

                                  <div className="job-post-item-body d-block">      
                                      <div>{profileuser.experience} </div>
                                  </div>
                              </div>
                            </div>
                       {profileuser.summary?<hr></hr>:''}
                            <div className="discription-text">
                              <p className="mt-3"></p>
                          
                               <ReadMoreAndLess className="read-more-content" charLimit={250}
                                readMoreText={showmorebtn}
                                readLessText={lessmorebtn} >
                                {profileuser.summary ? profileuser.summary :'' }
                                </ReadMoreAndLess> 
                                

                            </div>

                            <hr></hr>
                            <div className="row">
                                <div className="col-6">
                                    <h2 className="mr-3 text-black h4">Keywords/ Skills</h2>
                                </div>
                                <div className="col-6">
                                    {keywordmodallink}
                                </div>
                            </div>
                            {user && user.roles =="hr" ? 
                            <div className="row reviews-skills">
                                <div className="col-4">
                                    <span className="mb-0 skill">Selfdrive</span>
                                    <span className="mb-0 skill">Communication</span>
                                    <span className="mb-0 skill">Ownership</span>
                                </div>
                                <div className="col-8">
                               
                      <div className="revstar">
											<StarRatingComponent
													name="getselfdrive"
													starColor="#ffb400"
													emptyStarColor="#ffb400"
													value={getselfdrive ? getselfdrive :0}
													onStarClick={this.onStarClickHalfStar.bind(this)}
														renderStarIcon={(index, value) => {
															return (
																<span>
																	<i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
																</span>
															);
														}
													}
													renderStarIconHalf={() => {
														return (
															<span>
															<span style={{position: 'absolute'}}><i className="far fa-star" /></span>
															<span><i className="fas fa-star-half" /></span>
															</span>
														);
													}} />
                          </div>

                    <div className="revstar">
											<StarRatingComponent
													name="getselfdrive"
													starColor="#ffb400"
													emptyStarColor="#ffb400"
													value={getcommunication ? getcommunication :0}
													onStarClick={this.onStarClickHalfStar.bind(this)}
														renderStarIcon={(index, value) => {
															return (
																<span>
																	<i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
																</span>
															);
														}
													}
													renderStarIconHalf={() => {
														return (
															<span>
															<span style={{position: 'absolute'}}><i className="far fa-star" /></span>
															<span><i className="fas fa-star-half" /></span>
															</span>
														);
													}} />
                    </div>

                   
                    <div className="revstar">
											<StarRatingComponent
													name="getownership"
													starColor="#ffb400"
													emptyStarColor="#ffb400"
													value={getownership ? getownership :0}
													onStarClick={this.onStarClickHalfStar.bind(this)}
														renderStarIcon={(index, value) => {
															return (
																<span>
																	<i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
																</span>
															);
														}
													}
													renderStarIconHalf={() => {
														return (
															<span>
															<span style={{position: 'absolute'}}><i className="far fa-star" /></span>
															<span><i className="fas fa-star-half" /></span>
															</span>
														);
													}} />
                         </div>
                            </div>
                            </div>
                            :''}


                            {profileuser.skills && profileuser.skills.slice(0, this.state.showKeyskillItem).map(function(skill, i){
                              return  <div key={i}> <div className="mb-3">
                                <div className="row">
                                    <div className="col-4">
                                        <span className="mb-0 skill">{skill.keywordval} </span>
                                    </div>
                                    <div className="col-8">
                                    {this.candidateId =='' || user && user.userId == this.candidateId || user && user.roles=='hr' ?
                                    <div>

                                      {profile && profile.paidOn || user && user.roles=='hr' ?
                                        <div className="d-lg-flex">

                                           {this.getkeywordreview(skill.keywordval)}
                                         </div>
                                        :''}

                                        <div  className="right">
                                        {user && user.roles=='candidate' || user && user.userId == this.candidateId ?
                                           <a href="javascript:void(0)" className="pl-1" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this skill?')) this.deleteSkillItem(skill._id,'skills') } } ><span className="right icon-delete font-18" name={skill._id} ></span></a>
                                        
                                        :''}
                                        </div>
                                     </div>
                                     : ''}
                                    </div>
                                </div>
                              </div></div>
                            }, this)}
                            <div className="col-md-12 text-center mt-3" style={skillstyle}>
                              <a href="javascript:void(0)" className="btn btn-secondary rounded professionalhidden" onClick={this.showSkillMore}> 
                                <span className="icon-arrow-circle-up"> </span>{this.state.expandedskill ? (
                                 <span>Show Less</span>   
                                ) : (
                                 <span>Show More</span> 
                                )
                                }
                              </a>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="col-6">
                                    <h2 className="mr-3 text-black h4">Education</h2>
                                </div>
                                <div className="col-6">
                                     {educationmodallink}
                                 </div>
                            </div>
                            {profileuser.education && profileuser.education.slice(0, this.state.showEduItem).map(function(educations, i){
                               return <div key={i}>
                               
                               
                               <div className="total-education"><div className="mb-3">
                                 {this.editdeletebutton(educations,modalsOpen,'edu')}
                                   <p className="mb-0 font-weight-bold text-success">{educations.institute_name}</p>
                                    <p className="mb-0 ">{educations.degree_name=="Others" ? educations.othereducation:educations.degree_name}</p>
                                    <p className="mb-0 ">{educations.duration ? educations.duration:''}</p>
                                    <p className="mb-0 ">{educations.year_from ? educations.year_from+' year'  : '' } {educations.month_from ? educations.month_from +' month' : '' } {educations.year_to ? educations.year_to +' year' : '' } {educations.month_to ? educations.month_to +' month':  ''}</p>
                                    <p className="mb-0 ">Major: {educations.major}</p>
                                    
                                    {educations && this.candidateId!='' && educations.gpaflag =='true'? <p className="mb-0 ">GPA/Percentage: {educations.percentage}</p>:''}
                                    

                                    
                                    {this.candidateId =='' ?  <p className="mb-0 ">GPA/Percentage: {educations.percentage} </p>:''}</div></div></div>; 
                                    }, this)}
                                    

                            <div className="col-md-12 text-center mt-3 addprofessionalbutton" style={edustyle}>
                                 <a href="javascript:void(0)" className="btn btn-secondary rounded professionalhidden" onClick={this.showEduMore}> 
                                 <span className="icon-arrow-circle-up"></span>{this.state.expandededu ? (
                                   <span> Show Less</span>  
                                    ) : (
                                  <span> Show More</span> 
                                  )
                                  }
                                 </a>
                              </div>
                            <hr></hr>
                            <div className="row">
                                <div className="col-6">
                                    <h2 className="mr-3 text-black h4">Professional Experience <span className="prof-nodetail"> {empcurrent=="No"?"":"Currently not working"  }</span></h2>
                                </div>
                                <div className="col-6">
                                    {profmodallink}
                                </div>
                            </div>
                            <div>
                               {profileuser.professionalSummary && profileuser.professionalSummary.slice(0, this.state.showProItem).map(function(professionalsum, i){
                                     return <div key={i}><div className ="total-professional" >
                                        {this.editdeletebutton(professionalsum,modalprofOpen,'prof')}

                                        <p className="mb-0 font-weight-bold text-success">{professionalsum.company_name} {professionalsum.company_name  && professionalsum.currentlyEmployed =="Yes" ? "(Current company)" : ""}</p>
                                        <p className="mb-0 ">{professionalsum.title}</p>
                                        <p className="mb-0 ">{professionalsum.department}</p>
                                        <p className="mb-0 "> {this.getexperince(professionalsum.startDate,professionalsum.endDate,professionalsum.currentlyEmployed)}</p>
                                        {professionalsum.project_details ? 
                                        <div className="professional-summary">
                                        <p className="mb-0">Project Details:</p>
                                        <pre>{professionalsum.project_details}</pre>
    
                                        </div>
                                        : <span className="prof-nodetail"> No projects to show</span> }
                                         </div> </div>; 
                                }, this)}
                               <div className="col-md-12 text-center mt-3 addprofessionalbutton" style={prostyle}>
                                 <a href="javascript:void(0)" className="btn btn-secondary rounded professionalhidden" onClick={this.showProMore}> 
                                 <span className="icon-arrow-circle-up"></span>
                                 {this.state.expanded ? (
                  							   <span>Show Less </span>	
                  									) : (
                  							  <span> Show More</span> 
                  								)
                  								}
                                 </a>
                              </div>
                            </div>
                            <hr></hr>
                            <div className="right mt-3">
                                {improvmodallink}
                            </div>
                            {this.candidateId =='' || user && user.userId == this.candidateId ? 
                            <div>
                            <h2 className="mr-3 text-black h4">Areas of Improvements</h2>
                            <div className="areas">
                                <p className="mb-0 "></p>
                                   <ReadMoreAndLess className="read-more-content" charLimit={250}
                                      readMoreText={showmorebtn}
                                      readLessText={lessmorebtn} >
                                  {profileuser.improvements?profileuser.improvements:''}
                                  </ReadMoreAndLess>
                            </div>
                            
                            
                            <hr></hr>
                            <div className="right mt-3">
                                {strengthsmodallink}
                            </div>
                            </div>
                            : ''}
                            <h2 className="mr-3 text-black h4">Strengths</h2>
                            <div className="strengths">
                              <p className="mb-0 "></p>
                                <ReadMoreAndLess className="read-more-content" charLimit={250}
                                  readMoreText={showmorebtn}
                                  readLessText={lessmorebtn} >
                                  {profileuser.strengths ? profileuser.strengths:''}
                                </ReadMoreAndLess> 
                              
                            </div> 
                            <hr></hr>
                                  
                        <h2 className={reviews?'mr-3 text-black h4':'hidden-current'}>References</h2>
                        {reviews && reviews.slice(0, this.state.showrewitem).map(function(review, i){
                          return  <div key={i} className={user && user.roles == "hr" && review.status=='verified' ? 'hidden-current':'' }>
                            <div className="row mb-4">
                                <div className="col-md-4 col-lg-4">
                                    <p className="mb-0 font-weight-bold text-success">{review.fullname}</p>
                                    <p className="mb-0 font-13">{review.company}</p>
                                </div>
                                <div className="col-md-8 col-lg-8">
                                     {user  && user.roles != "hr" && this.candidateId =='' || user.userId == this.candidateId ?
                                      <div>
                                    {user && user.roles=='candidate' && review.status=='verified' ? 
                                     <span className="floatRight"><a href="javascript:void(0)" id={review._id} className="btn btn-primary px-4 py-2 text-white pill gray">Approved</a></span>

                                    :<span className="floatRight"><a href="javascript:void(0)" id={review._id} className="btn btn-primary px-4 py-2 text-white pill"  onClick={() => { this.confirmBox(review._id) } }>Approve</a></span>}
                                    </div>
                                    : ''}
                                    <div className={profileuser.paidOn==false?"hidden-current " :"d-lg-flex mb-3"}>
                                        <StarRatingComponent
                                                name="reference"
                                                starColor="#ffb400"
                                                emptyStarColor="#ffb400"
                                                value={review.overall ? review.overall :0}
                                                onStarClick={this.onStarClickHalfStar.bind(this)}
                                                  renderStarIcon={(index, value) => {
                                                    return (
                                                      <span>
                                                        <i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
                                                      </span>
                                                    );
                                                  }
                                                }
                                                renderStarIconHalf={() => {
                                                  return (
                                                    <span>
                                                    <span style={{position: 'absolute'}}><i className="far fa-star" /></span>
                                                    <span><i className="fas fa-star-half" /></span>
                                                    </span>
                                                  );
                                        }} />

                                    </div>
                                    <p className="mb-0">
                                       {review.improvment} 
                                    </p>
                                    <p className="mb-0">Strengths: <span className="font-13">{review.strengths}</span>
                                    </p>
                                </div>
                            </div>

                            <Modal show={this.state.showconfirm} onHide={this.handleClose}>
                              <Modal.Body>
                              <h4>Are you sure to approve this Reference?</h4>
                              </Modal.Body>
                              <Modal.Footer>
                            <button type="button" className="btn btn-secondary" name="cancel" onClick={this.handleClose}>Cancel</button>
                            <button type="button" className="btn btn-primary" id={review._id} name="confirm" onClick={() => { this.approvedclick() } }>Confirm</button>
                            </Modal.Footer>
                            </Modal>
                            </div>
                    }, this)}

                             <div  style ={refstyle} className='col-md-12 text-center mt-3'>
                                 <a href="javascript:void(0)" className="btn btn-secondary rounded " onClick={this.showrewMore}> 
                                 <span className="icon-arrow-circle-up"></span>
                                 {this.state.expandedrew ? (
                                   <span> Show Less </span>  
                                    ) : (
                                  <span> Show More</span> 
                                  )
                                  }
                                 </a>
                              </div>
                                
                        </div>
                    </div>

                    {this.candidateId =='' || user && user.userId == this.candidateId || user && user.roles =='hr' ?
                    <div className="col-lg-4">
                        <div className="p-4 mb-3 bg-white">
                            <div className="right font-18">
                            {savelink ? savelink:""}
                            {downloadLink ? downloadLink:""}
                             </div>
                            <p className="mb-0 font-weight-bold"><span className="icon-address-book" title="Address"></span> Address</p>
                            <p className="mb-3">{address}</p>
                            <p className="mb-0 font-weight-bold"><span className="icon-phone-square" title="Phone"></span> Phone</p>
                            <p className="mb-3"><a href="#">{profileuser.phone}</a></p>
                             <p className="mb-0 font-weight-bold"><span className="icon-phone-square" title="Phone"></span> Alternate Phone</p>
                            <p className="mb-3"><a href="#">{profileuser.alternateMobile_number}</a></p>
                            <p className="mb-0 font-weight-bold"><span className="icon-contact_mail" title="Email Address"></span> Email Address</p>
                            <p className="mb-3"><a href="#">{profileuser.email} </a></p>
                            <p className="mb-0 font-weight-bold"><span className="icon-contact_mail" title="Email Address"></span> Alternate Email Address</p>
                            
                            <p className="mb-3"><a href="#"> {profileuser.alternateEmail}</a></p>
                            <p className="mb-0 font-weight-bold"><span className="icon-birthday-cake" title="Birthday on"></span> Birthday on</p>
                            <p className="mb-3">{this.getbirth(profileuser.dateofBirth)}<br/> {this.getAge(profileuser.dateofBirth)}</p>
                            
                            <p className="mb-0 font-weight-bold"><span className="icon-location-arrow" title="Open to relocation"></span> Open to relocation?</p>
                            <p className="mb-3">{profileuser.openRelocation}</p>
                            <p className="mb-0 font-weight-bold"><span className="icon-globe" title="Open to travel?"></span> Open to travel?</p>
                            <p className="mb-3">{profileuser.openTravel}</p>
                            <p className="mb-0 font-weight-bold"><span className="icon-work" title="Work Authorization"></span> Work Authorization </p>
                            <p className="mb-3">{profileuser.authorization}</p>
                            <p className="mb-0 font-weight-bold"><span className="icon-chain" title="Felony"></span> Felony </p>
                            <p className="mb-3">{profileuser.felony}</p>
                            <p className="mb-0 font-weight-bold"><span className="icon-slideshare" title="Social Profile"></span> Social Profile</p>
                            <p className="mb-3 font-18">
                                <a href={socialmidea ? socialmidea.facebook : '' }  className={socialmidea && socialmidea.facebook?'pb-2 pr-2 pl-0':'disabled'} title="facebook" target="_bank"> <span className="icon-facebook-square"></span></a>
                                <a href={socialmidea ? socialmidea.twitter : '' } className={socialmidea && socialmidea.twitter?'p-2':'disabled'} title="twitter" target="_bank"><span className="icon-twitter" ></span></a>
                                <a href={socialmidea ? socialmidea.instagram : '' } className={socialmidea && socialmidea.instagram?'p-2':'disabled'} title="instagram" target="_bank"><span className="icon-instagram" ></span></a>
                                <a href="javascript:void(0)"  className={shareclass} onClick={this.handlesharelinks}><span className="icon-share"></span></a> 
                            </p>

                            <div className="sharelinks" style={sharelink}>
                            {linkedin ? 
                            <a href={linkedin} target="_blank" title="linkedin"><span class="icon icon-linkedin-square"></span></a>
                            :''}

                            {github ? 
                            <a href={github} target="_blank" title="github"><span class="icon icon-github-square"></span></a>
                            :''}

                            {hackerrank ? 
                            <a href={hackerrank} target="_blank" title="hackerrank"><span class="fab fa-hackerrank"></span></a>
                            :''}

                            {stackoverflow ? 
                            <a href={stackoverflow} target="_blank" title="stackoverflow"><span class="icon icon-stackoverflow-square"></span></a>
                            :''}

                            {kaggle ? 
                            <a href={kaggle} target="_blank" title="kaggle"><span class="icon icon-kaggle-square"></span></a>
                            :''}

                            {quora ? 
                            <a href={quora} target="_blank" title="Quora"><span class="icon icon-quora-square"></span></a>
                            :''}

                            {youtube ? 
                            <a href={youtube} target="_blank" title="youtube"><span class="icon icon-youtube-square"></span></a>
                            :''}

                     
                             {other && other.map(function(item,i){
                            return <div key={i}>
                              <a href={other[i]} className="other" target="_blank">{other[i]}</a>
                            </div>
                                }, this)}
                            </div>

                            <p className="mb-0 font-weight-bold"><span className="icon-card_membership" title="Member Since"></span> Member Since</p>
                            <p className="mb-3">{this.registerdate(profileuser.createdOn)}</p>
                            
                            {profileuser && profileuser.currentsalaryflag!='on' ?
                              <div><p className="mb-0 font-weight-bold"><span className="icon-dollar" title="Current Salary"></span> Current Salary</p>
                              <p className="mb-3">{profileuser.currentSalary}</p></div>
                            :''}
                            {profileuser && profileuser.expectedsalaryflag!='on' ?
                              <div><p className="mb-0 font-weight-bold"><span className="icon-dollar" title="Expected Salary"></span> Expected Salary</p>
                              <p className="mb-3">{profileuser.expectedSalary}</p>
                              </div>
                            :''}
                            <p className="mb-0 font-weight-bold"><span className="icon-work" title="Expected Salary"></span> Total Tenure at Jobs</p>
                            <p className="mb-3">{expericeyears} {expericemonths}</p>
                        </div>
                        {profileuser && profileuser.paidOn && user && user.roles=='candidate' ?
                        <ViewedProfile downloaded={downloadedby}/>
                        :''}
                        {profileuser && profileuser.paidOn && user && user.roles=='candidate'?
                        <div className="p-4 mb-3 bg-white">
                            <h3 className="h5 text-black mb-3">Job Recommendations</h3>
                            <div className="h-100 d-md-flex">
                                <div className="ml-3">
                                    <b>UI Designer</b>
                                    <p className="font-13">Wipro Technologies
                                        <br></br> California, Los Angeles
                                    </p>

                                </div>
                            </div>
                            <div className="h-100 d-md-flex">
                                <div className="ml-3">
                                    <b>Job Title</b>
                                    <p className="font-13">Company name
                                        <br></br> State, City
                                    </p>

                                </div>
                            </div>
                            <div className="h-100 d-md-flex">
                                <div className="ml-3">
                                    <b>UI Designer</b>
                                    <p className="font-13">Wipro Technologies
                                        <br></br> California, Los Angeles
                                    </p>
                                </div>
                            </div>
                        </div>:''}
                      </div> :''}
                      
                    </div>
                    {profileuser && user && user.roles =='candidate' && !profileuser.paidOn && this.candidateId=="" ? 
                    <div className="jumbotron p-3 mb-0">
                    <h2>Premium</h2>
                    <p>Avail paid service to know job recommendations, to know who views your profile, to know your keywords rating by paying ${this.candidatesplanPrice}/month.</p>
                    <CommonDownload
                      dispatchval = {this.dispatchval}
                      status={'download'}
                      id={profileuser.id}
                      page={'profilecandidates'}
                      total={this.candidatesplanPrice}
                    />
                  </div>:''}
            </div>
        </div>
      );
  }
  showProMore() {
    this.state.showProItem === 3 ? (
      this.setState({ showProItem:this.props.profile.professionalSummary.length, expanded: true })
    ) : (
      this.setState({ showProItem: 3, expanded: false })
    )
  }

  showrewMore() {
    this.state.showrewitem === 3 ? (
      this.setState({ showrewitem:this.props.items.length, expandedrew: true })
    ) : (
      this.setState({ showrewitem: 3, expandedrew: false })
    )
  }
  
  showEduMore(){
	 this.state.showEduItem === 3 ? (
      this.setState({showEduItem:this.props.profile.education.length, expandededu: true })
    ) : (
      this.setState({showEduItem: 3, expandededu: false })
    ) 
  }
  
   showSkillMore(){
	 this.state.showKeyskillItem === 3 ? (
      this.setState({showKeyskillItem:this.props.profile.skills.length, expandedskill: true })
    ) : (
      this.setState({showKeyskillItem: 3, expandedskill: false })
    ) 		  
   }
  
}



 

function mapStateToProps(state) {
  const { authentication, users} = state;
  const { user } = authentication;
  const { profile,items,review} = users;
  const {plan} =users;
  const {downloadHr} =users;
  const { alert } = state;
  const { downloaded} = users;
  console.log("profile======",profile);
  return {
    user,
    profile,
    downloaded,
    downloadHr,
    plan,
	  items,
    alert,
    review
    
  };
}


const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };
