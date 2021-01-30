//Import the mongoose module
var mongoose = require('mongoose');
var Item = require('../lib/items.js');

//Set up default mongoose connection
var mongoDB = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.xigeo.mongodb.net/nozama?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  if(err) return err;
  console.log('connected to instance');
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var one = new Item({
    itemName: 'Peace Lily',
    description: 'The famous Japanese Peace Lily has the unique power to create a serene and organic atmosphere in any home. Our peace lilies are grown outside and never treated with pesticides.',
    price: 2199,
    photoURL: 'https://www.proflowers.com/blog/wp-content/uploads/2017/09/peace-lily-care-1.jpg',
    tags: ['plants', 'flowering']
  });

var two = new Item({
  itemName: 'Agarwood Essential Oil',
  description: 'Agarwood, also known as "oud" or "ouhd", is known for its distinctive oaky, rich, dark aroma.  ',
  price: 2999,
  photoURL: 'https://i.etsystatic.com/14696771/r/il/3617ea/2050631117/il_1588xN.2050631117_529p.jpg',
  tags: ['plants', 'beauty']
})

var three = new Item({
  itemName: 'Bamboo Face Mask',
  description: 'Bamboo face mask will help you rejuvinate your body and soul, with its cleansing, moisturizing power',
  price: 999,
  photoURL: 'https://image.shutterstock.com/z/stock-vector-bamboo-natural-face-mask-moisture-skin-care-cosmetic-558511999.jpg',
  tags: ['face', 'beauty']
})

var four = new Item({
  itemName: 'Aloe face mask by Cala',
  description: 'The aloe plant is used as a moisturizing component in many skin products. For the maximum moisture in the shortest time, go with this face mask above all others',
  price: 999,
  photoURL: 'https://images-na.ssl-images-amazon.com/images/I/71zOO8z2pzL._SL1200_.jpg',
  tags: ['face', 'beauty']
})

var five = new Item({
  itemName: 'CloudBerries, 1/2 quart',
  description: 'Couldberries have become known for their incredible antioxidant powers. These sweet organic treats are the caviar of the berry department.',
  price: 2999,
  photoURL: 'https://media.gettyimages.com/photos/blue-mug-with-cloudberries-in-arctic-landscape-picture-id168482947?s=612x612',
  tags: ['food', 'organic']
})

var six = new Item({
  itemName: 'Succulents from NaturalImpact',
  description: 'Succulent plants have become a mainstay for the modern homeownre. Improve your rooms aesthetic with little effort with a colorful succulent from NaturalImpact',
  price: 999,
  photoURL: 'https://i.etsystatic.com/13687258/r/il/d6f006/2058782426/il_1588xN.2058782426_219n.jpg',
  tags: ['plants', 'cactus']
})

var seven = new Item({
  itemName: 'Epic Bison Bacon Cranberry bar',
  description: 'The Bison Bacon bar delivers a substantial serving of our two most favorite meats; 100% grass fed and organic buffalo brilliantly combined with humanely certified uncured bacon.',
  price: 1999,
  photoURL: 'https://www.kroger.com/product/images/large/right/0073215302915',
  tags: ['plants', 'flowering']
})

var eight = new Item({
  photoURL: 'https://i.etsystatic.com/20153241/r/il/890ae4/2836826775/il_1588xN.2836826775_3w55.jpg',
  itemName: 'Nutiva Chia Seeds',
  description: 'Nutiva Chia seeds are sourced from organic farms and are some of the freshest chia seeds available on the market.',
  price: 1199,
  tags: ['food', 'health', 'organic']
})

// Manipualte DB Items
// Remove Items
Item.remove({})
.then(() => {
  console.log("items removed")
})
.then(() => {
  let savedOne = one.save()
  let savedTwo = two.save();
  let savedThree = three.save();
  let savedFour = four.save();
  let savedFive = five.save();
  let savedSix = six.save();
  let savedSeven = seven.save();
  let savedEight = eight.save();
  
  Promise.all([savedOne, savedTwo, savedThree, savedFour, savedFive, savedSix, savedSeven, savedEight]).then((values) => {
    console.log(values)
    console.log("promises all resolved")
    db.close()
  })
})