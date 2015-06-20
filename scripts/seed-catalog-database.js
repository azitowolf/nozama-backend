var async = require('async');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nozama');

var Catalog = require('../lib/catalog.js');


var removeItems = function(done) {
      Catalog.remove({}, done);
    };

var createItem1 = function(done) {
  Catalog.create({
  itemName: 'Muji gel pen, blue',
  description: 'The famous Japanese brand never fails to deliver. The Muji gel pen is the perfect companion to your most precious notes.',
  price: 2000,
  photoURL: 'http://ecx.images-amazon.com/images/I/71nUYIE-BiL._SL1500_.jpg'
  }, done);
};

async.series([
    removeItems,
    createItem1
  ],
  function(error) {
    if (error) {
      console.error(error);
    }
    mongoose.disconnect();
  }
);
