import React from 'react';
import config from 'config';
import { Link,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../actions';
const axios = require("axios");
import { authHeader } from '../../helpers';
import Spinner from 'react-spinner-material'; 
class PostresumePage extends React.Component {
constructor(props) {
  super(props);
  var id='';
  if(this.props.user){
    id= this.props.user.userId;

  }
  
  this.navId = '';

  this.state = {
    visible : true,
	  loader:false,  
    user: this.props.user,
    alerterror:false,
    redirect:false,
    selectedMenu:"",
    file: null,
    image:null,
    myImagdde:null
  };
  this.handleSubmit = this.handleSubmit.bind(this);
  this.onimageChange = this.onimageChange.bind(this);
  this.onfileChange = this.onfileChange.bind(this);
  this.handleclose = this.handleclose.bind(this);
}

componentDidMount() {
   const { dispatch } = this.props; 
}

onimageChange(e) {
	
  this.setState({image:e.target.files[0]});
}

handleclose(){
this.setState({visible:false});
}

onfileChange(e) {
var files  = e.target.files[0];
var type= files.type.split("/"); 
console.log("file ext",type[1]);
if((type[1] =='pdf') || (type[1] =='msword') || (type[1] =='vnd.openxmlformats-officedocument.wordprocessingml.document') || (type[1] =='doc')){
this.setState({file:e.target.files[0]});
this.setState({alerterror:false});
} else {
	this.setState({alerterror:true,myImagdde:null});
	return false;
}

}
handleSubmit(event) {
  event.preventDefault();
  this.setState({loader:true})
  const formData = new FormData();
  formData.append('myImage', this.state.image);
  formData.append('myImage', this.state.file);
  const configs = {
      headers: {
         ...authHeader(), 'content-type': 'multipart/form-data'
      }
  };
  
  axios.post(`${config.uploadapiUrl}/uploads/`,formData,configs)
      .then((response) => {
        console.log("The file is successfully uploaded====",JSON.stringify(response.data));
        if(this.state.image){
          localStorage.setItem('profileimage', JSON.stringify(response.data));
        }
        this.props.history.push('profilePage');
        this.setState({loader:false})
      }).catch((error) => {
		  this.setState({loader:false})
      console.log("The file is error uploaded====");
  });

}
render() {
 
  const userval=this.props.user;
  const { employee, user,alert} = this.props;
  const{alerterror,myImagdde}= this.state;
  if(alerterror==true){
	  var alertstyle = {display:'block'};
	  }  else {
			var alertstyle = {display:'none'};
			  }
  console.log('userval this.props===', this.props);
  return (
      <div className="site-section bg-light">
            <div className="container">

                     {alert && alert.message && this.state.visible ? 
                       <div className="alert alert-success">{alert.message}
                      </div>
                       :""}

                <div className="text-center mb-5 section-heading">
                    <h2>Post Resume</h2>
                            <Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={this.state.loader} />
                    <div className="alert alert-danger" style={alertstyle}>Sorry only pdf,doc,docx files are allowed</div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-lg-2">
                    </div>
                    <div className="col-md-12 col-lg-8 mb-5">
                        <form onSubmit={this.handleSubmit} encType="multipart/form-data" className="p-5 bg-white">
                            <div className="row form-group">
                                <div className="col-md-12 mb-3 mb-md-0">
                                    <label className="font-weight-bold"  htmlFor="fullname">Upload Resume (PDF or Doc file)</label>
                                    <input type="file"  name="myImagdde" accept=""  className="form-control-file border mb-3" onChange= {this.onfileChange} />
                                    <label className="font-weight-bold" htmlFor="fullname">Upload Profile Pic (JPG or PNG file)</label>
                                    <input type="file" name="myImage" accept="image/*" className="form-control-file border mb-3" onChange= {this.onimageChange} />
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-md-3">
                                    <input type="submit" value="Post Resume" className="btn btn-primary pill px-4 py-2" />
                                </div>
                                <div className="col-md-6">
                                    
                                    <Link to="profilePage"><input type="button" value="Skip to Profile Page" className="btn btn-defsult pill px-4 py-2"  /></Link>
                                </div>
                            </div>

                        </form>
                    </div>
                    <div className="col-md-12 col-lg-2">
                    </div>

                </div>
            </div>
        </div>

      );
  }
}

function mapStateToProps(state) {
  console.log("stae====",state);
  const { authentication, users,alert} = state;
  const { user } = authentication;
  const {  employee} = users;
    
  return {
    user,
    employee,
    alert
  };
}


const connectedPostresumePage = connect(mapStateToProps)(PostresumePage);
export { connectedPostresumePage as PostresumePage };
