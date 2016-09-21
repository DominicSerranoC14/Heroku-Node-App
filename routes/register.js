'use strict';

const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
/////////////////////////////////////////


/////////////////////////////////////////
//Routes for register
router.get('/register', (req, res) => {
  res.render('register', {pageTitle: 'Register'});
});

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
/////////////////////////////////////////


module.exports = router;
