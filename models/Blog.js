var mongoose = require('mongoose');

var BlogSchema = new mongoose.Schema({
  title: String,
  author: String,
  lastUpdated: { type: Date, default: Date.now },
  contents: String
});

module.exports = mongoose.model('Blog', BlogSchema);
