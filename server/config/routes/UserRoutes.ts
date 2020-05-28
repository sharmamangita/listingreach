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
		router.post("/users/emailPreviewTemplate",controller.emailPreviewTemplate);
        router.post("/users/UpdateUserPassword",controller.UpdateUserPassword);
        router.put("/userUpdate", controller.updateUser);
        router.post("/users/getReferences", controller.getReferences);
        router.post("/users/saveAgents",controller.saveAgents);
        router.post("/users/savePayment",controller.savePayment);
        router.get("/users/getPayment/:_id", controller.getPayment);


        /* blast routes */ 
        router.post("/users/selectDatabase",controller.selectDatabase);
        router.post("/users/saveBlast",controller.saveBlast);
        router.post("/users/saveDesignTemplate",controller.saveDesignTemplate);
        router.post("/users/saveProperty",controller.saveProperty);
        router.post("/users/propertyDetail",controller.getTemplateOrPropertydata);
        router.get("/users/getSavedBlast/:agentId",controller.getSavedBlast);
        router.get("/users/deleteSavedBlast/:id",controller.deleteSavedBlast);
        router.post("/users/saveImages",controller.saveImages);
        

        
        return router;
    }

}

Object.seal(UserRoutes);
export = UserRoutes;
