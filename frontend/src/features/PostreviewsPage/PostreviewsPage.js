import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import config from "config";
import { Alert } from "reactstrap";
import { userActions } from "../../actions";
import StarRatings from 'react-star-ratings';
import StarRatingComponent from 'react-star-rating-component';
import Modal from 'react-bootstrap/Modal'
const split = require('split-string');
//import TechnicalModal from '../../components/TechnicalModal';
class PostreviewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.postuser  = JSON.parse(localStorage.getItem('user'));
    this.displayData = [];
    this.sendoverall = 0;
    this.technical={};
    this.state = {
     submiterror:false,
   	 displaypostrev:true,
   	 visible:false,
     fullname:'',
     email:'',
     technicalexp:{},
     companyname:'',
     selectedOption:'Yes',
     strength:'',
     improvment:'',
     stafdrive:0,  
     communication:0,
     ownership:0,
     overall:0,
     submitted: false,
     show: false,
     showtechnical:false,
     disabled:false,
     status:'unverified',
     datalan:{},
     showdata : this.displayData,
     currentskill : "",
     numberskill:0
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.radioChange  =  this.radioChange.bind(this);
    this.handleskill  =  this.handleskill.bind(this);
    this.appendData = this.appendData.bind(this);
    this.prependData = this.prependData.bind(this);
    this.closebtn = this.closebtn.bind(this);
    this.closebtninfo = this.closebtninfo.bind(this);
 
  }


componentDidMount(){
    var myMainSite = window.location.href;
    var splitUrl = myMainSite.split('ref=');
    if(splitUrl[1]){
        var senddata =  {'token':splitUrl[1]};
        var gettokenurl = config.apiUrl+"/users/getinvitation";
        fetch(gettokenurl,{
            body: JSON.stringify(senddata),
            cache: 'no-cache', 
            headers: {
            'content-type': 'application/json'
            },
            method: 'POST'
        })
        .then(response => response.json()).then((json) => {
            var result = json.result[0];
            var autoemail = result.invitations.length-1;
            console.log("result",result);
            this.setState({email :result.invitations[autoemail].email,
            disabled:true,status:json.status,skill:result.skills,userId:result.userId,
            totaloverall:result.postreviews,totalrevid:result.postreviews,user:result.users[0]});

        })   
    }
}

closebtn(){
	this.setState({visible:false})
} 
closebtninfo(){
	this.setState({displaypostrev:false});
}

prependData(){;
	this.displayData.pop();
}

radioChange(e) {
	this.setState({
	  selectedOption: e.currentTarget.value
	});
}




handleChange(event) {
 const { name, value } = event.target;
 this.setState({ [name]: value });
}

handleSubmit(e) {
 e.preventDefault();
 this.setState({ submitted: true });
       var rev = this;
	  if(this.state.totaloverall && this.state.totaloverall.length > 0){ 
	  	var totalperson = this.state.totaloverall.length;
	    this.state.totaloverall.forEach(function(item){
	    	 rev.sendoverall =  parseFloat(item.overall) + rev.sendoverall; 
	    });
	    rev.sendoverall =  parseFloat(rev.sendoverall) / totalperson;
	    console.log("resr",rev.sendoverall);
	 } else { 
	 	rev.sendoverall = this.state.overall ;	
	 }

	 
 const {fullname,companyname,candidatereport,strength,email,
 improvment,userId,stafdrive,status,selectedOption,communication,ownership,overall,technicalexp,submitted,datalan} = this.state; 
 const { dispatch } = this.props; 
 if(fullname && companyname && email && improvment ){
 	var datasend = {
 			fullname: fullname,
	        company:companyname,
	       	candidatereport:selectedOption,
	        strengths:strength,
	        email:email,
	        improvment:improvment,
	        selfdrive:stafdrive,
	        communication:communication,
	        ownership:ownership,
	        technicalexp:this.technical,
	        overall:overall,
	        reviewdata:datalan,
	        userId:userId,
	        postuserId:this.postuser.userId,
	        totaloverall:Math.round(this.sendoverall)
 		};
 	   dispatch(userActions.postreveiws(datasend));
 	  
 	}
 	this.setState({submiterror:true});
 	 this.setState({visible:true},()=>{
        window.setTimeout(()=>{
          this.setState({visible:false})
        },9000)
      }); 
}

handleskill(event){
 this.setState({currentskill:event.target.value});
}

