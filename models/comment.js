var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  comment: {
    type: String
  },
  diff: {
    type: String
  }
});

module.exports = mongoose.model('comment', commentSchema);
