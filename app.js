var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nozama');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();
var jade = require('jade');
var fs = require('fs');
var stylus = require('stylus');
var nib = require('nib');
var apiRouter = express.Router();

app.set('view engine', 'jade');
app.set('views', './templates');

var User = require('./lib/users.js');
var Item = require('./lib/items.js')

var util = require('util');

// // view engine setup
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));



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

apiRouter.post('/items', jsonParser);
apiRouter.post('/items', function(req, res) {
  Item.create(req.body, function(error, item) {
    console.log(req.body);
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(201);
    }
  });
});

apiRouter.patch('/items/:id', jsonParser);
apiRouter.patch('/items/:id', function(req, res){
  Item.findByIdAndUpdate(req.params.id, req.body, {overwrite: false}, function(error, item){
    if(error){
      console.error(error);
      res.sendStatus(400);
    }
    console.log('Changed')
    res.sendStatus(200);
  });
});

apiRouter.delete('/items/:id', function(req, res) {
  Item.remove({
    _id: req.params.id
  }, function(error) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
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
    res.render('item', {items: item});
  });
});

app.use('/api/v1', apiRouter);

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
};

app.use(stylus.middleware({ src: __dirname + '/public', compile: compile }));
app.use(express.static(__dirname + '/public'));

var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('The server is up and listening at http://%s:%s', host, port);

});
