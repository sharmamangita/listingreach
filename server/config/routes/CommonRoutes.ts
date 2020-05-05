/**
 * User related routes
 */

import express = require("express");
import CommonController = require("./../../controllers/CommonController");

var router = express.Router();
class CommonRoutes {
    private _commonController: CommonController;

    constructor () {
        this._commonController = new CommonController();
    }
    get routes () {
        var controller = this._commonController;
        console.log("in common routes");
		
		
        return router;
    }


}

Object.seal(CommonRoutes);
export = CommonRoutes;