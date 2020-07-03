/**
 * api call lands here from routing
 */

import express = require("express");
import AdminUserBusiness = require("./../app/business/AdminUserBusiness");
import UserBusiness = require("./../app/business/UserBusiness");
import SubscriberBusiness = require("./../app/business/SubscriberBusiness");
import BlastBusiness = require("./../app/business/BlastBusiness")
import BlastSettingsBusiness = require("./../app/business/BlastSettingsBusiness");
import PagesBusiness = require("./../app/business/PagesBusiness");
import IBaseController = require("./BaseController");
import IUserModel = require("./../app/model/interfaces/IUserModel");
import IPagesModel = require("./../app/model/interfaces/IPagesModel");
import Common = require("./../config/constants/common");
import IBlastSettingsModel = require("./../app/model/interfaces/IBlastSettingsModel");
import PaymentBusiness = require("./../app/business/PaymentBusiness");
import AgentTemplateBusiness = require("./../app/business/AgentTemplateBusiness");
import IAgentTemplateModel = require("./../app/model/interfaces/IAgentTemplateModel";)
const request = require('request');
const querystring = require('querystring');
var mongoose = require('mongoose');
var async = require('async');
class AdminUserController implements IBaseController<AdminUserBusiness> {

	create(req: express.Request, res: express.Response): void {
		console.log("in _user controller->create");
		try {
			var _user: IUserModel = <IUserModel>req.body;
			var _adminUserBusiness = new AdminUserBusiness();
			_adminUserBusiness.create(_user, (error, result) => {
				if (error) {
					console.log("ERROR ON BACKEND CONTROLLER");
					console.log(error);
					res.send({ "error": error });
				}
				else res.send({ "success": "success" });
			});
		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}
	}

