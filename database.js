'use strict';

const mongoose = require('mongoose');

const MONGODB_URL = 'mongodb://localhost:27017/pizzadebeppo';
/////////////////////////////////////////


/////////////////////////////////////////
//Set the mongoose promise library to the native Node.js library
mongoose.Promise = Promise;
/////////////////////////////////////////


/////////////////////////////////////////
//Every collection in mongoose needs its own model
//Mongoose model: the post object should match the model obj passed at the second arg
mongoose.model('Contact', {
  name: String,
  email: String,
  phone: String,
  message: String
});
/////////////////////////////////////////


/////////////////////////////////////////
//Export the connection to mongodb
module.exports.connect = () => mongoose.connect(MONGODB_URL);
/////////////////////////////////////////
