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
  
 // this.updatetotalreview = this.updatetotalreview.bind(this);
  
  //this.skillsreviews = this.skillsreviews.bind(this);
 if(localStorage.getItem('srcid') && localStorage.getItem('srcid') !== "undefined"){
   localStorage.removeItem("srcid"); 
 }
}



 componentDidMount(){
  if(this.candidateId){
    const {user} = this.state;
    const { dispatch } = this.props;
   
  }
 }

  
  handlesharelinks(e){
  	this.setState({
  	showsharelinks: !this.state.showsharelinks
  	})
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
    
    
  }



  




    return (
     <div className="site-section bg-light">
        <div className="container">
           
            </div>
        </div>
      );
  }
  
  
}



 

function mapStateToProps(state) {
  const { authentication, users} = state;
  const { user } = authentication;
  const { profile} = users;
  const { alert } = state;
  
  console.log("profile======",profile);
  return {
    user,
    profile,
   
   
	  
    alert
    
  };
}


const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };
