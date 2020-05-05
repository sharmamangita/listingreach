/**
 * api call lands here from routing
 */

import express = require("express");
import AdminUserBusiness = require("./../app/business/AdminUserBusiness");
import EmployeeBusiness = require("./../app/business/EmployeeBusiness");
import UserBusiness = require("./../app/business/UserBusiness");
import PostreviewBusiness = require("./../app/business/PostreviewBusiness");
import PlanBusiness = require("./../app/business/PlanBusiness");
import PagesBusiness = require("./../app/business/PagesBusiness");
import IBaseController = require("./BaseController");
import IAdminUserModel = require("./../app/model/interfaces/IAdminUserModel");
import IPagesModel = require("./../app/model/interfaces/IPagesModel");
import Common = require("./../config/constants/common");
import ISavedCandidatesModel = require("./../app/model/interfaces/ISavedCandidatesModel");
import SavedCandidateBusiness = require("./../app/business/SavedCandidateBusiness");

var  mongoose = require('mongoose'); 
var async = require('async');
class AdminUserController implements IBaseController <AdminUserBusiness> {

	create(req: express.Request, res: express.Response): void {
		console.log("in _user controller->create");
        try {
			var _user: IAdminUserModel = <IAdminUserModel>req.body;
            var _adminUserBusiness = new AdminUserBusiness();
            _adminUserBusiness.create(_user, (error, result) => {
                if(error) {
					console.log("ERROR ON BACKEND CONTROLLER");
					console.log(error);
					res.send({"error": error});
				}
                else res.send({"success": "success"});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
		}
    }

    ////////////////Admin//////////////////////////////////////////

	allcandidate(req: express.Request, res: express.Response): void {
      try {
      	var _userBusiness = new UserBusiness();
		var _employeeBusiness = new EmployeeBusiness();
  	    var _savedCandidateBusiness = new SavedCandidateBusiness();
  	    var _candidates: ISavedCandidatesModel = <ISavedCandidatesModel>req.body;
				
		async.parallel({
			downloadData: function(callback:any) {
				
		        var candidatesAggregate = [
	            {
	                $lookup:                       
	                {
	                    from: "saved_candidates",
	                    localField: "_id",   
	                    foreignField: "user_id",        
	                    as: "saved_candidates"               
	                }
	            },
	            {
          	  		$unwind:"$saved_candidates"
            	},
            	{
	                $lookup:                       
	                {
	                    from: "employees",
	                    localField: "_id",   
	                    foreignField: "userId",        
	                    as: "employees"               
	                }
	            },
	            {
	                $project:                       
	                {    
	                    "_id":1,
	                    "firstName":1,
	                    "lastName":1,
	                    "companyName":1,
	                    "employees.profilePic":1,
	                    "saved_candidates.user_id":1,
	                    "saved_candidates.candidate_id":1,
	                    "saved_candidates.viewed":1,
	                    "saved_candidates.downloaded":1,
	                    "saved_candidates.amount":1
	                    
	                    
				    }
	            }
	        ]
	        _userBusiness.aggregate( candidatesAggregate, (error:any, result:any) => {
	       		if(error) {
					res.send({"error": error});
				}
				else {
					var returnObj = result.map(function(obj: any): any {
					return {
				        id: obj._id,
				        firstName:obj.firstName,
				        lastName:obj.lastName,
				        profilePic:obj.employees.profilePic,
				        companyName:obj.companyName,
				        saved:obj.saved_candidates.saved,
				        viewed:obj.saved_candidates.viewed,
				        downloaded:obj.saved_candidates.downloaded,
				        amount:obj.saved_candidates.amount


				    }
		   		});
				callback(null,returnObj);
	    		}
			});
			},
			
			userData: function(callback:any) {
				
				var employeeAggregate = [
	                {
	                    $lookup:                       
	                    {
	                        from: "employees",
	                        localField: "_id",   
	                        foreignField: "userId",        
	                        as: "employees"               
	                    }
	                },
	                {
		          	  	$unwind:"$employees"
		            
		          	},
	                {
	                    $project:                       
	                    {    
	                        "_id":1,
	                        "firstName":1,
	                        "lastName":1,
	                        "middleName":1,
	                        "email":1,
	                        "roles":1,
	                        "status":1,
	                        "paidOn":1,
	                        "amount":1,
	                        "companyName":1,
	                        "createdOn":1,
	                        "lastLogin":1,
	                        "previouscompanyName":1,
	                        "employees.strengths":1,
	                        "employees.improvements":1,
	                        "employees.summary":1,
	                        "employees.profilePic":1,
	                        "employees.profileCover":1,
	                        "employees.education":1,
	                        "employees.alternateEmail":1,
	                        "employees.dateofBirth":1,
	                        "employees.currentSalary":1,
	                        "employees.gender":1,
	                        "employees.expectedSalary":1,
	                        "employees.currentlyEmployed":1,
	                        "employees.openRelocation":1,
	                        "employees.openTravel":1,
	                        "employees.sponsorshipRequired":1,
	                        "employees.authorization":1,
	                        "employees.felony":1,
	                        "employees.phone":1,
	                        "employees.alternateMobile_number":1,
	                        "employees.currentaddress":1,
	                        "employees.permanentaddress":1,
	                        "employees.defoultsocial_media":1,
	                        "employees.skills":1,
	                        "employees.experienceYear":1,
	                        "employees.experienceMonth":1,
	                        "employees.social_media":1,
	                        "employees.professionalSummary":1,
	                        "employees.totaloverall":1
					    }
	                },
	                {
	                    $match:
	                    {
	                        'roles':  req.params._flag
	                       
	                    }
	                }
	            ]

	            _userBusiness.aggregate( employeeAggregate, (error:any, result:any) => {
	                if(error) {
	                    console.log('Error: manager case:', error);
	                }
	                else { 
	                	var returnObj = result.map(function(obj: any): any {
							var experienceYear = 0;
							var experienceMonth=0;
							if(obj.employees.experienceYear){
								experienceYear = obj.employees.experienceYear;
							}
							if(obj.employees.experienceMonth){
								experienceMonth=obj.employees.experienceMonth
							}
				            return {
						        id: obj._id,
						        firstName:obj.firstName,
						        lastName:obj.lastName,
						        middleName:obj.middleName,
						        email:obj.email,
						        roles:obj.roles,
						        paidOn:obj.paidOn,
						        amount:obj.amount,
						        status:obj.status,
						        createdOn:obj.createdOn,
						        lastLogin:obj.lastLogin,
						        companyName:obj.companyName,
						        previouscompanyName:obj.previouscompanyName,
						        alternateEmail: obj.employees.alternateEmail,
						        summary: obj.employees.summary,
						        profilePic: obj.employees.profilePic,
						        profileCover: obj.employees.profileCover,
						        education:obj.employees.education,
						        dateofBirth:obj.employees.dateofBirth,
						        currentSalary:obj.employees.currentSalary,
						        expectedSalary:obj.employees.expectedSalary,
		                        currentlyEmployed:obj.employees.currentlyEmployed,
		                        openRelocation:obj.employees.openRelocation,
		                        openTravel:obj.employees.openTravel,
		                        sponsorshipRequired:obj.employees.sponsorshipRequired,
		                        felony:obj.employees.felony,
		                        phone:obj.employees.phone,
		                        gender:obj.employees.gender,
		                        alternateMobile_number:obj.employees.alternateMobile_number,
		                        currentaddress:obj.employees.currentaddress,
		                        permanentaddress:obj.employees.permanentaddress,
		                        defoultsocial_media:obj.employees.defoultsocial_media,
		                        skills:obj.employees.skills,
		                        authorization:obj.employees.authorization,
						        experienceMonth:experienceMonth,
						        experienceYear:experienceYear,
						        social_media:obj.employees.social_media,
						        professionalSummary:obj.employees.professionalSummary,
						        strengths:obj.employees.strengths,
						        improvements:obj.employees.improvements,
						        totaloverall:obj.employees.totaloverall
						        
						    }
			   			});
			   			callback(null,returnObj);
	                }
	            });
			}
			}, function(err:any, results:any) {
					if(err){
						res.send({"error": "error"});
					}
					console.log("results111====",results);
					res.json({"status":"success","data":results});
			});
	       
		}
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
		}

    }

    deleteusers(req: express.Request, res: express.Response): void {
    	var _id: string = req.params._id;

	    try {
	    	    var _userBusiness = new UserBusiness();
	            _userBusiness.delete( _id, (error, result) => {    
	            if(error){
	            	res.send({"error": "error"});
	            }else{
	            	console.log(result);
	            	res.send({"success": "success"});
	            } 

	           });	
	      }

	    catch (e)  {

            console.log(e);
            res.send({"error": "error in your request"});
        }

    }
	
	userStatus(req: express.Request, res: express.Response): void {
    	var uid: string = req.params._id;
       // console.log("uid============>",uid)
	    try {
	    	    var _userBusiness = new UserBusiness();
	            _userBusiness.findOne( {"_id":uid}, (error, result) => {    
	            if(error){
	            	res.send({"error": "error"});
	            }else{
	            	var _user: IUserModel = <IUserModel>req.body;
	            	if(result.status=="verified"){
                     _user.status ="unverified";
                      _userBusiness.update(uid, _user, (error:any, resultUpdate:any) => {
                       if(error){
	            	      res.send({"error": "error"});
	                   }else{
	            	      res.send({"success": "success"});
	                    } 
                      })
	            	}
	            	else{
	            	  _user.status ="verified";
                      _userBusiness.update(uid, _user, (error:any, resultUpdate:any) => {
                       if(error){
	            	      res.send({"error": "error"});
	                   }else{
	            	      res.send({"success": "success"});
	                    } 
                      })

	            	}
	            } 
		    });	
	    }

	    catch (e)  {

            console.log(e);
            res.send({"error": "error in your request"});
        }

    }

    PlanRegister(req: express.Request, res: express.Response): void {
        try {
            var user :any =[];
            var plan: IPlanModel = <IPlanModel>req.body.user;
			
            plan.createdOn = new Date();
            plan.plan=req.body.user.plan;
            plan.plan_name = "basic";
            var planBusiness = new PlanBusiness();
			planBusiness.retrieve({'plan_name':'basic'},(error,result) => {    
            	if(error){
            		res.send({"error": "error"});
            	} 
            	else {
        		if(result.length>0){
            		console.log("plan====",plan);
            		planBusiness.update(result[0]._id,plan, (error, result) => {
	                if(error) {
                		res.send({"error": "error"});
	                } 
	                else {
	                	res.send({"success": "success"});
	                }
	             });
            	} else{
            		console.log("user====",plan);
            		planBusiness.create(plan, (error, userdata) => {
		                if (error) {
		                    console.log("error====", error);
		                    
		                } else {
		                   console.log("userdata==",userdata);
		                   res.send({"success":userdata});
		                }
					});  
            	}
		 	}
			});  
       
        } catch (e) {
            console.log(e);
            res.send({
                "error": "error in your request"
            });

        }

    }
    
    getPlans(req: express.Request, res: express.Response): void {
    	//console.log("daatat");
	        try {
	    	    var _planBusiness = new PlanBusiness();
	            _planBusiness.retrieve({'plan_name':'basic'},(error,result) => {    
		            if(error){
		            	res.send({"error": "error"});
		            }else{
		            	res.send(result);
		            	//console.log("get all data plans",result);
		            } 
	            });	
	        }
	        catch (e)  {

              console.log(e);
              res.send({"error": "error in your request"});
            }

    }
   
    getDashboardData(req: express.Request, res: express.Response): void {
      try {
      		console.log("test=====");
        	var _userBusiness = new UserBusiness();
			var _employeeBusiness = new EmployeeBusiness();
			var _candidates: ISavedCandidatesModel = <ISavedCandidatesModel>req.body;
			var _savedCandidateBusiness = new SavedCandidateBusiness();
			var _postreviewBusiness = new PostreviewBusiness();
		       
			async.parallel({
			userData: function(callback:any) {
				
				_userBusiness.retrieve({},(error,result) => {    
			        if(error){
			         }
			        else{
			        	callback(null,result);
			        }
			    })
			},
			saveddocumentData: function(callback:any) {
				_savedCandidateBusiness.retrieve({},(error,result) => {    
			        if(error){
			         }
			        else{
			        	callback(null,result);
			        }
			    })
			},
			employeedata: function(callback:any) {
				var employeeAggregate = [
	                {
	                    $lookup:                       
	                    {
	                        from: "employees",
	                        localField: "_id",   
	                        foreignField: "userId",        
	                        as: "employees"               
	                    }
	                },
	                {
		          	  	$unwind:"$employees"
		            
		          	},

		          	{
	                    $lookup:                       
	                    {
	                        from: "postreviews",
	                        localField: "_id",   
	                        foreignField: "userId",        
	                        as: "postreviews"               
	                    }
	                },


	                {
	                    $project:                       
	                    {    
	                        "_id":1,
	                        "firstName":1,
	                        "lastName":1,
	                        "middleName":1,
	                        "email":1,
	                        "roles":1,
	                        "status":1,
	                        "paidOn":1,
	                        "companyName":1,
	                        "createdOn":1,
	                        "previouscompanyName":1,
	                        "postreviews.overall":1,
	                        "employees.strengths":1,
	                        "employees.improvements":1,
	                        "employees.resume":1,
	                        "employees.summary":1,
	                        "employees.profilePic":1,
	                        "employees.profileCover":1,
	                        "employees.education":1,
	                        "employees.alternateEmail":1,
	                        "employees.dateofBirth":1,
	                        "employees.currentSalary":1,
	                        "employees.gender":1,
	                        "employees.expectedSalary":1,
	                        "employees.currentlyEmployed":1,
	                        "employees.openRelocation":1,
	                        "employees.openTravel":1,
	                        "employees.sponsorshipRequired":1,
	                        "employees.authorization":1,
	                        "employees.felony":1,
	                        "employees.phone":1,
	                        "employees.alternateMobile_number":1,
	                        "employees.currentaddress":1,
	                        "employees.permanentaddress":1,
	                        "employees.defoultsocial_media":1,
	                        "employees.skills":1,
	                        "employees.experienceYear":1,
	                        "employees.experienceMonth":1,
	                        "employees.social_media":1,
	                        "employees.professionalSummary":1,
	                       
	                    }
	                },
	                {
	                    $match:
		                { 
		                	$and:[{roles:'candidate'},{status:'verified'}]
		                }
	                }
	            ]
	            
				_userBusiness.aggregate( employeeAggregate, (error:any, result:any) => {
	                if(error) {
	                    console.log('Error: manager case:', error);
	                }
	                else { 
	                	var returnObj = result.map(function(obj: any): any {

				      		console.log("obj.postreviews====",obj.postreviews);
				            return {
						        id: obj._id,
						        firstName:obj.firstName,
						        lastName:obj.lastName,
						        middleName:obj.middleName,
						        email:obj.email,
						        paidOn:obj.paidOn,
						        roles:obj.roles,
						        status:obj.status,
						        createdOn:obj.createdOn,
						        companyName:obj.companyName,
						        previouscompanyName:obj.previouscompanyName,
						        alternateEmail: obj.employees.alternateEmail,
						        summary: obj.employees.summary,
						        profilePic: obj.employees.profilePic,
						        postreviews:obj.postreviews && obj.postreviews,
						        profileCover: obj.employees.profileCover,
						        education:obj.employees.education,
						        dateofBirth:obj.employees.dateofBirth,
						        currentSalary:obj.employees.currentSalary,
						        expectedSalary:obj.employees.expectedSalary,
		                        currentlyEmployed:obj.employees.currentlyEmployed,
		                        openRelocation:obj.employees.openRelocation,
		                        openTravel:obj.employees.openTravel,
		                        sponsorshipRequired:obj.employees.sponsorshipRequired,
		                        felony:obj.employees.felony,
		                        phone:obj.employees.phone,
		                        gender:obj.employees.gender,
		                        resume:obj.employees.resume,
		                        alternateMobile_number:obj.employees.alternateMobile_number,
		                        currentaddress:obj.employees.currentaddress,
		                        permanentaddress:obj.employees.permanentaddress,
		                        defoultsocial_media:obj.employees.defoultsocial_media,
		                        skills:obj.employees.skills,
		                        authorization:obj.employees.authorization,
						        experienceMonth:obj.employees.experienceMonth,
						        experienceYear:obj.employees.experienceYear,
						        social_media:obj.employees.social_media,
						        professionalSummary:obj.employees.professionalSummary,
						        strengths:obj.employees.strengths,
						        improvements:obj.employees.improvements,


						        
						    }
			   			});
			   			// console.log('Error: manager case:', returnObj);
			   			callback(null,returnObj);
	                }
	            });
			
			},
			}, function(err:any, results:any) {
					if(err){
						res.send({"error": "error"});
					}
					console.log("results=1====",results.employeedata);
					res.json({"status":"success","data":results});
			});
	       
		}
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
		}

    }


