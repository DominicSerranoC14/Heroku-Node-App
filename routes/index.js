'use strict';

const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const contact = require('./contact');
const login = require('./login');
const register = require('./register');
const about = require('./about');
const logout = require('./logout');
const order = require('./order');
/////////////////////////////////////////


/////////////////////////////////////////

router.get('/', (req, res) => {
  //Will render the index file in the views dir
  res.render('index');
});
// GET routers
router.use(contact);
//Route for about page
router.use(about);
//Route for GET /login
router.use(login);
//register routes
router.use(register);
/////////////////////////////////////////


/////////////////////////////////////////
//Middle ware guard
//Middle-ware which prohibits users to access the below routes
router.use((req, res, next) => {
  if(req.session.email) {
    next()
  } else {
    res.redirect('/login')
  }
});
/////////////////////////////////////////


/////////////////////////////////////////
//Routes for logout page
router.use(logout);
//Routes for order page
router.use(order);
/////////////////////////////////////////


module.exports = router;
