'use strict';

const User = require('../models/user');
const bcrypt = require('bcrypt');
/////////////////////////////////////////


/////////////////////////////////////////
module.exports.new = (req, res) => {
  res.render('register', {pageTitle: 'Register'});
};

module.exports.create = ({body: {email, password, confirmPassword}}, res, err) => {
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
};
/////////////////////////////////////////
