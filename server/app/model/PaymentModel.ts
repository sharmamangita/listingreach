/**
 * User model
 */
import mongoose = require("mongoose");

import IAgentModel = require('./interfaces/IAgentModel');

class AgentModel {

    private _agentModel : IAgentModel;

    constructor(AgentModel: IAgentModel) {
        this._paymentModel = PaymentModel;
    }
    get _id (): mongoose.Types.ObjectId {
        return this._paymentModel._id;
    }
    get user_id (): mongoose.Types.ObjectId {
        return this._paymentModel.user_id;
    }
    get blast_id (): mongoose.Types.ObjectId {
        return this._paymentModel.blast_id;
    }
    get amount (): mongoose.Types.ObjectId {
        return this._paymentModel.amount;
    }
    
    get createdOn (): Date {
        return this._paymentModel.createdOn;
    }
    get updateOn (): Date {
        return this._paymentModel.updateOn;
    }
    
}
Object.seal(PaymentModel);
export =  PaymentModel;

