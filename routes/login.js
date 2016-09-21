'use strict';

const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
/////////////////////////////////////////


/////////////////////////////////////////
//Login routes
router.get('/login', (req, res) => {
  //Will render the index file in the views dir
  res.render('login', {pageTitle: 'Login', error: 'You must sign in to view this page.'});
});


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
/////////////////////////////////////////





module.exports = router;
