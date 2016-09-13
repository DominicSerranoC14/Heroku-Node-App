'use strict';

const { MongoClient: { connect }} = require('mongodb');
const MONGODB_URL = 'mongodb://localhost:27017/pizzadebeppo';
//Store the database as a global variable
let db;
/////////////////////////////////////////


/////////////////////////////////////////
//Export the connection to mongodb
module.exports.connect = () => connect(MONGODB_URL).then(_db => db = _db);
module.exports.db = () => db;
/////////////////////////////////////////
