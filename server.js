'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
//Pass db into the routes function
const routes = require('./routes/');
//Importing the mongodb connection
const { connect } = require('./db/database');

//Set an 'env' var of port to use that port #
//Otherwise use port 3000
const port = process.env.PORT || 3000;
app.set('port', port);
/////////////////////////////////////////


/////////////////////////////////////////
//Middle-ware

//Session Middle-ware
app.use(session({
  store: new RedisStore(),
  secret: 'pizzaisaveggie'
}));

app.use((req, res, next) => {
  app.locals.email = req.session.email;
  next();
});

//Custom middleware
//Can create route specific middleware ie: '/user/:id'
app.use((req, res, next) => {
  //Log out a string that emulates 'HS' log
  console.log(`[${new Date()}] "${req.method} ${req.url}" ${req.headers['user-agent']}`);
  //Need to execute callback for server to continue
  next();
});

//Set the view engine to pug
app.set('view engine', 'pug');
//Allow to set to production env to make it 'prettified'
if ( process.env.NODE_ENV === 'production' ) {
  app.locals.pretty = true;
}
//Serve up a static index.html file here
app.use(express.static('public'));

//'app.locals' is a way to set a global variable for your templating engine. Can use this on each .pug file
app.locals.company = 'Pizza de Beppo';

//This listens for form data, and then parses the form data into a readable obj
app.use(bodyParser.urlencoded({extended: false}));
/////////////////////////////////////////


/////////////////////////////////////////
// Routes

//Use the routes moudule
app.use(routes);

//404 catch and forward to error handling middle-ware
//Catches anything that is not a route
app.use( (req, res) => {
  res.render('404.pug');
});

//Error handling middlewares
app.use( (err, req, res, next) => {
  //Error shorthand, sends error and message
  res.sendStatus(err.status || 500);
  console.error('Error occured');
  //When handling errors, you can send appropriate status codes
  console.error(`[${new Date()}] "${req.method} ${req.url}" Error(${res.statusCode}) ${res.statusMessage}`);

  console.error(err.stack);
});
/////////////////////////////////////////


/////////////////////////////////////////
//Server listening on port 3000
connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Express server listening on port ${port}`);
    });
  })
  .catch(console.error);
/////////////////////////////////////////
