const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
  name: String,
  description: String,
  dueDate: Date,
  createDate: Date,
});

const Issue = mongoose.model('Issue', IssueSchema);

module.exports = { Issue };
