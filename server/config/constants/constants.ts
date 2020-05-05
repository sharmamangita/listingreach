/**
 * Created by 76East.
 */

class Constants {
    static DB_CONNECTION_STRING: string = process.env.NODE_ENV === 'production' ? process.env.dbURI : "mongodb://localhost:27017/employeemirror"
}
Object.seal(Constants);
export = Constants;