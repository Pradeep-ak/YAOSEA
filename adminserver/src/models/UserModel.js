const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // accountId: String,
    // username:String,
    // password:String,
    // name:String,
    // email: String,
    // phone: String
}, { strict: false });

UserSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj._id;
    delete obj.__v;
    return obj;
}
 
var UserModel = mongoose.model('User', UserSchema, "user");
 
module.exports = UserModel