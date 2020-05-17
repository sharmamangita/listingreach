import express = require("express");
import SubscriberController = require("./../../controllers/SubscriberController");

var router = express.Router();
class SubscriberRoutes {

    private _controller: SubscriberController;

    constructor() {
        this._controller = new SubscriberController();
    }
    get routes() {
        var controller = this._controller;
        console.log("in common routes");
        router.get("/subscriber/new", controller.newSubscriber);
        router.post("/subscriber/register", controller.create);
        return router;
    }


}

Object.seal(SubscriberRoutes);
export = SubscriberRoutes;