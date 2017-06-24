var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('comment', {
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
