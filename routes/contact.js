'use strict';

const { Router } = require('express');
const router = Router();
const Contact = require('../models/contact');


/////////////////////////////////////////
//Routes for the contact page
router.get('/contact', (req, res) => {
  res.render('contact.pug', {pageTitle: 'Contact', active: true});
});

router.post('/contact', (req, res, error) => {

  //Instantiating and sending a new Contact obj from the Contact model
  Contact
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch(error);

});
/////////////////////////////////////////


module.exports = router;
