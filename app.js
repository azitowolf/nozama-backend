var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nozama');

var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();

var User = require('./lib/users.js');
var Catalog = require('./lib/catalog.js')

var util = require('util');


app.get('/catalog', function(req, res) {
  Catalog.find({}, function(error, itemList) {
    res.json(itemList);
  });
});









var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('The server is up and listening at http://%s:%s', host, port);

});
