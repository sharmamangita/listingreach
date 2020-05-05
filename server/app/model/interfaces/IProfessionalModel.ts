/**
 * interface for User model
 */

import mongoose = require("mongoose");

interface IProfessionalModel extends mongoose.Document {
    company_name: string;
    technology: string;
    department: string;
    duration: Date;
    project_details: string;
   
}

export = IProfessionalModel;