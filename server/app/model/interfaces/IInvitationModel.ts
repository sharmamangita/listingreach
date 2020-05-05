/**
 * interface for User model
 */

import mongoose = require("mongoose");

interface IInvitationModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    fullname : string,
    email : string,
    userid: string,
    status: string,
    linkdinId: string,
    websiteref:string,
    token:string,
    createdOn: Date,
}

export = IInvitationModel;
