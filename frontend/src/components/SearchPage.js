import React from 'react';
import config from 'config';
import { Link,Redirect } from 'react-router-dom';
import { browserHistory } from 'react-router'
import { userActions } from '../actions';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, NavLink } from 'react-bootstrap';
import CommonDownload from '../components/CommonDownload'
import StarRatings from 'react-star-ratings';
import StarRatingComponent from 'react-star-rating-component';
import { authHeader } from '../helpers';
  class SearchPage extends React.Component {
    constructor(props) {
      super(props);
      var user  = JSON.parse(localStorage.getItem('user'));
      const { dispatch } = this.props;
      this.state = {
		  showmorebtn:false,
		  showresultitem:10, 
		  expanded:false, 
      searchresult :"",
      keyvalue:"",
      submitted: false,
      user:  Object.assign({
        firstName: '',
        lastName: '',
        email: '',
        companyName:'',
        fullName:'',
        savedcandidates:'',
        flag:''
      },user),
      dispatchval:this.props.dispatchval.dispatch,
      };
      this.showSeachresultMore = this.showSeachresultMore.bind(this);
      this.phonenoemailaddress = this.phonenoemailaddress.bind(this);  
      this.commonsearchfield=this.commonsearchfield.bind(this);
      this.profileimage=this.profileimage.bind(this);
      this.downloadbutton=this.downloadbutton.bind(this);
      this.onStarClickHalfStar = this.onStarClickHalfStar.bind(this);
    }
   
    phonenoemailaddress(dataval,flag){
      if(typeof dataval !== 'undefined' && typeof flag == 'undefined'){
       return "tel:+"+dataval;
      }
      if(flag=='email'){
        if(typeof dataval !== 'undefined'){
         return "mailto:"+dataval;
       }
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


   commonsearchfield(dataval,flag){
      if(typeof dataval !=='undefined' &&  flag == 'companyname'){
        var compnay_name=dataval.find(item=>{
        return item.currentlyEmployed =='Yes';
      });
        if(compnay_name){
           return (<div><span className="icon-building mr-1" title="Company"></span>{compnay_name.company_name}</div>);
        }
      }
      if(typeof dataval !=='undefined' &&  flag == 'address'){
        return (<div><span className="icon-room mr-1" title="Current Location"></span> {dataval[0] ? dataval[0].city +' '+dataval[0].country : ''}</div>);
      }
      if(typeof dataval !=='undefined' && dataval.expectedsalaryflag!='on' &&  flag == 'expectedsalary'){
        return (<div><span className="icon-money mr-1" title="Expected Salary"></span> {dataval.expectedSalary ? '$'+dataval.expectedSalary : ''}</div>);
      }
   }
   profileimage(image){
    if(image){
       var tarea = image;
        if (tarea.indexOf("http://") == 0 || tarea.indexOf("https://") == 0) {
           return image;
        }else{
           return `${config.uploadapiUrl}/uploads/${image}`;
        }
     }else{
       return  '/public/assets/images/dummy-profile-pic.png';
    
     }
   }
   download(id,flag){
    const {user} = this.state;
    user.savedcandidates=id;
    const { dispatch } = this.props.dispatchval.dispatch;
    user.flag=flag;
    if(flag=='downloaded'){
      setTimeout(() => {
       
        window.open(`${config.uploadapiUrl}/uploads/user${id}.pdf`, '_blank', 'location=no,height=700,width=850,scrollbars=yes,status=yes');
        
       }, 200);
    }else{
      dispatch(userActions.savedCandidates(user)); 
    }
    
  }
  downloadbutton(buttonData){
    var user  = JSON.parse(localStorage.getItem('user'));
    var downloaded='';
    this.dispatchval = ({
        tagName : 'span',
        className : '',
        children : null,
        dispatch :this.props.dispatchval.dispatch
    });
    if(buttonData  && user){
      
      if( user && user.roles=='hr' && user.roles!='candidate' ){
        var planPrice=0;

        if (this.props.plan.plan ) {
          if(typeof (buttonData.employees.experienceYear)=='undefined'){
            buttonData.employees.experienceYear =0;
          }
          var filteredEmployee = this.props.plan.plandata && this.props.plan.plandata.filter(itemone => {
            if(itemone.experience_one[0].exp >= buttonData.employees.experienceYear){
              planPrice=itemone.experience_one[0].price;
              return  itemone.experience_one[0].price;
            } 
            if(itemone.experience_two[0].exp2 >= buttonData.employees.experienceYear){
              planPrice=itemone.experience_two[0].price2;
              return  itemone.experience_two[0].price2;
            }
            if(itemone.experience_three[0].exp3 >= buttonData.employees.experienceYear){
              planPrice=itemone.experience_three[0].price3;
              return  itemone.experience_three[0].price3;
            }
            
          });
        }
        var downloaded=
        (
        <CommonDownload
          dispatchval = {this.dispatchval}
          status={'download'}
          id={buttonData._id}
          page={'saved'}
          total={planPrice }
        />
      );
    }
    }
    else if(buttonData ){
      var downloaded=(<a href="javascript:void(0)" onClick={() =>this.download(buttonData._id,'download')}><span className="text-info p-2 rounded border border-info"  id={buttonData._id}  >Download</span></a>);
    }
    if(user && buttonData.saved_candidates){
      if(buttonData.saved_candidates.length>0 ){
        var filteredEmployee = buttonData.saved_candidates.filter(item => {
          return item.user_id.toString()== user.userId.toString() && item.downloaded == 'true';
        });
        if(filteredEmployee.length>0){
          downloaded=(<a href="javascript:void(0)" onClick={() =>this.download(filteredEmployee[0].candidate_id,'downloaded')}><span className="p-2 rounded border border-info">Downloaded</span></a>)  ;
        }
      }
    }
    return downloaded;
  }
  render() {
    
    console.log("this.props.keyvalue====",this.props.keyvalue);
    const {searchresult} = this.state;
    if(this.props.results && this.props.results.length > 10){
		var btnshow = {'display':'block'};
		} else { var btnshow = {'display':'none'}; 
    console.log("this.props.results=",this.props.results);}
    return (
		  <div>
         <div className="site-section bg-light">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mb-5 mb-md-0" data-aos="fade-up" data-aos-delay="100">
                        <h2 className="mb-1 h3">Search Results - {this.props.results.length} Candidates</h2>
                        <p>Searched for: {this.props.keyvalue ? this.props.keyvalue:''}</p>
                        <div className="rounded border jobs-wrap">
                            <p id="headerresult"></p>
                            {this.props.results && this.props.results.slice(0, this.state.showresultitem).map(function(result, i){
                            return <div key={i}>
                              <span  className="job-item d-block d-md-flex align-items-center  border-bottom fulltime">
                                <div className="company-logo blank-logo text-center text-md-left pl-3">
                                    <img src={this.profileimage(result.employees.profilePic)} alt="Image" className="img-fluid mx-auto" />
                                </div>
                                <div className="job-details h-100">
                                    <div className="p-3 align-self-center">
                                        <div className="d-lg-flex">
                                            <a href={'profilePage?id='+ result._id}><h3 className="mr-3"><b className="boldclass">{result.firstName} {result.lastName}</b> - {result.employees.designation ? result.employees.designation :"--"} </h3></a>
                                            <span>
                                           <div>
                                             <StarRatingComponent
                                                name="reference"
                                                starColor="#ffb400"
                                                emptyStarColor="#ffb400"
                                                value={ result.employees && result.employees.totaloverall ? result.employees.totaloverall :0 }
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
                                            </span>
                                        </div>
                                        <div className="d-block d-lg-flex">
                                            <div className="mr-3">{this.commonsearchfield(result.employees.professionalSummary,'companyname')}</div>
                                            <div className="mr-3"><span className="icon-suitcase mr-1" title="Experience"></span> {result.employees.experienceYear ? result.employees.experienceYear +' yrs' : '0 yrs'  }  {result.employees.experienceMonth ? result.employees.experienceMonth +' months' : '0 months'   } </div>
                                            <div className="mr-3">{this.commonsearchfield(result.employees.currentaddress,'address')}</div>
                                            <div className="mr-3">{this.commonsearchfield(result.employees,'expectedsalary')}</div>
                                            <div className="mr-3"><a href={this.phonenoemailaddress(result.employees.phone ? result.employees.phone : 0)} className={this.phonenoemailaddress(result.employees.phone)?'':'disabled'}><span className="icon-phone mr-1" title="Phone"></span></a></div>
                                            <div className="mr-3"><a href={this.phonenoemailaddress(result.email,'email')} className={this.phonenoemailaddress(result.email,'email')?'':'disabled'}><span className="icon-envelope-o mr-1" title="Email Id"></span></a> </div>
                                            <div className="mr-3"><a href={result.employees.defoultsocial_media ? result.employees.defoultsocial_media[0].facebook : '#' } className={result.employees.defoultsocial_media && result.employees.defoultsocial_media[0].facebook ?'icon-facebook-square mr-1':'icon-facebook-square mr-1 disabled'}><span className="" title="Facebook"></span> </a></div>
                                            <div className="mr-3"><a href={result.employees.defoultsocial_media ? result.employees.defoultsocial_media[0].instagram : '#' } className={result.employees.defoultsocial_media && result.employees.defoultsocial_media[0].instagram ?'':'disabled'}><span className="icon-instagram mr-1" title="Instagram"></span> </a></div>
                                            <div className="mr-3"><a href={result.employees.defoultsocial_media ? result.employees.defoultsocial_media[0].twitter : '#' } className={result.employees.defoultsocial_media && result.employees.defoultsocial_media[0].twitter ?'':'disabled'}><span className="icon-twitter mr-1" title="Twitter"></span></a> </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="job-category align-self-center">
                                 {result.paidOn?
                                              <span className="label label-primary">Premium</span>:""}
                                    <div className="p-3">
                                    {this.downloadbutton(result)}
                                    </div>
                                </div>
                            </span></div>
                          },this)}
                        </div>
                        <div className="col-md-12 text-center mt-5" style={btnshow}>
                            <a href="javascript:void(0)" className="btn btn-primary rounded py-3 px-5" onClick={this.showSeachresultMore}><span className={this.state.expanded?"icon-minus-circle":"icon-plus-circle"}></span> {this.state.expanded ? "Show Less Candidates":"Show More Candidates" }</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    
    );
  }
  
   showSeachresultMore(){
	 if(this.state.showresultitem === 10){
      this.setState({showresultitem:this.props.results.length, expanded: true ,showmorebtn:false });
    } else {
      this.setState({showresultitem: 10, expanded: false })
    }		  
   }
  
}
export default SearchPage;
