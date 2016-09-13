'use strict';

const { MongoClient: { connect }} = require('mongodb');
const MONGODB_URL = 'mongodb://localhost:27017/pizzadebeppo';
//Store the database as a global variable
let db;
/////////////////////////////////////////


/////////////////////////////////////////
//Export the connection to mongodb
module.exports.connect = () => connect(MONGODB_URL).then(_db => db = _db);
//Exporting the db object as a getter function
module.exports.db = () => db;
/////////////////////////////////////////
