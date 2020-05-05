/**
 * Created by 76East for common and cron functions.
 */

import express = require("express");
var async = require('async');
var moment = require('moment');
import UserBusiness = require("./../app/business/UserBusiness");
import Common = require("./../config/constants/common");

var  mongoose = require('mongoose');
var fs = require('fs');
class CommonController {
    
	 
	download(req: express.Request, res: express.Response): void { 
        try {
            var _userBusiness = new UserBusiness();
			_userBusiness.findOne({_id: req.params.id}, (error, result) => {
		        if(error) {
		            console.log(error);
		            res.send({"error": error});
		        }
		        else {
		        	var file = fs.createReadStream(process.cwd() + '/uploads/invoices/Invoice_'+req.params.id+'.pdf');
				    var stat = fs.statSync(process.cwd() + '/uploads/invoices/Invoice_'+req.params.id+'.pdf');
				    res.setHeader('Content-Length', stat.size);
				    res.setHeader('Content-Type', 'application/pdf');
				    res.setHeader('Content-Disposition', 'inline; filename=Invoice_'+result.invoiceNumber+'.pdf');
				    file.pipe(res);
	            }
		    });
		}
		catch (e)  {
			console.log(e);
			res.send({"error": "error in your request"});
		}
	}
	testEmail(req: express.Request, res: express.Response): void {
		var _userBusiness = new UserBusiness();
		
	}

}
export = CommonController;
