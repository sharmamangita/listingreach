/**
 * api call lands here from routing
 */

import express = require("express");
import UserBusiness = require("./../app/business/UserBusiness");
import SavedCandidateBusiness = require("./../app/business/SavedCandidateBusiness");

import EmployeeBusiness = require("./../app/business/EmployeeBusiness");
import PagesBusiness = require("./../app/business/PagesBusiness");
import PostreviewBusiness = require("./../app/business/PostreviewBusiness");
import IBaseController = require("./BaseController");
import IUserModel = require("./../app/model/interfaces/IUserModel");
import IPostreviewModel = require("./../app/model/interfaces/IPostreviewModel");
import ISavedCandidatesModel = require("./../app/model/interfaces/ISavedCandidatesModel");
import IPagesModel = require("./../app/model/interfaces/IPagesModel");
import IEmployeeModel = require("./../app/model/interfaces/IEmployeeModel");
import AdminUserBusiness = require("./../app/business/AdminUserBusiness");
import ContactformBusiness = require("./../app/business/ContactformBusiness");
import InvitationBusiness = require("./../app/business/InvitationBusiness");
import IAdminUserModel = require("./../app/model/interfaces/IAdminUserModel");
import IContactformModel = require("./../app/model/interfaces/IContactformModel");
import IInvitationModel = require("./../app/model/interfaces/IInvitationModel");
import Common = require("./../config/constants/common");
import PlanBusiness = require("./../app/business/PlanBusiness");



var moment = require('moment');
var mammoth = require("mammoth");
const fs = require('fs');

