const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {type:String, required:true},
  lastName: {type:String, required:true},
  companyName: {type:String, required:true},
  phoneNumber: {type:String, required:true,unique:true},
  password: {type:String, required:true},
  confirmPassword: {type:String, required:true},
},
{ timestamps: true })

const Users = mongoose.model('User', userSchema);

module.exports = Users;


