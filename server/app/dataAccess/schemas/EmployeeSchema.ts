/**
 * Employe schema for collections: employee
 */

import DataAccess = require('../DataAccess');
import Users = require('./UserSchema');

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class EmployeeSchema {

    static get schema () {
        var schema =  mongoose.Schema({
           _id: mongoose.Schema.Types.ObjectId,
            userId: {
                    type: mongoose.Schema.Types.ObjectId, ref: Users
            },
            dateofBirth : {
                type: Date,
               // required: true
            },
            summary : {
                type: String
                
            },
            professionalSummary: [{
                company_name: {
                    type: String
                },
                technology:{
                    type: String
                },
                currentlyEmployed:{
                    type: String
                },
                department:{
                    type:String
                },
                startDate:{
                    type: Date
                },
                endDate:{
                    type: Date
                },
                project_details:{
                    type: String
                },
                title:{
                    type:String
                }
            }],
            currentSalary: {
                type: String
            },
            gender:{
                type:String
            },
            currentsalaryflag:{
                type:String
            },
            expectedsalaryflag: {
                type: String
            },
            expectedSalary: {
                type: String
            },
            currentlyEmployed: {
                type: String
            },
            permanentaddressFlag:{
                type:String
            },
            openRelocation:{
                type: String
            },
            openTravel:{
                type: String
            },
            authorization:{
                type:String
            },
            felony:{
                type: String
            },
            phone:{
                type: String
            },
            alternateMobile_number:{
                type: String
            },
            alternateEmail:{
                type: String
            },
            experienceYear:{
                type:String
            },
            experienceMonth:{
                type:String
            },
            designation:{
                type:String    
            },
            education:[{
                institute_name: {
                    type: String
                },
                degree_name:{
                    type: String
                },
                duration:{
                    type: String
                },
                percentage:{
                    type: String
                },
                major:{
                    type: String
                },
                year_from:{
                    type: String
                },
                year_to:{
                    type: String
                },
                month_from:{
                    type: String
                },
                month_to:{
                    type: String
                },
                gpaflag:{
                    type: String
                },
                othereducation:{
                    type: String
                }
            }],
            skills:[{
                keywordval: {
                    type: String
                }
            }],
            strengths:{
                 type: String
            },
            improvements:{
                type: String
            },
            social_media:[{
                value: {
                  type: String
                }
            }], 
            defoultsocial_media:{
                facebook: {
                    type: String
                },
                twitter:{
                    type: String
                },
                instagram:{
                    tyle:String
                }
            },
            profilePic:{
                type: String
            },
            profileCover:{
                type: String
            },
            currentaddress: {
                street:{
                    type: String
                },
                building:{
                    type: String
                },
                city:{
                    type: String
                },
                state:{
                    type: String
                },
                country:{
                    type: String
                },
                postCode:{
                    type: String
                },
                timezone:{
                    type: String
                }
            },
            permanentaddress: {
                street:{
                    type: String
                },
                building:{
                    type: String
                },
                city:{
                    type: String
                },
                state:{
                    type: String
                },
                country:{
                    type: String
                },
                postCode:{
                    type: String
                },
                timezone:{
                    type: String
                }
            },
            resume:{
                type:String
            },
            totaloverall:{
                type:String
            },
            createdDate: {
                type: Date
            },
            
            updatedDate: {
                type: Date
            }
        });

        return schema;
    }
}
var EmployeeModel = mongooseConnection.model("Employee", EmployeeSchema.schema);
export =EmployeeModel;