onStarClickHalfStar(nextValue, prevValue, name, e) {
	if(name=='communication'){
		const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;
		if (xPos <= 0.5) {
		  nextValue -= 0.5;
		}
		console.log('name1: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
		this.setState({communication: nextValue});
	}
	else if(name=='ownership'){
		const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;
		if (xPos <= 0.5) {
		  nextValue -= 0.5;
		}
		console.log('name2: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
		this.setState({ownership: nextValue});
    } 
    else if(name=='stafdrive'){
    	const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;
		if (xPos <= 0.5) {
		  nextValue -= 0.5;
		}
		console.log('name3: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
		this.setState({stafdrive: nextValue}); 
    } 
    else if(name=='overall'){
    	
		const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;
		console.log("xp==e==:",xPos);
		if (xPos <= 0.5) {
		  nextValue -= 0.5;
		}
		console.log('name4: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
		this.setState({overall: nextValue});
    } 
    else {
  		const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;
		console.log("xp====:",xPos);
		if (xPos <= 0.5) {
		  nextValue -= 0.5;
		}
		var skillsname = name;
		this.technical[name] = nextValue;
		console.log(this.technical);
  		this.setState({[skillsname]:nextValue});
  		console.log("extra",this.state);
	}
}

appendData() {
 this.setState({
 	numberskill:2
 });
}



render() {
  const {fullname,companyname,candidatereport,strength,email,
  improvment,stafdrive,disabled,communication,ownership,overall,technical,submitted,user,numberskill} = this.state;
  const { alert } = this.props;
  var skilldata = this.displayData;


     var rev = this;
	  if(this.state.totaloverall && this.state.totaloverall.length > 0){ 
	  	var totalperson = this.state.totaloverall.length;
	    this.state.totaloverall.forEach(function(item){
	    	 rev.sendoverall =  parseFloat(item.overall) + rev.sendoverall; 
	    });
	    rev.sendoverall =  parseFloat(rev.sendoverall) / totalperson;
	    console.log("resr",(rev.sendoverall/totalperson)*5);
	 } else { 
	 	rev.sendoverall = this.state.overall ;	
	 }


	 	var postederror='';
	     if(this.postuser && this.state.totalrevid && this.state.totalrevid.length>0){
		        var postviewd =	this.state.totalrevid.filter(item => {
		        	if(item && item.postuserId){
		        	  return this.postuser.userId == item.postuserId;
		        	}
		        }); 
		  	if(postviewd && postviewd.length>0) {
		  	 postederror=true;
		  	} else {
		  		 postederror=false;
		  	}

    	} 


  return (
    <div className="site-section bg-light">
	    <div className="container">
	        <div className="text-center mb-5 section-heading">
	            <h2>Submit References</h2>
				{alert && alert.message &&
				<Alert className={`alert ${alert.type}`} isOpen={this.state.visible} > <button type="button" onClick={this.closebtn} className="close" >
				<span aria-hidden="true">&times;</span>
				</button>{alert.message}</Alert>
				}

				{user && postederror==false && user.firstName && this.state.displaypostrev ? 
				<Alert className="alert alert-info"><button type="button" onClick={this.closebtninfo} className="close" >
				<span aria-hidden="true">&times;</span>
				</button>Post Review for Candidate -<a href={user && user._id ?'/profilePage?id='+user._id:''} target="_blank">"{user.firstName} {user.lastName}"</a> </Alert>
				:""}

				{postederror ? 
				<Alert className="alert alert-danger"><button type="button" onClick={this.closebtninfo} className="close" >
				<span aria-hidden="true">&times;</span>
				</button>You are already posted review for this candidate.</Alert>
					:''}

	        </div>
	        <div className="row">
	            <div className="col-md-12 col-lg-2 mb-5">
	            </div>
	            <div className="col-md-12 col-lg-8 mb-5">
				<form onSubmit={this.handleSubmit} className="p-5 bg-white">
				    <div className="row form-group">
						<div className="col-md-12 mb-3 mb-md-0">
							<label className="font-weight-bold" htmlFor="fullname">Your Full Name</label>
							<input type="text" name="fullname" onChange={this.handleChange} value={fullname} className="form-control" />
							{ submitted && !fullname &&
							<div className="help-block red">Full name is required</div>
							} 
						</div>
                    </div>
					<div className="row form-group">
						<div className="col-md-12">
							<label className="font-weight-bold" htmlFor="email">Email</label>
							<input type="email" id="email" onChange={this.handleChange} value={email} name="email" className="form-control" disabled={disabled} placeholder="myra@abc.com" />
							{ submitted && !email &&
							<div className="help-block red">Email name is required</div>
							} 
						</div>
					</div>
					<div className="row form-group">
						<div className="col-md-12 mb-3 mb-md-0">
							<label className="font-weight-bold" htmlFor="company">Company or school where you both worked together</label>
							<input type="text" name="companyname" onChange={this.handleChange} value={companyname} className="form-control" />
							{submitted && !companyname &&
							<div className="help-block red">Company or school is required</div>
							}
						</div>
					</div>
					<div className="row form-group">
						<div className="col-md-12 mb-3 mb-md-0">
							<label className="font-weight-bold" htmlFor="company">Did the candidate report to you</label>
							<div className="form-check-inline">
								<label className="form-check-label" htmlFor="radio5">
								<input type="radio" name="candidatereport" className="form-check-input" name="optradio" value="Yes"
								
								checked={this.state.selectedOption === 'Yes'}
								onChange={this.radioChange} />Yes
								</label>
							</div>
							<div className="form-check-inline">
								<label className="form-check-label" htmlFor="radio6">
								<input type="radio" name="candidatereport" className="form-check-input" name="optradio" value="No"
								checked={this.state.selectedOption === "No"}
								onChange={this.radioChange} />No
								</label>
							</div>
						</div>
					</div>

					<div className="row form-group">
						<div className="col-md-12">
							<label className="font-weight-bold" htmlFor="message">Rate Employee (NOT publically visible to candidate. EmployeeMirror uses it for internal analysis)</label>
							<div className="form-group row">
								<label className="col-md-4 col-form-label">Communication</label>
								<div className="col-md-8">
									<div className="row">
										<div className="col-lg-12">
											<div style={{fontSize: 26}}>

												<StarRatingComponent
													name="communication"
													starColor="#ffb400"
													emptyStarColor="#ffb400"
													value={this.state.communication}
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
								</div>
							</div>
							<div className="form-group row">
								<label className="col-md-4 col-form-label">Ownership</label>
								<div className="col-md-8">
									<div className="row">
										<div className="col-lg-12">
										<div style={{fontSize: 26}}>
											<StarRatingComponent
											name="ownership"
											starColor="#ffb400"
											emptyStarColor="#ffb400"
											value={this.state.ownership}
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
								</div>
							</div>

							<div className="form-group row">
								<label className="col-md-4 col-form-label">Self Drive</label>
								<div className="col-md-8">
									<div className="row">
										<div className="col-lg-12">
										<div style={{fontSize: 26}}>
											<StarRatingComponent
											name="stafdrive"
											starColor="#ffb400"
											emptyStarColor="#ffb400"
											value={this.state.stafdrive}
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
								</div>
							</div>

							

							{this.state.skill && this.state.skill.slice(numberskill>0 ? numberskill: "0,3").map(function(skills, i){
							return  <div key={i}>
							<div className="form-group row">
							<label className="col-md-4 col-form-label">{skills.keywordval}</label>
							<div className="col-md-8">
							<div style={{fontSize: 26}}>
								<StarRatingComponent
								name={skills.keywordval ? skills.keywordval:""}
								starColor="#ffb400"
								emptyStarColor="#ffb400"
								value={this.state[skills.keywordval]}
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
										<span><i className="fas fa-star-half i" /></span>
										</span>
									);
								}} />
							</div>
							</div>
							</div>
						</div>
						}, this)}



						 <div id="display-data-Container">
						             		{skilldata}
						             	</div>

							<div className={this.state.skill && this.state.skill.length>3 ?"form-group row":"hidden-current"}>
								<label className="col-md-4 col-form-label">Technical Experience</label>
								<select className="form-control col-md-6 mb-3" id="level" onChange={this.handleskill} name="allskills">
									<option>Select</option>
									{this.state.skill && this.state.skill.slice(3,100).map(function(skills, i){
										return  <option key={i} value={skills.keywordval}>{skills.keywordval}</option>
									}, this)}
								</select>
								<div className="col-md-2 mt-3">
								<a href="javascript:void(0)" className="btn btn-primary rounded" onClick={this.appendData} ><span className="icon-plus-circle"></span></a>
								</div>
								</div>
						
			 	


					</div>
				</div>
				<div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="company">Strengths (Visible to candidate and publicly)</label>      
                      	<textarea name="strength" id="strength" value={strength} onChange={this.handleChange} cols="30" rows="5" className="form-control" placeholder="Enter Strengths"></textarea><span>Max 1500 words</span>
                   			{submitted && !strength &&
	                            <div className="help-block red">Strengths is required</div>
                          	}
                    </div>
                </div>
				<div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="company">Areas of Improvment (NOT publicly Visible or to candidate. Used by EmployeeMirror for internal analysis)</label>
                        <textarea name="improvment" id="improvment"  cols="30" onChange={this.handleChange} value={improvment} rows="5" className="form-control" placeholder="Enter Areas of Improvment"></textarea><span>Max 1500 words</span>
                    	{submitted && !improvment &&
                            <div className="help-block red">Areas of Improvment is required</div>
                      	}
                    </div>
                </div>
				<div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="company">Overall Review (Visible to candidate and publicly)</label>
                        <div style={{fontSize: 26}}>
						<StarRatingComponent
						name="overall"
						starColor="#ffb400"
						emptyStarColor="#ffb400"
						value={this.state.overall}
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
                <div className="row form-group">
                    <div className="col-md-12">
                        <input type="submit" value="Submit Reference" className="btn btn-primary pill px-4 py-2"  disabled={postederror || this.state.submiterror?true:false}/>
                    </div>
                </div>
			</form>
        </div>
    </div>
    </div>
	</div>
    );
  } 
}

function mapStateToProps(state) {
  const { alert,users } = state;
  return {
    alert,
    users
  };
}

const connectedPostreviewsPage = connect(mapStateToProps)(PostreviewsPage);
export { connectedPostreviewsPage as PostreviewsPage };
