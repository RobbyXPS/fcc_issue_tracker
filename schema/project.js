  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var projectSchema = new Schema({
    title:  String,
    issues: {
      type: Schema.Types.ObjectId,
      ref: 'issue'
    }
  });

var Project = mongoose.model('project', projectSchema);

module.exports = Project;