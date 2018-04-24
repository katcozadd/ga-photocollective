//Reguring mongoose and bcrypt
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  passwordDigest: {
    type: String,
    required: true,
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;