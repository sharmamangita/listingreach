/**
 * api call lands here from routing
 */

import express = require("express");
import UserBusiness = require("./../app/business/UserBusiness");



import PagesBusiness = require("./../app/business/PagesBusiness");

import IBaseController = require("./BaseController");
import IUserModel = require("./../app/model/interfaces/IUserModel");

import IPagesModel = require("./../app/model/interfaces/IPagesModel");
import IEmployeeModel = require("./../app/model/interfaces/IEmployeeModel");
import AdminUserBusiness = require("./../app/business/AdminUserBusiness");
import ContactformBusiness = require("./../app/business/ContactformBusiness");
import BlastBusiness = require("./../app/business/BlastBusiness");
import PropertyBusiness = require("./../app/business/PropertyBusiness");
import InvitationBusiness = require("./../app/business/InvitationBusiness");
import IAdminUserModel = require("./../app/model/interfaces/IAdminUserModel");
import IContactformModel = require("./../app/model/interfaces/IContactformModel");
import IBlastModel = require("./../app/model/interfaces/IBlastModel");
import IPropertyModel = require("./../app/model/interfaces/IPropertyModel");

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
            user.roles='agents';
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
									console.log("here i am login ")
									res.send({
										userId: result._id,
										email: result.email,
										firstName: result.firstName,
										lastName: result.lastName,
										token: token,
										roles:result.roles
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
		
       
	} catch (e)  {
	    console.log(e);
	    res.send({"error": "error in your request"});
	}

}


update(req: express.Request, res: express.Response): void {
	var employe=[];
	var userBusiness = new UserBusiness();
	userBusiness.verifyToken(req, res,  (companyUserData:any) => {
		
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
        	var _userBusiness = new UserBusiness();
        	_userBusiness.verifyToken(req, res, (userdata) => {
	        	_userBusiness.findOne({_id:userdata.id}, (error, result) => {
	        		
	        		res.send(result)
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
	
	

	getReferences(req: express.Request, res: express.Response): void {
 		try {
			

        } catch (e){
            console.log(e);
            res.send({"error": "error in your request"});
		}
	}
    
    saveBlast(req: express.Request, res: express.Response): void {
        try {
           var _blastform: IBlastModel = <IBlastModel>req.body;
			var _blastBusiness = new BlastBusiness();

			_blastform.selected_template_date = new Date();
           _blastBusiness.create(_blastform, (error, result) => {
	                if(error) {
						console.log(error);
						res.send({"error": error});
					}
	                else res.send({"success": "success"});
	        	}); 
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
		}
    }


     saveProperty(req: express.Request, res: express.Response): void {
        try {
           var _propertyform: IPropertyModel = <IPropertyModel>req.body;
			var _propertyBusiness = new PropertyBusiness();

			console.log("_propertyform======",_propertyform);

/*           _propertyBusiness.create(_propertyform, (error, result) => {
	                if(error) {
						console.log(error);
						res.send({"error": error});
					}
	                else res.send({"success": "success"});
	        	}); */
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
		}
    }




	

	
}
export = UserController;
