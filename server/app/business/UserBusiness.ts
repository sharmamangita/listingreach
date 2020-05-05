/**
 * Business Logic for UserBusiness, called from the Controllers
 */
import express = require("express");
import mongoose = require("mongoose");
var jwt = require('jsonwebtoken');
var _ = require('lodash');
 
import BaseBusiness = require("./BaseBusiness");
import UserRepository = require("./../repository/UserRepository");
import IUserModel = require("./../model/interfaces/IUserModel");
import IEmployeeModel = require("./../model/interfaces/IEmployeeModel");
import EmployeeBusiness = require("./EmployeeBusiness");

import UserModel = require("./../model/UserModel");
const fs = require('fs');
var conversion = require("phantom-html-to-pdf")({
    phantomPath: "/usr/local/bin/phantomjs"
});
var moment = require ('moment');
class UserBusiness implements BaseBusiness<IUserModel> {
    private _userRepository: UserRepository;

    constructor () {
        this._userRepository = new UserRepository();
    }

    create (item: IUserModel, callback: (error: any, result: any) => void) {
		item._id=mongoose.Types.ObjectId();
       this._userRepository.create(item, callback);
    }

    retrieve (query: any, callback: (error: any, result: any) => void) {
        this._userRepository.retrieve(query, callback);
    }
    aggregate (query: any, callback: (error: any, result: any) => void) {
        this._userRepository.aggregate(query, callback);
    }
	retrieveFields (query: any, fields: any, callback: (error: any, result: any) => void) {
        this._userRepository.retrieveFields(query, fields,callback);
    }

    update (_id: string, item: IUserModel, callback: (error: any, result: any) => void) {

        this._userRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._userRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._userRepository.delete(_id , callback);
    }

    deleteMany (query: any, callback:(error: any, result: any) => void) {
        this._userRepository.deleteMany(query , callback);
    }

    findById (_id: string, callback: (error: any, result: IUserModel) => void) {
        this._userRepository.findById(_id, callback);
    }

    count (query: any, callback: (error: any, result: Number) => void) {
        this._userRepository.count(query, callback);
    }
	
    findOne (query: any, callback: (error: any, result: IUserModel) => void) {
        this._userRepository.findOne(query, callback);
    }
	
	createToken(user: any): string {
		//expiresIn seconds
		return jwt.sign({email: user.email}, '93c7ec1855c74462f00a62degecaef8d', { expiresIn: 60*60*5 });
	}
	
