var mongoose = require('mongoose');

//Catalog schema
var itemSchema = new mongoose.Schema({
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








var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