	////////////////Admin//////////////////////////////////////////
	getPayments(req: express.Request, res: express.Response): void {
		try {
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
					$lookup: {
						from: "users",
						localField: "user_id",
						foreignField: "_id",
						as: "users"
					}
				},
				{

					$lookup: {
						from: "templates",
						localField: "blast.selected_template_id",
						foreignField: "_id",
						as: "template"
					}
				},
				{
					$project: {
						_id: 1,
						paymentID: 1,
						createdOn: 1,
						amount: 1,
						"blast.blast_type": 1,
						"template.headline": 1,
						"users.firstName": 1,
						"users.lastName": 1,
						"users.email": 1,
						"users.companyName": 1,
						"blast.selected_template_date": 1,
						"blast_id": 1
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
					res.send(result);
				}
			});

		}
		catch (e) {
			res.send(e);
		}
	}

	getAgents(req: express.Request, res: express.Response): void {
		try {
			var _userBusiness = new UserBusiness();
			var query: Array<any> = [
				{
					$match: {
						$and: [
							{ roles: /agents/ },
							{
								$or: [{ isDeleted: { $eq: false } },
								{ isDeleted: { $exists: false } }
								]
							}
						]
					}
				},
				{
					$lookup: {
						from: "blasts",
						localField: "_id",
						foreignField: "user_id",
						as: "blasts"
					}
				},
				{
					$lookup: {
						from: "payments",
						localField: "_id",
						foreignField: "user_id",
						as: "payments"
					},
				},
				{
					$unwind: {
						path: "$payments",
						preserveNullAndEmptyArrays: true
					}
				},
				{
					$group: {
						_id: "$_id",
						totalPaid: { $sum: "$payments.amount" },
						//	totalBlsts: { $sum: "$blasts._id" },
						totalBlsts: { $sum: 1 },
						firstName: { $first: "$firstName" },
						lastName: { $first: "$lastName" },
						email: { $first: "$email" },
						status: { $first: "$status" },
						company: { $first: "$companyName" },
						registeredOn: { $first: "$createdOn" }
					}
				}
			];



			var fields: Object = { _id: 1, firstName: 1, lastName: 1, email: 1, status: 1, createdOn: 1, lastLogin: 1 }
			_userBusiness.aggregate(query, (error, result) => {
				if (error) {
					console.log("error in getAgents -", error);
					res.send({ "error": error });
				} else {
					console.log("getAgents response - ", result);
					res.send(result);
				}
			})
		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}
	}

	getSubscribers(req: express.Request, res: express.Response): void {
		try {
			var subscriberBusiness = new SubscriberBusiness();
			//var condition: Object = { roles: /subscriber/ }
			var fields: Object = { _id: 1, name: 1, email: 1, phone: 1, city: 1, state: 1, createdOn: 1 }
			subscriberBusiness.retrieveFields("", fields, (error, result) => {
				if (error) {
					console.log("error in getAgents -", error);
					res.send({ "error": error });
				} else {
					//console.log("getAgents response - ", result);
					res.send(result);
				}
			})
		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}

	}

	getBlasts(req: express.Request, res: express.Response): void {
		try {
			var blastBusiness = new BlastBusiness();
			//var condition: Object = { roles: /subscriber/ }
			var query: Array<any> = [
				{
					$lookup: {
						from: "templates",
						localField: "selected_template_id",
						foreignField: "_id",
						as: "template"
					}
				},
				{
					$lookup: {
						from: "payments",
						localField: "_id",
						foreignField: "blast_id",
						as: "payments"
					}
				},
				{
					$lookup: {
						from: "users",
						localField: "user_id",
						foreignField: "_id",
						as: "users"
					}
				},
				{
					$unwind: {
						path: "$payments",
						preserveNullAndEmptyArrays: false
					}
				},
				{
					$project: {
						_id: 1,
						blast_type: 1,
						selected_template_date: 1,
						sentOn: 1,

						"users.firstName": 1,
						"users.lastName": 1,
						"users.email": 1,
						"users.companyName": 1,
						"template.headline": 1,
						"template.email_subject": 1,
						"payments.amount": 1,
						"payments.createdOn": 1
					}
				}
			];
			blastBusiness.aggregate(query, (error, result) => {
				if (error) {
					console.log("error in getBlasts -", error);
					res.send({ "error": error });
				} else {
					//console.log("getAgents response - ", result);
					res.send(result);
				}
			})
		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}

	}

	sendBlast(req: express.Request, res: express.Response): void {

		const blastid = req.params.id;
		//Get BLAST//
		const blastBusiness = new BlastBusiness();
		blastBusiness.findById(blastid, async (blastError, blast) => {
			if (blastError) {
				res.send({ blastError });
			} else {
				//console.log(blast)
				//return
				if (!blast.associations || blast.associations.length < 1) {
					res.send({ error: "No Associations found to send emails to" });
					return;
				}
				// GET HTML //
				await blastBusiness.getEmailHTML(blast.id).then(function (HTML) {
					//console.log("HTML", HTML);
					if (HTML == null) {
						res.send({ error: "Error generating email." });
						return;
					}
					const templateBusiness = new AgentTemplateBusiness();
					templateBusiness.findById(blast.selected_template_id, (templateError, template: IAgentTemplateModel) => {
						if (templateError) {
							res.send({ templateError });
						} else {
							console.log("template..... ", blast.agentData.email || template.address)
							// Create Message On Active Campaign //
							var data = {
								api_action: "message_add",
								api_key: Common.ActiveCampaignLey,
								api_output: 'json',
								format: "html",
								subject: template.email_subject,
								fromemail: template.address,
								fromname: template.from_line,
								reply2: template.address,
								priority: "3",
								charset: "utf-8",
								encoding: "UTF-8",
								htmlconstructor: "editor",
								html: HTML,
								htmlfetch: "https;//test.com",
								htmlfetchwhen: "send",
								textconstructor: "editor",
								text: "Yo ho",
								textfetch: "https;//test.com",
								textfetchwhen: "send"
							};
							var listids = "";
							blast.associations.forEach(aso => {
								listids += aso.association.id + ",";
							});
							listids = listids.slice(0, -1);// remove last comma from string
							//	console.log('listids', listids);
							data["p[" + listids + "]"] = listids;
							//	console.log("message to post", data);
							var dataString = querystring.stringify(data)
							var headers = {
								'Content-Length': dataString.length,
								'Content-Type': "application/x-www-form-urlencoded"
							};
							request.post(Common.ActiveCampaignUrl + "?api_key=" + Common.ActiveCampaignLey, {
								headers: headers,
								body: dataString
							}, function (er: any, response: { statusCode: number; }, mesg: any) {
								if (er) {
									console.log("Error   : ", er)
									res.send({ er });
								}
								else {
									console.log("Message created.");
									// Create Campaigns on ActiveCampaign //
									var message = JSON.parse(mesg);
									console.log("message ", message);
									const moment = require('moment');
									let testDate = moment(new Date()).add(1, 'm').toDate();
									if (message.id) {
										//	console.log("associations:" + blast.associations)
										blast.associations.forEach(function (association) {
											//console.log("template",template);
											var data = {
												api_action: "campaign_create",
												api_key: Common.ActiveCampaignLey,
												api_output: 'json',
												type: "single",
												name: template.email_subject,
												//sdate: "2020-05-23 1:25:00 AM",
											//	sdate: testDate.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }),
												sdate: blast.scheduledDate.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }),
												status: "1", //Active
												public: "1", //Visible
												priority: 3, //Medium
												segmentid: association.segment.id
											};
											//	console.log("messageid  ", message.id)
											data["p[" + association.association.id + "]"] = association.association.id;
											data["m[" + message.id + "]"] = 100;//to send to 100%
											//	console.log("data to post", data)
											var dataString = querystring.stringify(data);
											var headers = {
												'Content-Length': dataString.length,
												"Api-Token": Common.ActiveCampaignLey,
												'Content-Type': 'application/x-www-form-urlencoded'
											};
											request.post(Common.ActiveCampaignUrl, {
												headers: headers,
												body: dataString
											}, function (error: any, response: { statusCode: number; }, body: any) {
												console.log("Create campaign statusCode   : ", error)
												if (error) {
													console.log("Error   : ", error)
													res.send({ error });
												}
												else {
													console.log("Campaign created.");

													//UPDATE BLAST//
													let update = {
														$set: {
															status: "Sent",
															sentOn: new Date()
														}
													}

													blastBusiness.findOneAndUpdate(blast._id, update, (updateBlastError, updatedBlast) => {
														if (updateBlastError) {
															console.log("updateBlastError", updateBlastError);
															res.send(updateBlastError);
															return;
														} else {
															console.log("Blast Status updated");
															res.send({ message: "success" });
															return;
														}
													})

												}
											});

										})
									}
								}
							});
						}
					});
				}
					, function (error) {
						console.log("Error", error);
						res.send({ error });
					});
			}
		})

	}

	getActiveCampaignAssociations(req: express.Request, res: express.Response): void {
		try {
			var options = {
				method: 'GET',
				url: 'https://listingreach.api-us1.com/api/3/lists',
				headers: {
					"Api-Token": Common.ActiveCampaignLey
				}
			};

			request(options, function (error: any, response: any, associations: any) {
				if (error) throw new Error(error);

				var options = {
					method: 'GET',
					url: 'https://listingreach.api-us1.com/api/2/segment/list',
					headers: {
						"Api-Token": Common.ActiveCampaignLey
					}
				};
				request(options, function (error: any, response: any, segments: any) {
					if (error) throw new Error(error);
					//	console.log(JSON.parse(states).lists)
					var st = JSON.parse(associations);
					var ct = JSON.parse(segments)
					res.send({ associations: st.lists, segments: ct })
				});
				//res.send({ states });

			});

			// request.get(Common.ActiveCampaignUrl + "?api_action=list_list&api_key="+Common.ActiveCampaignLey+"&ids=all&api_output=json", {			
			// }, function (er: any, response: { statusCode: number; }, body: any) {
			// 	if (!er) {
			// 		console.log("message body  : ", body)
			// 		res.send(body.associations);
			// 	} else {
			// 		console.log("Error   : ", er)
			// 		res.send(er);
			// 	}
			// });
		}
		catch (e) {

			console.log(e);
			res.send({ "error": "error in your request" });
		}
	}

	deleteusers(req: express.Request, res: express.Response): void {
		var _id: string = req.params._id;

		try {
			var _userBusiness = new UserBusiness();
			_userBusiness.delete(_id, (error, result) => {
				if (error) {
					res.send({ "error": "error" });
				} else {
					console.log(result);
					res.send({ "success": "success" });
				}

			});
		}

		catch (e) {

			console.log(e);
			res.send({ "error": "error in your request" });
		}

	}

	deleteSubscriber(req: express.Request, res: express.Response): void {
		var _id: string = req.params._id;
		try {
			var _userBusiness = new SubscriberBusiness();
			_userBusiness.delete(_id, (error, result) => {
				if (error) {
					res.send({ "error": error });
				} else {
					console.log(result);
					res.send({ "success": "success" });
				}
			});
		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}
	}
	deleteagents(req: express.Request, res: express.Response): void {
		var uid: string = req.params._id;
		console.log('deletedddddddddd id------:', uid);
		try {
			var _userBusiness = new UserBusiness();
			_userBusiness.findOne({ "_id": uid }, (error, result) => {
				//	console.log('try----------------------', result);
				if (error) {
					console.log('error----');
					res.send({ "error": "error" });
				} else {
					var _user: IUserModel = <IUserModel>req.body;
					console.log("del ", result.isDeleted)
					if (typeof (result.isDeleted) == "undefined" || !result.isDeleted) {
						console.log('is deleted-------------------', result.isDeleted);
						_user.isDeleted = true;
						_userBusiness.update(uid, _user, (error: any, resultUpdate: any) => {
							if (error) {
								console.log('errorrr........', resultUpdate);
								res.send({ "error": "error" });
							} else {
								console.log('success---', resultUpdate);
								res.send({ "success": "success" });
							}
						})
					}
				}
			});
			res.send("no action taken");
		}

		catch (e) {

			console.log(e);
			res.send({ "error": "error in your request" });
		}

	}
	userStatus(req: express.Request, res: express.Response): void {
		var uid: string = req.params._id;
		// console.log("uid============>",uid)
		try {
			var _userBusiness = new UserBusiness();
			_userBusiness.findOne({ "_id": uid }, (error, result) => {
				if (error) {
					res.send({ "error": "error" });
				} else {
					var _user: IUserModel = <IUserModel>req.body;
					if (result.status == "verified") {
						_user.status = "unverified";
						_userBusiness.update(uid, _user, (error: any, resultUpdate: any) => {
							if (error) {
								res.send({ "error": "error" });
							} else {
								res.send({ "success": "success" });
							}
						})
					}
					else {
						_user.status = "verified";
						_userBusiness.update(uid, _user, (error: any, resultUpdate: any) => {
							if (error) {
								res.send({ "error": "error" });
							} else {
								res.send({ "success": "success" });
							}
						})

					}
				}
			});
		}

		catch (e) {

			console.log(e);
			res.send({ "error": "error in your request" });
		}

	}

	changeSubscriberStatus(req: express.Request, res: express.Response): void {
		var uid: string = req.params._id;
		// console.log("uid============>",uid)
		try {
			var _subscriberBusiness = new SubscriberBusiness();
			_subscriberBusiness.findById(mongoose.Types.ObjectId(uid), (error, subscriber) => {
				if (error) {
					res.send({ "error": error });
				} else {
					subscriber.status = subscriber.status == "verified" ? "unverified" : "verified";
					subscriber.updateOn = new Date();
					console.log("sub", subscriber)

					_subscriberBusiness.update(mongoose.Types.ObjectId(uid), subscriber, (error: any, resultUpdate: any) => {
						if (error) {
							console.log("error", error);
							res.send({ "error": error });
						} else {
							console.log("res", resultUpdate);
							res.send({ "success": "success" });
						}
					})
				}
			});
		}

		catch (e) {

			console.log("exception:", e);
			res.send({ "error": "error in your request" });
		}

	}




	getCount(req: express.Request, res: express.Response): void {
		try {
			var flag: string = req.params.flag;
			console.log("test=====", flag);
			switch (flag) {
				case "agents":
					var _userBusiness = new UserBusiness();
					var match: Object = { $and: [{ roles: /agents/ }, { isDeleted: { $ne: true } }] }
					var group: Object = { _id: '$roles', total: { $sum: 1 } };
					_userBusiness.customaggregate("", match, group, (error, result) => {
						if (error) {
							console.log(error);
							res.send({ "error": error });
						}
						else {
							//	console.log('response', result);
							var subscriberBusiness = new SubscriberBusiness();

							res.send({ agentscount: result.length != 0 ? result[0].total : 0 });
						}
					}
					);
					break;
				case "subscribers":
					var subscriberBusiness = new SubscriberBusiness();
					subscriberBusiness.count("", (error, result) => {
						if (error) {
							console.log(error);
							res.send({ "error": error });
						}
						else {
							//	console.log('response', result);
							var subscriberBusiness = new SubscriberBusiness();
							res.send({ subscriberscount: result });
						}
					}
					);
					break;
				case "payments":
					var paymentBusiness = new PaymentBusiness();
					const query = [
						{
							$match: {
								blast_id: { $ne: "" }
							}
						},
						{
							$group: {
								_id: "_id", // the _id will not group by $_id will this will sum whole collection
								paidBlasts: { $sum: 1 },
								totalAmount: { $sum: "$amount" }
							}
						}
					];
					paymentBusiness.aggregate(query, (error, result) => {
						if (error) {
							console.log(error);
							res.send({ "error": error });
						}
						else {
							res.send({ payments: result });
						}
					}
					);
					break;
				default:
					break;
			}

		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}

	}

	getBlastSettings(req: express.Request, res: express.Response): void {
		try {
			var _blastSettingsBusiness = new BlastSettingsBusiness();
			_blastSettingsBusiness.retrieve("", (error, result) => {
				if (error) {
					res.send({ "error": error });
				} else {
					//	console.log("get settings result", result);
					res.send(result);
				}
			});
		}
		catch (e) {

			console.log(e);
			res.send({ "error": "error in your request" });
		}

	}

	updateBlastSetings(req: express.Request, res: express.Response): void {
		console.log("in _user controller->update");
		try {
			var blastsettings: IBlastSettingsModel = <IBlastSettingsModel>req.body;
			var getValue = req.body;
			var _adminUserBusiness = new AdminUserBusiness();
			_adminUserBusiness.verifyToken(req, res, (adminUserData) => {
				var _blastSettingsBusiness = new BlastSettingsBusiness();
				var id: string = req.body;
				var mongoose = require('mongoose');
				blastsettings.modifiedOn = new Date();
				_blastSettingsBusiness.findOne({ '_id': id }, (error, blastsettingsData) => {
					if (blastsettingsData) {
						var _id = blastsettingsData._id.toString();

						_blastSettingsBusiness.update(mongoose.Types.ObjectId(_id), blastsettings, (error, result) => {
							if (error) {
								console.log("error", error.path);
								res.send({ "error": error });
							}
							else {
								console.log(result);
								res.send({ "success": "success" });
							}
						});
					}
					else {
						_blastSettingsBusiness.create(blastsettings, (error, result) => {
							if (error) {
								console.log("error", error.path);
								res.send({ "error": error });
							}
							else {
								console.log(result);
								res.send({ "success": "success" });
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

	update(req: express.Request, res: express.Response): void {
		console.log("in _user controller->update");
		try {
			var _user: IUserModel = <IUserModel>req.body;
			var getValue = req.body;
			var _adminUserBusiness = new AdminUserBusiness();
			_adminUserBusiness.verifyToken(req, res, (adminUserData) => {

				if (getValue.oldPassword && getValue.oldPassword != "") {
					if (adminUserData.password == getValue.oldPassword) {

						var _id: string = req.body;
						_adminUserBusiness.update(_id, _user, (error, result) => {
							if (error) {
								res.send({ "error": "error" });
							}
							else {
								res.send({ "success": "success" });
							}
						});
					} else {
						res.status(400);
						res.send({ "error": "oldPasswordNotSame" });
					}
				}
			});
		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}
	}
	retrieve(req: express.Request, res: express.Response): void {
		try {
			var _adminUserBusiness = new AdminUserBusiness();
			_adminUserBusiness.verifyToken(req, res, (adminUserData) => {
				_adminUserBusiness.retrieve(req.body, (error, result) => {
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
			var _adminUserBusiness = new AdminUserBusiness();
			_adminUserBusiness.verifyToken(req, res, (adminUserData) => {
				var _id: string = req.params._id;
				_adminUserBusiness.findById(_id, (error, result) => {
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

	findByToken(req: express.Request, res: express.Response): void {
		var _adminUserBusiness = new AdminUserBusiness();
		_adminUserBusiness.verifyToken(req, res, (adminUserData) => {
			res.send(adminUserData);
		});
	}

	authenticate(req: express.Request, res: express.Response): void {
		try {
			var _user: IUserModel = <IUserModel>req.body;
			//set the createdon to now
			var _adminUserBusiness = new AdminUserBusiness();
			_adminUserBusiness.findOne({ email: _user.email }, (error, result) => {
				if (error) res.send({ "error": error });
				else {
					if (result && result.password && result.password == _user.password) {
						if (result.status != "verified") {
							return res.status(401).send({ "error": "Your account is not active. Please contact admin." });
						} else {
							var token = _adminUserBusiness.createToken(result);
							var _updateData: IUserModel = <IUserModel>req.body;
							_updateData.lastLogin = new Date();
							_updateData.token = token;
							var _id: string = result._id.toString();
							var _userBusinessUpdate = new AdminUserBusiness();
							_userBusinessUpdate.update(_id, _updateData, (error, resultUpdate) => {
								if (error) res.send({ "error": "error", "message": "Authentication error" });//res.status(401).send({"error": "Authentication error"});
								else {
									res.send({
										userId: result._id,
										email: result.email,
										firstName: result.firstName,
										lastName: result.lastName,
										permissions: 'S',
										token: token
									});
								}
							});
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

	changePassword(req: express.Request, res: express.Response): void {
		try {
			var _user: IUserModel = <IUserModel>req.body;
			var getValue = req.body;
			var _adminUserBusiness = new AdminUserBusiness();
			_adminUserBusiness.verifyToken(req, res, (adminData) => {
				if (getValue.oldpassword && getValue.oldpassword != "") {
					if (adminData.password == getValue.oldpassword) {
						var _id: string = adminData._id;
						_adminUserBusiness.update(_id, _user, (error, result) => {
							if (error) {
								res.send({ "error": "error" });
							}
							else {
								res.send({ "success": "success" });
							}
						});
					} else {
						res.status(400);
						res.send({ "error": "oldPasswordNotSame" });
					}
				}
			});
		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}
	}


	getBillingDetail(req: express.Request, res: express.Response): void {

	}


	verifytoken(req: express.Request, res: express.Response): void {
		var _adminUserBusiness = new AdminUserBusiness();
		_adminUserBusiness.verifyToken(req, res, (adminUserData) => {
			res.status(201).send({
				token: "valid"
			});
		});
	}

	//tbd split the incoming query to be {a:b} instead of a=b
	count(req: express.Request, res: express.Response): void {
		try {
			var query: string = req.params.query;
			var _adminUserBusiness = new AdminUserBusiness();
			_adminUserBusiness.count(query, (error, result) => {
				if (error) {
					console.log(error);
					res.send({ "error": "error" });
				}
				else {
					console.log(result);
					res.send(result)
				};
			});
		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });

		}
	}
	delete(req: express.Request, res: express.Response): void {
		try {
			var _id: string = req.params._id;
			var _adminUserBusiness = new AdminUserBusiness();
			_adminUserBusiness.verifyToken(req, res, (adminUserData) => {
				_adminUserBusiness.delete(_id, (error, result) => {
					if (error) res.send({ "error": "error" });
					else res.send({ "success": "success" });
				});
			});
		}
		catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" });
		}
	}

	updateContent(req: express.Request, res: express.Response): void {
		try {
			var _pages: IPagesModel = <IPagesModel>req.body;
			var _pagesBusiness = new PagesBusiness();
			_pagesBusiness.findOne({ "page": _pages.page }, (error, result) => {
				if (error) {
					res.send({ "error": "error" });
				} else {
					console.log(result);
					if (result) {
						const { ObjectId } = require('mongodb');
						_pagesBusiness.update(ObjectId(result._id), _pages, (error: any, resultUpdate: any) => {
							if (error) {
								res.send({ "error": "error" });
							} else {
								_pagesBusiness.retrieve({}, (error, result) => {
									if (error) {
										res.send({ "error": "data" });
									} else {
										res.send(result);
									}
								});
							}
						});
					} else {
						_pagesBusiness.create(_pages, (error, result) => {
							if (error) {
								console.log("ERROR ON BACKEND CONTROLLER");
								console.log(error);
								res.send({ "error": error });
							}
							else res.send({ "success": "inserted success" });
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


	getContent(req: express.Request, res: express.Response): void {
		// console.log("req.body----",req.body);
		try {
			var _pagesBusiness = new PagesBusiness();
			_pagesBusiness.retrieve(req.body, (error, result) => {
				if (error) {
					res.send({ "error": "data" });
				} else {
					res.send(result);
					console.log("get page data ==== ", result);
				}
			});
		}
		catch (e) {

			console.log(e);
			res.send({ "error": "error in your request" });
		}
	}
}
export = AdminUserController;