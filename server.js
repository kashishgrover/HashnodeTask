//server.js

//modules ================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================

// set our port
var port = process.env.PORT || 8000;

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride('X-HTTP-Method-Override'));

// Static Files Location
app.use(express.static(__dirname + '/public'));

// routes ==================================================
require('./routes')(app); // configure our routes

// start app ===============================================
app.listen(port);

// shoutout to the user
console.log('Listening to you on http://localhost:' + port);

// expose app
exports = module.exports = app;
