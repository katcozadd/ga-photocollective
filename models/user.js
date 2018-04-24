//Reguring mongoose and bcrypt
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: String,
  passwordDigest: String
});

//taking the UserSchema and creating a secure password
UserSchema.statics.createSecure = function(email, password, callback){
  let UserModel = this; //this references to the user model
  bcrypt.genSalt(function(err, salt){//hashing the password that user enters at log in
    console.log("salt is: ", salt);
    bcrypt.hash(password, salt, function(err, hashPassword){
      UserModel.create({ //creating the new user and storing info in the database 'photo-users' with a hashed password
        email : email,
        passwordDigest : hashPassword
      }, callback);
    });
  });
};

UserSchema.methods.checkPassword = function(password) {
  return bcrypt.compareSync(password, this.passwordDigest)
};

var User = mongoose.model('User', UserSchema);

module.exports = User;