// app/routes.js

// grab the comment model from comment.js
// var comment = require('./models/comment');

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

  app.put('/api/comment/:id', function(req, res) {
    console.log(req.params.id);
    var query = {
      'email': req.body.email
    };

    console.log(query);

    var newData = {
      'email': req.body.email,
      'comment': req.body.comment
    }

    console.log(newData);

    collection.findOneAndUpdate(query, newData, {
      upsert: true
    }, function(err, doc) {
      if (err) {
        console.log("Error Updating")
      }
      return res.send("succesfully saved");
    });


    // MyModel.findOneAndUpdate(query, req.newData, {
    //   upsert: true
    // }, function(err, doc) {
    //   if (err) return res.send(500, {
    //     error: err
    //   });
    //   return res.send("succesfully saved");
    // });
    // collection.findOneAndUpdate({
    //   query: {
    //     _id: req.params.id
    //   },
    //   update: {
    //     $set: {
    //       email: req.body.email,
    //       comment: req.body.comment
    //     }
    //   },
    //   new: true
    // }, function(err, doc) {
    //   res.json(doc);
    //   console.log('Updated');
    // });
  });

  // frontend routes =========================================================
  // route to handle all angular requests
  app.get('*', function(req, res) {
    res.sendfile('./public/views/index.html'); // load our public/index.html file
  });

};
