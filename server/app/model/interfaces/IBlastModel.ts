/**
 * interface for User model
 */

import mongoose = require("mongoose");

interface IBlastModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    user_id: mongoose.Types.ObjectId,
    blast_type: string,
    scheduledDate: Date,
    selected_template_id: string,
    selected_template_date: Date,
    sentDate: Date,
    agentData: {
        name: string,
        designation: string,
        email: string,
        website_url: string,
        phone_number: string,
        company_details: string,
        other_information: string,
        image_url: string,
        logo_url: string

    },
    associations: {
        association: {
            id: string,
            name: string,
        },
        segment: {
            id: String,
            name: String,
            lists: []
        }
    }[],
    status: string
}

export = IBlastModel;