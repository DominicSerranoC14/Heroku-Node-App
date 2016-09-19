'use strict';

const { Router } = require('express');
const router = Router();
const Contact = require('../models/contact');
const Order = require('../models/order');
const Size = require('../models/size');
const Topping = require('../models/topping');
const User = require('../models/topping');
/////////////////////////////////////////


/////////////////////////////////////////
// GET routers
router.get('/', (req, res) => {
  //Will render the index file in the views dir
  res.render('index.pug', {active: true});
});

//Route for login page
router.get('/login', (req, res) => {
  res.render('login.pug');
});

//Route for registration page
router.get('/register', (req, res) => {
  res.render('register.pug');
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
    .then(([sizes, toppingList]) => {
      res.render('order.pug', {pageTitle: 'Order', sizes, toppingList})
    });

});
/////////////////////////////////////////


/////////////////////////////////////////
//POST routers
router.post('/login', (req, res, error) => {

  if (req.body.password === 'password') {
    res.redirect('/');
  } else {
    res.render('login', {error: 'Email & password does not match.'})
  }

});


//POST register route
router.post('/register', (req, res, error) => {

  if (req.body.password === req.body.confirmPassword) {
    res.redirect('/');
  } else {
    res.render('register', {error: 'Email & password does not match.'})
  }

});


router.post('/contact', (req, res, error) => {

  //Instantiating and sending a new Contact obj from the Contact model
  Contact
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch(error);

});

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
