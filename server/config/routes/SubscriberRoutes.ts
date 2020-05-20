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
        router.post("/subscriber/register", controller.create);
        router.get("/subscriber/getagentdatabase/:state",controller.getAgentDatabase)
        router.get("/subscriber/preferences/:id",controller.getSubsciberPreferences)
        return router;
    }


}

Object.seal(SubscriberRoutes);
export = SubscriberRoutes;