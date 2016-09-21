'use strict';

const User = require('../models/user');
const bcrypt = require('bcrypt');
/////////////////////////////////////////

/////////////////////////////////////////
module.exports.new = (req, res) => {
  //Will render the index file in the views dir
  res.render('login', {pageTitle: 'Login', error: 'You must sign in to view this page.'});
};

module.exports.create = ({session, body: {email, password}}, res, err) => {
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
}
/////////////////////////////////////////

/////////////////////////////////////////
module.exports.index = (req, res) => res.render('logout');

module.exports.destroy = (req, res) => {
  req.session.destroy(err => {
    if (err) throw err
    res.redirect('/login');
  });
}
/////////////////////////////////////////
