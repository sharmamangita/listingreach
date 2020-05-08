/**
 * User related routes
 */

import express = require("express");
import UserController = require("./../../controllers/UserController");

var router = express.Router();
class UserRoutes {
    private _userController: UserController;

    constructor () {
        this._userController = new UserController();
    }
    get routes () {
        var controller = this._userController;
       
        router.get("/users", controller.retrieve);
        
        router.post("/users", controller.create);
        
        
        router.put("/users/:_id", controller.update);
        router.get("/users/:_id", controller.findById);
		router.get("/users-bytoken", controller.findByToken);
        router.get("/users/getEmailExists/:query", controller.getEmailExists);
		router.post("/users/register", controller.register);
		router.post("/users/authenticate", controller.authenticate);
		router.post("/users/verifytoken", controller.verifytoken);
        router.delete("/users/:_id/:_flag", controller.delete);
        router.post("/users/forgetUserPassword", controller.forgetUserPassword);
        router.post("/users/forgetSAdminPassword", controller.forgetSAdminPassword);
        router.post("/users/contactForm",controller.contactForm);
        router.post("/users/deleteprofilepic",controller.deleteprofilepic);
        router.post("/users/deleteprofileCover",controller.deleteprofileCover);  
        router.post("/users/UpdateUserPassword",controller.UpdateUserPassword);
        
        router.post("/users/getReferences", controller.getReferences);
        return router;
    }

}

Object.seal(UserRoutes);
export = UserRoutes;
