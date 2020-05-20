import express = require("express");
import SubscriberBusiness = require("../app/business/SubscriberBusiness");
import IBaseController = require("./BaseController");
import ISubscriberModel = require("../app/model/interfaces/ISubscriberModel");
import UserBusiness = require("../app/business/UserBusiness");
class SubscriberController implements IBaseController<SubscriberBusiness> {
	findById: express.RequestHandler;
	getAgentDatabase(req: express.Request, res: express.Response): void {
		var agentBusiness = new UserBusiness();
		const { state } = req.params;
		//console.log(req.params);
		const match = { state: state };
		const group = { _id: "$city", agents: { $sum: 1 } };
		agentBusiness.customaggregate("", match, group, (error, result) => {
			if (error) {
				console.log(error);
				res.send(error);
			} else {
				//	console.log(result)
				res.send({ agentDatabase: result });
			}
		})
	};
	getSubsciberPreferences(req: express.Request, res: express.Response): void {
		var subscriberBusiness = new SubscriberBusiness();
		const { id } = req.params;
		const query = { _id: id };
		const fields: Object = {
			mailingLists: 1,
			agentTypes: 1,
			includeOutsideAreaProperties: 1,
			includeRentedProperties: 1,
			priceRanges: 1,
			propertyTypes: 1
		}
		subscriberBusiness.retrieveFields(query, fields, (error, result) => {
			if (error) {
				console.log(error);
				res.send(error);
			} else {
				//	console.log(result)
				res.send(result);
			}
		})
	};
	create(req: express.Request, res: express.Response): void {

		const subscriber: ISubscriberModel = <ISubscriberModel>req.body;;
		//	console.log(subscriber);
		subscriber.createdOn = new Date();
		var subscriberBusiness = new SubscriberBusiness();
		subscriber.status = "unverified";
		subscriberBusiness.create(subscriber, (error, result) => {
			//	console.log("res",result);
			if (error) {
				res.send(error);
			} else {
				res.send(result);
			}
		})
	};
	update: express.RequestHandler;
	delete: express.RequestHandler;

	retrieve(req: express.Request, res: express.Response): void {
		//this._subscriberBusiness.retrieve()
	}


}
export = SubscriberController;