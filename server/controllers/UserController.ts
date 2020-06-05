/**
 * api call lands here from routing
 */

import express = require("express");
import UserBusiness = require("./../app/business/UserBusiness");



import PagesBusiness = require("./../app/business/PagesBusiness");

import IBaseController = require("./BaseController");
import IUserModel = require("./../app/model/interfaces/IUserModel");
import IPagesModel = require("./../app/model/interfaces/IPagesModel");
import AdminUserBusiness = require("./../app/business/AdminUserBusiness");
import ContactformBusiness = require("./../app/business/ContactformBusiness");
import BlastBusiness = require("./../app/business/BlastBusiness");
import PropertyBusiness = require("./../app/business/PropertyBusiness");
import PaymentBusiness = require("./../app/business/PaymentBusiness");
import IPaymentModel = require("./../app/model/interfaces/IPaymentModel");

import AgentTemplateBusiness = require("./../app/business/AgentTemplateBusiness");

import InvitationBusiness = require("./../app/business/InvitationBusiness");
import IAdminUserModel = require("./../app/model/interfaces/IAdminUserModel");
import IContactformModel = require("./../app/model/interfaces/IContactformModel");
import IBlastModel = require("./../app/model/interfaces/IBlastModel");
import IPropertyModel = require("./../app/model/interfaces/IPropertyModel");

import IAgentTemplateModel = require("./../app/model/interfaces/IAgentTemplateModel");

import IInvitationModel = require("./../app/model/interfaces/IInvitationModel");
import Common = require("./../config/constants/common");
import PlanBusiness = require("./../app/business/PlanBusiness");
import AgentBusiness = require("./../app/business/AgentBusiness");
import IAgentModel = require("./../app/model/interfaces/IAgentModel");
import IBlastImageModel = require("./../app/model/interfaces/IBlastImageModel");
import BlastImageBusiness = require("./../app/business/BlastImageBusiness");

var BlastSettingsBusiness = require("./../app/business/BlastSettingsBusiness");

var moment = require('moment');
var mammoth = require("mammoth");
const fs = require('fs');

