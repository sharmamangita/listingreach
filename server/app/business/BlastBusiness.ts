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
  findOneAndUpdate(_id: mongoose.Types.ObjectId, item: any, callback: (error: any, result: any) => void) {

    this._blastRepository.findByIdAndUpdate(_id, item, callback);
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
    // console.log("getting HTML.........", blastId);
    return new Promise<any>((resolve, reject) => {
      try {
        this._blastRepository.findById(blastId, (error, blast) => {
          if (error) {
            console.log("error geting blast :", error);
            reject(error);
          };
          //console.log("blast",blast);
          const templateBusiness = new AgentTemplateBusiness();
          templateBusiness.findById(blast.selected_template_id, (error, template: IAgentTemplateModel) => {
            if (error) {
              console.log("error geting template :", error);
              reject(error);
            }
            console.log("template", template);
            const propertyBusiness = new PropertyBusiness();
            const query = { blast_id: blast.id }
            propertyBusiness.retrieve(query, (error, properties) => {
              if (error) {
                console.log("error geting properties :", error);
                reject(error);
              }
              var moment = require('moment');
              // console.log('properties===',properties);
              let subject = template.email_subject;
              let formLine = template.from_line;
              let formReply = template.address;
              let headline = template.headline;
              let agent = blast.agentData;
              if (template && template.template_type == 'MultipleProperties') {
                console.log("multiple properties....",properties);
                var html = '';
                html +=`<div style="display: flex;flex-wrap: wrap;">
                     <div style="width:100%">
                      <div class="flyer-header" style="display: block;overflow: hidden;
                 background-color: #EE8C3A;
                 color: #fff;
                 box-shadow: 0 2px rgba(17, 16, 15, 0.1), 0 2px 10px rgba(20, 19, 18, 0.1);
                 border-top: 4px solid #EE8C3A;
                 height: 80px;
                 text-align: center;
                 font-size: 28px;
                 font-weight: bold;
                 padding: 17px 0 10px 0;">           
                                   #blastHeadline#
                                </div>
                             </div>
                  </div>`;
                properties.forEach(function (property: IPropertyModel) {
                  html += ` <div class="" style="display: block;display: flex;border-top: 2px solid #ccc;">
                                                <div style="display: block; background:#f1f1f1;height:auto;overflow: hidden;width:50%">`;
                  if (property.propertyImages && property.propertyImages.length == 1) {
                      html += `<img src=${Common.SITE_URL + "/uploads/" + property.propertyImages[0].imageUrl} />`;
                    } else {
                      html += `<img src=${Common.SITE_URL+ "/uploads/previewimages/img2.jpg"}  />`;
                    }

                  html += `</div><div style="width:50%;display: block; background:#f1f1f1; height:auto;">
                                                   <div class="" style="display: flex;flex-wrap: wrap;margin-left: 5%;">
                                                      <div style="width:100%;margin-bottom: 1rem !important;margin-top: 1rem !important;">
                                                         <h4 style=" background: #f1f1f1;font-size: 1.5rem;margin-top: 0;
                                                            margin-bottom: 1rem;">Price: ${property.price} per Square Foot</h4>
                                                 
                                                      <div class="ml-3" style="width:100%;">
                                                         <label class="flyer-label" style="color: #EE8C3A;
                                                            font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">Key Features:</label>
                                                         <ul>`;


                                                    if(property.property_type!=undefined && property.property_type){
                                                        html +=`<li>Property Type: ${property.property_type} </li>`;
                                                    }

                                                    if(property.property_style!=undefined && property.property_style){
                                                        html +=`<li>Property Style: ${property.property_style} </li>`;
                                                    }

                                                    if(property.number_bedrooms!=undefined && property.number_bedrooms){
                                                        html +=`<li>${property.number_bedrooms} Bedrooms</li>`;
                                                    }

                                                    if(property.number_bathrooms.full!=undefined && property.number_bathrooms.full || property.number_bathrooms.half!=undefined && property.number_bathrooms.half){
                                                      html +=`<li>${property.number_bathrooms.full+' Full'}  ${property.number_bathrooms.half+' Half'} Bathrooms</li>`;
                                                    }

                                                    if(property.building_size!=undefined && property.building_size){
                                                        html +=`<li>${property.building_size} square feet</li>`;
                                                    }

                                                    if(property.price!=undefined && property.price){
                                                        html +=`<li>${property.price}  /sqft</li>`;
                                                    }

                                                    if(property.lot_size!=undefined && property.lot_size){
                                                        html +=`Lot Size: ${property.lot_size} sqft</li>`;
                                                    }

                                                    if(property.year_built!=undefined && property.year_built){
                                                        html +=`<li>  Built ${property.year_built} </li>`;
                                                    }

                                                    if(property.garageSize!=undefined && property.garageSize){
                                                        html +=`<li>${property.garageSize} Garage</li>`;
                                                    }

                                                    if(property.number_stories!=undefined && property.number_stories){
                                                        html +=`<li>${property.number_stories}</li>`;
                                                    }

                                                 html +=`
                                                         </ul>
                                                      </div>
                                                       </div>
                                                   </div>
                                                </div>
                                               </div>
                                            `;

                  let display_method = property.display_method.replace(/\s/g, "");
                  switch (display_method) {
                  case "DONOTShowAddress":
                   html += `<div class="flyer-bg" style="background: #f1f1f1;border-bottom: 2px solid #ccc; padding-top:30px;">
                                <div>`;
                    break;
                  case "ShowCity&StateOnly":
                   html += `<div class="flyer-bg" style="background: #f1f1f1;border-bottom: 2px solid #ccc; padding-top:30px;">
                      <div>
                     <div class="mt-3 text-center" style="width:100%;margin-top: 1rem !important;text-align: center !important;">
                        <label class="flyer-label" style="color: #EE8C3A;
                           font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">Property Address:</label>
                        <p>${property.city}, ${property.state}</p>
                     </div>`;
                    break;
                 default:
                      html += `<div class="flyer-bg" style="background: #f1f1f1;border-bottom: 2px solid #ccc; padding-top:30px;">
                      <div>
                     <div class="mt-3 text-center" style="width:100%;margin-top: 1rem !important;text-align: center !important;">
                        <label class="flyer-label" style="color: #EE8C3A;
                           font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">Property Address:</label>
                        <p>${property.street_address}, ${property.city}, ${property.zipcode}</p>
                     </div>`;
                 }

                  let openhousehtml = '';
                  property.isOpenHouse && property.isOpenHouse.forEach(function (resut) {
                    //console.log("startTime=====",startTime);
                    let startTime = resut.startTime || "";
                    let endTime = resut.endTime || "";
                    let date =moment(resut.date).format('DD-MMM-YYYY');
                    let newStartdateval= new Date(date+" "+startTime);
                    let newEnddateval= new Date(date+" "+endTime);
                    openhousehtml += `<div class="text-center" style="width:100%;text-align: center !important;">
                                                      <label class="flyer-label" style="color: #EE8C3A;
                                                          font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">${resut.houseType}:</label>
                                                       <span>${moment(resut.date).format('ddd DD-MMM-YYYY')} ${startTime && moment(newStartdateval).format('HH:mm A')}  - ${endTime && moment(newEnddateval).format('HH:mm A')}  </span><br>
                                                    </div>`;
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
                  property.linksToWebsites && property.linksToWebsites.forEach(function (resut) {
                    html += `<br><a href=${resut.url} style="color: #000000;transition: all .5s ease;"><u> ${resut.text}</a></u>`;
                  });
                  html += ` 
                                                </div>
                                             </div>
                                        </div>`;
                                         });
                  let agentimgurl = "";
                  if(agent.image_url!=undefined && agent.image_url){
                     agentimgurl = Common.SITE_URL+"/uploads/"+agent.image_url;
                  }

                   let agentlogourl = "";
                  if(agent.logo_url!=undefined && agent.logo_url){
                     agentlogourl = Common.SITE_URL+"/uploads/"+agent.logo_url;
                  }
                  var previewTemplatememail = Common.PREVIEW_EMAIL_MULTIPROPERTY_TEMPLATE;
                  var emailtemplate = previewTemplatememail
                    .replace(/#multiproperty#/g, html)
                    .replace(/#agentName#/g, agent.name)
                    .replace(/#agentEmail#/g, agent.email || " ")
                    .replace(/#agentImage#/g, agentimgurl ||  Common.SITE_URL+"/uploads/previewimages/dummy-profile.png")
                    .replace(/#companyLogo#/g, agentlogourl ||  Common.SITE_URL+"/uploads/previewimages/dummy-logo.png")
                    .replace(/#WebsiteUrl#/g, agent.website_url || " ")
                    .replace(/#phone_number#/g, agent.phone_number || " ")
                    .replace(/#companyDetail#/g, agent.company_details || " ")
                    .replace(/#subject#/g, subject || " ")
                    .replace(/#formLine#/g, formLine || " ")
                    .replace(/#formReply#/g, formReply || " ")
                    .replace(/#blastHeadline#/g, headline || " ");
                  resolve(emailtemplate);
               
              } else if (template && template.template_type == 'UploadBlast') {
                console.log("UploadBlast ....");

                let image = '';
                properties.forEach(function (property: IPropertyModel) {
                 // console.log("property====", property);
                  if (property.propertyImages && property.propertyImages.length == 1) {
                    image += `<div class="row">
                                      <div class="col-md-12">
                                        <img
                                          src=${Common.SITE_URL +
                      "/uploads/" +
                      property.propertyImages[0].imageUrl
                      }
                                          alt="image"
                                          style="width: 100%; height:400px"
                                        />
                                      </div>
                                     </div>`;
                  }

                  let openhousehtml = '';
                  property.isOpenHouse && property.isOpenHouse.forEach(function (resut) {
                    //console.log("startTime=====",startTime);
                    let startTime = resut.startTime || "";
                    let endTime = resut.endTime || "";
                    let date =moment(resut.date).format('DD-MMM-YYYY');
                    let newStartdateval= new Date(date+" "+startTime);
                    let newEnddateval= new Date(date+" "+endTime);
                    openhousehtml += `<div class="text-center" style="width:100%;text-align: center !important;">
                                                      <label class="flyer-label" style="color: #EE8C3A;
                                                          font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">${resut.houseType}:</label>
                                                       <span>${moment(resut.date).format('ddd DD-MMM-YYYY')} ${startTime && moment(newStartdateval).format('HH:mm A')}  - ${endTime && moment(newEnddateval).format('HH:mm A')}  </span><br>
                                                    </div>`;
                  });


                  let number_bedrooms = "";
                  if(property.number_bedrooms!=undefined && property.number_bedrooms){
                    number_bedrooms=`<li> ${property.number_bedrooms} Bedrooms</li>`;
                  }

                  let price = "";
                    if(property.pricingInfo.price!=undefined && property.pricingInfo.price){
                      price=`<div class="row" style="display: flex;flex-wrap: wrap;">
                        <div class="mt-3 mb-3 ml-3" style="position: relative; width: 100%;min-height: 1px;padding-right: 15px;padding-left: 15px;">
                           <h4 style="background: #f1f1f1;font-size: 1.5rem;">Price: $ ${property.pricingInfo.price} per Square Foot</h4>
                        </div>
                     </div>`;
                   }
                  let display_method = property.display_method.replace(/\s/g, "");
                  let propertyAdress = ``;
                  switch (display_method) {
                  case "DONOTShowAddress":
                   propertyAdress += ``;
                    break;
                  case "ShowCity&StateOnly":
                   propertyAdress += `<div class="mt-3 text-center" style="width:100%;margin-top: 1rem !important;text-align: center !important;">
                           <label class="flyer-label" style="color: #EE8C3A;
         font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">Property Address:</label>
                           <p>${property.city}, ${property.state}</p>
                        </div>`;
                    break;
                 default:
                      propertyAdress += `<div class="mt-3 text-center" style="width:100%;margin-top: 1rem !important;text-align: center !important;">
                           <label class="flyer-label" style="color: #EE8C3A;
         font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">Property Address:</label>
                           <p>${property.street_address}, ${property.city},  ${property.state},${property.zipcode}</p>
                        </div>`;
                 }


                  var previewTemplatememail = Common.PREVIEW_EMAIL_UPLOAD_BLAST;
                  var emailtemplate = previewTemplatememail
                    .replace(/#subject#/g, subject)
                    .replace(/#formLine#/g, formLine)
                    .replace(/#formReply#/g, formReply)
                    //.replace(/#streetAddress#/g, property.street_address || " ")
                    .replace(/#mlsNumber#/g, property.mls_number || "--")
                    .replace(/#numberOfBedrooms#/g, number_bedrooms)
                    .replace(/#pricePerSquareFoot#/g, price)
                    //.replace(/#city#/g, property.city || " ")
                    .replace(/#propertyAdress#/g, propertyAdress || " ")
                    //.replace(/#zipCode#/g, property.zipcode || " ")
                    .replace(/#openData#/g, openhousehtml)
                    .replace(/#propertyImage#/g, image || `<div class="row"><div class="col-md-12"><img src="`+Common.SITE_URL+`/uploads/previewimages/img1.jpg" style="width: 100%; height:400px"/></div></div>`)
                  resolve(emailtemplate);
                });
              } else if (blast && blast.blast_type == "RealEstateBrokerage") {
                let image = '';
                properties.forEach(function (property: IPropertyModel) {
                  if (property.propertyImages && property.propertyImages.length == 1) {
                    image += `<div class="row">
                                            <div class="col-md-12">
                                              <img
                                                src=${Common.SITE_URL +
                      "/uploads/" +
                      property.propertyImages[0].imageUrl
                      }
                                                alt="image"
                                                style="width: 100%; height:400px"
                                              />
                                            </div>
                                           </div>`;
                  }
                  var previewTemplatememail = Common.PREVIEW_EMAIL_REAL_ESTATE_BROKERAGE;
                  var emailtemplate = previewTemplatememail
                    .replace(/#subject#/g, subject)
                    .replace(/#formLine#/g, formLine)
                    .replace(/#formReply#/g, formReply)
                    .replace(/#propertyImage#/g, image || `<div class="row"><div class="col-md-12"><img src="`+Common.SITE_URL+`/uploads/previewimages/img1.jpg" style="width: 100%; height:400px"/></div></div>`)
                  resolve(emailtemplate);
                });
              } else {
                console.log("single property....");
                let html: string = '';
                properties.forEach(function (property: IPropertyModel) {
                  let image = "";
                 // console.log("property.propertyImages===",property); 
                  if (property.propertyImages && property.propertyImages.length == 1) {
                    image += `<div class="row">
                                      <div class="col-md-12">
                                        <img
                                          src=${Common.SITE_URL +
                      "/uploads/" +
                      property.propertyImages[0].imageUrl
                      }
                                          alt="image"
                                          style="width: 100%; height:400px"
                                        />
                                      </div>
                                     </div>`;
                  }

                  if (property.propertyImages && (property.propertyImages.length == 2)) {
                    image += `<div style="width:100%;overflow: hidden;">
                                                      <div style="width:50%;overflow: hidden;float:left">
                                                        <img
                                                          src=${Common.SITE_URL +"/uploads/" +property.propertyImages[0].imageUrl}
                                                          style="width:100%;vertical-align: middle;border-style: none;"
                                                        />
                                                      </div>
                                                      <div style="width:50%;overflow: hidden;float:left">
                                                        <img
                                                          src=${
                      Common.SITE_URL +
                      "/uploads/" +
                      property.propertyImages[1].imageUrl
                      }
                                                          alt="image"
                                                          style="width: 100%;vertical-align: middle;border-style: none"
                                                        />
                                      </div>
                                      </div>`;
                  }


                  if (property.propertyImages && property.propertyImages.length == 3) {
                    image += `<div style="height: 560px;overflow: hidden;">
                                         <div style="width: 60%;overflow: hidden; float: left;">
                                         <img src=${Common.SITE_URL +
                      "/uploads/" +
                      property.propertyImages[0].imageUrl
                      } alt="image" style="vertical-align: middle;border-style: none;">
                                            </div> 
                                            <div style="width: 40%;overflow: hidden;float: left;">
                                         <div>
                                         <img src=${Common.SITE_URL +
                      "/uploads/" +
                      property.propertyImages[1].imageUrl
                      } alt="image" style=" vertical-align: middle;border-style: none;">
                                            </div>
                                            <div>
                                         <img src=${Common.SITE_URL +
                      "/uploads/" +
                      property.propertyImages[2].imageUrl
                      } alt="image" style="vertical-align: middle;border-style: none;">
                                            </div>
                                            </div>
                                            </div>`;
                  }


                  if (property.propertyImages && property.propertyImages.length == 4) {
                    image += `<div style="width:100%;overflow: hidden;">
                                             <div style="width:50%;overflow: hidden;float:left">
                                             <img src=${Common.SITE_URL +
                      "/uploads/" +
                      property.propertyImages[0].imageUrl
                      } alt="image" style="width:100%;height: 250px;">
                                                </div> 
                                                <div style="width:50%;overflow: hidden;float:left">
                                             <img src=${Common.SITE_URL +
                      "/uploads/" +
                      property.propertyImages[1].imageUrl
                      } alt="image" style="width:100%;height: 250px;">
                                                </div>
                                                 <div style="width:50%;overflow: hidden;float:left">
                                             <img src=${Common.SITE_URL +
                      "/uploads/" +
                      property.propertyImages[2].imageUrl
                      } alt="image" style="width:100%;height: 250px;">
                                                </div> 
                                                <div style="width:50%;overflow: hidden;float:left">
                                             <img src=${Common.SITE_URL +
                      "/uploads/" +
                      property.propertyImages[3].imageUrl
                      } alt="image" style="width:100%;height: 250px;">
                                                </div>
                                                </div>`;
                  }


                  let openhousehtml = '';
                  property.isOpenHouse && property.isOpenHouse.forEach(function (resut) {
                    //console.log("startTime=====",startTime);
                    let startTime = resut.startTime || "";
                    let endTime = resut.endTime || "";
                    let date =moment(resut.date).format('DD-MMM-YYYY');
                    let newStartdateval= new Date(date+" "+startTime);
                    let newEnddateval= new Date(date+" "+endTime);
                    openhousehtml += `<div class="text-center" style="width:100%;text-align: center !important;">
                                                      <label class="flyer-label" style="color: #EE8C3A;
                                                          font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">${resut.houseType}:</label>
                                                       <span>${moment(resut.date).format('ddd DD-MMM-YYYY')} ${startTime && moment(newStartdateval).format('HH:mm A')}  - ${endTime && moment(newEnddateval).format('HH:mm A')}  </span><br>
                                                    </div>`;
                  });

                  let linkshtml = '';
                  property.linksToWebsites && property.linksToWebsites.forEach(function (resut) {
                    linkshtml += `<div class="ml-3" style="width:100%; margin-left: 1rem !important;"><label class="flyer-label" style="color: #EE8C3A;font-size: 1rem;">Links:</label><br><a href=${resut.url} style="color: #000000;transition: all .5s ease;"><u> ${resut.text}</a></u></div>`;
                  });


                   let price = "";
                    if(property.price!=undefined && property.price){
                      price=`<div class="row" style="display: flex;flex-wrap: wrap;">
                        <div class="mt-3 mb-3 ml-3" style="position: relative; width: 100%;min-height: 1px;padding-right: 15px;padding-left: 15px;">
                           <h4 style="background: #f1f1f1;font-size: 1.5rem;">Price: $ ${property.price} per Square Foot</h4>
                        </div>
                     </div>`;
                   }

                  let property_details = "";
                  if(property.property_details!=undefined && property.property_details){
                    property_details=`<div class="ml-3" style="width:100%; margin-left: 1rem !important;">
                           <label class="flyer-label" style="color: #EE8C3A;
                               font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">Property Detail:</label>
                           <span>${property.property_details}</span>          
                        </div>`;
                  }

                  let bathrooms = "";
                  if(property.number_bathrooms.full!=undefined && property.number_bathrooms.full || property.number_bathrooms.half!=undefined && property.number_bathrooms.half){
                    bathrooms=`<li>${property.number_bathrooms.full+' Full'}  ${property.number_bathrooms.half+' Half'} Bathrooms</li>`;
                  }

                  let year_built = "";
                  if(property.year_built!=undefined && property.year_built){
                    year_built=`<li>  Built ${property.year_built}</li>`;
                  }

                  let lot_size = "";
                  if(property.lot_size!=undefined && property.lot_size){
                    lot_size=`<li>Lot Size: ${property.lot_size} sqft</li>`;
                  }


                  let number_bedrooms = "";
                  if(property.number_bedrooms!=undefined && property.number_bedrooms){
                    number_bedrooms=`<li> ${property.number_bedrooms} Bedrooms</li>`;
                  }

                  let property_type = "";
                  if(property.property_type!=undefined && property.property_type){
                    property_type=`<li>Property Type: ${property.property_type} </li>`;
                  }
      
                  let property_style = "";
                  if(property.property_style!=undefined && property.property_style){
                    property_style=`<li>Property Style: ${property.property_style} </li>`;
                  }

                  let number_stories = "";
                  if(property.number_stories!=undefined && property.number_stories){
                    number_stories=`<li>${property.number_stories} </li>`;
                  }

                  let garageSize = "";
                  if(property.garageSize!=undefined && property.garageSize){
                    garageSize=`<li>Garage: ${property.garageSize} </li>`;
                  }

                  let building_size = "";
                  if(property.building_size!=undefined && property.building_size){
                    building_size=`<li>${property.building_size} square feet</li>`;
                  }

                  let agentimgurl = "";
                  if(agent.image_url!=undefined && agent.image_url){
                     agentimgurl = Common.SITE_URL+"/uploads/"+agent.image_url;
                  }

                   let agentlogourl = "";
                  if(agent.logo_url!=undefined && agent.logo_url){
                     agentlogourl = Common.SITE_URL+"/uploads/"+agent.logo_url;
                  }

                let display_method = property.display_method.replace(/\s/g, "");
                let propertyAdress = ``;
                  switch (display_method) {
                  case "DONOTShowAddress":
                   propertyAdress += ``;
                    break;
                  case "ShowCity&StateOnly":
                   propertyAdress += `<div class="mt-3 text-center" style="width:100%;margin-top: 1rem !important;text-align: center !important;">
                           <label class="flyer-label" style="color: #EE8C3A;
         font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">Property Address:</label>
                           <p>${property.city}, ${property.state}</p>
                        </div>`;
                    break;
                 default:
                      propertyAdress += `<div class="mt-3 text-center" style="width:100%;margin-top: 1rem !important;text-align: center !important;">
                           <label class="flyer-label" style="color: #EE8C3A;
         font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">Property Address:</label>
                           <p>${property.street_address}, ${property.city},  ${property.state},${property.zipcode}</p>
                        </div>`;
                 }



                  var previewTemplatememail = Common.PREVIEW_EMAIL_TEMPLATE;
                  var emailtemplate = previewTemplatememail
                    .replace(/#agentName#/g, agent.name || " ")
                    .replace(/#agentEmail#/g, agent.email || "")
                    .replace(/#agentImage#/g, agentimgurl || Common.SITE_URL+"/uploads/previewimages/dummy-profile.png")
                    .replace(/#companyLogo#/g, agentlogourl || Common.SITE_URL+"/uploads/previewimages/dummy-logo.png")
                    .replace(/#WebsiteUrl#/g, agent.website_url || " ")
                    .replace(/#phone_number#/g, agent.phone_number || " ")
                    .replace(/#companyDetail#/g, agent.company_details ||" ") 
                    .replace(/#subject#/g, subject || ' ')
                    .replace(/#formLine#/g, formLine || ' ')
                    .replace(/#formReply#/g, formReply || ' ')
                    //.replace(/#streetAddress#/g, property.street_address || " ")
                    .replace(/#mlsNumber#/g, property.mls_number || "--")
                    .replace(/#numberOfBedrooms#/g,number_bedrooms)
                    .replace(/#lotSize#/g, lot_size)
                    .replace(/#yearBuilt#/g, year_built)
                    .replace(/#bathrooms#/g, bathrooms)
                    .replace(/#openData#/g, openhousehtml)
                    .replace(/#links#/g, linkshtml)
                    .replace(/#blastHeadline#/g, headline || " ")
                    .replace(/#pricePerSquareFoot#/g, price)
                    .replace(/#propertDetails#/g, property_details)
                    .replace(/#propertyAdress#/g, propertyAdress || " ")
                    
                    //.replace(/#city#/g, property.city || " ")
                   // .replace(/#zipCode#/g, property.zipcode ||  " ")
                    .replace(/#propertyType#/g, property_type)
                    .replace(/#propertyImage#/g, image || `<div class="row"><div class="col-md-12"><img src="`+Common.SITE_URL+`/uploads/previewimages/img1.jpg" style="width: 100%; height:400px"/></div></div>`)
                    .replace(/#propertyStyle#/g, property_style)
                    .replace(/#numberOfStories#/g, number_stories)
                    .replace(/#garageSize#/g,garageSize)
                    .replace(/#building_size#/g,building_size)
                  // console.log("emailtemplat23e====",emailtemplate);

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