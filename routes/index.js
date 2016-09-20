'use strict';

const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const Contact = require('../models/contact');
const Order = require('../models/order');
const Size = require('../models/size');
const Topping = require('../models/topping');
const User = require('../models/user');
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
router.post('/login', ({session, body: {email, password}}, res, err) => {
  User.findOne({ email })
    .then((user) => {
      if (user) {
        return new Promise((resolve, reject) => {
          bcrypt.compare(password, user.password, (err, matches) => {
            if (err) {
              reject(err);
            } else {
              resolve(matches);
            }
          })
        })
      } else {
        res.render('login', { error: 'Email does not exist'});
      }
    })
    .then((matches) => {
      if (matches) {
        //Store the user email on the current session
        session.email = email;
        res.redirect('/');
      } else {
        res.render('login', {error: 'Password does not match'} );
      }
    })
    .catch(err);
});


//POST register route
router.post('/register', ({body: {email, password, confirmPassword}}, res, err) => {

  if (password === confirmPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 15, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      })
    })
    .then((hash) => {
      User.create({ email, password: hash }).then(res.redirect('/'));
    });
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
