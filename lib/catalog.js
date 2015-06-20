var mongoose = require('mongoose');

//Catalog schema
var catalogSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  photoURL: {
    type: String,
    required: true
  }
});








var Catalog = mongoose.model('Catalog', catalogSchema);

module.exports = Catalog;
