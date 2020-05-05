/**
 * inteleagent routes
 */
import express = require('express');
import path = require('path');

import UserRoutes = require('../routes/UserRoutes');
import AdminUserRoutes = require('../routes/AdminUserRoutes');
import CommonRoutes = require('../routes/CommonRoutes');

var app = express();

class Routes {

    get routes() {
        /* api is getting prefixed in the server js file and specific route like applications in the applicationroute file */
        app.use("/", new UserRoutes().routes);
        app.use("/", new AdminUserRoutes().routes);
		app.use("/", new CommonRoutes().routes);
		 return app;
    }
}
export = Routes;