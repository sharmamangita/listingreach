/**
 * api call lands here from routing
 */

import express = require("express");
import UserBusiness = require("./../app/business/UserBusiness");



import PagesBusiness = require("./../app/business/PagesBusiness");

import IBaseController = require("./BaseController");
import IUserModel = require("./../app/model/interfaces/IUserModel");
import IAgentModel = require("./../app/model/interfaces/IAgentModel");
import IPagesModel = require("./../app/model/interfaces/IPagesModel");
import IEmployeeModel = require("./../app/model/interfaces/IEmployeeModel");
import AdminUserBusiness = require("./../app/business/AdminUserBusiness");
import ContactformBusiness = require("./../app/business/ContactformBusiness");
import BlastBusiness = require("./../app/business/BlastBusiness");
import PropertyBusiness = require("./../app/business/PropertyBusiness");
import TemplateBusiness = require("./../app/business/TemplateBusiness");
import InvitationBusiness = require("./../app/business/InvitationBusiness");
import IAdminUserModel = require("./../app/model/interfaces/IAdminUserModel");
import IContactformModel = require("./../app/model/interfaces/IContactformModel");
import IBlastModel = require("./../app/model/interfaces/IBlastModel");
import IPropertyModel = require("./../app/model/interfaces/IPropertyModel");
import ITemplateModel = require("./../app/model/interfaces/ITemplateModel");
import IInvitationModel = require("./../app/model/interfaces/IInvitationModel");
import Common = require("./../config/constants/common");
import PlanBusiness = require("./../app/business/PlanBusiness");
import AgentBusiness = require("./../app/business/AgentBusiness");
import IAgentModel = require("./../app/model/interfaces/IAgentModel");
import IBlastImageModel = require("./../app/model/interfaces/IBlastImageModel");
import BlastImageBusiness = require("./../app/business/BlastImageBusiness");

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
                     Common.sendMail(userdata.email, Common.ADMIN_EMAIL, 'Welcome to ListingReach!', null, emailtemplate, function(error: any, response: any) {
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


updateUser(req: express.Request, res: express.Response): void {
	try {
		var _userBusiness = new UserBusiness();
		_userBusiness.verifyToken(req, res,  (UserData:any) => {
			var _user: IUserModel = <IUserModel>req.body.user;
			var _id:string = _user.id.toString();
			_userBusiness.update(mongoose.Types.ObjectId(_id), _user, (error:any, userdata:any) => {
				 if(error) {
					console.log(error);
					res.send({"error": error});
				}
	            else{
	            	var _agentBusiness = new AgentBusiness()
		        		async.parallel({
							agentData: function(callback:any) {
								
								_agentBusiness.findOne({'userId':_id},(error,agentdata) => {    
							        if(error){
							         }
							        else{
							        	callback(null,agentdata);
							        }
							    })
							},
							userData: function(callback:any) {
					        	_userBusiness.retrieve({_id:_id}, (error, result) => {
					        		var returnObj = result.map(function(obj: any): any {
						      		
						            return {
								        id: obj._id,
								        userName:obj.userName,
								        firstName:obj.firstName,
								        lastName:obj.lastName,
								        status:obj.status,
								        email:obj.email,
								        companyName:obj.companyName,
								        phone:obj.phone,
								        city:obj.city,
								        zipcode:obj.zipcode,
								        roles:obj.roles,
								        status:obj.status
								       
								    }
					   			});
					   			callback(null,returnObj);
					        	});
							}
						}, function(err:any, results:any) {
							if(err){
								res.send({"error": "error"});
							}
							res.json({"status":"success","data":results});
						});
					
	            	
	        	}
	       	}); 
		    
	    });
	}
	catch (e)  {
	    console.log(e);
	    res.send({"error": "error in your request"});
	}
}
 

    updateprofilepic(data:any,id:any, res: express.Response,flag:any): void {
    	var _agentBusiness= new AgentBusiness();
    	var _agent: IAgentModel = <IAgentModel >data;
    	_agent.createdOn = new Date();
    	var type= data.mimetype.split("/");
 	 	var userid:string = id.toString();
		var _id=userid;
		_agent.userId=userid;
		console.log("userId=====",flag);
		if(flag == 'logo'){
			_agent.logo_url=data.filename;
		}
		else{
			_agent.image_url=data.filename;
		}
		_agentBusiness.findOne({'userId':userid}, (error:any, agentresult:any) => {
			if(agentresult!=null){
				var _id:string = agentresult._id.toString();
				_agentBusiness.update(_id, _agent, (error:any, resultUpdate:any) => {
					if(error){
					}else {
						return res.json({profileimg:agentresult.profilePic});
					}
				});
			}else{
				console.log("_agent=====",_agent);
				_agentBusiness.create(_agent, (error, agentresultData) => {
					if(error){
					}else {
					   return res.json({profileimg:agentresultData.image_url});
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
        	var _agentBusiness = new AgentBusiness()
        	_userBusiness.verifyToken(req, res, (userdata) => {
        		async.parallel({
					agentData: function(callback:any) {
						
						_agentBusiness.findOne({'userId':userdata.id},(error,agentdata) => {    
					        if(error){
					         }
					        else{
					        	callback(null,agentdata);
					        }
					    })
					},
					userData: function(callback:any) {
			        	_userBusiness.retrieve({_id:userdata.id}, (error, result) => {
			        		var returnObj = result.map(function(obj: any): any {
				      		
				            return {
						        id: obj._id,
						        userName:obj.userName,
						        firstName:obj.firstName,
						        lastName:obj.lastName,
						        status:obj.status,
						        email:obj.email,
						        companyName:obj.companyName,
						        phone:obj.phone,
						        city:obj.city,
						        zipcode:obj.zipcode,
						        roles:obj.roles,
						        status:obj.status
						       
						    }
			   			});
			   			callback(null,returnObj);
			        	});
					}
				}, function(err:any, results:any) {
					if(err){
						res.send({"error": "error"});
					}
					res.json({"status":"success","data":results});
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
			var _contactform: IContactformModel = <IContactformModel>req.body;
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
					Common.sendMail(_contactform.email,'support@ListingReach.com','Contact Form', null,emailtemplate, function(error: any, response: any){ 
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
	
	emailPreviewTemplate(req: express.Request, res: express.Response): void { 
		try { 
			
			var _contactform: IContactformModel = <IContactfromModel>req.body;
			var _contactformBusiness = new ContactformBusiness();
			//_contactform.fullname =req.body.fullname;
			_contactform.email = req.body.email;
			/* _contactform.phone = req.body.phone;
			_contactform.message = req.body.message; */
			_contactform.createdOn = new Date();
			
				
					var previewTemplatememail =Common.PREVIEW_EMAIL_TEMPLATE;	
					var emailtemplate = previewTemplatememail;
					Common.sendMail(_contactform.email,'support@employeemirror.com','Contact Form', null,emailtemplate, function(error: any, response: any){ 
					if(error){ 
					console.log(error);
					res.end("error");
					}
					});
					res.status(201).send({ "success":"done" }); 
				
			
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
											Common.sendMail(result.email,'support@ListingReach.com','Forgot Password', null,emailtemplate, function(error: any, response: any){
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
    console.log("Dsadasdasd")
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
    saveAgents(req: express.Request, res: express.Response): void {
    	 try {
    	 	var _userBusiness = new UserBusiness();
        	_userBusiness.verifyToken(req, res,  (companyUserData) => { 
	    	 	var _agent: IAgentModel = <IAgentModel>req.body;
	    	 	console.log("_agent====",companyUserData);
	    	 	_agent.createdOn = new Date();
	    	 	_agent.userId=companyUserData._id;
				var _agentBusiness = new AgentBusiness();
	    	 	_agentBusiness.create(_agent, (error, agentresultData) => {
					if(error){
						console.log("error====",error)
					}else {
						console.log("agentresultData====",agentresultData);
					   return res.json({profileimg:agentresultData});
					}
				});
			});
    	 }
    	  catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
		}
    });

     saveProperty(req: express.Request, res: express.Response): void {
        try {
           var _propertyforms: IPropertyModel = <IPropertyModel>req.body;
			var _propertyBusiness = new PropertyBusiness();
			 var _templateforms: ITemplateModel = <ITemplateModel>req.body;
			 var _templateBusiness = new TemplateBusiness();
				let _propertyform ={};
				let _templateform={};
			
			console.log("_propertyforms====",_propertyforms);
			//if(_templateforms.property.)
			



			if(_propertyforms.property.propertyAddress){
				_propertyform.display_method=_propertyforms.property.propertyAddress.displayMethod;
				_propertyform.street_address=_propertyforms.property.propertyAddress.streetAddress;
				_propertyform.city=_propertyforms.property.propertyAddress.city;
				_propertyform.state=_propertyforms.property.propertyAddress.state;
				_propertyform.zipcode=_propertyforms.property.propertyAddress.zipCode;
			}

			if(_propertyforms.property.mlsNumber){
				_propertyform.mls_number=_propertyforms.property.mlsNumber.numberProperty;
				_propertyform.board=_propertyforms.property.mlsNumber.boardAssociation;
			}

			if(_propertyforms.property.generalPropertyInformation){
				_propertyform.property_type=_propertyforms.property.generalPropertyInformation.propertyType;
				_propertyform.property_style=_propertyforms.property.generalPropertyInformation.propertyStyle;
				_propertyform.lot_size=_propertyforms.property.generalPropertyInformation.lotSize;
				_propertyform.number_bedrooms=_propertyforms.property.generalPropertyInformation.numberOfBedrooms;
				_propertyform.building_size=_propertyforms.property.generalPropertyInformation.buildingSize;
				_propertyform.number_stories=_propertyforms.property.generalPropertyInformation.numberOfStories;
				_propertyform.price="23";
				_propertyform.number_bathrooms="4";
				_propertyform.year_built =_propertyforms.property.generalPropertyInformation.yearBuilt;
				_propertyform.garage=_propertyforms.property.generalPropertyInformation.garage;
			}

			if(_propertyforms.property.propertyDetail){
				_propertyform.property_details=_propertyforms.property.propertyDetail;
			}

    		_propertyBusiness.create(_propertyform, (error, result) => {
                if(error) {
					console.log(error);
					res.send({"error": error});
				}
                _templateBusiness.create(_templateforms, (error, result) => { 
	                if(error) {
						console.log(error);
						res.send({"error": error});
					} else {
						res.send({"success": "success"});
					}
                }); 
        	}); 

        	
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
		}
    }


 savePropertyImages(data:any,id:any, res: express.Response): void { 
 	var _blastimageBusiness= new BlastImageBusiness();
	var _blastimage: IBlastImageModel = <IBlastImageModel >data;
		
    	var type= data.mimetype.split("/");
 	 	var userid:string = id.toString();
		
		_blastimage.user_id=userid;
		_blastimage.url=data.filename;
		_blastimageBusiness.create(_blastimage, (error, resultData) => {
				if(error){
					console.log("error===",error);
				}else {
					 return res.json({url:resultData.url});
				}
			});
		}
			
		
	}
}
export = UserController;
