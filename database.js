'use strict';

const mongoose = require('mongoose');

const MONGODB_URL = 'mongodb://userNamePizza:Pizza0001@ds033046.mlab.com:33046/pizzadebeppo';
/////////////////////////////////////////


/////////////////////////////////////////
//Set the mongoose promise library to the native Node.js library
mongoose.Promise = Promise;
/////////////////////////////////////////


/////////////////////////////////////////
//Export the connection to mongodb
module.exports.connect = () => mongoose.connect(MONGODB_URL);
module.exports.disconnect = () => mongoose.disconnect();
/////////////////////////////////////////
