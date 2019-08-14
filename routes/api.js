/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
var Project = require('../schema/project.js')
var Issue = require('../schema/issue.js')

// db config
require('dotenv').config();
const CONNECTION_STRING = process.env.DB;

module.exports = function (app) {
  
  app.route('/api/issues/:project')
  
    .get(function (req, res){
      // capture user input
      var project = req.params.project;
      // this is always empty in normal use, it gets populated with tests
      var searchQuery = req.query;
  
      // get the board name and use it to find the project id from the db.
      Project.find({title: project}, function(err, project){
      })
        // the promise returns the document
        .then(function (project) {
        // get the documents id
        let projectID = project[0]._id;
        // search the db for issues with the associated project id
        Issue.find({project_id: projectID})
          // sort open status so true is at the top of the list and closed is at the bottom
          .sort({open: -1})
          // send back the sorted list
          .then(function (list) {
          res.json(list) 
        })
      });
    })
    
    .post(function (req, res){
      // convert user input to vars
      var project = req.params.project;
      var issue_title = req.body.issue_title;
      var issue_text = req.body.issue_text;
      var created_by = req.body.created_by;
      var assigned_to = req.body.assigned_to || '';
      var status_text = req.body.status_text || ''; 
      var created_on_timestamp = new Date();
      var updated_on_timestamp = created_on_timestamp; 
      var ticket_status = true;
    
      // if user doesn't supply required values then return error
      if(!issue_title || !issue_text || !created_by) {
        res.send('missing inputs');
      } 
      // else create the project/object
      else {
      // check the db for existing project
      Project.find({title: project}, function(err, existingProject){
        // if you can't find a project then create a new one
        if (existingProject.length == 0) {
          
          const new_project = new Project({ title: project });
          
          const new_issue = new Issue({
            project_id:   new_project._id,
            issue_title:  issue_title,
            issue_text:   issue_text,
            created_by:   created_by,
            assigned_to:  assigned_to,
            status_text:  status_text,
            created_on:   created_on_timestamp,
            updated_on:   updated_on_timestamp,
            open:         ticket_status
          });
          
          new_project.save()
          new_issue.save()
          
          res.json(new_issue)
        } else {
          // if an existing object exists, add a new issue to it
          Project.find({title: project}, function(err, existingProject){
            
            const new_issue = new Issue({
            project_id:   existingProject[0]._id,
            issue_title:  issue_title,
            issue_text:   issue_text,
            created_by:   created_by,
            assigned_to:  assigned_to,
            status_text:  status_text,
            created_on:   created_on_timestamp,
            updated_on:   updated_on_timestamp,
            open:         ticket_status
          });
            
          new_issue.save()
          res.json(new_issue)
          })
        }
      })  
      }
    })
    
    .put(function (req, res){
      // get the project name to search through
      var project = req.params.project;
      // set a var to the id then delete it because we don't want to iterate through it later
      var issue = req.body._id;
      delete req.body._id;
      // set a var for the rest of the parameters to loop through later for updates
      var updates = req.body;
    
      // if no keys were sent then send error, front-end always sends 'open' & 'key' parameter by default
      if (Object.keys(updates).length === 0) {
        res.send('no updated field sent');
      } else {
        // find the issue in the db via it's id
        Issue.findById(issue, function(err, doc) {
          // always update the timestamp
          doc.updated_on = new Date();
          // for each parameter sent from the user, update it for the document (issue.html only sends 'open' value for updates)
          Object.keys(updates).forEach(function(item) {
            doc[item] = updates[item]
          })
          // save the update to the db and send an error if one occurs
          doc.save('doc');
          (!err) ? res.send('successfully updated') : res.send('could not update '+issue+' '+err);
        }); 
      }
  })
    
    .delete(function (req, res){
      // store user input in vars
      var project = req.params.project;
      var issue_id = req.body['_id'];
      
      // front-end always sends id by default
      if (issue_id == undefined) {
        res.send("_id error")
      } else {
        Issue.deleteOne({ _id: issue_id }, function (err) {
        if (err) return res.send('could not delete ' + issue_id);
        res.send("deleted " + issue_id)
      });
      }
    });
  
  app.route('/api/projects')
    .get(function (req, res){
      Project.find({}, function(err, project){
        res.json(project);
        })
    })
};
