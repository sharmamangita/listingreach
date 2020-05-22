/**
 * api call lands here from routing
 */

import express = require("express");
import UserBusiness = require("./../app/business/UserBusiness");



import PagesBusiness = require("./../app/business/PagesBusiness");

import IBaseController = require("./BaseController");
import IUserModel = require("./../app/model/interfaces/IUserModel");
import IPagesModel = require("./../app/model/interfaces/IPagesModel");
import AdminUserBusiness = require("./../app/business/AdminUserBusiness");
import ContactformBusiness = require("./../app/business/ContactformBusiness");
import BlastBusiness = require("./../app/business/BlastBusiness");
import PropertyBusiness = require("./../app/business/PropertyBusiness");
import PaymentBusiness = require("./../app/business/PaymentBusiness");
import IPaymentModel = require("./../app/model/interfaces/IPaymentModel");

import AgentTemplateBusiness = require("./../app/business/AgentTemplateBusiness");

import InvitationBusiness = require("./../app/business/InvitationBusiness");
import IAdminUserModel = require("./../app/model/interfaces/IAdminUserModel");
import IContactformModel = require("./../app/model/interfaces/IContactformModel");
import IBlastModel = require("./../app/model/interfaces/IBlastModel");
import IPropertyModel = require("./../app/model/interfaces/IPropertyModel");


import IAgentTemplateModel = require("./../app/model/interfaces/IAgentTemplateModel");

import IInvitationModel = require("./../app/model/interfaces/IInvitationModel");
import Common = require("./../config/constants/common");
import PlanBusiness = require("./../app/business/PlanBusiness");
import AgentBusiness = require("./../app/business/AgentBusiness");
import IAgentModel = require("./../app/model/interfaces/IAgentModel");
import IBlastImageModel = require("./../app/model/interfaces/IBlastImageModel");
import BlastImageBusiness = require("./../app/business/BlastImageBusiness");

var moment = require('moment');
var mammoth = require("mammoth");
const fs = require('fs');

