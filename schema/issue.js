  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var issueSchema = new Schema({
    project_id: Schema.Types.ObjectId,
    issue_title: String,
    issue_text: String,
    created_by: String,
    assigned_to: String,
    status_text: String,
    created_on: Date,
    updated_on: Date,
    open: Boolean
  });

var Issue = mongoose.model('issue', issueSchema);

module.exports = Issue;