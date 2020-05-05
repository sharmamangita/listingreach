import React from 'react';
import { Link } from 'react-router-dom';
import config from 'config';
import { connect } from 'react-redux';
import { userActions } from '../../actions';
import { adminActions } from '../../actions';
import { Alert } from 'reactstrap';
import queryString from 'query-string';
import CommonDownload from '../../components/CommonDownload'
import StarRatingComponent from 'react-star-rating-component';
class SavedCandidatesPage extends React.Component {
    constructor(props) {
      super(props);
      var user  = JSON.parse(localStorage.getItem('user'));
      this.dispatchval = ({
        tagName : 'span',
        className : '',
        children : null,
        dispatch :this.props
      });
      this.state = {
			  users:this.props.users,
        user:  Object.assign({
          firstName: '',
          lastName: '',
          email: '',
          companyName:'',
          fullName:'',
          savedcandidates:'',
          flag:''
        },user),
      };
      this.phonenoemailaddress = this.phonenoemailaddress.bind(this);  
      this.commonsearchfield=this.commonsearchfield.bind(this);
      this.profileimage=this.profileimage.bind(this);
      this.downloadbutton=this.downloadbutton.bind(this);
      this.onStarClickHalfStar = this.onStarClickHalfStar.bind(this);
      this.onStar = this.onStar.bind(this);
      
    }
    onStar(review){
      var total =0;
      var star =0;
      if(review.length >0){
         review.map(function(item,i){
          if(item.status=="verified"){
           total ++;
         star = (+star)+(+item.overall);
       }
      });
     }
     
     let multi = total*5;
     let reviewdata = (star*5)/ multi;
     return reviewdata
    }

