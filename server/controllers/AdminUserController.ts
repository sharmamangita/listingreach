/**
 * api call lands here from routing
 */

import express = require("express");
import AdminUserBusiness = require("./../app/business/AdminUserBusiness");

import UserBusiness = require("./../app/business/UserBusiness");

import BlastSettingsBusiness = require("./../app/business/BlastSettingsBusiness");
import PagesBusiness = require("./../app/business/PagesBusiness");
import IBaseController = require("./BaseController");
import IUserModel = require("./../app/model/interfaces/IUserModel");
import IPagesModel = require("./../app/model/interfaces/IPagesModel");
import Common = require("./../config/constants/common");
import IBlastSettingsModel = require("./../app/model/interfaces/IBlastSettingsModel");
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

	getAgents(req: express.Request, res: express.Response): void {
		try {
			var _userBusiness = new UserBusiness();
			var condition: Object = { status: "verified", roles: /agents/ }
			var fields: Object = { firstName: 1, lastName: 1, email: 1, createdOn: 1,lastLogin:1 }
			_userBusiness.retrieveFields(condition, fields, (error, result) => {
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





	getDashboardData(req: express.Request, res: express.Response): void {
		try {
			console.log("test=====");
			var _userBusiness = new UserBusiness();
			var match: Object = { status: 'verified' };
			var group: Object = { _id: '$roles', total: { $sum: 1 } };
			_userBusiness.aggregate("", match, group, (error, result) => {
				if (error) {
					console.log(error);
					res.send({ "error": error });
				}
				else {
					console.log('response', result);
					res.send(result);
				}
			}
			);

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

				//	blastsettings._id = mongoose.ObjectId(id);
				//	blastsettings.per_email_blast_price = req.body.peremailblastprice;
				//	blastsettings.additional_email_blast_price = req.body.additionalemailblastprice;
				blastsettings.modifiedOn = new Date();
				blastsettings._id = mongoose.Types.ObjectId.createFromHexString(blastsettings._id);
				console.log('ffffffffffffff', blastsettings);

				_blastSettingsBusiness.update(id, blastsettings, (error, result) => {
					if (error) {
						console.log("error", error.path);
						res.send({ "error": error });
					}
					else {
						console.log(result);
						res.send({ "success": "success" });
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