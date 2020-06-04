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
              let config = { uploadapiUrl: 'http://localhost:3000', };
              if (template && template.template_type == 'MultipleProperties') {
                console.log("multiple properties....");
                var html = '';
                properties.forEach(function (property: IPropertyModel) {

                  html += `<div class="flyer-bg" style="background: #f1f1f1;">
                                             <div class="" style="display: block;display: flex;flex-wrap: wrap;border-top: 2px solid #ccc;">
                                                <div style="width:50%;display: block; background:#f1f1f1;height: 400px;">`;
                  if (property.propertyImages && property.propertyImages.length == 1) {
                    html += `
                                                      <img
                                                        src=${Common.SITE_URL +
                      "/uploads/" +
                      property.propertyImages[0].imageUrl
                      }
                                                        alt="image"
                                                        style="width: 100%; height:400px"
                                                      />`;
                  }

                  html += `</div><div style="width:50%;display: block; background:#f1f1f1; height: 400px;">
                                                   <div class="" style="display: flex;flex-wrap: wrap;">
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
                                                <div>
                                                   <div class="mt-3 text-center" style="width:100%;margin-top: 1rem !important;text-align: center !important;">
                                                      <label class="flyer-label" style="color: #EE8C3A;
                                                         font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">Property Address:</label>
                                                      <p>${property.street_address}, ${property.city}, ${property.zipcode}</p>
                                                   </div>`;
                  property.isOpenHouse && property.isOpenHouse.forEach(function (resut) {
                    let startTime = resut.date + " " + resut.startTime;
                    let endTime = resut.date + " " + resut.endTime;
                    html += `<div class="text-center" style="width:100%;text-align: center !important;">
                                                      <label class="flyer-label" style="color: #EE8C3A;
                                                          font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">${resut.houseType}:</label>
                                                       <span>${moment(resut.date).format('ddd DD-MMM-YYYY')} ${resut.startTime && moment(resut.startTime).format('HH:mm A')}  - ${resut.endTime && moment(resut.endTime).format('HH:mm A')}  </span><br>
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
                  html += ` </div>
                                                </div>
                                             </div>
                                        </div>`;

                  var previewTemplatememail = Common.PREVIEW_EMAIL_MULTIPROPERTY_TEMPLATE;
                  var emailtemplate = previewTemplatememail
                    .replace(/#multiproperty#/g, html)
                    .replace(/#agentName#/g, agent.name)
                    .replace(/#agentEmail#/g, agent.email)
                    .replace(/#agentImage#/g, agent.image_url || Common.SITE_URL + "/public/assets/images/dummy-profile.png")
                    .replace(/#companyLogo#/g, agent.logo_url || Common.SITE_URL + "/public/assets/images/dummy-logo.png")
                    .replace(/#WebsiteUrl#/g, agent.website_url)
                    .replace(/#phone_number#/g, agent.phone_number)
                    .replace(/#companyDetail#/g, agent.company_details)
                    .replace(/#subject#/g, subject)
                    .replace(/#formLine#/g, formLine)
                    .replace(/#formReply#/g, formReply)
                    .replace(/#blastHeadline#/g, headline);
                  resolve(emailtemplate);
                });
              } else if (template && template.template_type == 'UploadBlast') {
                console.log("UploadBlast ....");

                let image = '';
                properties.forEach(function (property: IPropertyModel) {
                  console.log("property====", property);
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
                    let startTime = resut.date + " " + resut.startTime;
                    let endTime = resut.date + " " + resut.endTime;
                    openhousehtml += `<div class="text-center" style="width:100%;text-align: center !important;">
                                                      <label class="flyer-label" style="color: #EE8C3A;
                                                          font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">${resut.houseType}:</label>
                                                      <span>${moment(resut.date).format('ddd DD-MMM-YYYY')} ${resut.startTime && moment(resut.startTime).format('HH:mm A')}  - ${resut.endTime && moment(resut.endTime).format('HH:mm A')}  </span><br>
                                                    </div>`;
                  });

                  var previewTemplatememail = Common.PREVIEW_EMAIL_UPLOAD_BLAST;
                  var emailtemplate = previewTemplatememail
                    .replace(/#subject#/g, subject)
                    .replace(/#formLine#/g, formLine)
                    .replace(/#formReply#/g, formReply)
                    .replace(/#streetAddress#/g, property.street_address)
                    .replace(/#mlsNumber#/g, property.mls_number)
                    .replace(/#numberOfBedrooms#/g, property.number_bedrooms)
                    .replace(/#pricePerSquareFoot#/g, property.pricingInfo[0].price)
                    .replace(/#city#/g, property.city)
                    .replace(/#zipCode#/g, property.zipcode)
                    .replace(/#openData#/g, openhousehtml)
                    .replace(/#propertyImage#/g, image)
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
                    .replace(/#propertyImage#/g, image)
                  resolve(emailtemplate);
                });
              } else {
                console.log("single property....");
                let html: string = '';
                properties.forEach(function (property: IPropertyModel) {
                  let image = "";

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
                    image += `<div class="row" style="display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;">
                                                      <div class="col-md-6 pr-1" style="padding-right: 0.25rem !important;flex: 0 0 50%;max-width: 50%;">
                                                        <img
                                                          src=${
                      Common.SITE_URL +
                      "/uploads/" +
                      property.propertyImages[0].imageUrl
                      }
                                                          style="width:100%;vertical-align: middle;border-style: none;"
                                                        />
                                                      </div>
                                                      <div class="col-md-6 pl-1" style="padding-right: 0.25rem !important;flex: 0 0 50%;max-width: 50%;">
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
                    image += `<div class="row" style="display: flex; -ms-flex-wrap: wrap;flex-wrap: wrap;margin-right: -15px;margin-left: -15px;">
                                         <div class="col-md-8 pr-0" style="padding-right: 0 !important">
                                         <img src=${Common.SITE_URL +
                      "/uploads/" +
                      property.propertyImages[0].imageUrl
                      } alt="image" style="width:100%;height: 100%;vertical-align: middle;border-style: none;">
                                            </div> 
                                            <div class="col-md-4 pl-0 pr-0" style="padding-left: 0 !important;">
                                         <div class="col-md-12 pl-0">
                                         <img src=${Common.SITE_URL +
                      "/uploads/" +
                      property.propertyImages[1].imageUrl
                      } alt="image" style=" vertical-align: middle;border-style: none;">
                                            </div>
                                            <div class="col-md-12 pl-0">
                                         <img src=${Common.SITE_URL +
                      "/uploads/" +
                      property.propertyImages[2].imageUrl
                      } alt="image" style="vertical-align: middle;border-style: none;">
                                            </div>
                                            </div>
                                            </div>`;
                  }


                  if (property.propertyImages && property.propertyImages.length == 4) {
                    image += `<div class="row">
                                             <div class="col-md-6 pr-1 mb-1">
                                             <img src=${Common.SITE_URL +
                      "/uploads/" +
                      property.propertyImages[0].imageUrl
                      } alt="image" style="width:100%;height: 250px;">
                                                </div> 
                                                <div class="col-md-6 pl-0 mb-1">
                                             <img src=${Common.SITE_URL +
                      "/uploads/" +
                      property.propertyImages[1].imageUrl
                      } alt="image" style="width:100%;height: 250px;">
                                                </div>
                                                 <div class="col-md-6 pr-1">
                                             <img src=${Common.SITE_URL +
                      "/uploads/" +
                      property.propertyImages[2].imageUrl
                      } alt="image" style="width:100%;height: 250px;">
                                                </div> 
                                                <div class="col-md-6 pl-0">
                                             <img src=${Common.SITE_URL +
                      "/uploads/" +
                      property.propertyImages[3].imageUrl
                      } alt="image" style="width:100%;height: 250px;">
                                                </div>
                                                </div>`;
                  }


                  let openhousehtml = '';
                  property.isOpenHouse && property.isOpenHouse.forEach(function (resut) {
                    let startTime = resut.date + " " + resut.startTime;
                    let endTime = resut.date + " " + resut.endTime;
                    openhousehtml += `<div class="text-center" style="width:100%;text-align: center !important;">
                                                      <label class="flyer-label" style="color: #EE8C3A;
                                                          font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">${resut.houseType}:</label>
                                                       <span>${moment(resut.date).format('ddd DD-MMM-YYYY')} ${resut.startTime && moment(resut.startTime).format('HH:mm A')}  - ${resut.endTime && moment(resut.endTime).format('HH:mm A')}  </span><br>
                                                    </div>`;
                  });

                  let linkshtml = '';
                  property.linksToWebsites && property.linksToWebsites.forEach(function (resut) {
                    linkshtml += `<br><a href=${resut.url} style="color: #000000;transition: all .5s ease;"><u> ${resut.text}</a></u>`;
                  });



                  var previewTemplatememail = Common.PREVIEW_EMAIL_TEMPLATE;
                  var emailtemplate = previewTemplatememail
                    .replace(/#agentName#/g, agent.name)
                    .replace(/#agentEmail#/g, agent.email)
                    .replace(/#agentImage#/g, agent.image_url || Common.SITE_URL + "/public/assets/images/dummy-profile.png")
                    .replace(/#companyLogo#/g, agent.logo_url || Common.SITE_URL + "/public/assets/images/dummy-logo.png")
                    .replace(/#WebsiteUrl#/g, agent.website_url)
                    .replace(/#phone_number#/g, agent.phone_number)
                    .replace(/#companyDetail#/g, agent.company_details)
                    .replace(/#subject#/g, subject)
                    .replace(/#formLine#/g, formLine)
                    .replace(/#formReply#/g, formReply)
                    .replace(/#streetAddress#/g, property.street_address)
                    .replace(/#mlsNumber#/g, property.mls_number)
                    .replace(/#numberOfBedrooms#/g, property.number_bedrooms)
                    .replace(/#half#/g, property.number_bathrooms[0].half)
                    .replace(/#lotSize#/g, property.lot_size)
                    .replace(/#yearBuilt#/g, property.year_built)
                    .replace(/#full#/g, property.number_bathrooms[0].full)
                    .replace(/#openData#/g, openhousehtml)
                    .replace(/#links#/g, linkshtml)
                    .replace(/#blastHeadline#/g, headline)
                    .replace(/#pricePerSquareFoot#/g, property.price)
                    .replace(/#propertDetails#/g, property.property_details)
                    .replace(/#city#/g, property.city)
                    .replace(/#zipCode#/g, property.zipcode)
                    .replace(/#propertyType#/g, property.property_type)
                    .replace(/#propertyImage#/g, image)
                    .replace(/#propertyStyle#/g, property.property_style)
                    .replace(/#numberOfStories#/g, property.number_stories)
                    .replace(/#garageSize#/g, property.garageSize)

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