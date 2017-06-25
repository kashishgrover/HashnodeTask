var mongoose = require('mongoose');

var dmpmod = require('diff_match_patch');
var dmp = new dmpmod.diff_match_patch();

var url = 'mongodb://hashnodetask:hashnode@ds133932.mlab.com:33932/meinl';
var MongoClient = mongoose.mongo.MongoClient;
var conn, collection;

var oldComment = "";
var newComment = "";
var diff_main = [];

MongoClient.connect(url, function(err, db) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database " + db.s.databaseName + ".");
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

          oldComment = res.comment;

          if (data.diff !== null) {
            var patches = dmp.patch_make(data.diff);
            var patched_text = dmp.patch_apply(patches, oldComment);
            data.comment = patched_text[0];
          }

          response.json(data);
        } else {
          console.log("No Matches Found.");
        }
      });
    }
  });

  app.post('/api/comment', function(req, res) {
    console.log("Routes received a POST Request. Pushing Data.");
    req.body.diff = null;
    collection.insert(req.body, function(err, doc) {
      if (err) {
        console.log(err);
      }
      res.json(doc);
    });
  });

  app.put('/api/comment/:id', function(req, res) {

    var query = {
      'email': req.body.email
    };

    newComment = req.body.comment;
    diff_main = dmp.diff_main(oldComment, newComment);

    var newData = {
      'email': req.body.email,
      'comment': oldComment,
      'diff': diff_main
    }

    collection.findOneAndUpdate(query, newData, {
      upsert: true
    }, function(err, doc) {
      if (err) {
        console.log("Error Updating")
      }

      oldComment = newComment;

      return res.send("Succesfully saved");
    });
  });

  // frontend routes =========================================================
  // route to handle all angular requests
  app.get('*', function(req, res) {
    res.sendfile('./public/views/index.html'); // load our public/index.html file
  });

};
