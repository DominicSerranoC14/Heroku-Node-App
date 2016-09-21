'use strict';

const Contact = require('../models/contact');
/////////////////////////////////////////

/////////////////////////////////////////
//Routes for the contact page
module.exports.new = (req, res) => {
  res.render('contact.pug', {pageTitle: 'Contact', active: true});
};

module.exports.create = (req, res, error) => {
  //Instantiating and sending a new Contact obj from the Contact model
  Contact
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch(error);
};
/////////////////////////////////////////
