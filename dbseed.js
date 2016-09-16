'use strict';

const { connect, disconnect } = require('./database');
const Size = require('./models/size');
const Topping = require('./models/topping');

//Drop the collections first
connect()
.then(() => ( Size.remove({})))
.then(() => ( Topping.remove({})))
.then(() =>
  Size.insertMany([
    {inches: 8, name: 'Small'},
    {inches: 10, name: 'Medium'},
    {inches: 12, name: 'Large'}
  ])
)
.then(() =>
  Topping.insertMany([
    {title: 'Pepperonni'},
    {title: 'Cheese'},
    {title: 'Onion'}
  ])
)
.then(disconnect)
.catch(console.error);
//disconnect the server after seeding
