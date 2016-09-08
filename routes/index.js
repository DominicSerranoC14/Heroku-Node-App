'use strict';

const { Router } = require('express');
const router = Router();

// Route for '/'
router.get('/', (req, res) => {
  //Will render the index file in the views dir
  res.render('index.pug', {active: true});
});

//Route for about page
router.get('/about', (req, res) => {
  res.render('about.pug', {pageTitle: 'About', active: true});
  res.send()
});

//Route for the contact page
router.get('/contact', (req, res) => {
  res.render('contact.pug', {pageTitle: 'Contact', active: true});

});

router.post('/contact', (req, res) => {
  //'req.query' -- this is an obj containing a prop for each query string param in the route. If there is no query string, it is '{}'
  //Use req.body once you have body-parsed the form data
  console.log(req.body);

  //Sends a suggestion to the browser that if should redirect to the '/' route
  //Sends error '302'
  res.redirect('/');

  //res.render will render the page on the current route instead of the server 'suggesting' the route
  // res.render('index.pug', {active: true});
});

module.exports = router;
