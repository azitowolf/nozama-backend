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
var User = require('./lib/users.js');
var Item = require('./lib/items.js');
var util = require('util');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var auth = require('./routes/auth');

var itemsRouter = require('./routes/items');
var usersRouter = require('./routes/users');


function compile(str, path) {
  return stylus(str)
    .set('filename', path)
};

// // view engine setup
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(session({
  secret: 'nozama',
  resave: true,
  saveUninitialized: false
}));


// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

var Account = require('./lib/account');
passport.use(Account.createStrategy());

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//all routes
app.use('/auth/', auth);
app.use('/items', itemsRouter);
app.use('/users', usersRouter);
app.use('/', itemsRouter);

app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
};

app.use(stylus.middleware({
  src: __dirname + '/public',
  compile: compile
}));

var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('The server is up and listening at http://%s:%s', host, port);
});
