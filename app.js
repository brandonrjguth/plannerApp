//Requires
var express = require("express");
var mongoose = require('mongoose');
var ejs = require("ejs");
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

var app = express();
var port = 80;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');






//ROUTES

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/testButton', function(req, res) {
    console.log(req.body.input);

});





//Listen on port.
app.listen(port, function() {
    console.log("Listening on port 80");
});