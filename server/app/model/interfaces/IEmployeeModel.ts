/**
 * interface for Emplooye model
 */

import mongoose = require("mongoose");
import IAddressModel = require('./IAddressModel');

interface IEmployeeModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    userId:string,
    dateofBirth : Date,
    summary : string,
    designation:string,
    professionalSummary: [{
        _id?: mongoose.Types.ObjectId;
        company_name: string;
        technology: string;
        department: string;
        startDate: Date;
        endDate: Date;
        project_details: string;
        title:string;
        currentlyEmployed:string;
    }],
    gender:string,
    currentSalary:string,
    currentsalaryflag:string,
    expectedsalaryflag:string,
    expectedSalary:string,
    currentlyEmployed:string,//boolean
    openRelocation:string,//boolean
    openTravel:string,
    authorization:string,
    felony:string,//string
    phone: string,
    permanentaddressFlag:string,
    alternateMobile_number:string,
    alternateEmail: string,
    currentaddress: IAddressModel,
    permanentaddress: IAddressModel,
    education:[{
        institute_name: string;
        degree_name: string;
        duration: string;
        year_from:string;
        year_to:string;
        month_from:string;
        month_to:string;
        percentage: string;
        major:string;
        gpaflag:string;
        othereducation:string;
    }],
    social_media:[string],
    defoultsocial_media:[{
        facebook: string;
        twitter: string;
        instagram: string;
    }],
    skills:[{ 
        keywordval:string
    }],
    strengths:string,
    totaloverall:string,
    improvements:string,
    profilePic:string,
    profileCover:string,
    resume: string,
    experienceYear:string,
    experienceMonth:string,
    createdDate:Date,
    updatedDate: Date,
}

export = IEmployeeModel;
