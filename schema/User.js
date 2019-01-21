const mongoose = require('mongoose');

// create a schema of collection
const userSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : String,
    address : String,
    salary : Number
});

var UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;