var _ = require('underscore');
var mongoose = require('mongoose');
var async = require('async');
var base64Img = require('base64-img');
var stripe = require("stripe")(Common.STRIPESECRETKEY);
class UserController implements IBaseController<UserBusiness> {
	update: express.RequestHandler;
	//being called by client getEmailExists
	getEmailExists(req: express.Request, res: express.Response): void {
		try {
			var query: string = req.params.query;
			var _userBusiness = new UserBusiness();
			_userBusiness.count({ 'email': { $regex: "^" + (query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')) + "$", $options: "i" } }, (error, result) => {
				if (error) {
					console.log(error);

					res.send({ "error": "error" });
				}
				else {
					res.send(JSON.stringify(result))
				};
			});
		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });

		}
	}
	register(req: express.Request, res: express.Response): void {
		try {
			var user: IUserModel = <IUserModel>req.body.user;
			//console.log("user====",user);
			user.createdOn = new Date();
			user.phone = req.body.user.phoneno;
			user.password = req.body.user.password;
			user.firstName = req.body.user.firstName.toLowerCase();
			user.roles = 'agents';
			user.lastName = req.body.user.lastName.toLowerCase();
			user.paidOn = false;
			user.isDeleted = false;
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
					Common.sendMail(userdata.email, Common.ADMIN_EMAIL, 'Welcome to ListingReach!', null, emailtemplate, function (error: any, response: any) {
						if (error) {
							res.send("error");
						} else {
							res.send({ "success": "success" });
						}
					});
					res.send({ "success": "success" });
				}
			});
		} catch (e) {
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
			_userBusiness.findOne({ email: _user.email }, (error, result) => {
				if (error) res.send({ "error": "error" });
				else {

					if (result && result.password && result.password == _user.password) {
						if (result.isDeleted && result.isDeleted === true) {
							return res.status(401).send({ "error": "Your account is no longer available. Please contact admin." });
						}
						else {
							if (result.status == 'unverified') {
								return res.status(401).send({ "error": "Your account is not active. Please contact admin." });
							} else {
								var token = _userBusiness.createToken(result);
								var _updateData: IUserModel = <IUserModel>req.body;
								_updateData.lastLogin = new Date();
								_updateData.token = token;
								var _id: string = result._id.toString();
								var _userBusinessUpdate = new UserBusiness();
								_userBusinessUpdate.update(_id, _updateData, (error, resultUpdate) => {
									if (error) res.send({ "error": "error", "message": "Authentication error" });//res.status(401).send({"error": "Authentication error"});
									else {
										res.send({
											userId: result._id,
											email: result.email,
											firstName: result.firstName,
											lastName: result.lastName,
											phone:result.phone,
											token: token,
											roles: result.roles
										});
									}
								});
							}
						}
					} else {
						return res.status(401).send({ "error": "The username or password don't match" });
					}
				}
			});
		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });

		}
	}
	create(req: express.Request, res: express.Response): void {
		try {
			var _userBusiness = new UserBusiness();
			_userBusiness.verifyToken(req, res, (userData) => {
				var _user: IUserModel = <IUserModel>req.body;

				_user.createdOn = new Date();
				var _userBusiness = new UserBusiness();
				_userBusiness.create(_user, (error, result) => {
					if (error) {
						res.send({ "error": error });
					}
					else res.send({ "success": "success" });
				});
			});
		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}
	}



	updateStatus(req: express.Request, res: express.Response): void {
		try {


		} catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}

	}


	updateUser(req: express.Request, res: express.Response): void {
		try {
			var _userBusiness = new UserBusiness();
			_userBusiness.verifyToken(req, res, (UserData: any) => {
				var _user: IUserModel = <IUserModel>req.body.user;
				var _id: string = _user.id.toString();
				_userBusiness.update(mongoose.Types.ObjectId(_id), _user, (error: any, userdata: any) => {
					if (error) {
						console.log(error);
						res.send({ "error": error });
					}
					else {
						var _agentBusiness = new AgentBusiness()
						async.parallel({
							agentData: function (callback: any) {

								_agentBusiness.findOne({ 'userId': _id }, (error, agentdata) => {
									if (error) {
									}
									else {
										callback(null, agentdata);
									}
								})
							},
							userData: function (callback: any) {
								_userBusiness.retrieve({ _id: _id }, (error, result) => {
									var returnObj = result.map(function (obj: any): any {

										return {
											id: obj._id,
											userName: obj.userName,
											firstName: obj.firstName,
											lastName: obj.lastName,
											status: obj.status,
											email: obj.email,
											companyName: obj.companyName,
											phone: obj.phone,
											city: obj.city,
											zipcode: obj.zipcode,
											roles: obj.roles

										}
									});
									callback(null, returnObj);
								});
							}
						}, function (err: any, results: any) {
							if (err) {
								res.send({ "error": "error" });
							}
							res.json({ "status": "success", "data": results });
						});


					}
				});

			});
		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}
	}


	updateprofilepic(data: any, id: any, res: express.Response, flag: any): void {
		var _agentBusiness = new AgentBusiness();
		var _agent: IAgentModel = <IAgentModel>data;
		_agent.createdOn = new Date();
		var type = data.mimetype.split("/");
		var userid: string = id.toString();
		var _id = userid;
		_agent.userId = userid;
		if (flag == 'logo') {
			_agent.logo_url = data.filename;
		}
		else {
			_agent.image_url = data.filename;
		}
		_agentBusiness.findOne({ 'userId': userid }, (error: any, agentresult: any) => {
			if (agentresult != null) {
				var _id: string = agentresult._id.toString();
				_agentBusiness.update(_id, _agent, (error: any, resultUpdate: any) => {
					if (error) {
					} else {
						return res.json({ profileimg: agentresult.profilePic });
					}
				});
			} else {
				_agentBusiness.create(_agent, (error, agentresultData) => {
					if (error) {
					} else {
						return res.json({ profileimg: agentresultData.image_url });
					}
				});
			}

		});

	}

	delete(req: express.Request, res: express.Response): void {
		try {

		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}

	}
	retrieve(req: express.Request, res: express.Response): void {
		try {
			var _userBusiness = new UserBusiness();
			_userBusiness.verifyToken(req, res, (userData) => {
				_userBusiness.retrieve(req.body, (error, result) => {
					if (error) res.send({ "error": "error" });
					else res.send(result);
				});
			});
		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}
	}

	findById(req: express.Request, res: express.Response): void {
		try {
			var _userBusiness = new UserBusiness();
			var _agentBusiness = new AgentBusiness()
			var _balstimageBusiness = new BlastImageBusiness()
			_userBusiness.verifyToken(req, res, (userdata) => {
				async.parallel({
					agentData: function (callback: any) {

						_agentBusiness.retrieve({ 'userId': userdata.id }, (error, agentdata) => {
							if (error) {
							}
							else {
								var returnObjagent = agentdata.map(function (obj: any): any {
									return {
										id: obj._id,
										name: obj.name,
										email: obj.email,
										designation: obj.designation,
										website_url: obj.website_url,
										phone_number: obj.phone_number,
										company_details: obj.company_details,
										other_information: obj.other_information,
										image_url: obj.image_url,
										logo_url: obj.logo_url
									}
								});
								callback(null, returnObjagent);
							}
						})
					},
					imageData: function (callback: any) {

						_balstimageBusiness.retrieve({ 'user_id': userdata.id }, (error, imagedata) => {
							if (error) {
							}
							else {
								var returnObjimage = imagedata.map(function (obj: any): any {
									return {
										id: obj._id,
										url: obj.url,

									}
								});
								callback(null, returnObjimage);
							}
						})
					},
					userData: function (callback: any) {
						_userBusiness.retrieve({ _id: userdata.id }, (error, result) => {
							var returnObj = result.map(function (obj: any): any {

								return {
									id: obj._id,
									userName: obj.userName,
									firstName: obj.firstName,
									lastName: obj.lastName,
									status: obj.status,
									email: obj.email,
									companyName: obj.companyName,
									phone: obj.phone,
									city: obj.city,
									zipcode: obj.zipcode,
									roles: obj.roles,
									state: obj.state
								}
							});
							callback(null, returnObj);
						});
					}
				}, function (err: any, results: any) {
					if (err) {
						res.send({ "error": "error" });
					}
					res.json({ "status": "success", "data": results });
				});
			});
		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
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
			_contactform.fullname = req.body.fullname;
			_contactform.email = req.body.email;
			_contactform.phone = req.body.phone;
			_contactform.message = req.body.message;
			_contactform.createdOn = new Date();
			_contactformBusiness.create(_contactform, (error, result) => {
				if (error) {
					res.send({ "error=========": error });
				} else {
					var contactFormemail = Common.CONTACT_FORM;
					var emailtemplate = contactFormemail.replace(/#fullname#/g, _contactform.fullname).replace(/#email#/g, _contactform.email).replace(/#phone#/g, _contactform.phone).replace(/#message#/g, _contactform.message).replace(/#date#/g, _contactform.createdOn);
					Common.sendMail('salvep@salvesoft.com', _contactform.email, 'Contact Form', null, emailtemplate, function (error: any, response: any) {
						if (error) {
							res.end("error");
						}
					});
					res.status(201).send({ "success": "done" });
				}
			});
		} catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}
	}

	emailPreviewTemplate(req: express.Request, res: express.Response): void {
		try {
			let _IagentTemplateModel: IAgentTemplateModel = <IAgentTemplateModel>req.body;
			let _agentTemplateBusiness = new AgentTemplateBusiness();
			const blastBusiness = new BlastBusiness();
			let blastid = _IagentTemplateModel.blast_id;
			blastBusiness.findById(blastid, async (blastError, blast) => {
				await blastBusiness.getEmailHTML(blastid).then(function (HTML) {
					if (HTML == null) {
						res.send("Error generating email.");
						return
					}
					if (_IagentTemplateModel.email) {
						Common.sendMail(_IagentTemplateModel.email, 'support@ListingReach.com', 'Property Email', null, HTML, function (error: any, response: any) {
							if (error) {
								console.log(error);
								res.end("error");
							}
						});
						res.send({ "success": "Done" });
					}
				});
			});
		} catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}
	}

	forgetUserPassword(req: express.Request, res: express.Response): void {
		try {

			var _user: IUserModel = <IUserModel>req.body;
			var _userBusiness = new UserBusiness();
			_userBusiness.findOne({ email: _user.email }, (error, result) => {
				if (error) {
					res.send({ "error": "error" });
				}
				else {
					if (result && result.email == _user.email) {
						if (result.status == 'unverified') {
							return res.status(401).send({ "error": "Your account is not verified. Please contact admin." });
						} else {
							var token = _userBusiness.createToken(result);
							var _updateData: IUserModel = <IUserModel>req.body;
							_updateData.lastLogin = new Date();
							_updateData.token = token;
							var _id: string = result._id.toString();
							var _userBusinessUpdate = new UserBusiness();
							// Generate new password ...
							var autoGeneratedPassword = Math.random().toString(36).slice(-8);
							_user.password = 'P' + autoGeneratedPassword;
							_userBusinessUpdate.update(_id, _updateData, (error, resultUpdate) => {
								if (error) res.send({ "error": "error", "message": "Authentication error" });//res.status(401).send({"error": "Authentication error"});
								else {

									var _userBusiness = new UserBusiness();
									_userBusiness.findById(_id, (error, resultuser) => {
										if (error) res.send({ "error": "error", "message": "Authentication error" });
										else {
											var emailresetpassword = Common.EMAIL_TEMPLATE_RESET_USER_PASSWORD;
											var emailtemplate = emailresetpassword.replace(/#password#/g, _user.password);
											Common.sendMail(result.email, 'support@ListingReach.com', 'Forgot Password', null, emailtemplate, function (error: any, response: any) {
												if (error) {
													console.log(error);
													res.end("error");
												}
											});
											res.status(201).send({ "success": "done" });
										}
									});
								}
							});
						}
					} else {
						return res.status(401).send({ "error": "You have entered invalid email." });
					}
				}
			});
		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });

		}
	}



	UpdateUserPassword(req: express.Request, res: express.Response): void {
		try {
			var _user: IUserModel = <IUserModel>req.body;
			var _userBusiness = new UserBusiness();
			var _idc = req.body.user;
			_user.password = req.body.newpassword;
			_userBusiness.findOne({ _id: _idc, password: req.body.currentpassword }, (error, result) => {
				if (error) {
					res.send({ "error": "Please enter current vaild password." });
				}
				else if (result == null) {
					res.send({ "error": "Please enter current vaild password." });

				} else {
					_user.password = req.body.newpassword;
					_userBusiness.update(_idc, _user, (error, resultUpdate) => {
						if (error) res.send({ "error": "error", "message": "Your password is not updated." });
						else {
							res.status(201).send({ "success": "Your password is successfully updated." });
						}
					});
				}
			});
		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });

		}
	}

	selectDatabase(req: express.Request, res: express.Response): void {
		try {
			var _blastform: IBlastModel = <IBlastModel>req.body;
			let _id: string = req.body.blast_id;
			var _blastBusiness = new BlastBusiness();
			console.log("_blastform=====", _blastform);
			/*					if(property.isOpenHouse){
									var opneHouseData=[];
									let data = property.isOpenHouse.openHouseData;
												data.forEach(function(house:any) {
												if(house){
													opneHouseData.push({openHouseData:house.openHouseData});
												}
											});
								   _propertyform.isOpenHouse=opneHouseData;
							}*/
			_blastBusiness.update(_id, _blastform, (error, resultUpdate) => {
				if (error) {
					console.log("save asscoiations error :", error);
					res.send({ "error": error });
				} else {
					res.send({ "success": "success" });
				}
			})
		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}
	}

	forgetSAdminPassword(req: express.Request, res: express.Response): void {
		try {
			var _user: IAdminUserModel = <IAdminUserModel>req.body;
			var _adminUserBusiness = new AdminUserBusiness();
			var _userBusiness = new UserBusiness();
			_adminUserBusiness.findOne({ email: _user.email }, (error, result) => {
				if (error) res.send({ "error": "error" });
				else {
					if (result && result.email == _user.email) {
						if (!result.isActive) {
							return res.status(401).send({ "error": "Your account is not active. Please contact admin." });
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
							_user.password = 'P' + autoGeneratedPassword;
							_adminUserBusiness.update(_id, _updateAdminData, (error, resultUpdate) => {
								if (error) res.send({ "error": "error", "message": "Authentication error" });//res.status(401).send({"error": "Authentication error"});
								else {
									var companyId = result._id;
									_adminUserBusiness.retrieve(companyId, (error, resultCompany) => {
										if (error) res.send({ "error": "error", "message": "Authentication error" });
										else {
											var emailresetpassword = Common.EMAIL_TEMPLATE_RESET_ADMIN_PASSWORD;
											var emailtemplate = emailresetpassword.replace(/#password#/g, _user.password);
											Common.sendMail(result.email, 'support@inteleagent.com', 'Forgot Password', null, emailtemplate, function (error: any, response: any) {
												if (error) {
													console.log(error);
													res.end("error");
												}
											});
											res.status(201).send({ "success": "done" });
										}
									});
								}
							});
						}
					} else {
						return res.status(401).send({ "error": "Invalid email." });
					}
				}
			});
		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });

		}
	}


	verifytoken(req: express.Request, res: express.Response): void {
		var _userBusiness = new UserBusiness();
		_userBusiness.verifyToken(req, res, (userData) => {
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
				if (error) {
					console.log(error);

					res.send({ "error": "error" });
				}
				else {
					res.send(result)
				};
			});
		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });

		}
	}



	getReferences(req: express.Request, res: express.Response): void {
		try {



		} catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}
	}

	saveBlast(req: express.Request, res: express.Response): void {
		try {
			var _blastform: IBlastModel = <IBlastModel>req.body;
			var _blastBusiness = new BlastBusiness();
			_blastform.status = ' ';
			_blastform.selected_template_date = new Date();
			_blastBusiness.create(_blastform, (error, result) => {
				if (error) {
					console.log(error);
					res.send({ "error": error });
				}
				else res.send({ "success": "success", data: result });
			});
		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}
	}

	saveDesignTemplate(req: express.Request, res: express.Response): void {
		try {
			let _IagentTemplateModel: IAgentTemplateModel = <IAgentTemplateModel>req.body;
			let _agentTemplateBusiness = new AgentTemplateBusiness();

			let _blastform: IBlastModel = <IBlastModel>req.body;
			let _blastBusiness = new BlastBusiness();
			_blastform.selected_template_date = new Date();
			_agentTemplateBusiness.create(_IagentTemplateModel, (error, result) => {
				if (error) {
					console.log(error);
					res.send({ "error": error });
				} else {
					if (result && result._id) {
						_blastform.selected_template_id = result._id;
						_blastform.status = 'Draft';
						_blastBusiness.findOne({ _id: _IagentTemplateModel.blast_id }, (error, user) => {
							let _id: string = user._id.toString();
							_blastBusiness.update(_id, _blastform, (error: any, resultUpdate: any) => {
								if (error) {
									console.log(error);
									res.send(error);
								} else {
									return res.json({ "sucess": "sucess", "data": result });
								}
							});
						});
					}
				}
			});
		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}
	}



	saveAgents(req: express.Request, res: express.Response): void {
		try {
			var _userBusiness = new UserBusiness();
			_userBusiness.verifyToken(req, res, (userData) => {
				var _agent: IAgentModel = <IAgentModel>req.body;
				console.log("_agent====",_agent);
				_agent.createdOn = new Date();

				_agent.user_id = userData._id;

				var _agentBusiness = new AgentBusiness();
				_agentBusiness.findOne({ 'userId': userData._id }, (error: any, agentresult: any) => {

					if (agentresult) {
						var _id: string = agentresult._id.toString();
						_agentBusiness.update(_id, _agent, (error: any, resultUpdate: any) => {
							if (error) {
							} else {
								res.status(201).send({ "success": "Your agent info successfully updated." });
								return res.json({ data: resultUpdate });
							}
						});
					} else {
						_agentBusiness.create(_agent, (error, agentresultData) => {
							if (error) {
								console.log("error====", error)
							} else {
								res.status(201).send({ "success": "Your agent info successfully updated." });
							}
						});
					}

				});
			});
		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}
	}

	saveProperty(req: express.Request, res: express.Response): void {
		try {
			console.log("Properties Body : ", req.body)
			var _propertyforms = req.body;
			var _propertyBusiness = new PropertyBusiness();
			if (_propertyforms && _propertyforms.properties && _propertyforms.properties.length) {
				var { Email, blastHeadline } = req.body;
				var _templateBusiness = new AgentTemplateBusiness();
				var _blastform = req.body;
				var _blastBusiness = new BlastBusiness();
				_propertyforms.properties.forEach(function (prop: any) {
					let _templateform: IAgentTemplateModel = <IAgentTemplateModel>{
						email_subject: Email.formSubject,
						from_line: Email.formLine,
						address: Email.formReply,
						headline: blastHeadline,
						userId: prop.userId,
					}

					let _propertyform: IPropertyModel = <IPropertyModel>{
						display_method: prop.propertyAddress.displayMethod,
						blast_id: _propertyforms.blast_id,
						street_address: prop.propertyAddress.streetAddress,
						city: prop.propertyAddress.city,
						state: prop.propertyAddress.state,
						zipcode: prop.propertyAddress.zipCode,
						userId: prop.userId,
						mls_number: prop.mlsNumber.numberProperty,
						board: prop.mlsNumber.boardAssociation,
						pricingInfo: prop.pricingInfo,
						isOpenHouse:prop.isOpenHouse,
						linksToWebsites:prop.linksToWebsites
					}
					// if (prop.linksToWebsites && prop.linksToWebsites.length > 0) {
					// 	var linksData: any = [];
					// 	prop.linksToWebsites.forEach(function (links: any) {
					// 		if (links) {
					// 			linksData.push({ linksToWebsiteData: links });
					// 		}
					// 	});
					// 	_propertyform.linksToWebsites = linksData;
					// }

					// if (prop.isOpenHouse && prop.isOpenHouse.length > 0) {
					// 	var opneHouseData: any = [];
					// 	prop.isOpenHouse.forEach(function (house: any) {
					// 		if (house) {
					// 			opneHouseData.push({ openHouseData: house.openHouseData });
					// 		}
					// 	});
					// 	_propertyform.isOpenHouse = opneHouseData;
					// }

					if (prop.propertyImages) {
						var propertyImages: any = [];
						let data = prop.propertyImages.img;
						data.forEach(function (images: any) {
							if (images) {
								propertyImages.push({ imageId: images.id, imageUrl: images.imgUrl });
							}
						});
						_propertyform.propertyImages = propertyImages;
					}
					_propertyform.property_type = prop.generalPropertyInformation.propertyType;
					_propertyform.property_style = prop.generalPropertyInformation.propertyStyle;
					_propertyform.lot_size = prop.generalPropertyInformation.lotSize;
					_propertyform.number_bedrooms = prop.generalPropertyInformation.numberOfBedrooms;
					_propertyform.building_size = prop.generalPropertyInformation.buildingSize;
					_propertyform.number_stories = prop.generalPropertyInformation.numberOfStories;
					_propertyform.number_bathrooms = prop.generalPropertyInformation.numberOfBathrooms;
					_propertyform.year_built = prop.generalPropertyInformation.yearBuilt;
					_propertyform.garage = prop.generalPropertyInformation.garage;
					_propertyform.garageSize = prop.generalPropertyInformation.garageSize;
					_propertyform.price = prop.generalPropertyInformation.pricePerSquareFoot;
					_propertyform.property_details = prop.propertyDetail;

					_propertyBusiness.create(_propertyform, (error, result) => {
						if (error) {
							console.log("Property create error :", error);
							res.send({ "error": error });
							return;
						}
						_templateform.Property_id = result._id.toString();
						let _id: string = req.body.templateId;
						_templateform._id = mongoose.Types.ObjectId(_id);
						console.log("update temp ", _templateform);

						_templateBusiness.update(_id, _templateform, (error, resultUpdate) => {
							if (error) {
								console.log(error);
								res.send({ "error": error });
							} else {

								let _blastforms: IBlastModel = <IBlastModel>req.body;
								let _id: string = _blastform.blast_id;

								if (_blastform && _blastform.agentData != undefined) {
									_blastforms.agentData = _blastform.agentData;
									_blastBusiness.update(_id, _blastforms, (error, blastUpadte) => {
										if (error) {
											res.send({ "error": error });
										}

										var propertyAggregate = [
											{
												$lookup:
												{
													from: "users",
													localField: "userId",
													foreignField: "_id",
													as: "users"
												}
											},
											{
												$unwind: "$users"

											},
											{
												$lookup:
												{
													from: "templates",
													localField: "_id",
													foreignField: "Property_id",
													as: "templates"
												}
											},
											{
												$lookup:
												{
													from: "blasts",
													localField: "blast_id",
													foreignField: "_id",
													as: "blasts"
												}
											},
											{
												$project:
												{
													"_id": 1,
													"userId": 1,
													"display_method": 1,
													"street_address": 1,
													"city": 1,
													"state": 1,
													"zipcode": 1,
													"blast_id": 1,
													"mls_number": 1,
													"board": 1,
													"property_type": 1,
													"property_style": 1,
													"lot_size": 1,
													"number_bedrooms": 1,
													"building_size": 1,
													"number_stories": 1,
													"number_bathrooms": 1,
													"year_built": 1,
													"garage": 1,
													"garageSize": 1,
													"price": 1,
													"pricingInfo": 1,
													"property_details": 1,
													"isOpenHouse": 1,
													"propertyImages": 1,
													"linksToWebsites": 1,
													"templates.email_subject": 1,
													"templates.from_line": 1,
													"templates.address": 1,
													"templates.Property_id": 1,
													"templates.headline": 1,
													"templates.template_type": 1,
													"templates.userId": 1,
													"users.userName": 1,
													"users.firstName": 1,
													"users.lastName": 1,
													"users.roles": 1,
													"blasts": 1,

												}
											},
											{
												$match:
												{
													blast_id: mongoose.Types.ObjectId(_propertyforms.blast_id.toString())
												}
											}
										];

										_propertyBusiness.aggregate(propertyAggregate, (error: any, result: any) => {
											if (error) {
												res.send({ "error": error });
											} else {
												var returnObj = result.map(function (obj: any): any {
													return {
														id: obj._id,
														firstName: obj.users.firstName,
														lastName: obj.users.lastName,
														middleName: obj.users.middleName,
														building_size: obj.building_size,
														number_bathrooms: obj.number_bathrooms,
														isOpenHouse: obj.isOpenHouse,
														property_type: obj.property_type,
														property_style: obj.property_style,
														mls_number: obj.mls_number,
														linksToWebsites: obj.linksToWebsites,
														property_detail: obj.property_details,
														pricingInfo: obj.pricingInfo,
														board: obj.board,
														zipcode: obj.zipcode,
														city: obj.city,
														display_method: obj.display_method,
														street_address: obj.street_address,
														number_bedrooms: obj.number_bedrooms,
														year_built: obj.year_built,
														number_stories: obj.number_stories,
														lot_size: obj.lot_size,
														templates: obj.templates,
														price: obj.price,
														garageSize: obj.garageSize,
														blast_id: obj.blast_id,
														agentData: obj.blasts,
														propertyImages: obj.propertyImages
													};

												});
												//console.log("returnObj=====",returnObj);
												return res.json(returnObj);
											}
										});

									});
								}

							}
						});
					});

				});

			}

		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}
	}


	savePropertyImages(data: any, id: any, res: express.Response): void {
		var _blastimageBusiness = new BlastImageBusiness();
		var _blastimage: IBlastImageModel = <IBlastImageModel>data;

		var type = data.mimetype.split("/");
		var userid: string = id.toString();

		_blastimage.user_id = userid;
		_blastimage.url = data.filename;
		_blastimageBusiness.create(_blastimage, (error, resultData) => {
			if (error) {
				console.log("error===", error);
			} else {
				return res.json({ url: resultData.url, imageId: resultData._id });
			}
		});
	}

	deleteSavedBlast(req: express.Request, res: express.Response): void {
		try {

			var _blastBusiness = new BlastBusiness();
			let _agentTemplateBusiness = new AgentTemplateBusiness();
			var _propertyBusiness = new PropertyBusiness();

			var _id: string = req.params.id;
			_blastBusiness.findById(_id, (error, result) => {
				let _id: string = result._id.toString();
				let selected_template_id: string = result.selected_template_id;
				_blastBusiness.delete(_id, (error, deleted) => {
					if (error) {
						res.send({ "error": "error" });
					} else {
						let _id = selected_template_id;
						_agentTemplateBusiness.findById(_id, (error, result) => {
							let propertyid: string = result.Property_id.toString();
							_agentTemplateBusiness.delete(_id, (error, template) => {
								if (error) {
									res.send({ "error": "error" });
								}
								let _id = propertyid;
								_propertyBusiness.findById(_id, (error, result) => {
									_propertyBusiness.delete(_id, (error, template) => {
										res.send({ "sucess": "sucess" });
									});
								});
							});
						});
					}
				});
			});
		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}

	}


	getPreviewhtml(req: express.Request, res: express.Response): void {
		try {
			const blastid = req.params.id;
			//console.log("blastid====",blastid);
			const blastBusiness = new BlastBusiness();
			blastBusiness.findById(blastid, async (blastError, blast) => {
				if (blastError) {
					res.send(blastError);
				} else {
					//console.log("blast====",blast.id);
					await blastBusiness.getEmailHTML(blast.id).then(function (HTML) {
						if (HTML == null) {
							res.send("Error generating email.");
						} else {
							//console.log("HTML======",HTML);
							res.send({ "html": HTML });
						}
					})

				}

			})

		} catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}
	}

	saveImages(req: express.Request, res: express.Response) {
		try {
			var _property: IPropertyModel = <IPropertyModel>req.body;

			var _propertyBusiness = new PropertyBusiness();
			let array = [];
			_property.property_ids.forEach(function (item) {
				let _id: string = item.id;
				_propertyBusiness.update(_id, _property, (error, resultUpdate) => {
					if (error) {
						res.send({ "error": "error in your request" });
					} else {
						_propertyBusiness.findById(_id, (error, result) => {
							if (error) {
								res.send({ "error": "error in your request" });
							} else {
								array.push(result);
								res.send({ "success": "success", data: array });
							}
						})
					}
				})
			});
		} catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}
	}

	savePayment(req: express.Request, res: express.Response) {
		try {
			var _userBusiness = new UserBusiness();
			_userBusiness.verifyToken(req, res, (userData) => {
				var _payment: IPaymentModel = <IPaymentModel>req.body;
				_payment.createdOn = new Date();
				_payment.user_id = userData._id;
				var _paymentBusiness = new PaymentBusiness();
				_payment.blast_id = req.params.blastId;
				_payment.amount = _payment.total;
				_payment.paymentID = _payment.paymentID;
				var blastId: string = req.params.blastId;
				_paymentBusiness.retrieve({ "user_id": userData._id }, (error, result) => {

					if (result && result.length > 0) {
						var lastInvoiceId = +result.length + +1;
						_payment.invoice_id = lastInvoiceId;
					}
					else {
						var invoice_number = 1;
						_payment.invoice_id = invoice_number;
					}
					_paymentBusiness.create(_payment, (error, paymentresultData) => {
						if (error) {
							console.log("error====", error)
						} else {
							res.status(201).send({ "success": "Your payment successfully done." });
						}
					});
				});


			});
		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}
	}
	getBlast(req: express.Request, res: express.Response): void {
		try {
			const blastId = req.params.id;
			console.log("id: ", req.params)
			var blastBusiness = new BlastBusiness();
			blastBusiness.findById(blastId, (error: any, result: any) => {
				if (error) {
					console.log("error in getBlast :", error);
					res.send(error);
				} else {
					console.log("blast response", result)
					res.send(result);
				}
			}
			);
		} catch (e) {
			console.log("Exception in getBlast", e);
			res.send(e);
		}
	}
	getSavedBlast(req: express.Request, res: express.Response) {
		try {
			var _blastBusiness = new BlastBusiness();
			var userId: string = req.params.agentId;
			var savedBlastAggregate = [
				{
					$lookup:
					{
						from: "templates",
						localField: "user_id",
						foreignField: "userId",
						as: "templates"
					}
				},
				{
					$lookup:
					{
						from: "payment",
						localField: "user_id",
						foreignField: "user_id",
						as: "payment"
					}
				},
				{
					$project:
					{
						"_id": 1,
						"user_id": 1,
						"status": 1,
						"selected_template_date": 1,
						"selected_template_id": 1,
						"scheduledDate": 1,
						"templates.headline": 1,
						"payment.amount": 1
					}
				},
				{
					$match:
					{
						user_id: mongoose.Types.ObjectId(userId)
					}
				}
			];

			_blastBusiness.aggregate(savedBlastAggregate, (error: any, result: any) => {
				if (error) {
					res.send({ "error": error });
				} else {
					var returnObj = result.map(function (obj: any): any {
						return {
							id: obj._id,
							status: obj.status,
							payment: obj.payment,
							subject: obj.templates,
							createdon: obj.selected_template_date,
							scheduledDate: obj.scheduledDate,
							templateId: obj.selected_template_id
						};

					});
					return res.json(returnObj);
				}
			});


		} catch (e) {
			res.send({ "error": "error in your request" });
		}
	}

	getPayment(req: express.Request, res: express.Response) {
		try {
			var _userBusiness = new UserBusiness();
			var userId: string = req.params._id;
			console.log("userId===",userId)
			_userBusiness.verifyToken(req, res, (userData) => {
				const paymentBusiness = new PaymentBusiness();
					var query: Array<any> = [
						{
							$lookup: {
								from: "blasts",
								localField: "blast_id",
								foreignField: "_id",
								as: "blast"
							}
						},
						
						{
							$project: {
								_id: 1,
								paymentID: 1,
								createdOn: 1,
								amount: 1,
								user_id:1,
								invoice_id:1,
								"blast.blast_type": 1,
								"blast.status": 1
								
							}
						},
						{
							$match:
							{

								user_id: mongoose.Types.ObjectId(userId)
							}
						}
					];
					paymentBusiness.aggregate(query, (error, result) => {
				

						if (error) {
							console.log(error);
							res.send({ "error": error });
						}
						else {
							console.log(result);
							//res.send(result);
							return res.json({ payment: result });
						}
					});

				
			});
		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}
	}
	saveBlastCalender(req: express.Request, res: express.Response) {
		try {
			var _blastBusiness = new BlastBusiness();

			var _id: string = req.params.blastId;
			_blastBusiness.findById(_id, (error, result) => {
				let _id: string = result._id.toString();
				var _blastform: IBlastModel = <IBlastModel>req.body;
				_blastform.scheduledDate = _blastform.data;
				_blastBusiness.findOne({ "_id": _id }, (error, dataBaseData) => {
					_blastBusiness.update(_id, _blastform, (error: any, resultUpdate: any) => {
						if (error) {
						} else {
							var _blastSettingsBusiness = new BlastSettingsBusiness();
							_blastSettingsBusiness.retrieve("", function (error, result) {
								if (error) {
									res.send({ "error": error });
								}
								else {
									console.log("get settings dataBaseData", dataBaseData);
									res.send({ "success": "success", data: _blastform.scheduledDate, dataBaseData: dataBaseData, blastsettingData: result });
								}
							});


						}
					});
				});
			}
	 	}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}
	}
	getTemplateOrPropertydata(req: express.Request, res: express.Response): void {
		try {
			var _propertyBusiness = new PropertyBusiness();
			var propertyAggregate = [
				{
					$lookup:
					{
						from: "users",
						localField: "userId",
						foreignField: "_id",
						as: "users"
					}
				},
				{
					$unwind: "$users"

				},
				{
					$lookup:
					{
						from: "templates",
						localField: "_id",
						foreignField: "Property_id",
						as: "templates"
					}
				},
				{
					$lookup:
					{
						from: "blasts",
						localField: "blast_id",
						foreignField: "_id",
						as: "blasts"
					}
				},
				{
					$project:
					{
						"_id": 1,
						"userId": 1,
						"display_method": 1,
						"street_address": 1,
						"city": 1,
						"state": 1,
						"zipcode": 1,
						"blast_id": 1,
						"mls_number": 1,
						"board": 1,
						"property_type": 1,
						"property_style": 1,
						"lot_size": 1,
						"number_bedrooms": 1,
						"building_size": 1,
						"number_stories": 1,
						"number_bathrooms": 1,
						"year_built": 1,
						"garage": 1,
						"garageSize": 1,
						"price": 1,
						"pricingInfo": 1,
						"property_details": 1,
						"isOpenHouse": 1,
						"propertyImages": 1,
						"linksToWebsites": 1,
						"templates.email_subject": 1,
						"templates.from_line": 1,
						"templates.address": 1,
						"templates.Property_id": 1,
						"templates.headline": 1,
						"templates.template_type": 1,
						"templates.userId": 1,
						"users.userName": 1,
						"users.firstName": 1,
						"users.lastName": 1,
						"users.roles": 1,
						"blasts": 1,

					}
				},
				{
					$match:
					{
						blast_id: mongoose.Types.ObjectId(req.body.blast_id)
					}
				}
			];

			let _blastBusiness
			_propertyBusiness.aggregate(propertyAggregate, (error: any, result: any) => {
				if (error) {
					res.send({ "error": error });
				} else {
					var returnObj = result.map(function (obj: any): any {
						return {
							id: obj._id,
							firstName: obj.users.firstName,
							lastName: obj.users.lastName,
							middleName: obj.users.middleName,
							building_size: obj.building_size,
							number_bathrooms: obj.number_bathrooms,
							isOpenHouse: obj.isOpenHouse,
							property_type: obj.property_type,
							property_style: obj.property_style,
							mls_number: obj.mls_number,
							linksToWebsites: obj.linksToWebsites,
							property_detail: obj.property_details,
							pricingInfo: obj.pricingInfo,
							board: obj.board,
							zipcode: obj.zipcode,
							city: obj.city,
							display_method: obj.display_method,
							street_address: obj.street_address,
							number_bedrooms: obj.number_bedrooms,
							year_built: obj.year_built,
							number_stories: obj.number_stories,
							lot_size: obj.lot_size,
							templates: obj.templates,
							price: obj.price,
							garageSize: obj.garageSize,
							blast_id: obj.blast_id,
							agentData: obj.blasts,
							propertyImages: obj.propertyImages
						};

					});

					return res.json(returnObj);
				}
			});

		} catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}
	}


}
export = UserController;
