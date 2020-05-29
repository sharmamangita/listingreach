/**
 * Business Logic for PlanBusiness, called from the Controllers
 */
import express = require("express");
import mongoose = require("mongoose");
import BaseBusiness = require("./BaseBusiness");
import BlastRepository = require("./../repository/BlastRepository");
import IBlastModel = require("./../model/interfaces/IBlastModel");
import AgentTemplateBusiness = require("./AgentTemplateBusiness");
import IAgentTemplateModel = require("./../model/interfaces/IAgentTemplateModel");
import PropertyBusiness = require("./PropertyBusiness");
import IPropertyModel = require("./../model/interfaces/IPropertyModel");
import Common = require("./../../config/constants/common");
class BlastBusiness implements BaseBusiness<IBlastModel> {
    private _blastRepository: BlastRepository;

    constructor() {
        this._blastRepository = new BlastRepository();
    }
    create(item: IBlastModel, callback: (error: any, result: any) => void) {
        item._id = mongoose.Types.ObjectId();
        this._blastRepository.create(item, callback);
    }

    retrieve(query: any, callback: (error: any, result: any) => void) {
        this._blastRepository.retrieve(query, callback);
    }
    aggregate(query: any, callback: (error: any, result: any) => void) {
        this._blastRepository.aggregate(query, callback);
    }
    retrieveFields(query: any, fields: any, callback: (error: any, result: any) => void) {
        this._blastRepository.retrieveFields(query, fields, callback);
    }

    update(_id: string, item: IBlastModel, callback: (error: any, result: any) => void) {

        this._blastRepository.findById(_id, (err, res) => {
            if (err) callback(err, res);

            else
                this._blastRepository.update(res._id, item, callback);

        });
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._blastRepository.delete(_id, callback);
    }

    deleteMany(query: any, callback: (error: any, result: any) => void) {
        this._blastRepository.deleteMany(query, callback);
    }

    findById(_id: string, callback: (error: any, result: IBlastModel) => void) {
        this._blastRepository.findById(_id, callback);
    }

    count(query: any, callback: (error: any, result: Number) => void) {
        this._blastRepository.count(query, callback);
    }

