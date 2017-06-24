// app/routes.js

// grab the nerd model we just created
var comment = require('./models/comment');

var mongoose = require('mongoose');

// connect to our mongoDB database
var url = 'mongodb://hashnodetask:hashnode@ds133932.mlab.com:33932/meinl';
var MongoClient = mongoose.mongo.MongoClient;
MongoClient.connect(url, function(err, db) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to " + db.s.databaseName + ".");
  }
});

module.exports = function(app) {

  // server routes ===========================================================

  app.get('/api/comment', function(req, res) {
    console.log("I received a GET Request. Sending Data.")
    res.json({
      comment: 'test'
    });
  });

  app.post('/api/comment', function(req, res) {
    console.log("I received a POST Request. Pushing Data.")
    console.log(req);
  });

  // frontend routes =========================================================
  // route to handle all angular requests
  app.get('*', function(req, res) {
    res.sendfile('./public/views/index.html'); // load our public/index.html file
  });

};
