'use strict';

const { Router } = require('express');
const router = Router();
const Order = require('../models/order');
const Size = require('../models/size');
const Topping = require('../models/topping');
/////////////////////////////////////////


/////////////////////////////////////////
router.get('/order', (req, res) => {

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

});

//POST Routes for order
router.post('/order', (req, res, error) => {

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
});
/////////////////////////////////////////

module.exports = router;
