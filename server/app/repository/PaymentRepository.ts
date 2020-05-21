/**
 * application model repository
 */

import PaymentSchema = require("./../dataAccess/schemas/PaymentSchema");
import RepositoryBase = require("./BaseRepository");
import IPaymentModel = require("./../model/interfaces/IPaymentModel");

class PaymentRepository  extends RepositoryBase<IPaymentModel> {
    constructor () {
        super(PaymentSchema);
    }
	

}

Object.seal(PaymentRepository);
export = PaymentRepository;