    update(req: express.Request, res: express.Response): void {
		console.log("in _user controller->update");
        try {
            var _user: IAdminUserModel = <IAdminUserModel>req.body;
			var getValue = req.body;
			var _adminUserBusiness = new AdminUserBusiness();
			_adminUserBusiness.verifyToken(req, res, (adminUserData) => {
				
				if(getValue.oldPassword && getValue.oldPassword != "") {
					if(adminUserData.password == getValue.oldPassword) {
						
						var _id: string = req.body;
						_adminUserBusiness.update(_id, _user, (error, result) => {
			                if(error) {
		                		res.send({"error": "error"});
			                } 
			                else {
			                	res.send({"success": "success"});
			                }
		            	});
	            	} else {
	            		res.status(400);
	            		res.send({"error": "oldPasswordNotSame"});
	            	}
				}
        	});
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
        }
    }
    retrieve(req: express.Request, res: express.Response): void {
        try {
			var _adminUserBusiness = new AdminUserBusiness();
            _adminUserBusiness.verifyToken(req, res, (adminUserData) => {
				_adminUserBusiness.retrieve(req.body, (error, result) => {
					if(error) res.send({"error": "error"});
					else res.send(result);
				});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
		}
    }
    findById(req: express.Request, res: express.Response): void {
        try {
			var _adminUserBusiness = new AdminUserBusiness();
            _adminUserBusiness.verifyToken(req, res, (adminUserData) => {
				var _id: string = req.params._id;
				_adminUserBusiness.findById(_id, (error, result) => {
					if(error) res.send({"error": "error"});
					else res.send(result);
				});
            });
            
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
		}
    }
	
	findByToken(req: express.Request, res: express.Response): void {
		var _adminUserBusiness = new AdminUserBusiness();
		_adminUserBusiness.verifyToken(req, res, (adminUserData) => {
			res.send(adminUserData);
		});
    }
	
	authenticate(req: express.Request, res: express.Response): void {
        try {
            var _user: IAdminUserModel = <IAdminUserModel>req.body;
			//set the createdon to now
            var _adminUserBusiness = new AdminUserBusiness();
            _adminUserBusiness.findOne({email: _user.email}, (error, result) => {
                if(error) res.send({"error": "error"});
                else {
					if(result && result.password && result.password==_user.password) {
						if(!result.isActive) {
							return res.status(401).send({"error": "Your account is not active. Please contact admin."});
						} else {
							var token = _adminUserBusiness.createToken(result);
							var _updateData: IAdminUserModel = <IAdminUserModel>req.body;
							_updateData.lastLogin = new Date();
							_updateData.token = token;
							var _id: string = result._id.toString();
							var _userBusinessUpdate = new AdminUserBusiness();
							_userBusinessUpdate.update(_id, _updateData, (error, resultUpdate) => {
								if(error) res.send({"error": "error", "message": "Authentication error"});//res.status(401).send({"error": "Authentication error"});
								else {
									res.send({
										userId: result._id,
										email: result.email,
										firstName: result.firstName,
										lastName: result.lastName,
										permissions: 'S',
										token: token
									});
								}
							});
						}
					} else {
						return res.status(401).send({"error": "The username or password don't match"});
					}
				}
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }

    changePassword(req: express.Request, res: express.Response): void {
        try {
            var _user: IAdminUserModel = <IAdminUserModel>req.body;
			var getValue = req.body;
			var _adminUserBusiness = new AdminUserBusiness();
			_adminUserBusiness.verifyToken(req, res, (adminData) => {
				if(getValue.oldpassword && getValue.oldpassword != "") {
					if(adminData.password == getValue.oldpassword) {
						var _id: string = adminData._id;
						_adminUserBusiness.update(_id, _user, (error, result) => {
			                if(error) {
		                		res.send({"error": "error"});
			                } 
			                else {
		                		res.send({"success": "success"});
			                }
		            	});
	            	} else {
	            		res.status(400);
	            		res.send({"error": "oldPasswordNotSame"});
	            	}
				}
        	});
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
        }
    }


    getBillingDetail(req: express.Request, res: express.Response): void {
        
    }

	
	verifytoken(req: express.Request, res: express.Response): void {
		var _adminUserBusiness = new AdminUserBusiness();
		_adminUserBusiness.verifyToken(req, res, (adminUserData) => {
			res.status(201).send({
				token: "valid"
			});
		});
    }

	//tbd split the incoming query to be {a:b} instead of a=b
	count(req: express.Request, res: express.Response): void {
		try {
			var query: string = req.params.query;
			var _adminUserBusiness = new AdminUserBusiness();
			_adminUserBusiness.count(query, (error, result) => {
				if(error){
					console.log(error);
					res.send({"error": "error"});
				}
				else {
					res.send(result)
				};
			});
		}
		catch (e)  {
			console.log(e);
			res.send({"error": "error in your request"});

		}
	}
	delete(req: express.Request, res: express.Response): void {
        try {
			var _id: string = req.params._id;
            var _adminUserBusiness = new AdminUserBusiness();
            _adminUserBusiness.verifyToken(req, res, (adminUserData) => {
				_adminUserBusiness.delete(_id, (error, result) => {
					if(error) res.send({"error": "error"});
					else res.send({"success": "success"});
				});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
		}
    }

    updateContent(req: express.Request, res: express.Response): void {
        try {
			var _pages: IPagesModel = <IPagesModel>req.body;
			var _pagesBusiness = new PagesBusiness(); 
			 _pagesBusiness.findOne( {"page":_pages.page}, (error, result) => {    
	            if(error){
	            	res.send({"error": "error"});
	            } else { 
	            	console.log(result);
	            	if(result){
	            		_pagesBusiness.update(result._id, _pages, (error:any, resultUpdate:any) => {
                       		if(error){
            	     			 res.send({"error": "error"});
              			 	}else{
	                  			_pagesBusiness.retrieve({},(error,result) => { 
					            if(error){
						            	res.send({"error": "data"});
						            }else{
						            	res.send(result);
						            } 
					            });	
	                    	} 
                      	});	
			       	} else { 
					   _pagesBusiness.create(_pages, (error, result) => {
					        if(error) {
										console.log("ERROR ON BACKEND CONTROLLER");
										console.log(error);
										res.send({"error": error});
							}
					            else res.send({"success": "inserted success"});
					    });
	            	}
	            }
	        });    	
        
            
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
		}
    }


	getContent(req: express.Request, res: express.Response): void {
       // console.log("req.body----",req.body);
        try {
            var _pagesBusiness = new PagesBusiness();
            _pagesBusiness.retrieve(req.body,(error,result) => { 
             if(error){
	            	res.send({"error": "data"});
	            }else{
	            	res.send(result);
	            	console.log("get page data ==== ",result);
	            } 
            });	
        }
        catch (e)  {

          console.log(e);
          res.send({"error": "error in your request"});
        }
	}    
}
export = AdminUserController;