	verifyToken(req: express.Request, res: express.Response, callback: (data: any) => void) {
        var token = req.headers.authorization;
        var origin = req.headers.origin;
        if(!token){
            res.status(400);
            res.json({
                "error": "Bad Data"
            });
        } else {
            this._userRepository.findOne({token: token}, function(err, companyUserData){
                if(err){
                    res.status(401).send("Invalid token");
                } else {
					if(companyUserData  && companyUserData.email!="" ) {
						callback(companyUserData);
					} else {
						res.status(401).send("Invalid token");
					}
				}
            });
        }
	}
	generateUserPdf( user:any, imageData:any): void {
        console.log("inpdf");
        try {
            var agentdata :any = [];
            var dateDay = moment(user[0].createdOn).format("DD");
            var dateMonth = moment(user[0].createdOn).format("MMM");
            var dateYear = moment(user[0].createdOn).format("YYYY");
            var registerDate = dateDay+' '+dateMonth+' '+dateYear;
             // date of birth
            var dateOfBirth = "";
            if(user[0].dateofBirth) {
                var expDate = new moment(user[0].dateofBirth, "YYYY-MM-DD");
                var currDate = moment();
                var age = currDate.diff(expDate, 'years');
                var agedays = currDate.diff(expDate, 'days');
                var currDate = moment(expDate).format("DD-MM-YYYY");
                dateOfBirth= currDate+', '+age+'yrs & '+agedays+'days'; 
            }
            
            var fullname="";
            if(user[0].firstName){
                fullname= user[0].firstName+' '+user[0].lastName;
            }
            var experienceYear="";
            if(user[0].experienceYear){
                experienceYear= user[0].experienceYear+' years'+user[0].experienceMonth ? user[0].experienceMonth :' Months';
            }
           
            var summary="";
            if(user[0].summary){
                if(user[0].summary.length > 155){
                    summary= user[0].summary.substring(0,150) + '.....';
                }else{
                   summary = user[0].summary;
                }
            }
            var companyName="";
            if(user[0].companyName){
                companyName=user[0].companyName;
            }
            var currentSalary="";
            if(user[0].currentSalary){
                currentSalary=user[0].currentSalary;
            }
            var expectedSalary="";
            if(user[0].expectedSalary){
                expectedSalary=user[0].expectedSalary;
            }
            var currentlyEmployed="";
            if(user[0].currentlyEmployed){
                currentlyEmployed=user[0].currentlyEmployed;
            }
            var openRelocation="";
            if(user[0].openRelocation){
                openRelocation=user[0].openRelocation;
            }
            var openTravel="";
            if(user[0].openTravel){
                openTravel=user[0].openTravel;
            }
            var felony="";
            if(user[0].felony){
                felony=user[0].felony;
            }
            var phone="";
            if(user[0].phone){
                phone=user[0].phone;
            }
            var gender="";
            if(user[0].gender){
                gender=user[0].gender;
            }
            var authorization="";
            if(user[0].authorization){
                authorization=user[0].authorization;
            }
            var strengths="";
            if(user[0].strengths){
              strengths=user[0].strengths;  
            }
            var improvements='';
            if(user[0].improvements){
              improvements=user[0].improvements  
            }
            var street="";
            var building="";
            var state="";
            var country="";
            var postcode="";
            var address="";
            if(user[0].currentaddress){
                if(user[0].currentaddress[0].street){
                   street = user[0].currentaddress[0].street+','
                }
                if(user[0].currentaddress[0].building){
                   building = user[0].currentaddress[0].building+','
                }
                if(user[0].currentaddress[0].state){
                   state = user[0].currentaddress[0].state+','
                }
                if(user[0].currentaddress[0].country){
                   country = user[0].currentaddress[0].country+','
                }
                if(user[0].currentaddress[0].postcode){
                   postcode= user[0].currentaddress[0].postcode+','
                }
                address=street +building+state+country+postcode;
            }
            var education:any =[];
            if(user[0].education && user[0].education.length>0){
             user[0].education.forEach(function(educations:any,index:any) {
                education.push(`<div className="total-education">
                    <div className="mb-3">
                    <p className="mb-0 font-weight-bold text-success">`+educations.institute_name+`</p>
                    <p className="mb-0 ">`+educations.degree_name+`</p>
                    <p className="mb-0 ">`+(educations.duration ? educations.duration:"")+`</p>
                    <p className="mb-0 ">`+(educations.year_from ? educations.year_from+' year'  : "" )+`</p>
                    
                    <p className="mb-0 ">Major: `+educations.major+`</p>
                    <p className="mb-0 ">GPA/Percentage: `+educations.percentage+`</p></div></div></div>`); 

                });
            }
            var skilldata:any=[];
            if(user[0].skills && user[0].skills.length>0){
             user[0].skills.forEach(function(skill:any,index:any) {
                if(index>=3){
                    skilldata.push(`<span>
                      `+skill.keywordval+`
                   ,</span>`);
                }
                
             });
            }
            var professionalSummary:any =[];
            if(user[0].professionalSummary && user[0].professionalSummary.length>0){
             user[0].professionalSummary.forEach(function(professionalsum:any,index:any) {
               var startDate = new moment(professionalsum.startDate, "YYYY-MM-DD");
                var endDate = new moment(professionalsum.endDate, "YYYY-MM-DD");
                var years = endDate.diff(startDate, 'year');
                startDate.add(years, 'years');

                var months = endDate.diff(startDate, 'months');
                startDate.add(months, 'months');
                var startDates = moment(startDate).format("MMM  YYYY");
                var endDates = moment(endDate).format("MMM  YYYY");
                var totalexp= startDates+'-'+endDates+', '+years + ' years ' + months + ' months '; //20-01-1985, 34 yrs & 105days
                professionalSummary.push(`
                    <div className ="total-professional" >
                    <p className="mb-0 font-weight-bold text-success">`+professionalsum.company_name+`</p>
                    <p className="mb-0 ">`+professionalsum.title+`</p>
                    <p className="mb-0 ">`+professionalsum.department+`</p>
                    <p className="mb-0 "> `+totalexp+`.</p>
                    <p className="mb-0">Project Details:</p>
                    <ul className="font-13">
                        <li>`+professionalsum.project_details+` </li>
                    </ul></div> `)
                });
             }
            var newcss= "<style>body{margin: 0; top: 0px; font-size: 14px; font-family: Helvetica, sans-serif;} .invoice-box{width: 1200px; height: 650px; margin-left:20px; margin-right:20px; padding-left: 20px; padding-right: 20px; border-width: 0px; transform-origin: 0 0; -webkit-transform-origin: 0 0; transform: scale(0.70); -webkit-transform: scale(0.70); font-size:14px;line-height:24px;font-family:Arial,sans-serif;color:#555;}.invoice-box table{    width:100%;    line-height:inherit;text-align:left    }.invoice-box table td{    padding:5px;}.invoice-box table tr.top table td.title{font-size:24px;line-height:45px;color:#030303    } .invoice-box table tr.information table td{padding-bottom:20px}.invoice-box table tr.information table td span.sub-title{}.invoice-box table tr.information table td.billto{color:#fff;background:#6ACEFF;width:300px;padding-bottom:10px!important}.invoice-box table tr.heading td{background:#eee;border-bottom:1px solid #FEFEFE;font-weight:700;height:30px;}.invoice-box table tr.heading-blue td{background:#6ACEFF;    border-bottom:1px solid #ddd;font-weight:500;color:#fff}.invoice-box table tr.details td{height:30px;}.invoice-box table tr.item td{border-bottom:1px solid #eee}.invoice-box table tr.item.last td{border-bottom:none}.invoice-box table tr.total td:nth-child(2){border-top:2px solid #eee;font-weight:700}.td-border-lt-rt{border-left:1px solid #6ACEFF;border-right:1px solid #6ACEFF;border-bottom:1px solid #6ACEFF;}.td-border-rt{border-right:1px solid #6ACEFF;border-bottom:1px solid #6ACEFF;} @media only screen and (max-width:600px){.invoice-box table tr.information table td,.invoice-box table tr.top table td{width:100%;display:block;text-align:center}}.rtl{direction:rtl;font-family:Tahoma,'Helvetica Neue',Helvetica,Helvetica,Arial,sans-serif}.rtl table{text-align:right}.rtl table tr td:nth-child(2){text-align:left}</style>";
            var stamp = '';
            var pdfData = `<!DOCTYPE html><html lang="en"><head> <title>Employee Mirror</title></head><body> <div class="site-wrap"> <div class="site-section bg-light"> <div class="container"> <div class="row"> <div class="col-md-12 col-lg-8 mb-5"> <div class="bg-img"> </div> <div class="p-5 bg-white"> <div class="row"> <div class="col-md-12 col-lg-4 mb-3 text-center"> <img src="images/person_3.jpg" alt="Image" class="profile-img img-fluid"> </div> <div class="col-md-12 col-lg-8"> <div> <img src=`+imageData+` alt="Image" class="QR code for profile" style="width:80px; float:right;"> </div> <div class="job-post-item-header d-flex align-items-center"> <h2 class="mr-3 text-black h4">`+fullname+`</h2> </div> <div class="d-lg-flex"> <span class="icon-star checked mr-1 mt-1"></span> <span class="icon-star checked mr-1 mt-1"></span> <span class="icon-star checked mr-1 mt-1"></span> <span class="icon-star checked mr-1 mt-1"></span> <span class="icon-star mr-1 mt-1"></span> 115 References </div> <div class="job-post-item-body d-block"> <div class="green">`+skilldata+`</div> <div>City, State, USA</div> <div>`+experienceYear+` Experience</div> </div> </div> </div> <hr> <p class="mt-3">`+summary+`. </p> <hr> <div class="row"> <div class="col-6"> <h2 class="mr-3 text-black h4">Keywords/ Skills</h2> </div> </div> <div class="mb-3"> `+skilldata+` </div> <div class="mb-3"> <div class="row"> <div class="col-4"> <span class="mb-0 skill">Schematic </span> </div> <div class="col-8"> <span class="icon-star checked mt-1"></span> <span class="icon-star checked mt-1"></span> <span class="icon-star checked mt-1"></span> <span class="icon-star checked mt-1"></span> <span class="icon-star mt-1"></span> </div> </div> </div> <div class="mb-3"> <div class="row"> <div class="col-4"> <span class="mb-0 skill">Team Player </span> </div> <div class="col-8"> <span class="icon-star checked mt-1"></span> <span class="icon-star checked mt-1"></span> <span class="icon-star checked mt-1"></span> <span class="icon-star checked mt-1"></span> <span class="icon-star mt-1"></span> </div> </div> </div> <div class="mb-3"> <div class="row"> <div class="col-4"> <span class="mb-0 skill">Take Initiative </span> </div> <div class="col-8"> <span class="icon-star checked mt-1"></span> <span class="icon-star checked mt-1"></span> <span class="icon-star checked mt-1"></span> <span class="icon-star checked mt-1"></span> <span class="icon-star mt-1"></span> </div> </div> </div> <hr> <div class="row"> <div class="col-6"> <h2 class="mr-3 text-black h4">Education</h2> </div> </div> <div class="mb-3">`+education+` </div> <hr> <div class="row"> <div class="col-6"> <h2 class="mr-3 text-black h4">Professional Experience</h2> </div> </div> <div>`+professionalSummary+` </div> <hr> <h2 class="mr-3 text-black h4">Areas of Improvements</h2> <div> <p class="mb-0 ">`+improvements+`.</p> </div> <hr> <h2 class="mr-3 text-black h4">Strengths</h2> <div> <p class="mb-0 ">`+strengths+`.</p> </div> <hr> </div> </div> <div class="col-lg-4"> <h2 class="mr-3 text-black h4">Personal Information</h2> <div class="p-4 mb-3 bg-white"> <p class="mb-0 font-weight-bold"><span class="icon-address-book" title="Address"></span> Address</p> <p class="mb-3">`+address+`</p> <p class="mb-0 font-weight-bold"><span class="icon-phone-square" title="Phone"></span> Phone</p> <p class="mb-3"><a href="#">`+phone+`</a></p> <p class="mb-0 font-weight-bold"><span class="icon-contact_mail" title="Email Address"></span> Email Address</p> <p class="mb-3"><a href="#">`+user[0].email+`</a></p> <p class="mb-0 font-weight-bold"><span class="icon-birthday-cake" title="Birthday on"></span> Birthday on</p> <p class="mb-3">`+dateOfBirth+`</p> <p class="mb-0 font-weight-bold"><span class="icon-location-arrow" title="Open to relocation"></span> Open to relocation?</p> <p class="mb-3">`+openRelocation+`</p> <p class="mb-0 font-weight-bold"><span class="icon-globe" title="Open to travel?"></span> Open to travel?</p> <p class="mb-3">`+openTravel+`</p> <p class="mb-0 font-weight-bold"><span class="icon-work" title="Work Authorization"></span> Work Authorization </p> <p class="mb-3">`+authorization+`</p> <p class="mb-0 font-weight-bold"><span class="icon-chain" title="Felony"></span> Felony </p> <p class="mb-3">`+felony+`</p> <p class="mb-0 font-weight-bold"><span class="icon-card_membership" title="Member Since"></span> Member Since</p> <p class="mb-3">`+registerDate+`</p> <p class="mb-0 font-weight-bold"><span class="icon-dollar" title="Current Salary"></span> Current Salary</p> <p class="mb-3">`+currentSalary+`</p> <p class="mb-0 font-weight-bold"><span class="icon-dollar" title="Expected Salary"></span> Expected Salary</p> <p class="mb-3">`+expectedSalary+`</p> <p class="mb-0 font-weight-bold"><span class="icon-work" title="Expected Salary"></span> Total Tenure at Jobs</p> <p class="mb-3">`+experienceYear+` Years</p> </div> </div> </div> </div> </div> </div></body></html>`;
            
            conversion({ 
                html: pdfData,
                paperSize: { width: '895px', height: '742px', margin: '0px' } 
            }, function(err:any, pdf:any) {
                var output = fs.createWriteStream(process.cwd() + '/public/upload/'+'user'+user[0].id+'.pdf')
                if(err) {
                    console.log("pdf.error:",err);
                }
                if(pdf) {
                    console.log("pdf.logs:",pdf.logs);
                    //console.log("pdf.numberOfPages:",pdf.numberOfPages);
                }
                pdf.stream.pipe(output);
            });
            
        }
        catch (e)  {
            console.log(e);
            console.log("error in generate/email invoice");
        }
    }
}


Object.seal(UserBusiness);
export = UserBusiness;