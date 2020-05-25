/**
 * User related routes
 */

import express = require("express");
import AdminUserController = require("./../../controllers/AdminUserController");

var router = express.Router();
class AdminUserRoutes {
    private _adminUserController: AdminUserController;

    constructor() {
        this._adminUserController = new AdminUserController();
    }
    get routes() {
        var controller = this._adminUserController;
        //  router.get("/adminusers/plan",controller.getPlans);
        router.get("/adminusers/blastsettings", controller.getBlastSettings);
        router.put("/adminuser/updateblastsettings", controller.updateBlastSetings);
        router.get("/adminusers/getContent", controller.getContent);
        router.get("/adminusers/agents", controller.getAgents);
        router.get("/adminusers/subscribers", controller.getSubscribers);
        router.get("/adminusers/blasts", controller.getBlasts);
        router.get("/adminuser/sendblast/:id", controller.sendBlast);
        router.put("/adminusers/", controller.update);
        router.delete("/adminusers/:_id", controller.deleteusers);
		router.put("/adminusers/deleteagents/:_id", controller.deleteagents);
        router.get("/userStatus/:_id", controller.userStatus);
        router.get("/adminuser/subscriberstatus/:_id", controller.changeSubscriberStatus);
        router.get("/adminusers/:_id", controller.findById);
        //   router.post("/adminusers/PlanRegister", controller.PlanRegister);
        router.get("/adminusers/counts/:flag", controller.getCount);

        router.get("/adminusers-bytoken", controller.findByToken);
        router.get("/adminusers-get-billing-detail", controller.getBillingDetail);
        router.get("/adminusers/count/:query", controller.count);
        router.post("/adminusers/authenticate", controller.authenticate);
        router.post("/adminusers/verifytoken", controller.verifytoken);
        router.put("/adminusers/change-password", controller.changePassword);
        router.post("/adminusers/updateContent", controller.updateContent);


        return router;
    }


}

Object.seal(AdminUserRoutes);
export = AdminUserRoutes;