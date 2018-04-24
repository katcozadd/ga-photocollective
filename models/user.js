//Reguring mongoose and bcrypt
const mongoose = require('mongoose');
if (process.env.NODE_ENV == "production") {
  console.log("connecting to... " + process.env.NODE_ENV)
  console.log("also connecting to mlab  " + process.env.MLAB_URL)
  mongoose.connect(process.env.MLAB_URL)
} else {
  console.log("this is the local ")
  mongoose.connect("mongodb://localhost/colorado-collective");
}


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

//using this to authenticate the user on log in
UserSchema.statics.authenticate = function (email, password, callback) {
  this.findOne({email: email}, function (err, returningUser) { // find a user by the email they entered in log in form
    console.log(returningUser);
    //send back errors if it is not a returning user
    if (!returningUser) {
      console.log('There is no user with the email ' + email); //incorrect email
      callback("No user found with that email", null); 
    } else if (returningUser.checkPassword(password)) { //returning email and password check
      callback(null, returningUser);
    } else {
      callback("Incorrect password! Please try again.", null); //incorrect password
    }
  });
};

var User = mongoose.model('User', UserSchema);

module.exports = User;