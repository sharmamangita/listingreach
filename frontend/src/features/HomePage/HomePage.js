import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MainPage from '../../components/MainPage';
import SearchPage from '../../components/SearchPage';
import { authHeader } from '../../helpers';
const axios = require("axios");
import config from 'config';
import { userActions } from '../../actions';
import { adminActions } from '../../actions';
import Slider from "react-slick";
import StarRatings from 'react-star-ratings';
import StarRatingComponent from 'react-star-rating-component';
import { Alert } from "reactstrap";
import 'react-phone-number-input/style.css'
import PhoneInput, { formatPhoneNumber,isValidPhoneNumber } from 'react-phone-number-input';
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.navId = '';
        this.keyval='';
        this.name='';
        this.companyName='';
        this.email='';
        this.previouscompanyName='';
        this.totalreview='';
        this.expernice='';
        this.state = {
          user: Object.assign({
            keyval: '',
            name:'',
            email:'',
            phone:'',
            companyName:'',
            previouscompanyName:'',
            city:'',
            educational:'',
            professional:'',
            expernice:'',
            totalreview:0,
            visible:false,

          }),
          submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Submit=this.Submit.bind(this);
        this.closebtn=this.closebtn.bind(this);
        
    }
    componentDidMount() {
      const { dispatch } = this.props;
      this.props.dispatch(adminActions.getPlan());
     
      
    }
    handleSubmit(event) {
      event.preventDefault();
      this.setState({ submitted: true });
      const { user } = this.state;
      //const { dispatch } = this.props.dispatch;
      const configs = {
        headers: {
         ...authHeader(), 'content-type': 'multipart/form-data'
        }
      }
      axios.get(`${config.apiUrl}/users/getKeyword/${JSON.stringify(user.keyval)}`,user.keyval,configs)
      .then((response) => {
          this.setState({ searchresult: response.data.result });
          window.scrollTo(500,500);
      }).catch((error) => {
      console.log("The file is error uploaded====");
      });
    }
    Submit(event) {
      event.preventDefault();
      this.setState({ submitted: true });
      const { user } = this.state;
      const { dispatch } = this.props;
      var gettokenurl = config.apiUrl+"/users/advanceSearch";
        fetch(gettokenurl,{
            body: JSON.stringify(user),
            cache: 'no-cache', 
            headers: {
            'content-type': 'application/json'
            },
            method: 'POST'
        })
        .then(response => response.json()).then((json) => {
            console.log("url data get token",json.result);
            this.setState({ searchresult: json.result });
             window.scrollTo(500,500);
        })
    }

    handleChange(event) {
      const { name, value } = event.target;
      const { user } = this.state;
      this.setState({
            user: {
                ...user,
                [name]: value
            },
        });
    }
    closebtn(){
     this.setState({visible:false})
    } 
  
    onStarClickHalfStar(nextValue, prevValue, name, e) {
      if(name=='totalreview'){
      const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;
      if (xPos <= 0.5) {
      nextValue -= 0.5;
      }

      this.setState({
        user : Object.assign({
          totalreview: nextValue,
          keyval: this.state.user.keyval,
          name:this.state.user.name,
          email:this.state.user.email,
          phone:this.state.user.phone,
          companyName:this.state.user.companyName,
          previouscompanyName:this.state.user.previouscompanyName,
          city:this.state.user.city,
          educational:this.state.user.educational,
          professional:this.state.user.professional,
          expernice:this.state.user.expernice
        })
        });
      console.log('data',this.state.user);
    }
  } 
  removeData(){
    console.log("222222=====");
    this.keyval='';
    this.name='';
    this.companyName='';
    this.email='';
    this.previouscompanyName='';
    this.totalreview='';
    this.expernice='';
    this.setState({ user: Object.assign({
            keyval: '',
            name:'',
            email:'',
            phone:'',
            companyName:'',
            previouscompanyName:'',
            city:'',
            educational:'',
            professional:'',
            expernice:'',
            totalreview:0,
            visible:false,

          })  });
  }
  render() {
	 const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  }
  const { user,searchresult} = this.state;
  const {phone} = this.state.user;
  const { alert } = this.props;
  var home ='';
  const dispatchval = ({
        tagName : 'span',
        className : '',
        children : null,
        dispatch :this.props
    });
    
    if(this.state.searchresult && this.props.admins){
      
      if(user.keyval){
       this.keyval =user.keyval;
      }
      if(user.name){
        this.name='-'+user.name;
      }
      if(user.companyName){
        this.companyName=','+user.companyName;
      }
      if(user.email){
        this.email=','+user.email;
      }
      if(user.previouscompanyName){
       this.previouscompanyName= ','+user.previouscompanyName;
      }
      if(user.totalreview){
        this.totalreview=','+user.totalreview;
      }
      if(user.expernice){
        this.expernice=','+user.expernice;
      }
      home=<SearchPage dispatchval={dispatchval} results={this.state.searchresult}  plan={this.props.admins} keyvalue={this.keyval+this.name+this.companyName+this.email+this.previouscompanyName+this.totalreview+this.expernice}/>;
    }else{
       home=<MainPage  />;
    }
    return (
      <div className="site-blocks-cover overlay bgimag" data-aos="fade" data-stellar-background-ratio="0.5">
          <div className="container">
              <div className="row align-items-center">
                <div className="col-12" data-aos="fade">
                    <div id="slideshow">
                    </div>
                      { alert.message &&
                      <Alert className={`alert ${alert.type}`} isOpen={this.state.visible} > <button type="button" onClick={this.closebtn} className="close" >
                      <span aria-hidden="true">&times;</span>
                      </button>{alert.message}</Alert>
                      }
                    <form onSubmit={this.handleSubmit}>
                      <div className="row mb-3">
                          <div className="col-md-9">
                              <div className="row">
                                  <div className="col-md-12 mb-3 mb-md-0">
                                      <input type="text" className="form-control " placeholder="search by candidate first name, last name or company name " name="keyval" value={user.keyval} onChange={this.handleChange} />
                                  </div>
                              </div>
                          </div>
                          <div className="col-md-3">
                              <input type="submit" className="btn btn-search btn-primary btn-block" value="Search" />
                          </div>
                      </div>
                      <div className="row">
                          <div className="col-md-12">
                              <p className="large"><a href="#advsearch" data-toggle="collapse" onClick={() => this.removeData()} >Advanced Search</a></p>

                          </div>
                      </div>
                   </form>
                    <div id="advsearch" className="collapse">
                      <form onSubmit={this.Submit} className="p-4 bg-white">
                        <div className="row form-group">
                          <div className="col-md-4 mb-3 mb-md-0">
                              <label className="font-weight-bold" htmlFor="fullname">Name</label>
                              <input type="text" className="form-control " placeholder="Candidate Name" name="name" value={user.name} onChange={this.handleChange} />
                          </div>
                          <div className="col-md-4 mb-3 mb-md-0">
                              <label className="font-weight-bold" htmlFor="fullname">Company Name</label>
                              <input type="text" className="form-control " placeholder="Company Name" name="companyName" value={user.companyName} onChange={this.handleChange} />
                          </div>
                          <div className="col-md-4 mb-3 mb-md-0">
                              <label className="font-weight-bold" htmlFor="fullname">Email Address</label>
                              <input type="email" className="form-control " placeholder="Email Address" name="email" value={user.email} onChange={this.handleChange} />
                          </div>
                        </div>
                        <div className="row form-group mb-3">
                            <div className="col-md-4 mb-3 mb-md-0">
                                <label className="font-weight-bold" htmlFor="fullname">Phone Number</label>
                            <PhoneInput
                              placeholder="Enter phone number"
                              value={ user.phone ? user.phone:"+91"}
                              onChange={ phone =>    this.setState({
                                         user: {
                                          ...user,
                                          phone: phone
                                      },
                                  }) } />   
                 
                            </div>
                            <div className="col-md-4 mb-3 mb-md-0">
                                <label className="font-weight-bold" htmlFor="fullname">Current or Previous Company Worked at </label>
                                <input type="text" className="form-control " placeholder="Any Current or Previous Company" name="previouscompanyName" value={user.previouscompanyName} onChange={this.handleChange} />
                            </div>
                            <div className="col-md-4 mb-3 mb-md-0">
                                <label className="font-weight-bold" htmlFor="fullname">City </label>
                                <input type="text" className="form-control " placeholder="Enter Preferred City" name="city" value={user.city} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="row form-group mb-3">
                            <div className="col-md-4 mb-3 mb-md-0">
                                <label className="font-weight-bold" htmlFor="fullname">Educational Information</label>
                                <input type="text" id="fullname" className="form-control" placeholder="Educational Information" name="educational" value={user.educational} onChange={this.handleChange}/>
                            </div>
                            <div className="col-md-4 mb-3 mb-md-0">
                                <label className="font-weight-bold" htmlFor="fullname">Star Rating</label>
                                <div className="d-lg-flex">
                                    <StarRatingComponent
                                    name="totalreview"
                                    starColor="#ffb400"
                                    emptyStarColor="#ffb400"
                                    value={user.totalreview}
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
                            <div className="col-md-4 mb-3 mb-md-0">
                                <label className="font-weight-bold" htmlFor="fullname">Professional Experience</label>
                                <div className="slidecontainer">
                                  <input type="range" min="0" max="100" name="expernice" value={user.expernice} title={user.expernice} className="slider" id="myRange" onChange={this.handleChange}/>
                                 <p>Value: <span id="demo">{user.expernice ? user.expernice :50} Years</span></p>
                                </div>
                              
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-md-12">
                                <input type="submit" value="Advanced Search" className="btn btn-primary  py-2 px-5" />
                            </div>
                        </div>
                      </form>
     
                    </div>
                  </div>
                </div>
              </div>
       
          {home}
      </div>
      );
    }
}



function mapStateToProps(state) {
    const { loggingIn,user,admins } = state;
    const { alert } = state;
    console.log("this....===",admins);
    return {
        loggingIn,
        alert,
        user,
        admins
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage }; 