var _          = require('underscore');
var  mongoose = require('mongoose'); 
var async = require('async');
var base64Img = require('base64-img');
var stripe = require("stripe")(Common.STRIPESECRETKEY);
class UserController implements IBaseController<UserBusiness> {
	update: express.RequestHandler;
 	//being called by client getEmailExists
	getEmailExists(req: express.Request, res: express.Response): void {
		try {
			var query: string = req.params.query;
			var _userBusiness = new UserBusiness();
			_userBusiness.count({'email':{$regex : "^" + (query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')) + "$", $options: "i"}}, (error, result) => {
				if(error){
					console.log(error);
					
					res.send({"error": "error"});
				}
				else {
					res.send(JSON.stringify(result))
				};
			});
		}
		catch (e)  {
			console.log(e);
			res.send({"error": "error in your request"});

		}
	}
	register(req: express.Request, res: express.Response): void {
		 try {
            var user: IUserModel = < IUserModel > req.body.user;
            user.createdOn = new Date();
           
			user.password = req.body.user.password;
            user.firstName=req.body.user.firstName.toLowerCase();
            user.roles='agents';
            user.lastName=req.body.user.lastName.toLowerCase();
            user.paidOn= false;
            var userBusiness = new UserBusiness();
            var token = userBusiness.createToken(user);

            userBusiness.create(user, (error, userdata) => {
                if (error) {
                    console.log("error==sss==", error);
                    res.send({
                        "error": error
                    });
                } else {
                   
                    var signupemailtemplatetouser = Common.SIGNUP_EMAIL_TEMPLATE_TO_REGISTERED_USER;
                    var emailtemplate = signupemailtemplatetouser.replace(/#email#/g, userdata.email).replace(/#password#/g, userdata.password);
                     Common.sendMail(userdata.email, Common.ADMIN_EMAIL, 'Welcome to ListingReach!', null, emailtemplate, function(error: any, response: any) {
                        if (error) {
                            console.log(error);
                            res.send("error");
                        }else{
                        	res.send({ "success": "success"});
                        }
                    }); 
                }
            });
        } catch (e) {
            console.log(e);
            res.send({
                "error": "error in your request"
            });

        }

    }
	authenticate(req: express.Request, res: express.Response): void {
        try {
            var _user: IUserModel = <IUserModel>req.body;
			//set the createdon to now
            var _userBusiness = new UserBusiness();
            _userBusiness.findOne({email: _user.email}, (error, result) => {
                if(error) res.send({"error": "error"});
                else {
                	
					if(result && result.password && result.password==_user.password ) {
						if(result.status=='unverified') {
							return res.status(401).send({"error": "Your account is not active. Please contact admin."});
						} else {
							var token = _userBusiness.createToken(result);
							var _updateData: IUserModel = <IUserModel>req.body;
							_updateData.lastLogin = new Date();
							_updateData.token = token;
							var _id: string = result._id.toString();
							var _userBusinessUpdate = new UserBusiness();
							_userBusinessUpdate.update(_id, _updateData, (error, resultUpdate) => {
								if(error) res.send({"error": "error", "message": "Authentication error"});//res.status(401).send({"error": "Authentication error"});
								else {
									console.log("here i am login ")
									res.send({
										userId: result._id,
										email: result.email,
										firstName: result.firstName,
										lastName: result.lastName,
										token: token,
										roles:result.roles
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
    create(req: express.Request, res: express.Response): void {
        try {
        	var _userBusiness = new UserBusiness();
        	_userBusiness.verifyToken(req, res,  (userData) => { 
				var _user: IUserModel = <IUserModel>req.body;
				
				_user.createdOn = new Date();
	            var _userBusiness = new UserBusiness();
	            _userBusiness.create(_user, (error, result) => {
	                if(error) {
						console.log(error);
						res.send({"error": error});
					}
	                else res.send({"success": "success"});
	        	}); 
	        });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
		}
    }
   


updateStatus(req: express.Request, res: express.Response): void {
	try {
		
       
	} catch (e)  {
	    console.log(e);
	    res.send({"error": "error in your request"});
	}

}


updateUser(req: express.Request, res: express.Response): void {
	try {
		var _userBusiness = new UserBusiness();
		_userBusiness.verifyToken(req, res,  (UserData:any) => {
			var _user: IUserModel = <IUserModel>req.body.user;
			var _id:string = _user.id.toString();
			_userBusiness.update(mongoose.Types.ObjectId(_id), _user, (error:any, userdata:any) => {
				 if(error) {
					console.log(error);
					res.send({"error": error});
				}
	            else{
	            	var _agentBusiness = new AgentBusiness()
		        		async.parallel({
							agentData: function(callback:any) {
								
								_agentBusiness.findOne({'userId':_id},(error,agentdata) => {    
							        if(error){
							         }
							        else{
							        	callback(null,agentdata);
							        }
							    })
							},
							userData: function(callback:any) {
					        	_userBusiness.retrieve({_id:_id}, (error, result) => {
					        		var returnObj = result.map(function(obj: any): any {
						      		
						            return {
								        id: obj._id,
								        userName:obj.userName,
								        firstName:obj.firstName,
								        lastName:obj.lastName,
								        status:obj.status,
								        email:obj.email,
								        companyName:obj.companyName,
								        phone:obj.phone,
								        city:obj.city,
								        zipcode:obj.zipcode,
								        roles:obj.roles
								       
								    }
					   			});
					   			callback(null,returnObj);
					        	});
							}
						}, function(err:any, results:any) {
							if(err){
								res.send({"error": "error"});
							}
							res.json({"status":"success","data":results});
						});
					
	            	
	        	}
	       	}); 
		    
	    });
	}
	catch (e)  {
	    console.log(e);
	    res.send({"error": "error in your request"});
	}
}
 

    updateprofilepic(data:any,id:any, res: express.Response,flag:any): void {
    	var _agentBusiness= new AgentBusiness();
    	var _agent: IAgentModel = <IAgentModel >data;
    	_agent.createdOn = new Date();
    	var type= data.mimetype.split("/");
 	 	var userid:string = id.toString();
		var _id=userid;
		_agent.userId=userid;
		console.log("userId=====",flag);
		if(flag == 'logo'){
			_agent.logo_url=data.filename;
		}
		else{
			_agent.image_url=data.filename;
		}
		_agentBusiness.findOne({'userId':userid}, (error:any, agentresult:any) => {
			if(agentresult!=null){
				var _id:string = agentresult._id.toString();
				_agentBusiness.update(_id, _agent, (error:any, resultUpdate:any) => {
					if(error){
					}else {
						return res.json({profileimg:agentresult.profilePic});
					}
				});
			}else{
				console.log("_agent=====",_agent);
				_agentBusiness.create(_agent, (error, agentresultData) => {
					if(error){
					}else {
					   return res.json({profileimg:agentresultData.image_url});
					}
				});
			}
			
		});
			
    }



   
  
    
    
	
	
    delete(req: express.Request, res: express.Response): void {
    	try {
		
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
        }

    }
    retrieve(req: express.Request, res: express.Response): void {
    	 try {
			var _userBusiness = new UserBusiness();
            _userBusiness.verifyToken(req, res, (userData) => {
				_userBusiness.retrieve(req.body, (error, result) => {
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
        	var _userBusiness = new UserBusiness();
        	var _agentBusiness = new AgentBusiness()
        	var _balstimageBusiness = new BlastImageBusiness()
        	_userBusiness.verifyToken(req, res, (userdata) => {
        		async.parallel({
					agentData: function(callback:any) {
						
						_agentBusiness.retrieve({'userId':userdata.id},(error,agentdata) => {    
					        if(error){
					         }
					        else{
					        	var returnObjagent = agentdata.map(function(obj: any): any {
				      			    return {
								        id: obj._id,
								        name:obj.name,
								        email:obj.website_url,
								        designation:obj.designation,
								        website_url:obj.website_url,
								        phone_number:obj.phone_number,
								        company_details:obj.company_details,
								        other_information:obj.other_information,
								        image_url:obj.image_url,
								        logo_url:obj.logo_url
								   }
			   					});
					        	callback(null,returnObjagent);
					        }
					    })
					},
					imageData: function(callback:any) {
						
						_balstimageBusiness.retrieve({'user_id':userdata.id},(error,imagedata) => {    
					        if(error){
					         }
					        else{
					        	var returnObjimage = imagedata.map(function(obj: any): any {
				      			    return {
								        id: obj._id,
								        url:obj.url,
								        
								   }
			   					});
					        	callback(null,returnObjimage);
					        }
					    })
					},
					userData: function(callback:any) {
			        	_userBusiness.retrieve({_id:userdata.id}, (error, result) => {
			        		var returnObj = result.map(function(obj: any): any {
				      		
					            return {
							        id: obj._id,
							        userName:obj.userName,
							        firstName:obj.firstName,
							        lastName:obj.lastName,
							        status:obj.status,
							        email:obj.email,
							        companyName:obj.companyName,
							        phone:obj.phone,
							        city:obj.city,
							        zipcode:obj.zipcode,
							        roles:obj.roles,
							       state:obj.state
							    }
			   				});
			   			callback(null,returnObj);
			        	});
					}
				}, function(err:any, results:any) {
					if(err){
						res.send({"error": "error"});
					}
					res.json({"status":"success","data":results});
				});
			});
		}
        catch (e)  { 
            console.log(e);
            res.send({"error": "error in your request"});
		}
    }
	
	findByToken(req: express.Request, res: express.Response): void {
		var _userBusiness = new UserBusiness();
		_userBusiness.verifyToken(req, res, (UserData) => {
			res.send(UserData);
		});
    }
	
	
    
    contactForm(req: express.Request, res: express.Response): void { 
		try {
			var _contactform: IContactformModel = <IContactformModel>req.body;
			var _contactformBusiness = new ContactformBusiness();
			_contactform.fullname =req.body.fullname;
			_contactform.email = req.body.email;
			_contactform.phone = req.body.phone;
			_contactform.message = req.body.message;
			_contactform.createdOn = new Date();
			_contactformBusiness.create(_contactform, (error, result) => {
				if(error) {
					console.log(error);
					res.send({"error=========": error});
				} else {
					var contactFormemail =Common.CONTACT_FORM;	
					var emailtemplate = contactFormemail.replace(/#fullname#/g,_contactform.fullname).replace(/#email#/g,_contactform.email).replace(/#phone#/g,_contactform.phone).replace(/#message#/g,_contactform.message) .replace(/#date#/g,_contactform.createdOn);
					Common.sendMail(_contactform.email,'support@ListingReach.com','Contact Form', null,emailtemplate, function(error: any, response: any){ 
					if(error){ 
					console.log(error);
					res.end("error");
					}
					});
					res.status(201).send({ "success":"done" }); 
				}
			});
		}  catch (e)  {
			console.log(e);
			res.send({"error": "error in your request"});
		}
	}    
	
emailPreviewTemplate(req: express.Request, res: express.Response): void { 
		try { 
			

			var _propertyData: IPropertyModel = <IPropertyModel>req.body;
			console.log("propertyDetails====",_propertyData);
			let property =  _propertyData.propertyDetails;
			var _contactformBusiness = new ContactformBusiness();
			property.email = req.body.email;
			var _propertyformsEmail = {};

			let subject =  property[0].templates[0].email_subject;
			let formLine = property[0].templates[0].from_line;
			let formReply = property[0].templates[0].address;
			let headline  = property[0].templates[0].headline;

			

			let agentData = property[0].agentData[0]; 

		if(property && property.length>1){
			var html = '';
			property.forEach(function(proDta){	
						html += `<div class="flyer-bg" style="background: #f1f1f1;">
			                     <div class="row" style="display: block;display: flex;flex-wrap: wrap;border-top: 2px solid #ccc;">
			                        <div style="width:50%;display: block; background:#f1f1f1;height: 400px;">
			                           <img src="http://66.235.194.119/listingreach/img/img4.jpg" alt="image" style="width:100%;height: 400px;">
			                        </div>`;
						html += `<div style="width:50%;display: block; background:#f1f1f1; height: 400px;">
			                           <div class="row" style="display: flex;flex-wrap: wrap;">
			                              <div style="width:100%;margin-bottom: 1rem !important; margin-left: 1rem !important;margin-top: 1rem !important;">
			                                 <h4 style=" background: #f1f1f1;font-size: 1.5rem;margin-top: 0;
			                                    margin-bottom: 1rem;">Price: ${proDta.price} per Square Foot</h4>
			                              </div>
			                              <div class="ml-3" style="width:100%; margin-left: 1rem !important;">
			                                 <label class="flyer-label" style="color: #EE8C3A;
			                                    font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">Key Features:</label>
			                                 <ul>
			                                    <li>Property Type: ${proDta.property_type}  </li>
			                                    <li>Property Style: ${proDta.property_style}  </li>
			                                    <li> ${proDta.number_bedrooms} Bedrooms</li>
			                                    <li>${proDta.number_bathrooms[0].full} Full ${proDta.number_bathrooms[0].half} Half Bathrooms</li>
			                                    <li>1 Full +2 Half Bathrooms</li>
			                                    <li>${proDta.building_size} square feet</li>
			                                    <li>${proDta.price}  /sqft</li>
			                                    <li>Lot Size: ${proDta.lot_size} sqft</li>
			                                    <li>  Built ${proDta.year_built} </li>
			                                    <li>${proDta.garageSize} Garage</li>
			                                    <li> ${proDta.number_stories} </li>
			                                 </ul>
			                              </div>
			                           </div>
			                        </div>
			                     </div>`;
						html += `<div class="flyer-bg" style="background: #f1f1f1;border-bottom: 2px solid #ccc; padding-top:30px;">
			                        <div class="row">
			                           <div class="mt-3 text-center" style="width:100%;margin-top: 1rem !important;text-align: center !important;">
			                              <label class="flyer-label" style="color: #EE8C3A;
			                                 font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">Property Address:</label>
			                              <p>${proDta.street_address}, ${proDta.city}, ${proDta.zipcode}</p>
			                           </div>`;
						proDta.isOpenHouse.forEach(function (resut) {
							html += `<div class="text-center" style="width:100%;text-align: center !important;">
			                              <label class="flyer-label" style="color: #EE8C3A;
			                                 font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">${resut.openHouseData.houseType}:</label>
			                              <span>${resut.openHouseData.date} ${resut.openHouseData.startTime}  - ${resut.openHouseData.endTime} </span><br>
			                           </div>`;
						});

						html += `<div class="ml-3" style="width:100%; margin-left: 1rem !important;">
			                              <label class="flyer-label" style="color: #EE8C3A;
			                                 font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">MLS#:</label>
			                              <span>${proDta.mls_number}</span>
			                           </div>
			                           <div class="ml-3" style="width:100%; margin-left: 1rem !important;">
			                              <label class="flyer-label" style="color: #EE8C3A;
			                                 font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">Property Description:</label>
			                              <span>${proDta.property_details}</span>         
			                           </div>
			                           <div class="ml-3" style="width:100%; margin-left: 1rem !important;">
			                              <label class="flyer-label" style="color: #EE8C3A;
			                                 font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">Links:</label>`;
						proDta.isOpenHouse.forEach(function (resut) {
							html += `<br><a href="http://66.235.194.119/listingreach" style="color: #000000;transition: all .5s ease;"><u> Websitename with hyperlink</a></u>`;
			             });

			             html +=  ` </div>
			                        </div>
			                     </div>
							</div>`;								
		});



console.log("html======",html);

			var previewTemplatememail =Common.PREVIEW_EMAIL_MULTIPROPERTY_TEMPLATE;	
					var emailtemplate = previewTemplatememail
					.replace(/#multiproperty#/g,html)
					.replace(/#agentName#/g,agentData.name)
					.replace(/#agentEmail#/g,agentData.Email)
					.replace(/#agentImage#/g,agentData.image_url || "http://66.235.194.119/listingreach/img/dummy-profile.png")
					.replace(/#companyLogo#/g,agentData.logo_url)
					.replace(/#WebsiteUrl#/g,agentData.website_url)
					.replace(/#subject#/g,subject)
					.replace(/#formLine#/g,formLine)
					.replace(/#formReply#/g,formReply)
					.replace(/#blastHeadline#/g,headline);


		Common.sendMail(property.email,'support@employeemirror.com','Property Details', null,emailtemplate, function(error: any, response: any){ 
			if(error){ 
				console.log(error);
				res.end("error");
				}
			});
		res.status(201).send({ "success":"done" }); 

	} else {
/*				 property     =  property[0].building_size
				let propertyDetail = property.propertyDetail;
	
				let streetAddress = property.propertyAddress.streetAddress;
				let city = property.propertyAddress.city;
				let zipCode =  property.propertyAddress.zipCode;
				let displayMethod = property.propertyAddress.displayMethod;

				let mlsNumber = property.mlsNumber.numberProperty;
				let blastHeadline =  property.blastHeadline;
				let numberOfBedrooms=  property.generalPropertyInformation.numberOfBedrooms;
				let pricePerSquareFoot = property.generalPropertyInformation.pricePerSquareFoot;
				let yearBuilt = property.generalPropertyInformation.yearBuilt;
				let lotSize = property.generalPropertyInformation.lotSize;
				let propertyType = property.generalPropertyInformation.propertyType;
				let propertyStyle = property.generalPropertyInformation.propertyStyle;
				let garageSize = property.generalPropertyInformation.garageSize;
				let full = property.generalPropertyInformation.numberOfBathrooms.full;
				let half = property.generalPropertyInformation.numberOfBathrooms.half;
				let numberOfStories = property.generalPropertyInformation.numberOfBathrooms;*/
	

			let openData = '';
			if(property[0].isOpenHouse.openHouseData !=undefined && property[0].isOpenHouse.openHouseData.length){
				let houseArray = property[0].isOpenHouse.openHouseData;
				console.log("houseArray===",houseArray);
				houseArray.forEach(function(item){
				 openData +=`<div>
				 <label class="flyer-label">${item.openHouseData.houseType}:</label>
				 <span>${item.openHouseData.date} ${item.openHouseData.startTime}  - ${item.openHouseData.endTime}</span><br>
				 </div>`;
				})
			}

			let links = '';
			if(property[0].linksToWebsites.linkData !=undefined && property[0].linksToWebsites.linkData.length){
				let linkArray = property[0].linksToWebsites.linkData;
				linkArray.forEach(function(item){
				 links +=`<div>
				  <label class="flyer-label">Links:</label>
 					<p><a href="#"><u> ${item.linksToWebsiteData.buildingSize}</a></u></p><br>
				 </div>`;
				})
			}





			var previewTemplatememail =Common.PREVIEW_EMAIL_TEMPLATE;	
					var emailtemplate = previewTemplatememail
					.replace(/#subject#/g,subject)
					.replace(/#formLine#/g,formLine)
					.replace(/#formReply#/g,formReply)
					.replace(/#blastHeadline#/g,headline)
					.replace(/#numberOfBedrooms#/g,property[0].numberOfBedrooms)
					.replace(/#propertyDetail#/g,property[0].propertyDetail)
					.replace(/#mlsNumber#/g,property[0].mlsNumber)
					.replace(/#streetAddress#/g,property[0].streetAddress)
					.replace(/#zipCode#/g,property[0].zipCode)
					.replace(/#city#/g,property[0].city)
					.replace(/#pricePerSquareFoot#/g,property[0].pricePerSquareFoot)
					.replace(/#yearBuilt#/g,property[0].yearBuilt)
					.replace(/#lotSize#/g,property[0].lotSize)
					.replace(/#openData#/g,openData)
					.replace(/#links#/g,links)
					.replace(/#propertyType#/g,property[0].propertyType)
					.replace(/#full#/g,property[0].number_bathrooms[0].full)
					.replace(/#half#/g,property[0].number_bathrooms[0].half)
					.replace(/#garageSize#/g,property[0].garageSize)
					.replace(/#propertyStyle#/g,property[0].propertyStyle)
					.replace(/#numberOfStories#/g,property[0].numberOfStories)
					.replace(/#agentName#/g,agentData.name)
					.replace(/#agentEmail#/g,agentData.Email)
					.replace(/#agentImage#/g,agentData.image_url || "http://66.235.194.119/listingreach/img/dummy-profile.png")
					.replace(/#companyLogo#/g,agentData.logo_url)
					.replace(/#WebsiteUrl#/g,agentData.website_url)
					.replace(/#multiproperty#/g,agentData.phone_number);

					

					
					Common.sendMail(property.email,'support@employeemirror.com','Property Details', null,emailtemplate, function(error: any, response: any){ 
					if(error){ 
					console.log(error);
					res.end("error");
					}
					});
					res.status(201).send({ "success":"done" }); 



	}


				
			
		}  catch (e)  {
			console.log(e);
			res.send({"error": "error in your request"});
		}
	}
    
    forgetUserPassword(req: express.Request, res: express.Response): void {
        try {
        	
            var _user: IUserModel = <IUserModel>req.body;
            var _userBusiness = new UserBusiness();
            _userBusiness.findOne({email: _user.email}, (error, result) => {
                if(error){
                	res.send({"error": "error"});
                } 
                else {
                	if(result && result.email==_user.email) {
						if(result.status=='unverified') {
							return res.status(401).send({"error": "Your account is not verified. Please contact admin."});
						} else {
							var token = _userBusiness.createToken(result);
							var _updateData: IUserModel = <IUserModel>req.body;
							_updateData.lastLogin = new Date();
							_updateData.token = token;
							var _id: string = result._id.toString();
							var _userBusinessUpdate = new UserBusiness();
							// Generate new password ...
							var autoGeneratedPassword = Math.random().toString(36).slice(-8);
        					_user.password = 'P'+autoGeneratedPassword;
							_userBusinessUpdate.update(_id, _updateData, (error, resultUpdate) => {
								if(error) res.send({"error": "error", "message": "Authentication error"});//res.status(401).send({"error": "Authentication error"});
								else {
									
									var _userBusiness = new UserBusiness();
									_userBusiness.findById(_id, (error, resultuser) => {
										if(error) res.send({"error": "error", "message": "Authentication error"});
										else {
											var emailresetpassword=Common.EMAIL_TEMPLATE_RESET_USER_PASSWORD;
											var emailtemplate =emailresetpassword.replace(/#password#/g,_user.password);
											Common.sendMail(result.email,'support@ListingReach.com','Forgot Password', null,emailtemplate, function(error: any, response: any){
												if(error){
													console.log(error);
													res.end("error");
												}
											});
											res.status(201).send({ "success":"done" });
										}
									});
								}
							});
						}
					} else {
						return res.status(401).send({"error": "You have entered invalid email."});
					}
				}
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }
    
    
    
    UpdateUserPassword(req: express.Request, res: express.Response): void {
    console.log("Dsadasdasd")
    	try {
			var _user: IUserModel = <IUserModel>req.body; 
			var _userBusiness = new UserBusiness();
			var _idc = req.body.user;
			_user.password  = req.body.newpassword;    
			_userBusiness.findOne({_id:_idc,password:req.body.currentpassword}, (error, result) => {
				if(error){
				res.send({"error": "Please enter current vaild password."});
				} 
				else if(result == null) { 
				res.send({"error": "Please enter current vaild password."});

				} else {
					_user.password=req.body.newpassword;
					_userBusiness.update(_idc,_user, (error, resultUpdate) => {
					if(error) res.send({"error": "error", "message": "Your password is not updated."});
					else {
						res.status(201).send({ "success":"Your password is successfully updated." });
					} 
					});
				}
			});	
		}
		catch (e)  {
		console.log(e);
		res.send({"error": "error in your request"});

		}
    }


    forgetSAdminPassword(req: express.Request, res: express.Response): void {
        try {
            var _user: IAdminUserModel = <IAdminUserModel>req.body;
            var _adminUserBusiness = new AdminUserBusiness();
            var _userBusiness = new UserBusiness();
            _adminUserBusiness.findOne({email: _user.email}, (error, result) => {
                if(error) res.send({"error": "error"});
                else {
					if(result && result.email==_user.email) {
						if(!result.isActive) {
							return res.status(401).send({"error": "Your account is not active. Please contact admin."});
						} 
						else {
							var token = _userBusiness.createToken(result);
							var _updateAdminData: IAdminUserModel = <IAdminUserModel>req.body;
							_updateAdminData.lastLogin = new Date();
							_updateAdminData.token = token;
							var _id: string = result._id.toString();
							var _adminUserBusiness = new AdminUserBusiness();
							// Generate new password ...
							var autoGeneratedPassword = Math.random().toString(36).slice(-8);
        					_user.password = 'P'+autoGeneratedPassword;
							_adminUserBusiness.update(_id, _updateAdminData, (error, resultUpdate) => {
								if(error) res.send({"error": "error", "message": "Authentication error"});//res.status(401).send({"error": "Authentication error"});
								else {
									var companyId = result._id;
									_adminUserBusiness.retrieve(companyId, (error, resultCompany) => {
										if(error) res.send({"error": "error", "message": "Authentication error"});
										else {
											var emailresetpassword=Common.EMAIL_TEMPLATE_RESET_ADMIN_PASSWORD;
											var emailtemplate =emailresetpassword.replace(/#password#/g,_user.password);
											Common.sendMail(result.email,'support@inteleagent.com','Forgot Password', null,emailtemplate, function(error: any, response: any){
												if(error){
													console.log(error);
													res.end("error");
												}
											});
											res.status(201).send({ "success":"done" });
										}
									});
								}
							});
						}
					} else {
						return res.status(401).send({"error": "Invalid email."});
					}
				}
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }

   
	verifytoken(req: express.Request, res: express.Response): void {
		var _userBusiness = new UserBusiness();
		_userBusiness.verifyToken(req, res, (userData) => {
			res.status(201).send({
				token: "valid"
			});
		});
    }

	//tbd split the incoming query to be {a:b} instead of a=b
	count(req: express.Request, res: express.Response): void {
		try {
			var query: string = req.params.query;
			var _userBusiness = new UserBusiness();
			_userBusiness.count(query, (error, result) => {
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
	
	

	getReferences(req: express.Request, res: express.Response): void {
 		try {
			

        } catch (e){
            console.log(e);
            res.send({"error": "error in your request"});
		}
	}
    
    saveBlast(req: express.Request, res: express.Response): void {
        try {
           var _blastform: IBlastModel = <IBlastModel>req.body;
			var _blastBusiness = new BlastBusiness();

			_blastform.selected_template_date = new Date();
           _blastBusiness.create(_blastform, (error, result) => {
	                if(error) {
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

    saveDesignTemplate(req: express.Request, res: express.Response): void {
        try {
           	let _IagentTemplateModel: IAgentTemplateModel = <IAgentTemplateModel>req.body;
			let _agentTemplateBusiness = new AgentTemplateBusiness();

			let _blastform: IBlastModel = <IBlastModel>req.body;
			let _blastBusiness = new BlastBusiness();
			_blastform.selected_template_date = new Date();
           _agentTemplateBusiness.create(_IagentTemplateModel, (error, result) => {
	                if(error) {
						console.log(error);
						res.send({"error": error});
					} else {
						if(result && result._id){
							_blastform.selected_template_id = result._id;
							_blastBusiness.findOne({"user_id":_IagentTemplateModel.userId}, (error, user) => {	
								let _id: string = user._id.toString();
								_blastBusiness.update(_id, _blastform, (error:any, resultUpdate:any) => {
									if(error){
									} else {
									 return res.json({"sucess":"sucess","data":result});
									}
								});
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

    
    
    saveAgents(req: express.Request, res: express.Response): void {
    	 try {
    	 	var _userBusiness = new UserBusiness();
        	_userBusiness.verifyToken(req, res,  (userData) => { 
	    	 	var _agent: IAgentModel = <IAgentModel>req.body;
	    	 	console.log("_agent====",userData);
	    	 	_agent.createdOn = new Date();

	    	 	_agent.user_id=companyUserData._id;

				var _agentBusiness = new AgentBusiness();
				_agentBusiness.findOne({'userId':userData._id}, (error:any, agentresult:any) => {
		    	 	
					if(agentresult){
						var _id:string = agentresult._id.toString();
						_agentBusiness.update(_id, _agent, (error:any, resultUpdate:any) => {
							if(error){
							}else {
								res.status(201).send({ "success":"Your agent info successfully updated." });
								return res.json({data:resultUpdate});
							}
						});
					}else{
						_agentBusiness.create(_agent, (error, agentresultData) => {
							if(error){
								console.log("error====",error)
							}else {
								console.log("agentresultData====",agentresultData);
							  res.status(201).send({ "success":"Your agent info successfully updated." });
							}
						});
					}
		    	 	
				});
			});
    	 }
    	  catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
		}
    });

     saveProperty(req: express.Request, res: express.Response): void {
        try {
	           var _propertyforms: IPropertyModel = <IPropertyModel>req.body;
	           var _propertyBusiness = new PropertyBusiness();

			   console.log("_propertyforms======",_propertyforms);


           if(_propertyforms && _propertyforms.property && _propertyforms.property.length && _propertyforms.agentData){
           		var _templateforms: IAgentTemplateModel = <IAgentTemplateModel>req.body;
           		var _templateBusiness = new AgentTemplateBusiness();

           		let _templateform = {};

           		_propertyforms.property.forEach(function(property){
           			let _propertyform = {};
           			_propertyform.agentData=_propertyforms.agentData;
					_templateform.email_subject = _templateforms.Email.formSubject;
					_templateform.from_line = _templateforms.Email.formLine;
					_templateform.address = _templateforms.Email.formReply;
					_templateform.headline = _templateforms.blastHeadline;
					


	           		_propertyform.display_method=property.propertyAddress.displayMethod;
					_propertyform.street_address=property.propertyAddress.streetAddress;
					_propertyform.city=property.propertyAddress.city;
					_propertyform.state=property.propertyAddress.state;
					_propertyform.zipcode=property.propertyAddress.zipCode;
					_propertyform.userId = property.userId;

					_propertyform.mls_number=property.mlsNumber.numberProperty;
					_propertyform.board=property.mlsNumber.boardAssociation;

					_propertyform.pricingInfo=property.pricingInfo;  

						if(property.linksToWebsites){
								var linksData=[];
								let data = property.linksToWebsites.linkData;
											data.forEach(function(links:any) {
											if(links){
												linksData.push({linksToWebsiteData:links.linksToWebsiteData});
											}
										});
							   _propertyform.linksToWebsites=linksData; 
						}

						if(property.isOpenHouse){
								var opneHouseData=[];
								let data = property.isOpenHouse.openHouseData;
											data.forEach(function(house:any) {
											if(house){
												opneHouseData.push({openHouseData:house.openHouseData});
											}
										});
							   _propertyform.isOpenHouse=opneHouseData;
						}

				_propertyform.property_type = property.generalPropertyInformation.propertyType;
				_propertyform.property_style = property.generalPropertyInformation.propertyStyle;
				_propertyform.lot_size = property.generalPropertyInformation.lotSize;
				_propertyform.number_bedrooms = property.generalPropertyInformation.numberOfBedrooms;
				_propertyform.building_size = property.generalPropertyInformation.buildingSize;
				_propertyform.number_stories = property.generalPropertyInformation.numberOfStories;
				_propertyform.number_bathrooms = property.generalPropertyInformation.numberOfBathrooms;
				_propertyform.year_built = property.generalPropertyInformation.yearBuilt;
				_propertyform.garage = property.generalPropertyInformation.garage;
				_propertyform.garageSize = property.generalPropertyInformation.garageSize;
				_propertyform.price = property.generalPropertyInformation.pricePerSquareFoot;

				_propertyform.property_details=property.propertyDetail;

					var _id: string = _templateforms.templateId;

								
/*								_propertyBusiness.findById(_id, (error, resultuser) => {  
								
									if(resultuser && resultuser._id !=undefined && resultuser._id){
								
										_propertyBusiness.update(_id, _propertyform, (error, resultUpdate) => { 
											if(error){
												res.send({"error": error});
											} else {
												_templateBusiness.findOne({"Property_id":_id}, (error, result) => {
													if(error){
														res.send({"error": error});
													}
													let _id: string = result._id.toString();
													 _templateBusiness.update(_id,_templateform, (error, result) => { 
													 	if(error){
													 		res.send({"error": error});
													 	} else {
													 		console.log("resultrerresult===",result);
													 		res.send({"success": "success"});
													 	}
													 })
												})	 
											}
										});
									} else {*/
										
											_propertyBusiness.create(_propertyform, (error, result) => {
									                if(error) {
														console.log(error);
														res.send({"error": error});
													}
													_templateform.Property_id = result._id.toString();
													_templateBusiness.update(_id, _templateform, (error, resultUpdate) => {
										                if(error) {
															console.log(error);
															res.send({"error": error});
														} else {
															//res.send({"success": "success",userId:_propertyform.userId});
														 		var propertyAggregate = [
														            {
															                $lookup:                       
															                {
															                    from: "users",
															                    localField: "userId",   
															                    foreignField: "_id",        
															                    as: "users"               
															                }
															            },
															            {
																      	  	$unwind:"$users"
																        
																      	},
															          	
															            {
															                $lookup:                       
															                {
															                    from: "templates",
															                    localField: "_id",   
															                    foreignField: "Property_id",        
															                    as: "templates"               
															                }
															            },
															            {
															                $project:                       
															                {    
															                    "_id":1,
															                    "userId":1,
												         		                "display_method":1,
															                    "street_address":1,
															                    "city":1,
															                    "state":1,
															                    "zipcode":1,
															                    "mls_number":1,
																				"board":1,
															                    "property_type":1,
															                    "property_style":1,
															                    "lot_size":1,
															                    "number_bedrooms":1,
															                    "agentData":1,
															                    "building_size":1,
															                    "number_stories":1,
																				"number_bathrooms":1,
																				"year_built":1,
																				"garage":1,
																				"garageSize":1,
																				"price":1,
																				"pricingInfo":1,
																				"property_details":1,
																				"isOpenHouse":1,
																				"linksToWebsites":1,
																				"templates.email_subject":1,
																				"templates.from_line":1,
																				"templates.address":1,
																				"templates.Property_id":1,
																				"templates.headline":1,
																				"templates.template_type":1,
																				"templates.userId":1,
																				"users.userName":1,
																				"users.firstName":1,
																				"users.lastName":1,
																				"users.roles":1,

																		    }
															            },
															            {
															                $match:
														                    {
																					userId: mongoose.Types.ObjectId(property.userId.toString())      
																			}
															            }
															        ];

															         _propertyBusiness.aggregate( propertyAggregate, (error:any, result:any) => { 
															        	if(error) {
																			res.send({"error": error});
																		} else {
																			var returnObj = result.map(function(obj: any): any {
																            return {
																		        id: obj._id,
																		        firstName:obj.users.firstName,
																		        lastName:obj.users.lastName,
																		        middleName:obj.users.middleName,
																		        building_size:obj.building_size,
																		        number_bathrooms:obj.number_bathrooms,
																		        isOpenHouse:obj.isOpenHouse,
																		        property_type:obj.property_type,
																		        property_style:obj.property_style,
																		        mls_number:obj.mls_number,
																		        linksToWebsites:obj.linksToWebsites,
																		        property_detail:obj.property_details,
																		        pricingInfo:obj.pricingInfo,
																		        board:obj.board,
																		        zipcode:obj.zipcode,
																		        city:obj.city,
																		        display_method:obj.display_method,
																		        street_address:obj.street_address,
																		        number_bedrooms:obj.number_bedrooms,
																		        year_built:obj.year_built,
																		        number_stories:obj.number_stories,
																		        lot_size:obj.lot_size,
																		        templates:obj.templates,
																		        price:obj.price,
																		        garageSize:obj.garageSize,
																		        agentData:obj.agentData
																		    };

																	});
																			console.log("returnObj=====",returnObj);
																			return res.json(returnObj);
																}
															});	


														}
									                }); 
									        }); 
									//}
							//	});

           		});

           }

    	}
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
		}
    }


 savePropertyImages(data:any,id:any, res: express.Response): void { 
 	var _blastimageBusiness= new BlastImageBusiness();
	var _blastimage: IBlastImageModel = <IBlastImageModel >data;
		
	var type= data.mimetype.split("/");
	 	var userid:string = id.toString();
	
	_blastimage.user_id=userid;
	_blastimage.url=data.filename;
	_blastimageBusiness.create(_blastimage, (error, resultData) => {
			if(error){
				console.log("error===",error);
			}else {
				 return res.json({url:resultData.url});
			}
		});
	}

	savePayment(req: express.Request, res: express.Response){
		 try {
    	 	var _userBusiness = new UserBusiness();
        	_userBusiness.verifyToken(req, res,  (userData) => { 
	    	 	var _payment: IPaymentModel = <IPaymentModel>req.body;
	    	 	_payment.createdOn = new Date();
	    	 	_payment.user_id=userData._id;
				var _paymentBusiness = new PaymentBusiness();
				_payment.blast_id=userData._id;
				_payment.amount=_payment.total;
				_payment.paymentID=_payment.paymentID;
				console.log("_payment=====",_payment);
			_paymentBusiness.retrieve({"blast_id":userData._id}, (error, result) => {
				if(result && result.length > 0) {
                    lastInvoiceId = +invoiceData[0].maxNumber + +1;
                    _payment.invoice_id = lastInvoiceId;
                }
                else {
                    invoice_number = 1;
                    _payment.invoice_id = invoice_number;
                }
				_paymentBusiness.create(_payment, (error, paymentresultData) => {
					if(error){
						console.log("error====",error)
					}else {
						res.status(201).send({ "success":"Your payment successfully done." });
					}
				});
			});
		    	 	
				
			});
    	 }
    	  catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
		}
	}		

	getPayment(req: express.Request, res: express.Response){
		 try {
    	 	var _userBusiness = new UserBusiness();
        	_userBusiness.verifyToken(req, res,  (userData) => { 
	    	 	var _payment: IPaymentModel = <IPaymentModel>req.body;
	    	 	var _paymentBusiness = new PaymentBusiness();
				_paymentBusiness.retrieve({"blast_id":userData._id}, (error, result) => {
					if(error){
						console.log("error====",error)
					}else {
						console.log("result=====",result)
						return res.json({payment:result});
					}
				});
			
		    	 	
				
			});
    	 }
    	  catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
		}
	}	
 	getTemplateOrPropertydata(req: express.Request, res: express.Response): void { 
 		try {
 			var _property: IPropertyModel = <IPropertyModel>req.body;
			var _propertyBusiness = new PropertyBusiness();
		 		var propertyAggregate = [
		            {
			                $lookup:                       
			                {
			                    from: "users",
			                    localField: "userId",   
			                    foreignField: "_id",        
			                    as: "users"               
			                }
			            },
			            {
				      	  	$unwind:"$users"
				        
				      	},
			          	
			            {
			                $lookup:                       
			                {
			                    from: "templates",
			                    localField: "_id",   
			                    foreignField: "Property_id",        
			                    as: "templates"               
			                }
			            },
			            {
			                $project:                       
			                {    
			                    "_id":1,
			                    "userId":1,
         		                "display_method":1,
			                    "street_address":1,
			                    "city":1,
			                    "state":1,
			                    "zipcode":1,
			                    "mls_number":1,
								"board":1,
			                    "property_type":1,
			                    "property_style":1,
			                    "lot_size":1,
			                    "number_bedrooms":1,
			                    "building_size":1,
			                    "number_stories":1,
								"number_bathrooms":1,
								"year_built":1,
								"garage":1,
								"garageSize":1,
								"price":1,
								"pricingInfo":1,
								"agentData":1,
								"property_details":1,
								"isOpenHouse":1,
								"linksToWebsites":1,
								"templates.email_subject":1,
								"templates.from_line":1,
								"templates.address":1,
								"templates.Property_id":1,
								"templates.headline":1,
								"templates.template_type":1,
								"templates.userId":1,
								"users.userName":1,
								"users.firstName":1,
								"users.lastName":1,
								"users.roles":1,

						    }
			            },
			            {
			                $match:
		                    {
									userId: mongoose.Types.ObjectId(_property.userId.toString())      
							}
			            }
			        ];

			         _propertyBusiness.aggregate( propertyAggregate, (error:any, result:any) => { 
			        	if(error) {
							res.send({"error": error});
						} else {
							var returnObj = result.map(function(obj: any): any {
				            return {
						        id: obj._id,
						        firstName:obj.users.firstName,
						        lastName:obj.users.lastName,
						        middleName:obj.users.middleName,
						        building_size:obj.building_size,
						        number_bathrooms:obj.number_bathrooms,
						        isOpenHouse:obj.isOpenHouse,
						        property_type:obj.property_type,
						        property_style:obj.property_style,
						        mls_number:obj.mls_number,
						        linksToWebsites:obj.linksToWebsites,
						        property_detail:obj.property_details,
						        pricingInfo:obj.pricingInfo,
						        board:obj.board,
						        zipcode:obj.zipcode,
						        city:obj.city,
						        display_method:obj.display_method,
						        street_address:obj.street_address,
						        number_bedrooms:obj.number_bedrooms,
						        year_built:obj.year_built,
						        number_stories:obj.number_stories,
						        lot_size:obj.lot_size,
						        templates:obj.templates,
						        price:obj.price,
						        garageSize:obj.garageSize,
						        agentData:obj.agentData
						    };

					});
							console.log("returnObj=====",returnObj);
							return res.json(returnObj);
				}
			});				
	  
 }  catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
	}
}


}
export = UserController;
