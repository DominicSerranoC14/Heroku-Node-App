'use strict';

const mongoose = require('mongoose');
/////////////////////////////////////////

const HTML_EMAIL_VAL = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

/////////////////////////////////////////
//Every collection in mongoose needs its own model
//Mongoose model: the post object should match the model obj passed at the second arg
module.exports = mongoose.model('Order', {
  name: {type: String, required: [true, 'Please enter a valid name']},
  //Email schema: email is required and must be a string
  email: {type: String, required: true, lowercase: true, match: HTML_EMAIL_VAL},
  phone: {type: String, required: [true, 'Please enter a valid phone number']},
  size: {type: Number, required: [true, 'Please enter a valid size']},
  toppings: [String]
});
/////////////////////////////////////////
