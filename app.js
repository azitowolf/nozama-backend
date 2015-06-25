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
var apiRouter = express.Router();
var User = require('./lib/users.js');
var Item = require('./lib/items.js');
var util = require('util');


function compile(str, path) {
  return stylus(str)
    .set('filename', path)
};

// // view engine setup
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


//Routes for Items
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

apiRouter.post('/users', jsonParser);
apiRouter.post('/users', function(req, res) {
  User.create(req.body, function(error, user) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(201);
    }
  });
});

apiRouter.patch('/users/:id', jsonParser);
apiRouter.patch('/users/:id', function(req, res) {
  console.log(req);
  User.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, function(error, user) {
    console.log(user);
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
});

apiRouter.delete('/users/:id', function(req, res) {
  User.remove({
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


// Temporary route for root
app.get('/', function(req, res) {
  res.render('index', {
    name: "Nozama",
    message: 'Welcome to Nozama Online Shop.'
  });
});

app.get('/items', function(req, res) {
  Item.find({}, function(error, itemList) {
    res.render('items', {
      items: itemList
    });
  });
});

app.get('/items/:id', function(req, res) {
  Item.find({
    _id: req.params.id
  }, function(error, item) {
    res.render('item', {
      items: item
    });
  });
});

// connecting with jade users template ?
app.get('/users', function(req, res) {
  User.find({}, function(error, userList) {
    res.render('users', {
      users: userList
    });
  });
});

app.get('/users/:id', function(req, res) {
  User.findById(req.params.id, function(error, user) {
    res.render('user', {
      user: user
    });
  });
});

app.post('/users', jsonParser);
app.post('/users', function(req, res) {
  User.create(req.body, function(error, user) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      fs.readFile('./templates/users.jade', 'utf8', function(err, data) {
        if (err) {
          res.sendStatus(400);
        };
        var userCompiler = jade.compile(data);
        var html = userCompiler(user);
        res.send(html);
        res.status(201);
      });
    };
  });
});

app.use('/api/v1', apiRouter);

// function compile(str, path) {
//   return stylus(str)
//     .set('filename', path)
//     .use(nib());
// };

app.use(stylus.middleware({
  src: __dirname + '/public',
  compile: compile
}));
app.use(express.static(__dirname + '/public'));

var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('The server is up and listening at http://%s:%s', host, port);
  });
