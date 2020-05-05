/**
 * application model repository
 */

import PostreviewSchema = require("./../dataAccess/schemas/PostreviewSchema");
import RepositoryBase = require("./BaseRepository");
import IPostreviewModel = require("./../model/interfaces/IPostreviewModel");

class PostreviewRepository  extends RepositoryBase<IPostreviewModel> {
    constructor () {
        super(PostreviewSchema);
    }
	

}

Object.seal(PostreviewRepository);
export = PostreviewRepository;