//Requires
var express = require("express");
var ejs = require("ejs");
var bodyParser = require('body-parser');
var app = express();
var port = 80;
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'plannerApp';
const client = new MongoClient(url);
var db;
var other;
var masterList;
var parentList;

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  //Assign Variables for within scope of MongoClient
  db = client.db(dbName);
  var listTypes = db.collection('listTypes');
  var lists = db.collection('lists');
  var listItems = db.collection('listItems');
  var currentPage;
  var currentList;
  var wtf;
  var masterList;
 

//ROUTES

//Main Page lists the List Types, allows for addition
app.get('/', function(req, res) {
  listTypes.find().toArray(function(err, listTypes) {
    res.render('index', {listTypes:listTypes});
  });
});

app.get('/index/:listTypes', function(req, res) {
  
  wtf = encodeURI(req.params.listTypes);
  masterList = req.params.listTypes;
  console.log(wtf);
  lists.find({wtf: masterList}).toArray(function(err, lists) {
    console.log(wtf);
    res.render('lists', {lists:lists, wtf:wtf});
    
  }); 
});

app.get('/index/:listTypes/:lists', function(req, res) {
    parentList = req.params.lists;
    wtf = req.params.listTypes;
  listItems.find({wtf:wtf, parentList:parentList}).toArray(function(err, listItems) {
    parentList = req.params.lists;
    res.render('listItems', {listItems:listItems});
    
  }); 
});



app.post('/listTypes', function (req, res) {
  listTypes.insertOne({name:req.body.name});
  res.redirect('/');
});

app.post('/lists', function (req, res) {
  lists.insertOne({name:req.body.name, wtf:masterList});
  res.redirect('/index/' + masterList);
  
});

app.post('/listItems', function (req, res) {
  listItems.insertOne({name:req.body.name, wtf:wtf, parentList:parentList});
  res.redirect('/index/' + wtf + '/' + parentList);
});

app.post('/listTypes/delete/:id', function (req, res) {
  listTypes.remove({name:req.params.id});
  res.redirect('/');
});

//Listen on port.
app.listen(port, function() {
    console.log("Listening on port 80");
});



});



     
