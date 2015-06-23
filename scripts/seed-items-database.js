var async = require('async');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nozama');

var Item = require('../lib/items.js');


var removeItems = function(done) {
      Item.remove({}, done);
    };

var createItemOne = function(done) {
  Item.create({
  itemName: 'Muji gel pen, blue',
  description: 'The famous Japanese brand never fails to deliver. The Muji gel pen is the perfect companion to your most precious notes.',
  price: 2,
  photoURL: 'http://i.imgur.com/uprItZN.jpg'
  }, done);
};

var createItemTwo = function(done) {
  Item.create({
  itemName: 'Muji gel pen, pink',
  description: 'The famous Japanese brand never fails to deliver. The Muji gel pen is the perfect companion to your most precious notes.',
  price: 2,
  photoURL: 'http://i.imgur.com/uprItZN.jpg'
  }, done);
};

var createItemThree = function(done) {
  Item.create({
  itemName: 'Muji gel pen, red',
  description: 'The famous Japanese brand never fails to deliver. The Muji gel pen is the perfect companion to your most precious notes.',
  price: 2,
  photoURL: 'http://i.imgur.com/uprItZN.jpg'
  }, done);
};

async.series([
    removeItems,
    createItemOne,
    createItemTwo,
    createItemThree
  ],
  function(error) {
    if (error) {
      console.error(error);
    }
    mongoose.disconnect();
  }
);
