var async = require('async');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nozama');

var Catalog = require('../lib/catalog.js');


var removeItems = function(done) {
      Catalog.remove({}, done);
    };

var createItemOne = function(done) {
  Catalog.create({
  itemName: 'Muji gel pen, blue',
  description: 'The famous Japanese brand never fails to deliver. The Muji gel pen is the perfect companion to your most precious notes.',
  price: 2,
  photoURL: 'http://i.imgur.com/uprItZN.jpg'
  }, done);
};

var createItemTwo = function(done) {
  Catalog.create({
  itemName: 'Muji gel pen, pink',
  description: 'The famous Japanese brand never fails to deliver. The Muji gel pen is the perfect companion to your most precious notes.',
  price: 2,
  photoURL: 'http://i.imgur.com/uprItZN.jpg'
  }, done);
};

async.series([
    removeItems,
    createItemOne,
    createItemTwo
  ],
  function(error) {
    if (error) {
      console.error(error);
    }
    mongoose.disconnect();
  }
);
