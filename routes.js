// app/routes.js

// grab the nerd model we just created
var comment = require('./models/comment');

var mongoose = require('mongoose');

// connect to our mongoDB database
var url = 'mongodb://hashnodetask:hashnode@ds133932.mlab.com:33932/meinl';
var MongoClient = mongoose.mongo.MongoClient;
var conn, collection;


MongoClient.connect(url, function(err, db) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to " + db.s.databaseName + ".");
    conn = db;
    collection = conn.collection('comment');
  }
});

module.exports = function(app) {

  // server routes ===========================================================

  app.get('/api/comment', function(req, response) {

    console.log("Routes received a GET Request. Sending Data.");
    if (req.query.email) {
      collection.findOne({
        email: req.query.email
      }, function(err, res) {
        if (err) {
          console.log(err);
        } else if (res) {
          data = res;
          response.json(data);
        } else {
          console.log("No Matches Found.");
        }
      });
    }

    // collection.find().toArray(function(err, res) {
    //   if (err) {
    //     console.log(err);
    //
    //   } else if (res.length) {
    //     data = res;
    //     response.json(data);
    //   } else {
    //     console.log("No Matches Found.");
    //   }
    // });
  });

  app.post('/api/comment', function(req, res) {
    console.log("Routes received a POST Request. Pushing Data.");
    console.log(req.body);
    collection.insert(req.body, function(err, doc) {
      if (err) {
        console.log(err);
      }
      res.json(doc);
    });
  });

  // frontend routes =========================================================
  // route to handle all angular requests
  app.get('*', function(req, res) {
    res.sendfile('./public/views/index.html'); // load our public/index.html file
  });

};