   onStarClickHalfStar(nextValue, prevValue, name, e) {
    console.log("name0",name);
    console.log("nextValue",nextValue);
    console.log("prevValue",prevValue);
    console.log("e",prevValue);
   if(name=='overall'){  
    const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;
    console.log("xp==e==:",xPos);
    if (xPos <= 0.5) {
      nextValue -= 0.5;
    }
    console.log('name4: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
    this.setState({overall: nextValue});
    } 
 
}
    componentDidMount() {
      const { dispatch } = this.props;
      this.props.dispatch(userActions.getSavedCandidates());
      this.props.dispatch(adminActions.getPlan());
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
   commonsearchfield(dataval,flag){
     if(typeof dataval !=='undefined' &&  flag == 'companyname'){
       return (<div><span className="icon-building mr-1" title="Company"></span>{dataval}</div>);
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
          // do something here
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
      const { dispatch } = this.props;
      user.flag=flag;
      dispatch(userActions.savedCandidates(user)); 
    }
    downloadbutton(buttonData){
      var downloaded='';
      if(buttonData && buttonData.saved ){
        var planPrice=0;
        if (this.props.admins.plandata ) {
          if(typeof (buttonData.experienceYear)=='undefined'){
            buttonData.experienceYear =0;
          }
          var filteredEmployee = this.props.admins.plandata && this.props.admins.plandata.filter(itemone => {
            if(itemone.experience_one[0].exp >= buttonData.experienceYear){
              planPrice=itemone.experience_one[0].price;
              return  itemone.experience_one[0].price;
            } 
            if(itemone.experience_two[0].exp2 >= buttonData.experienceYear){
              planPrice=itemone.experience_two[0].price2;
              return  itemone.experience_two[0].price2;
            }
            if(itemone.experience_three[0].exp3 >= buttonData.experienceYear){
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
          id={buttonData.userId}
          page={'saved'}
          total={planPrice }
        />
      );

      }
      else{
         downloaded=(<a href="javascript:void(0)" onClick={() =>this.download(buttonData.userId,'download')}><span className="text-info p-2 rounded border border-info"  id={buttonData._id}  >Download</span></a>);
      }
      if(buttonData.downloaded ){
         downloaded=(<span>Downloaded On {buttonData.createdOn}</span>);
      }
      return downloaded;
    }
    render() {
        const { candidates  } = this.props;
        const values = queryString.parse(this.props.location.search);
        this.pagename='';
        if(!$.isEmptyObject(values ) ){
          this.pagename=values.page;
        }
        console.log("this.pagename====",this.props.users.saveditems);
        if(this.props.users.saveditems){

          if(this.pagename=='download'){
            var filtersavedcandidates = this.props.users.saveditems.result.filter(item => {
              
              return item.downloaded && item.downloaded=='true';
            });
            console.log("filtersavedcandidates====",filtersavedcandidates);
            var heading="View Downloaded Candidates";
          }else{
            var filtersavedcandidates = this.props.users.saveditems.result.filter(item => {
              console.log("item====",item.saved);
              return item.saved && item.saved=='true';
            });
            var heading="View Saved Candidates";
          }
        }else{
           if(this.pagename=='download'){
             var heading="0 View Downloaded Candidates";
           }else{
             var heading="0 View Saved Candidates";
           }
        }
        
          return (
          <div className="site-section bg-light">
            <div className="container">
              <div className="text-center mb-5 section-heading">
                  <h2>{heading}</h2>
              </div>
              <div className="row">
                <div className="col-md-12 mb-5 mb-md-0" data-aos="fade-up" data-aos-delay="100">
                  <div className="rounded border jobs-wrap">
                   {filtersavedcandidates && filtersavedcandidates.map(function(result, i){
                    return <div key={i}>
                             
                    <div className="job-item d-block d-md-flex align-items-center  border-bottom fulltime">
                      <div className="company-logo blank-logo text-center text-md-left pl-3">
                        <img src={this.profileimage(result.profilePic)} alt="Image" className="img-fluid mx-auto" />
                      </div>
                      <div className="job-details h-100">
                          <div className="p-3 align-self-center">
                               <a href={'profilePage?id='+ result.candidate_id}><h3 className="mr-3"><b className="boldclass">{result.firstName} {result.lastName}</b> - {result.designation ? result.designation :"--"}  </h3></a>
                               
                                  <StarRatingComponent
                                      name="totaloverall"
                                      starColor="#ffb400"
                                      emptyStarColor="#ffb400"
                                      value={this.onStar(result.overall)}
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
                                <div className="d-block d-lg-flex">
                                <div className="mr-3">{this.commonsearchfield(result.companyName,'companyname')}</div>
                                <div className="mr-3"><span className="icon-suitcase mr-1" title="Experience"></span> {result.experienceYear ? result.experienceYear +' yrs' : '0 yrs'  }  {result.experienceMonth ? result.experienceMonth +' months' : '0 months'   } </div>
                                <div className="mr-3">{this.commonsearchfield(result.currentaddress,'address')}</div>
                                <div className="mr-3">{this.commonsearchfield(result,'expectedsalary')}</div>
                                <div className="mr-3"><a href={this.phonenoemailaddress(result.phone ? result.phone : 0)} className={this.phonenoemailaddress(result.phone)?'':'disabled'}><span className="icon-phone mr-1" title="Phone"></span></a></div>
                                <div className="mr-3"><a href={this.phonenoemailaddress(result.email,'email')} className={this.phonenoemailaddress(result.email,'email')?'':'disabled'}><span className="icon-envelope-o mr-1" title="Email Id"></span></a> </div>
                                <div className="mr-3"><a href={result.defoultsocial_media ? result.defoultsocial_media[0].facebook : '#' } className={result.defoultsocial_media && result.defoultsocial_media[0].facebook ?'icon-facebook-square mr-1':'icon-facebook-square mr-1 disabled'}><span className="" title="Facebook"></span> </a></div>
                                <div className="mr-3"><a href={result.defoultsocial_media ? result.defoultsocial_media[0].instagram : '#' } className={result.defoultsocial_media && result.defoultsocial_media[0].instagram ?'':'disabled'}><span className="icon-instagram mr-1" title="Instagram"></span> </a></div>
                                <div className="mr-3"><a href={result.defoultsocial_media ? result.defoultsocial_media[0].twitter : '#' } className={result.defoultsocial_media && result.defoultsocial_media[0].twitter ?'':'disabled'}><span className="icon-twitter mr-1" title="Twitter"></span></a> </div>
                              </div>
                          </div>
                      </div>
                      <div className="job-category align-self-center">
                      {result.paidOn ? 
                      <div><span class="label label-primary">Premium</span></div>
                      :""}

                          <div className="p-3">
                               {this.downloadbutton(result)}
                          </div>
                      </div>
                    </div>
                    </div>
                    },this)} 
                  </div>
                </div> 
              </div>
            </div>
          </div>
          );
        
      }
  }
function mapStateToProps(state) {
    const { authentication, users,admins} = state;
    console.log("thisuserd=====",state.admins);
    return {
      users,admins
    };
}

const connectedSavedCandidatesPage = connect(mapStateToProps)(SavedCandidatesPage);
export { connectedSavedCandidatesPage as SavedCandidatesPage }; 
