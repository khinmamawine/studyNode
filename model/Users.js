var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt =require('bcrypt-nodejs');
 var UsersSchema = new Schema({
   name:{
     type: String,
     required:true,
   },
   email:{
     type: String,
     required:true,
     unique:true,
   },
   password:{
     type: String,
     required:true,
   },
 })
 UsersSchema.pre('save',function (next){
   this.password =bcrypt.hashSync(this.password,bcrypt.genSaltSync(8),null);
next();
});
 UsersSchema.statics.compare = function(cleartext,encrypted){
   return bcrypt.compareSync(cleartext,encrypted);
 };
module.exports =mongoose.model('Users',UsersSchema);
