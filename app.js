var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nozama');

var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();

var jade = require('jade');
var fs = require('fs');

app.set('view engine', 'jade');
app.set('views', './templates');

var User = require('./lib/users.js');
var Item = require('./lib/items.js')

var util = require('util');

var apiRouter = express.Router();

//Routes for Catalog
apiRouter.get('/items', function(req, res) {
  Item.find({}, function(error, itemList) {
    res.json(itemList);
  });
});

apiRouter.get('/items/:id', function(req, res) {
  Item.find({
    _id: req.params.id
  }, function(error, item) {
    res.json(item);
  });
});


//Routes for Users
apiRouter.get('/users', function(req, res) {
  User.find({}, function(error, userList) {
    res.json(userList);
  });
});

apiRouter.get('/users/:id', function(req, res) {
  User.find({
    _id: req.params.id
  }, function(error, user) {
    res.json(user);
  });
});

// Temporary route for root
app.get('/', function(req, res) {
  res.render( 'index', {name: "Nozama", message: 'Welcome to Nozama Online Shop.'});
});

app.get('/items', function(req, res) {
  Item.find({}, function(error, itemList) {
    res.render( 'items', {items: itemList});
  });
});

app.get('/items/:id', function(req, res) {
  Item.find({ _id: req.params.id}, function(error, item) {
    res.render('item', {item: item});
  });
});

app.use('/api/v1', apiRouter);

var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('The server is up and listening at http://%s:%s', host, port);

});
