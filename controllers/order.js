'use strict';

const Order = require('../models/order');
const Size = require('../models/size');
const Topping = require('../models/topping');
/////////////////////////////////////////

/////////////////////////////////////////
module.exports.new = (req, res) => {
  //Pass in an array of promises
  //Then the resolves are passed back
  Promise
    .all([
      Size.find().sort({inches: 1}),
      Topping.find()
    ])
    .then(([sizes, toppingList]) => {
      res.render('order.pug', {pageTitle: 'Order', sizes, toppingList})
    });
};


module.exports.create = (req, res, error) => {
  Order
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch((error) => {
      //showing errors on failed submital
      //Rerender the order for with toppings and sizes
      const msg = Object.keys(error.errors).map(key => error.errors[key].message);
      return Promise
      .all([
        Size.find().sort({inches: 1}),
        Topping.find()
      ])
      .then(([sizes, toppingList]) => {
        res.render('order.pug', {pageTitle: 'Order', sizes, toppingList, msg})
      });
    });
};
/////////////////////////////////////////