    findOne(query: any, callback: (error: any, result: IBlastModel) => void) {
        this._blastRepository.findOne(query, callback);
    }
    async  getEmailHTML(blastId: string): Promise<any> {
     //   console.log("getting HTML.........", blastId);
        return new Promise<any>((resolve, reject) => {
            try {
                this._blastRepository.findById(blastId, (error, blast) => {
                    if (error) {
                        console.log("error geting blast :", error);
                        reject(error);
                    };
                    // console.log("blast",blast);
                    const templateBusiness = new AgentTemplateBusiness();
                    templateBusiness.findById(blast.selected_template_id, (error, template: IAgentTemplateModel) => {
                        if (error) {
                            console.log("error geting template :", error);
                            reject(error);
                        }
                        // console.log("template",template);
                        const propertyBusiness = new PropertyBusiness();
                        const query = { blast_id: blast.id }
                        propertyBusiness.retrieve(query, (error, properties) => {
                            if (error) {
                                console.log("error geting properties :", error);
                                reject(error);
                            }
                            //console.log('properties',properties)
                            let subject = template.email_subject;
                            let formLine = template.from_line;
                            let formReply = template.address;
                            let headline = template.headline;
                            let agent = blast.agentData;
                            if (properties && properties.length > 1) {
                                console.log("multiple properties....");
                                var html = '';
                                properties.forEach(function (property: IPropertyModel) {
                                    html += `<div class="flyer-bg" style="background: #f1f1f1;">
                                             <div class="row" style="display: block;display: flex;flex-wrap: wrap;border-top: 2px solid #ccc;">
                                                <div style="width:50%;display: block; background:#f1f1f1;height: 400px;">
                                                   <img src="http://66.235.194.119/listingreach/img/img4.jpg" alt="image" style="width:100%;height: 400px;">
                                                </div>`;
                                    html += `<div style="width:50%;display: block; background:#f1f1f1; height: 400px;">
                                                   <div class="row" style="display: flex;flex-wrap: wrap;">
                                                      <div style="width:100%;margin-bottom: 1rem !important; margin-left: 1rem !important;margin-top: 1rem !important;">
                                                         <h4 style=" background: #f1f1f1;font-size: 1.5rem;margin-top: 0;
                                                            margin-bottom: 1rem;">Price: ${property.price} per Square Foot</h4>
                                                      </div>
                                                      <div class="ml-3" style="width:100%; margin-left: 1rem !important;">
                                                         <label class="flyer-label" style="color: #EE8C3A;
                                                            font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">Key Features:</label>
                                                         <ul>
                                                            <li>Property Type: ${property.property_type}  </li>
                                                            <li>Property Style: ${property.property_style}  </li>
                                                            <li> ${property.number_bedrooms} Bedrooms</li>
                                                            <li>${property.number_bathrooms[0].full} Full ${property.number_bathrooms[0].half} Half Bathrooms</li>
                                                            <li>1 Full +2 Half Bathrooms</li>
                                                            <li>${property.building_size} square feet</li>
                                                            <li>${property.price}  /sqft</li>
                                                            <li>Lot Size: ${property.lot_size} sqft</li>
                                                            <li>  Built ${property.year_built} </li>
                                                            <li>${property.garageSize} Garage</li>
                                                            <li> ${property.number_stories} </li>
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
                                                      <p>${property.street_address}, ${property.city}, ${property.zipcode}</p>
                                                   </div>`;
                                    //                property.isOpenHouse.forEach(function (resut) {
                                    // html += `<div class="text-center" style="width:100%;text-align: center !important;">
                                    //                   <label class="flyer-label" style="color: #EE8C3A;
                                    //                      font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">${resut.openHouseData}:</label>
                                    //                   <span>${resut.openHouseData.date} ${resut.openHouseData.startTime}  - ${resut.openHouseData.endTime} </span><br>
                                    //                </div>`;


                                    html += `<div class="ml-3" style="width:100%; margin-left: 1rem !important;">
                                                      <label class="flyer-label" style="color: #EE8C3A;
                                                         font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">MLS#:</label>
                                                      <span>${property.mls_number}</span>
                                                   </div>
                                                   <div class="ml-3" style="width:100%; margin-left: 1rem !important;">
                                                      <label class="flyer-label" style="color: #EE8C3A;
                                                         font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">Property Description:</label>
                                                      <span>${property.property_details}</span>         
                                                   </div>
                                                   <div class="ml-3" style="width:100%; margin-left: 1rem !important;">
                                                      <label class="flyer-label" style="color: #EE8C3A;
                                                         font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">Links:</label>`;
                                    property.isOpenHouse.forEach(function (resut) {
                                        html += `<br><a href="http://66.235.194.119/listingreach" style="color: #000000;transition: all .5s ease;"><u> Websitename with hyperlink</a></u>`;
                                    });
                                    html += ` </div>
                                                </div>
                                             </div>
                                        </div>`;

                                    var previewTemplatememail = Common.PREVIEW_EMAIL_MULTIPROPERTY_TEMPLATE;
                                    var emailtemplate = previewTemplatememail
                                        .replace(/#multiproperty#/g, html)
                                        .replace(/#agentName#/g, agent.name)
                                        .replace(/#agentEmail#/g, agent.email)
                                        .replace(/#agentImage#/g, agent.image_url || "http://66.235.194.119/listingreach/img/dummy-profile.png")
                                        .replace(/#companyLogo#/g, agent.logo_url || "http://66.235.194.119/listingreach/img/dummy-logo.png")
                                        .replace(/#WebsiteUrl#/g, agent.website_url)
                                        .replace(/#phone_number#/g, agent.phone_number)
                                        .replace(/#companyDetail#/g, agent.company_details)
                                        .replace(/#subject#/g, subject)
                                        .replace(/#formLine#/g, formLine)
                                        .replace(/#formReply#/g, formReply)
                                        .replace(/#blastHeadline#/g, headline);
                                    resolve(emailtemplate);
                                });
                            } else {
                                console.log("single property....");
                                let html: string = '';
                                properties.forEach(function (property: IPropertyModel) {
                                    //  console.log("property",property);
                                    html += `<div class="flyer-bg" style="background: #f1f1f1;">
                                             <div class="row" style="display: block;display: flex;flex-wrap: wrap;border-top: 2px solid #ccc;">
                                                <div style="width:50%;display: block; background:#f1f1f1;height: 400px;">
                                                   <img src="http://66.235.194.119/listingreach/img/img4.jpg" alt="image" style="width:100%;height: 400px;">
                                                </div>`;
                                    html += `<div style="width:50%;display: block; background:#f1f1f1; height: 400px;">
                                                   <div class="row" style="display: flex;flex-wrap: wrap;">
                                                      <div style="width:100%;margin-bottom: 1rem !important; margin-left: 1rem !important;margin-top: 1rem !important;">
                                                         <h4 style=" background: #f1f1f1;font-size: 1.5rem;margin-top: 0;
                                                            margin-bottom: 1rem;">Price: ${property.price} per Square Foot</h4>
                                                      </div>
                                                      <div class="ml-3" style="width:100%; margin-left: 1rem !important;">
                                                         <label class="flyer-label" style="color: #EE8C3A;
                                                            font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">Key Features:</label>
                                                         <ul>
                                                            <li>Property Type: ${property.property_type}  </li>
                                                            <li>Property Style: ${property.property_style}  </li>
                                                            <li> ${property.number_bedrooms} Bedrooms</li>
                                                            <li>${property.number_bathrooms[0].full} Full ${property.number_bathrooms[0].half} Half Bathrooms</li>
                                                            <li>1 Full +2 Half Bathrooms</li>
                                                            <li>${property.building_size} square feet</li>
                                                            <li>${property.price}  /sqft</li>
                                                            <li>Lot Size: ${property.lot_size} sqft</li>
                                                            <li>  Built ${property.year_built} </li>
                                                            <li>${property.garageSize} Garage</li>
                                                            <li> ${property.number_stories} </li>
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
                                                      <p>${property.street_address}, ${property.city}, ${property.zipcode}</p>
                                                   </div>`;
                                    property.isOpenHouse.forEach(function (resut) {
                                        // html += `<div class="text-center" style="width:100%;text-align: center !important;">
                                        //                   <label class="flyer-label" style="color: #EE8C3A;
                                        //                      font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">${resut.openHouseData.houseType}:</label>
                                        //                   <span>${resut.openHouseData.date} ${resut.openHouseData.startTime}  - ${resut.openHouseData.endTime} </span><br>
                                        //                </div>`;
                                    });

                                    html += `<div class="ml-3" style="width:100%; margin-left: 1rem !important;">
                                                      <label class="flyer-label" style="color: #EE8C3A;
                                                         font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">MLS#:</label>
                                                      <span>${property.mls_number}</span>
                                                   </div>
                                                   <div class="ml-3" style="width:100%; margin-left: 1rem !important;">
                                                      <label class="flyer-label" style="color: #EE8C3A;
                                                         font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">Property Description:</label>
                                                      <span>${property.property_details}</span>         
                                                   </div>
                                                   <div class="ml-3" style="width:100%; margin-left: 1rem !important;">
                                                      <label class="flyer-label" style="color: #EE8C3A;
                                                         font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">Links:</label>`;
                                    property.isOpenHouse.forEach(function (resut) {
                                        html += `<br><a href="http://66.235.194.119/listingreach" style="color: #000000;transition: all .5s ease;"><u> Websitename with hyperlink</a></u>`;
                                    });

                                    html += ` </div>
                                                </div>
                                             </div>
                                        </div>`;


                                    var previewTemplatememail = Common.PREVIEW_EMAIL_MULTIPROPERTY_TEMPLATE;
                                    var emailtemplate = previewTemplatememail
                                        .replace(/#multiproperty#/g, html)
                                        .replace(/#agentName#/g, agent.name)
                                        .replace(/#agentEmail#/g, agent.email)
                                        .replace(/#agentImage#/g, agent.image_url || "http://66.235.194.119/listingreach/img/dummy-profile.png")
                                        .replace(/#companyLogo#/g, agent.logo_url)
                                        .replace(/#WebsiteUrl#/g, agent.website_url)
                                        .replace(/#subject#/g, subject)
                                        .replace(/#formLine#/g, formLine)
                                        .replace(/#formReply#/g, formReply)
                                        .replace(/#blastHeadline#/g, headline);
                                    //} 
                                    // else {

                                    //     let openData = '';
                                    //     if (property[0].isOpenHouse.openHouseData != undefined && property[0].isOpenHouse.openHouseData.length) {
                                    //         let houseArray = property[0].isOpenHouse.openHouseData;
                                    //         //console.log("houseArray===",houseArray);
                                    //         houseArray.forEach(function (item) {
                                    //             openData += `<div>
                                    //      <label class="flyer-label">${item.openHouseData.houseType}:</label>
                                    //      <span>${item.openHouseData.date} ${item.openHouseData.startTime}  - ${item.openHouseData.endTime}</span><br>
                                    //      </div>`;
                                    //         })
                                    //     }

                                    //     let links = '';
                                    //     if (property[0].linksToWebsites.linkData != undefined && property[0].linksToWebsites.linkData.length) {
                                    //         let linkArray = property[0].linksToWebsites.linkData;
                                    //         linkArray.forEach(function (item) {
                                    //             links += `<div>
                                    //       <label class="flyer-label">Links:</label>
                                    //          <p><a href="#"><u> ${item.linksToWebsiteData.buildingSize}</a></u></p><br>
                                    //      </div>`;
                                    //         })
                                    //     }

                                    //     var previewTemplatememail = Common.PREVIEW_EMAIL_TEMPLATE;
                                    //     var emailtemplate = previewTemplatememail
                                    //         .replace(/#subject#/g, subject)
                                    //         .replace(/#formLine#/g, formLine)
                                    //         .replace(/#formReply#/g, formReply)
                                    //         .replace(/#blastHeadline#/g, headline)
                                    //         .replace(/#numberOfBedrooms#/g, property[0].numberOfBedrooms)
                                    //         .replace(/#propertyDetail#/g, property[0].propertyDetail)
                                    //         .replace(/#mlsNumber#/g, property[0].mlsNumber)
                                    //         .replace(/#streetAddress#/g, property[0].streetAddress)
                                    //         .replace(/#zipCode#/g, property[0].zipCode)
                                    //         .replace(/#city#/g, property[0].city)
                                    //         .replace(/#pricePerSquareFoot#/g, property[0].pricePerSquareFoot)
                                    //         .replace(/#yearBuilt#/g, property[0].yearBuilt)
                                    //         .replace(/#lotSize#/g, property[0].lotSize)
                                    //         .replace(/#openData#/g, openData)
                                    //         .replace(/#links#/g, links)
                                    //         .replace(/#propertyType#/g, property[0].propertyType)
                                    //         .replace(/#full#/g, property[0].number_bathrooms[0].full)
                                    //         .replace(/#half#/g, property[0].number_bathrooms[0].half)
                                    //         .replace(/#garageSize#/g, property[0].garageSize)
                                    //         .replace(/#propertyStyle#/g, property[0].propertyStyle)
                                    //         .replace(/#numberOfStories#/g, property[0].numberOfStories)
                                    //         .replace(/#agentName#/g, agentData.name)
                                    //         .replace(/#agentEmail#/g, agentData.Email)
                                    //         .replace(/#agentImage#/g, agentData.image_url || "http://66.235.194.119/listingreach/img/dummy-profile.png")
                                    //         .replace(/#companyLogo#/g, agentData.logo_url || "http://66.235.194.119/listingreach/img/dummy-logo.png")
                                    //         .replace(/#WebsiteUrl#/g, agentData.website_url)
                                    //         .replace(/#phone_number#/g, agentData.phone_number)
                                    //         .replace(/#companyDetail#/g, agentData.company_details);

                                    //     Common.sendMail(property.email, 'support@employeemirror.com', 'Property Details', null, emailtemplate, function (error: any, response: any) {
                                    //         if (error) {
                                    //             console.log(error);
                                    //             res.end("error");
                                    //         }
                                    //     });
                                    //     res.status(201).send({ "success": "done" });
                                    // }                              
                                    resolve(emailtemplate);
                                });
                            };
                        });
                    })
                });
                //  return null;
            } catch (e) {
                console.log("Email Generate Exception", e);
                reject(e);
            }

        })

    }
}
Object.seal(BlastBusiness);
export = BlastBusiness;