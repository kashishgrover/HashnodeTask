var mongoose = require('mongoose');

var dmpmod = require('diff_match_patch');
var dmp = new dmpmod.diff_match_patch();

var url = 'mongodb://hashnodetask:hashnode@ds133932.mlab.com:33932/meinl';
var MongoClient = mongoose.mongo.MongoClient;
var conn, collection;

var dbComment = "";

MongoClient.connect(url, function(err, db) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database " + db.s.databaseName + ".");
    conn = db;
    collection = conn.collection('comment');
  }
});

console.log(dmp.diff_main('a', 'b'));

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

          dbComment = res.comment;
          response.json(res);

        } else {
          response.json(null);
          console.log("No Matches Found.");
        }
      });
    }
  });

  app.post('/api/comment', function(req, res) {
    console.log("Routes received a POST Request. Pushing Data: ", req.body);
    dbComment = req.body.comment;
    collection.insert(req.body, function(err, doc) {
      if (err) {
        console.log(err);
      }
      res.json(doc);
    });
  });

  app.put('/api/comment/:id', function(req, res) {

    var query = {
      'email': req.body.email,
    };

    diff = req.body.diff;
    console.log("Comment in DB: ", dbComment);
    console.log("Difference: ", diff);

    var patches = dmp.patch_make(diff);
    var patched_text = dmp.patch_apply(patches, dbComment);

    console.log("Patched Text: ", patched_text[0]);

    var newData = {
      'email': req.body.email,
      'comment': patched_text[0]
    }

    console.log("Data PUT: ", newData);
    dbComment = patched_text[0];

    collection.findOneAndUpdate(query, newData, {
      upsert: true
    }, function(err, doc) {
      if (err) {
        console.log("Error Updating")
      }
      console.log("Doc:", doc);

      return res.send("Succesfully saved");
    });
  });

  // frontend routes =========================================================
  // route to handle all angular requests
  app.get('*', function(req, res) {
    res.sendFile('./public/views/index.html', {
      root: __dirname
    });
  });

};
