import express = require("express");
import SubscriberBusiness = require("../app/business/SubscriberBusiness");
import IBaseController = require("./BaseController");
import SubscriberModel = require("../app/model/SubscriberModel");
import ISubscriberModel = require("../app/model/interfaces/ISubscriberModel");
class SubscriberController implements IBaseController<SubscriberBusiness> {


	findById: express.RequestHandler;
	newSubscriber(req: express.Request, res: express.Response): void {
		var newSubscriber = new SubscriberModel();
		res.send({ subscriber: newSubscriber })
	};
	create(req: express.Request, res: express.Response): void {

		const subscriber:ISubscriberModel = <ISubscriberModel>req.body;;
	//	console.log(subscriber);
		subscriber.createdOn = new Date();
		var subscriberBusiness = new SubscriberBusiness();
		subscriberBusiness.create(subscriber, (error, result) => {
			console.log("res",result);
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