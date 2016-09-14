'use strict';

const { Router } = require('express');
const router = Router();
const Contact = require('../models/contact');
const Order = require('../models/order');
const Size = require('../models/size');
const Topping = require('../models/topping');
/////////////////////////////////////////


/////////////////////////////////////////
// GET routers
router.get('/', (req, res) => {
  //Will render the index file in the views dir
  res.render('index.pug', {active: true});
});

//Route for about page
router.get('/about', (req, res) => {
  res.render('about.pug', {pageTitle: 'About', active: true});
});

//Route for the contact page
router.get('/contact', (req, res) => {
  res.render('contact.pug', {pageTitle: 'Contact', active: true});

});

//Route for the order page
router.get('/order', (req, res) => {

  //Pass in an array of promises
  //Then the resolves are passed back
  Promise
    .all([
      Size.find().sort({inches: 1}),
      Topping.find()
    ])
    .then(([sizes, toppingList]) => res.render('order.pug', {pageTitle: 'Order', sizes, toppingList}));

});
/////////////////////////////////////////


/////////////////////////////////////////
//POST routers
router.post('/contact', (req, res, error) => {

  //Instantiating and sending a new Contact obj from the Contact model
  Contact
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch(error);

});

router.post('/order', (req, res, error) => {

  //Instantiating and sending a new Order obj from the Order model
  Order
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch(error);

});
/////////////////////////////////////////


module.exports = router;