var _          = require('underscore');
var  mongoose = require('mongoose'); 
var async = require('async');
var base64Img = require('base64-img');
var stripe = require("stripe")(Common.STRIPESECRETKEY);
class UserController implements IBaseController <UserBusiness> {
 	//being called by client getEmailExists
	getEmailExists(req: express.Request, res: express.Response): void {
		try {
			var query: string = req.params.query;
			var _userBusiness = new UserBusiness();
			_userBusiness.count({'email':{$regex : "^" + (query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')) + "$", $options: "i"}}, (error, result) => {
				if(error){
					console.log(error);
					
					res.send({"error": "error"});
				}
				else {
					res.send(JSON.stringify(result))
				};
			});
		}
		catch (e)  {
			console.log(e);
			res.send({"error": "error in your request"});

		}
	}
	register(req: express.Request, res: express.Response): void {
		 try {
            var user: IUserModel = < IUserModel > req.body.user;
            user.createdOn = new Date();
           
			user.password = req.body.user.password;
            user.firstName=req.body.user.firstName.toLowerCase();
            user.lastName=req.body.user.lastName.toLowerCase();
            user.paidOn= false;
            var userBusiness = new UserBusiness();
            var token = userBusiness.createToken(user);

            userBusiness.create(user, (error, userdata) => {
                if (error) {
                    console.log("error==sss==", error);
                    res.send({
                        "error": error
                    });
                } else {
                   
                    var signupemailtemplatetouser = Common.SIGNUP_EMAIL_TEMPLATE_TO_REGISTERED_USER;
                    var emailtemplate = signupemailtemplatetouser.replace(/#email#/g, userdata.email).replace(/#password#/g, userdata.password);
                     Common.sendMail(userdata.email, Common.ADMIN_EMAIL, 'Welcome to Listingraech!', null, emailtemplate, function(error: any, response: any) {
                        if (error) {
                            console.log(error);
                            res.send("error");
                        }else{
                        	res.send({ "success": "success"});
                        }
                    }); 
                }
            });
        } catch (e) {
            console.log(e);
            res.send({
                "error": "error in your request"
            });

        }

    }
	authenticate(req: express.Request, res: express.Response): void {
        try {
            var _user: IUserModel = <IUserModel>req.body;
			//set the createdon to now
            var _userBusiness = new UserBusiness();
            _userBusiness.findOne({email: _user.email}, (error, result) => {
                if(error) res.send({"error": "error"});
                else {
                	console.log("result===",result.password);
                	console.log("_user===",_user.password);
					if(result && result.password && result.password==_user.password) {
						/*if(!result.isActive) {
							return res.status(401).send({"error": "Your account is not active. Please contact admin."});
						} else {*/
							var token = _userBusiness.createToken(result);
							var _updateData: IUserModel = <IUserModel>req.body;
							_updateData.lastLogin = new Date();
							_updateData.token = token;
							var _id: string = result._id.toString();
							var _userBusinessUpdate = new UserBusiness();
							_userBusinessUpdate.update(_id, _updateData, (error, resultUpdate) => {
								if(error) res.send({"error": "error", "message": "Authentication error"});//res.status(401).send({"error": "Authentication error"});
								else {
									res.send({
										userId: result._id,
										email: result.email,
										firstName: result.firstName,
										lastName: result.lastName,
										token: token
									});
								}
							});
						//}
					} else {
						return res.status(401).send({"error": "The username or password don't match"});
					}
				}
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }
    create(req: express.Request, res: express.Response): void {
        try {
        	var _userBusiness = new UserBusiness();
        	_userBusiness.verifyToken(req, res,  (companyUserData) => { 
				var _user: IUserModel = <IUserModel>req.body;
				
				_user.createdOn = new Date();
	            var _userBusiness = new UserBusiness();
	            _userBusiness.create(_user, (error, result) => {
	                if(error) {
						console.log(error);
						res.send({"error": error});
					}
	                else res.send({"success": "success"});
	        	}); 
	        });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
		}
    }
   


updateStatus(req: express.Request, res: express.Response): void {
	try {
		var _user: IPostreviewModel = <IPostreviewModel>req.body;
        var _postreviewBusiness = new PostreviewBusiness();
        var _id= _user.user.status;
        var _status = {'status':'verified'};
        _postreviewBusiness.update(mongoose.Types.ObjectId(_id),_status,(error:any, userdata:any) => {
				 if(error) {
					console.log(error);
					res.send({"error": error});
				} else { 
				_postreviewBusiness.retrieve(req.body,(error, result) => {
					if(error){
					res.send({"error": "error"});
					} else { 
					res.send(result); 
					}
				});	
 			}

	    });

	} catch (e)  {
	    console.log(e);
	    res.send({"error": "error in your request"});
	}

}


update(req: express.Request, res: express.Response): void {
	var employe=[];
	var userBusiness = new UserBusiness();
	userBusiness.verifyToken(req, res,  (companyUserData:any) => {
		var user: IUserModel = <IUserModel>req.body.user;
		
		if(req.body.employeeval.firstName){
			user.firstName=req.body.employeeval.firstName.toLowerCase();
		}
		if(req.body.employeeval.lastName){
			user.lastName=req.body.employeeval.lastName.toLowerCase();
		}
		if(req.body.employeeval.companyName){
			user.companyName=req.body.employeeval.companyName.toLowerCase();
		}
		if(req.body.employeeval.previouscompanyName){
			user.previouscompanyName=req.body.employeeval.previouscompanyName;
		}
		if(req.body.employeeval.middleName){
			user.middleName=req.body.employeeval.middleName;
		}
		//console.log("data");
		var _id:string = req.body.employeeval.id.toString();
		userBusiness.update(mongoose.Types.ObjectId(_id), user, (error:any, userdata:any) => {
			if(error){
				console.log("error===",error);
			}else {

				var _employee: IEmployeeModel = <IEmployeeModel>req.body;
				var _employeeBusiness = new EmployeeBusiness();
				//set the default values
				if(req.body.employeeval.dateofBirth){
					_employee.dateofBirth=req.body.employeeval.dateofBirth;
				}

				if(req.body.employeeval.designation){
					_employee.designation =req.body.employeeval.designation;
				}

				if(req.body.employeeval.totaloverall){
				var totalreview = req.body.employeeval.totaloverall;
				var searchqu =  0;
		            	if(totalreview >1 && totalreview<=1.5){
		            		searchqu = 1.5;
		            	} else if(totalreview>2 && totalreview<=2.5){
		            		searchqu = 2.5;
		            	} else if(totalreview>3 && totalreview<=3.5){
		            		searchqu = 3.5;
		            	} else if(totalreview>4 && totalreview<=4.5){
		            		searchqu = 4.5;
		            	} else {
		            		searchqu = totalreview;
		            	}
					_employee.totaloverall = searchqu.toString();
				}
		
				if(req.body.employeeval.currentSalary){
					_employee.currentSalary=req.body.employeeval.currentSalary;
				}
				if(req.body.employeeval.gender){
					_employee.gender=req.body.employeeval.gender;
				}
				if(req.body.employeeval.summary){
					_employee.summary=req.body.employeeval.summary;
				}
				if(req.body.employeeval.currentlyEmployed){
					_employee.currentlyEmployed=req.body.employeeval.currentlyEmployed;
				}
				if(req.body.employeeval.openRelocation){
					_employee.openRelocation=req.body.employeeval.openRelocation;
				}
				if(req.body.employeeval.authorization){
					_employee.authorization=req.body.employeeval.authorization;
				}
				if(req.body.employeeval.felony){
					_employee.felony=req.body.employeeval.felony;
				}
				if(req.body.employeeval.phone){
					_employee.phone=req.body.employeeval.phone;
				}
				if(req.body.employeeval.alternateMobile_number){
					_employee.alternateMobile_number=req.body.employeeval.alternateMobile_number;
				}
				if(req.body.employeeval.alternateEmail){
					_employee.alternateEmail=req.body.employeeval.alternateEmail;
				}
			    if(req.body.employeeval.experienceMonth){
					_employee.experienceMonth=req.body.employeeval.experienceMonth;
				}
				if(req.body.employeeval.education){
					_employee.education=req.body.employeeval.education;
				}
				if(req.body.employeeval.experienceYear){
					_employee.experienceYear=req.body.employeeval.experienceYear;
				}else{
					_employee.experienceYear=0;
				}
				if(req.body.employeeval.expectedSalary){
					_employee.expectedSalary=req.body.employeeval.expectedSalary;
				}
				if(req.body.employeeval.openTravel){
					_employee.openTravel=req.body.employeeval.openTravel;
				}
				if(req.body.employeeval.currentsalaryflag){
					_employee.currentsalaryflag=req.body.employeeval.currentsalaryflag;
				}
				if(req.body.employeeval.expectedsalaryflag){
					_employee.expectedsalaryflag=req.body.employeeval.expectedsalaryflag;
				}
				if(req.body.employeeval.expectedsalaryflag){
					_employee.expectedsalaryflag=req.body.employeeval.expectedsalaryflag;
				}
				if(req.body.employeeval.currentaddress){
					_employee.currentaddress=req.body.employeeval.currentaddress;
				}
				if(req.body.employeeval.defoultsocial_media){
					_employee.defoultsocial_media=req.body.employeeval.defoultsocial_media;
				}
				
				if(req.body.employeeval.social_media){
				_employeeBusiness.findOne({ 'userId': req.body.employeeval.id }, function (error, result) {
                            if (error) {
                                console.log("ueser");
                            }
                            else {
                            	if(result.social_media && result.social_media.length != req.body.employeeval.social_media.length){
                            		 var usernewdata = result.social_media;
                                	 var margedata = usernewdata.concat(req.body.employeeval.social_media);
                                	//_employee.social_media = margedata;
									    var result_array = [];
									    var len = margedata.length;
									    var assoc = {};

									    while(len--) {
									        var item = margedata[len];

									        if(!assoc[item]) 
									        { 
									            result_array.unshift(item);
									            assoc[item] = true;
									        }
									    }
									  _employee.social_media = result_array;

                            	} 
                            }
                     }); 
				}

				if(req.body.employeeval.permanentaddress){
					_employee.permanentaddress=req.body.employeeval.permanentaddress;
				}
				if(req.body.employeeval.strengths){
					_employee.strengths=req.body.employeeval.strengths;
				}
				
				if(req.body.employeeval.improvements){
				_employee.improvements=req.body.employeeval.improvements;
				}
				if(req.body.employeeval.skills){
					console.log("get sills",req.body.employeeval.skills);
					_employee.skills=req.body.employeeval.skills;
				}

				if(req.body.employeeval.professionalSummary){
					_employee.professionalSummary=req.body.employeeval.professionalSummary;
				}
				_employee.createdDate = new Date();
				_employeeBusiness.findOne({'userId':req.body.employeeval.id}, (error, result) => {
					if(error){
						console.log("ueser");
					}
					else {
						var _id:string = result._id.toString();
						_employeeBusiness.update(mongoose.Types.ObjectId(_id), _employee, (error:any, resultUpdate:any) => {
							if(error){
								console.log("error===",error);
							}else {
								
								var employeeAggregate = [
					                {
					                    $lookup:                       
					                    {
					                        from: "employees",
					                        localField: "_id",   
					                        foreignField: "userId",        
					                        as: "employees"               
					                    }
					                },
					                {
						          	  	$unwind:"$employees"
						            
						          	},
					                {
					                    $project:                       
					                    {    
					                        "_id":1,
					                        "firstName":1,
					                        "lastName":1,
					                        "middleName":1,
					                        "email":1,
					                        "roles":1,
					                        "status":1,
					                        "paidOn":1,
					                        "hrpaidOn":1,
					                        "companyName":1,
					                        "createdOn":1,
					                        "previouscompanyName":1,
					                        "employees.strengths":1,
					                        "employees.userId":1,
					                        "employees._id":1,
					                        "employees.improvements":1,
					                        "employees.resume":1,
					                        "employees.summary":1,
					                        "employees.profilePic":1,
					                        "employees.profileCover":1,
					                        "employees.education":1,
					                        "employees.alternateEmail":1,
					                        "employees.dateofBirth":1,
					                        "employees.currentSalary":1,
					                        "employees.gender":1,
					                        "employees.expectedSalary":1,
					                        "employees.currentlyEmployed":1,
					                        "employees.openRelocation":1,
					                        "employees.openTravel":1,
					                        "employees.sponsorshipRequired":1,
					                        "employees.authorization":1,
					                        "employees.felony":1,
					                        "employees.phone":1,
					                        "employees.alternateMobile_number":1,
					                        "employees.currentaddress":1,
					                        "employees.permanentaddress":1,
					                        "employees.defoultsocial_media":1,
					                        "employees.skills":1,
					                        "employees.experienceYear":1,
					                        "employees.experienceMonth":1,
					                        "employees.social_media":1,
					                        "employees.professionalSummary":1,
					                        "employees.totaloverall":1,
					                        "employees.designation":1
					                        
					                        
					                    }
					                },
					                {
					                    $match:
					                    {
					                        'employees._id':  mongoose.Types.ObjectId(_id)
					                       
					                    }
					                }
					            ]

					            userBusiness.aggregate( employeeAggregate, (error:any, result:any) => {
					                if(error) {
					                    console.log('Error: manager case:', error);
					                }
					                else { 
					                	var returnObj = result.map(function(obj: any): any {
								      		
								            return {
										        id: obj._id,
										        firstName:obj.firstName,
										        lastName:obj.lastName,
										        middleName:obj.middleName,
										        _id:obj.employees._id,
										        email:obj.email,
										        paidOn:obj.paidOn,
										        hrpaidOn:obj.hrpaidOn,
										        roles:obj.roles,
										        status:obj.status,
										        createdOn:obj.createdOn,
										        companyName:obj.companyName,
										        previouscompanyName:obj.previouscompanyName,
										        alternateEmail: obj.employees.alternateEmail,
										        summary: obj.employees.summary,
										        profilePic: obj.employees.profilePic,
										        profileCover: obj.employees.profileCover,
										        userId: obj.employees.userId,
										        education:obj.employees.education,
										        dateofBirth:obj.employees.dateofBirth,
										        currentSalary:obj.employees.currentSalary,
										        expectedSalary:obj.employees.expectedSalary,
						                        currentlyEmployed:obj.employees.currentlyEmployed,
						                        openRelocation:obj.employees.openRelocation,
						                        openTravel:obj.employees.openTravel,
						                        sponsorshipRequired:obj.employees.sponsorshipRequired,
						                        felony:obj.employees.felony,
						                        phone:obj.employees.phone,
						                        gender:obj.employees.gender,
						                        resume:obj.employees.resume,
						                        alternateMobile_number:obj.employees.alternateMobile_number,
						                        currentaddress:obj.employees.currentaddress,
						                        permanentaddress:obj.employees.permanentaddress,
						                        defoultsocial_media:obj.employees.defoultsocial_media,
						                        skills:obj.employees.skills,
						                        authorization:obj.employees.authorization,
										        experienceMonth:obj.employees.experienceMonth,
										        experienceYear:obj.employees.experienceYear,
										        social_media:obj.employees.social_media,
										        professionalSummary:obj.employees.professionalSummary,
										        strengths:obj.employees.strengths,
										        improvements:obj.employees.improvements,
										        designation:obj.employees.designation,
										        totaloverall:obj.employees.totaloverall,
										        
										    }
							   			});
							   			
						   			if(error){
										console.log("ueser");
									}
									else {
										//console.log("returnObj====",returnObj);
										return res.json({"user":Object.assign(returnObj[0])});
									}
					                }
					            });
								
							}
						});
					}
				});	
			}	
		});	
    });
}
 

    updateprofilepic(data:any,id:any, res: express.Response): void {
    	var _employeeBusiness = new EmployeeBusiness();
    	var _emplloye: IEmployeeModel = <IEmployeeModel>data;
    	var type= data.mimetype.split("/");
 		_emplloye.profilePic=data.filename;
	 	var userid:string = id.toString();
		_employeeBusiness.findOne({'userId':userid}, (error, result) => {
			if(error){
				console.log("ueser");
			}
			else {
				var _id:string = result._id.toString();
				_employeeBusiness.update(_id, _emplloye, (error:any, resultUpdate:any) => {
					if(error){
					}else {
						return res.json({profileimg:_emplloye.profilePic});
					}
				});
			}
		});
    }


    updatecoverupload(data:any,id:any, res: express.Response): void {   
	var _employeeBusiness = new EmployeeBusiness();
    	var _emplloye: IEmployeeModel = <IEmployeeModel>data;
    	var type= data.mimetype.split("/");
 		_emplloye.profileCover=data.filename;
	 	var userid:string = id.toString();
		_employeeBusiness.findOne({'userId':userid}, (error, result) => {
			if(error){
				console.log("ueser");
			}
			else {
				var _id:string = result._id.toString();
				_employeeBusiness.update(_id, _emplloye, (error:any, resultUpdate:any) => {
					if(error){
					}else {
						return res.json({profileimg:_emplloye.profilePic});
					}
				});
			}
		});

    }
   deleteprofilepic(req: express.Request, res: express.Response): void {
		try {
		var _employeeBusiness = new EmployeeBusiness();
		var userid =  req.body.userid;
		_employeeBusiness.findOne({'userId':userid}, (error, result) => {
			if(error){
				console.log("ueser");
			}
			else {
			var _emplloye: IEmployeeModel = <IEmployeeModel>req.body;
			_emplloye.profilePic="";
				var _id:string = result._id.toString();
				_employeeBusiness.update(_id, _emplloye, (error:any, resultUpdate:any) => {
					if(error){
					}else {
						return res.json('updated succfully');
					}
				});
			};
		});
		} catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
        }
    }


    deleteprofileCover(req: express.Request, res: express.Response): void {
		try {
		var _employeeBusiness = new EmployeeBusiness();
		var userid =  req.body.userid;
		_employeeBusiness.findOne({'userId':userid}, (error, result) => {
			if(error){
				console.log("ueser");
			}
			else {
			var _emplloye: IEmployeeModel = <IEmployeeModel>req.body;
			_emplloye.profileCover="";
				var _id:string = result._id.toString();
				_employeeBusiness.update(_id, _emplloye, (error:any, resultUpdate:any) => {
					if(error){
					}else {
						return res.json('updated succfully');
					}
				});
			};
		});
		} catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
        }
    }
    
    
	
	
    delete(req: express.Request, res: express.Response): void {
    	try {
		var _userBusiness = new UserBusiness();
		var _employeeBusiness = new EmployeeBusiness();

        _userBusiness.verifyToken(req, res, (userdata) => {
        	_employeeBusiness.findOne({'userId':userdata.id}, (error, result) => {
				if(error){
					console.log("error");
				}else{
					var _employee: IEmployeeModel = <IEmployeeModel>req.body;
				    if(req.params._flag=='education'){
			        	var education = result.education.filter(item => {
				           return item._id != req.params._id
				        });
			       		_employee.education  =education;
				        var _id:string = result._id.toString();
						_employeeBusiness.update(mongoose.Types.ObjectId(_id), _employee, (error:any, resultUpdate:any) => {
							if(error){
								console.log("error===",error);
							}else {
								
								return res.json('updated succfully');
							}
						});
			        }
					if(req.params._flag=='skills'){
			        	var skill = result.skills.filter(item => {
				           return item._id != req.params._id
				        });
			       		_employee.skills  = skill;
				        var _id:string = result._id.toString();
						_employeeBusiness.update(mongoose.Types.ObjectId(_id), _employee, (error:any, resultUpdate:any) => {
							if(error){
								console.log("error===",error);
							}else {
								
								return res.json('updated succfully');
							}
						});
				    }
			        if(req.params._flag=='professional'){
			        	var professionalSummary = result.professionalSummary.filter(item => {
				           return item._id != req.params._id
				        });
			        	 _employee.professionalSummary =professionalSummary;
				        var _id:string = result._id.toString();
						_employeeBusiness.update(mongoose.Types.ObjectId(_id), _employee, (error:any, resultUpdate:any) => {
							if(error){
								console.log("error===",error);
							}else {
								return res.json('updated succfully');
							}
						});
			        }


			        if(req.params._flag=='socialmedia'){
			        	var socialmedia = result.social_media.filter(item => {
				           return item._id != req.params._id
				        });
			        	 _employee.social_media = socialmedia;
				        var _id:string = result._id.toString();
						_employeeBusiness.update(mongoose.Types.ObjectId(_id), _employee, (error:any, resultUpdate:any) => {
							if(error){
								console.log("error===",error);
							}else {
								console.log('updated succfully');
								return res.json('updated succfully');
							}
						});
				      
			        }

			    }
		    });
			
        });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
        }

    }
    retrieve(req: express.Request, res: express.Response): void {
    	 try {
			var _userBusiness = new UserBusiness();
            _userBusiness.verifyToken(req, res, (companyUserData) => {
				_userBusiness.retrieve(req.body, (error, result) => {
					if(error) res.send({"error": "error"});
					else res.send(result);
				});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
		}
    }

   

    findById(req: express.Request, res: express.Response): void {
        
        try {
        	let sum = {};
        	var _userBusiness = new UserBusiness();
			var _employeeBusiness = new EmployeeBusiness();
            _userBusiness.verifyToken(req, res, (userdata) => {
            var _savedCandidateBusiness = new SavedCandidateBusiness();
		       	
        	async.parallel({
			planData: function(callback:any) {
				var planBusiness = new PlanBusiness();
				planBusiness.retrieve({'plan_name':'basic'},(error,result) => {    
			        if(error){
			         }
			        else{
			        	callback(null,result);
			        }
			    })
			},
			downloadData: function(callback:any) {
				_savedCandidateBusiness.retrieve({'user_id':userdata.id},(error,downloadData) => {    
			        if(error){
			         }
			        else{
			        	callback(null,downloadData);
			        }
			    })
			},
			userData: function(callback:any) {
				
				var _id: string = req.params._id;
				var employeeAggregate = [
	                {
	                    $lookup:                       
	                    {
	                        from: "employees",
	                        localField: "_id",   
	                        foreignField: "userId",        
	                        as: "employees"               
	                    }
	                },
	                {
		          	  	$unwind:"$employees"
		            
		          	},
		          	{
	                    $lookup:                       
	                    {
	                        from: "postreviews",
	                        localField: "_id",   
	                        foreignField: "userId",        
	                        as: "postreviews"               
	                    }
	                },
	                {
	                    $project:                       
	                    {    
	                        "_id":1,
	                        "firstName":1,
	                        "lastName":1,
	                        "middleName":1,
	                        "email":1,
	                        "roles":1,
	                        "status":1,
	                        "paidOn":1,
	                        "hrpaidOn":1,
	                        "companyName":1,
	                        "createdOn":1,
	                        "previouscompanyName":1,
	                        "employees.strengths":1,
	                        "employees.improvements":1,
	                        "employees.resume":1,
	                        "employees.summary":1,
	                        "employees.profilePic":1,
	                        "employees.profileCover":1,
	                        "employees.currentsalaryflag":1,
	                        "employees.expectedsalaryflag":1,
	                        "employees.education":1,
	                        "employees.alternateEmail":1,
	                        "employees.dateofBirth":1,
	                        "employees.currentSalary":1,
	                        "employees.gender":1,
	                        "employees.expectedSalary":1,
	                        "employees.currentlyEmployed":1,
	                        "employees.openRelocation":1,
	                        "employees.openTravel":1,
	                        "employees.sponsorshipRequired":1,
	                        "employees.authorization":1,
	                        "employees.felony":1,
	                        "employees.phone":1,
	                        "employees.alternateMobile_number":1,
	                        "employees.currentaddress":1,
	                        "employees.permanentaddress":1,
	                        "employees.defoultsocial_media":1,
	                        "employees.skills":1,
	                        "employees.experienceYear":1,
	                        "employees.experienceMonth":1,
	                        "employees.social_media":1,
	                        "employees.professionalSummary":1,
	                        "employees.totaloverall":1,
	                        "employees.designation":1,
	                        "postreviews.technicalexp":1
  
	                    }
	                },
	                {
	                    $match:
	                    {
	                        '_id':  mongoose.Types.ObjectId(_id)
	                       
	                    }
	                }
	            ]

	            _userBusiness.aggregate( employeeAggregate, (error:any, result:any) => {
	                if(error) {
	                    console.log('Error: manager case:', error);
	                }
	                else { 
	                	var returnObj = result.map(function(obj: any): any {
				      		
				            return {
						        id: obj._id,
						        firstName:obj.firstName,
						        lastName:obj.lastName,
						        middleName:obj.middleName,
						        email:obj.email,
						        paidOn:obj.paidOn,
						        hrpaidOn:obj.hrpaidOn,
						        roles:obj.roles,
						        status:obj.status,
						        createdOn:obj.createdOn,
						        companyName:obj.companyName,
						        previouscompanyName:obj.previouscompanyName,
						        alternateEmail: obj.employees.alternateEmail,
						        summary: obj.employees.summary,
						        profilePic: obj.employees.profilePic,
						        profileCover: obj.employees.profileCover,
						        education:obj.employees.education,
						        dateofBirth:obj.employees.dateofBirth,
						        currentsalaryflag:obj.employees.currentsalaryflag,
						        expectedsalaryflag:obj.employees.expectedsalaryflag,
						        currentSalary:obj.employees.currentSalary,
						        expectedSalary:obj.employees.expectedSalary,
		                        currentlyEmployed:obj.employees.currentlyEmployed,
		                        openRelocation:obj.employees.openRelocation,
		                        openTravel:obj.employees.openTravel,
		                        sponsorshipRequired:obj.employees.sponsorshipRequired,
		                        felony:obj.employees.felony,
		                        phone:obj.employees.phone,
		                        gender:obj.employees.gender,
		                        resume:obj.employees.resume,
		                        alternateMobile_number:obj.employees.alternateMobile_number,
		                        currentaddress:obj.employees.currentaddress,
		                        permanentaddress:obj.employees.permanentaddress,
		                        defoultsocial_media:obj.employees.defoultsocial_media,
		                        skills:obj.employees.skills,
		                        authorization:obj.employees.authorization,
						        experienceMonth:obj.employees.experienceMonth,
						        experienceYear:obj.employees.experienceYear,
						        social_media:obj.employees.social_media,
						        professionalSummary:obj.employees.professionalSummary,
						        strengths:obj.employees.strengths,
						        improvements:obj.employees.improvements,
						        totaloverall:obj.employees.totaloverall,
						        designation:obj.employees.designation,
						        postreviews:obj.postreviews
						    }
			   			});
			   			
			   			callback(null,returnObj);
	                }
	            });
			}
			}, function(err:any, results:any) {
					if(err){
						res.send({"error": "error"});
					}

					var getdata:any = [];
					if(results.userData[0].skills && results.userData[0].skills.length > 0){
						if(results.userData[0].skills && results.userData[0].skills.length>0){
							let skills =  results.userData[0].skills;
							//console.log("skills===",skills);

							skills.forEach(function(item,i){
								if(results.userData[0].postreviews.length >0 ){
									let tecexp = results.userData[0].postreviews;
									tecexp.forEach(function(itemexp,k){	
										if(itemexp && itemexp.technicalexp){
											let checkkey = (item.keywordval in itemexp.technicalexp);
											if(checkkey===true){
												let skillkey = item.keywordval;
												let skillreview = itemexp.technicalexp[skillkey];
												getdata.push({[skillkey]:skillreview});
												
											}	
										}
									});
								}
							})
							getdata.forEach((item) => {
								console.log("item====",item);
							    for (let key in item) sum[key] = sum[key] ? sum[key] + item[key] : item[key]
							})
						}
					} 
					//console.log("results=====",getdata);
					res.json({"status":"success","data":results,"review":sum});
			});
	        }); 
		}
        catch (e)  { 
            console.log(e);
            res.send({"error": "error in your request"});
		}
    }
	
	findByToken(req: express.Request, res: express.Response): void {
		var _userBusiness = new UserBusiness();
		_userBusiness.verifyToken(req, res, (UserData) => {
			res.send(UserData);
		});
    }
	
	
    
    contactForm(req: express.Request, res: express.Response): void { 
		try {
			var _contactform: IContactformModel = <IContactfromModel>req.body;
			var _contactformBusiness = new ContactformBusiness();
			_contactform.fullname =req.body.fullname;
			_contactform.email = req.body.email;
			_contactform.phone = req.body.phone;
			_contactform.message = req.body.message;
			_contactform.createdOn = new Date();
			_contactformBusiness.create(_contactform, (error, result) => {
				if(error) {
					console.log(error);
					res.send({"error=========": error});
				} else {
					var contactFormemail =Common.CONTACT_FORM;	
					var emailtemplate = contactFormemail.replace(/#fullname#/g,_contactform.fullname).replace(/#email#/g,_contactform.email).replace(/#phone#/g,_contactform.phone).replace(/#message#/g,_contactform.message) .replace(/#date#/g,_contactform.createdOn);
					Common.sendMail(_contactform.email,'support@employeemirror.com','Contact Form', null,emailtemplate, function(error: any, response: any){ 
					if(error){ 
					console.log(error);
					res.end("error");
					}
					});
					res.status(201).send({ "success":"done" }); 
				}
			});
		}  catch (e)  {
			console.log(e);
			res.send({"error": "error in your request"});
		}
	}
    
    forgetUserPassword(req: express.Request, res: express.Response): void {
        try {
        	
            var _user: IUserModel = <IUserModel>req.body;
            var _userBusiness = new UserBusiness();
            _userBusiness.findOne({email: _user.email}, (error, result) => {
                if(error){
                	res.send({"error": "error"});
                } 
                else {
                	if(result && result.email==_user.email) {
						if(result.status=='unverified') {
							return res.status(401).send({"error": "Your account is not verified. Please contact admin."});
						} else {
							var token = _userBusiness.createToken(result);
							var _updateData: IUserModel = <IUserModel>req.body;
							_updateData.lastLogin = new Date();
							_updateData.token = token;
							var _id: string = result._id.toString();
							var _userBusinessUpdate = new UserBusiness();
							// Generate new password ...
							var autoGeneratedPassword = Math.random().toString(36).slice(-8);
        					_user.password = 'P'+autoGeneratedPassword;
							_userBusinessUpdate.update(_id, _updateData, (error, resultUpdate) => {
								if(error) res.send({"error": "error", "message": "Authentication error"});//res.status(401).send({"error": "Authentication error"});
								else {
									
									var _userBusiness = new UserBusiness();
									_userBusiness.findById(_id, (error, resultuser) => {
										if(error) res.send({"error": "error", "message": "Authentication error"});
										else {
											var emailresetpassword=Common.EMAIL_TEMPLATE_RESET_USER_PASSWORD;
											var emailtemplate =emailresetpassword.replace(/#password#/g,_user.password);
											Common.sendMail(result.email,'support@employeemirror.com','Forgot Password', null,emailtemplate, function(error: any, response: any){
												if(error){
													console.log(error);
													res.end("error");
												}
											});
											res.status(201).send({ "success":"done" });
										}
									});
								}
							});
						}
					} else {
						return res.status(401).send({"error": "You have entered invalid email."});
					}
				}
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }
    
    
    
    UpdateUserPassword(req: express.Request, res: express.Response): void {
    	try {
			var _user: IUserModel = <IUserModel>req.body; 
			var _userBusiness = new UserBusiness();
			var _idc = req.body.user;
			_user.password  = req.body.newpassword;    
			_userBusiness.findOne({_id:_idc,password:req.body.currentpassword}, (error, result) => {
				if(error){
				res.send({"error": "Please enter current vaild password."});
				} 
				else if(result == null) { 
				res.send({"error": "Please enter current vaild password."});

				} else {
					_user.password=req.body.newpassword;
					_userBusiness.update(_idc,_user, (error, resultUpdate) => {
					if(error) res.send({"error": "error", "message": "Your password is not updated."});
					else {
						res.status(201).send({ "success":"Your password is successfully updated." });
					} 
					});
				}
			});	
		}
		catch (e)  {
		console.log(e);
		res.send({"error": "error in your request"});

		}
    }


    forgetSAdminPassword(req: express.Request, res: express.Response): void {
        try {
            var _user: IAdminUserModel = <IAdminUserModel>req.body;
            var _adminUserBusiness = new AdminUserBusiness();
            var _userBusiness = new UserBusiness();
            _adminUserBusiness.findOne({email: _user.email}, (error, result) => {
                if(error) res.send({"error": "error"});
                else {
					if(result && result.email==_user.email) {
						if(!result.isActive) {
							return res.status(401).send({"error": "Your account is not active. Please contact admin."});
						} 
						else {
							var token = _userBusiness.createToken(result);
							var _updateAdminData: IAdminUserModel = <IAdminUserModel>req.body;
							_updateAdminData.lastLogin = new Date();
							_updateAdminData.token = token;
							var _id: string = result._id.toString();
							var _adminUserBusiness = new AdminUserBusiness();
							// Generate new password ...
							var autoGeneratedPassword = Math.random().toString(36).slice(-8);
        					_user.password = 'P'+autoGeneratedPassword;
							_adminUserBusiness.update(_id, _updateAdminData, (error, resultUpdate) => {
								if(error) res.send({"error": "error", "message": "Authentication error"});//res.status(401).send({"error": "Authentication error"});
								else {
									var companyId = result._id;
									_adminUserBusiness.retrieve(companyId, (error, resultCompany) => {
										if(error) res.send({"error": "error", "message": "Authentication error"});
										else {
											var emailresetpassword=Common.EMAIL_TEMPLATE_RESET_ADMIN_PASSWORD;
											var emailtemplate =emailresetpassword.replace(/#password#/g,_user.password);
											Common.sendMail(result.email,'support@inteleagent.com','Forgot Password', null,emailtemplate, function(error: any, response: any){
												if(error){
													console.log(error);
													res.end("error");
												}
											});
											res.status(201).send({ "success":"done" });
										}
									});
								}
							});
						}
					} else {
						return res.status(401).send({"error": "Invalid email."});
					}
				}
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }

   
	verifytoken(req: express.Request, res: express.Response): void {
		var _userBusiness = new UserBusiness();
		_userBusiness.verifyToken(req, res, (companyUserData) => {
			res.status(201).send({
				token: "valid"
			});
		});
    }

	//tbd split the incoming query to be {a:b} instead of a=b
	count(req: express.Request, res: express.Response): void {
		try {
			var query: string = req.params.query;
			var _userBusiness = new UserBusiness();
			_userBusiness.count(query, (error, result) => {
				if(error){
					console.log(error);
					
					res.send({"error": "error"});
				}
				else {
					res.send(result)
				};
			});
		}
		catch (e)  {
			console.log(e);
			res.send({"error": "error in your request"});

		}
	}
	/* getdownloadedby */
	getdownloadedby(req: express.Request, res: express.Response): void {
		try {
			var _userBusiness = new UserBusiness();
			_userBusiness.verifyToken(req, res, (userData) => {
				var _candidates: ISavedCandidatesModel = <ISavedCandidatesModel>req.body;
				var _savedCandidateBusiness = new SavedCandidateBusiness();
		        
		        var candidatesAggregate = [
	            {
	                $lookup:                       
	                {
	                    from: "saved_candidates",
	                    localField: "_id",   
	                    foreignField: "user_id",        
	                    as: "saved_candidates"               
	                }
	            },
	            {
          	  		$unwind:"$saved_candidates"
            	},
            	{
	                $lookup:                       
	                {
	                    from: "employees",
	                    localField: "_id",   
	                    foreignField: "userId",        
	                    as: "employees"               
	                }
	            },
	            {
	                $project:                       
	                {    
	                    "_id":1,
	                    "firstName":1,
	                    "lastName":1,
	                    "companyName":1,
	                    "employees.profilePic":1,
	                    "saved_candidates.user_id":1,
	                    "saved_candidates.candidate_id":1,
	                    "saved_candidates.viewed":1,
	                    "saved_candidates.downloaded":1
				    }
	            },
	            {
	                $match:
                    {
                        $and: [
							{'saved_candidates.candidate_id':  mongoose.Types.ObjectId(req.params._id)},  
						]
					}
	            }
	        ]
	        _userBusiness.aggregate( candidatesAggregate, (error:any, result:any) => {
	       		if(error) {
					res.send({"error": error});
				}
				else {
					var returnObj = result.map(function(obj: any): any {
					return {
				        id: obj._id,
				        firstName:obj.firstName,
				        lastName:obj.lastName,
				        profilePic:obj.employees.profilePic,
				        companyName:obj.companyName,
				        saved:obj.saved_candidates.saved,
				        viewed:obj.saved_candidates.viewed,
				        downloaded:obj.saved_candidates.downloaded


				    }
		   		});
				res.send({"result": returnObj}); 


				console.log("result",returnObj);
	    		}
			});
		  });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
		}
	}
	/*post review */

	postReviews(req: express.Request, res: express.Response): void {
   		 try {
   		 	console.log(req.body);
			var _user: IPostreviewModel = <IPostreviewModel>req.body;
			var _employee: IEmployeeModel = <IEmployeeModel>req.body;
			var _employeeBusiness = new EmployeeBusiness();
			_user.createdOn = new Date();
			_user.status = "unverified";
			_user.technicalexp = req.body.technicalexp;
            var _postreviewBusiness = new PostreviewBusiness();
            _postreviewBusiness.create(_user, (error, result) => {
                if(error) {
					console.log("ERROR ON BACKEND CONTROLLER");
					console.log(error);
					res.send({"error": error});
				}
                else {
                	    _employee.totaloverall = _employee.totaloverall.toString();
                	    _employee.userId = _employee.userId.toString();
                	
                	 _employeeBusiness.findOne({userId: _employee.userId}, (error, result) => {
                		if(error) { 
                			res.send({"error": "error"});
                				} else {
                				console.log("result==",result);
                				var employeeid = result._id;
                		
                		_employeeBusiness.update(mongoose.Types.ObjectId(employeeid), _employee,(error:any, resultUpdate:any) => {
							if(error){
								console.log("error===",error);
								} else { 
								console.log("success===",resultUpdate);
							}
						
            			}); 
                		}
           			 });
                	 res.send(result);
                	} 		
                 
            });
  
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
		}
	}

	getReferences(req: express.Request, res: express.Response): void {
 		try {
			var _user: IPostreviewModel = <IPostreviewModel>req.body;
		    var _postreviewBusiness = new PostreviewBusiness();
            _postreviewBusiness.retrieve({'userId':_user.userid}, (error, result) => {
				if(error){
					res.send({"error": "error"});
				} else { 
					res.send(result); 
				}
			});	

        } catch (e){
            console.log(e);
            res.send({"error": "error in your request"});
		}
	}
    



	

	
}
export = UserController;
