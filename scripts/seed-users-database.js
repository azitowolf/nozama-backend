var util = require('util');
var async = require('async');
var mongoose = require('mongoose');
var User = require('../lib/users.js');

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

var removeUsers = function(done) {
  User.remove({}, done);
};

var createUserOne = function(done) {
  User.create({
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '617-123-1234',
    address: [{
      addressType: 'mailing',
      street: '100 Somerville Ave',
      city: 'Somerville',
      state: 'MA',
      zipCode: '01200',
      country: 'United States of America'
    }, {
      addressType: 'billing',
      street: '20 Glenwood Park',
      city: 'Cambridge',
      state: 'MA',
      zipCode: '02124'
    }],
    emailAddress: 'john@example.com'
  }, done);
};

var createUserTwo = function(done) {
  User.create({
    firstName: 'Jeanne',
    lastName: 'Dean',
    phoneNumber: '617-001-1234',
    address: [{
      addressType: 'mailing',
      street: '100 Central street',
      city: 'Boston',
      state: 'MA',
      zipCode: '01201',
      country: 'United States of America'
    }],
    emailAddress: 'jeanne@example.com'
  }, done);
};

var createUserThree = function(done) {
  User.create({
    firstName: 'Kylie',
    lastName: 'Quackenbush',
    phoneNumber: '845-555-6186',
    address: [{
      addressType: 'billing',
      street: '13 Rocklyn Drive',
      city: 'Suffern',
      state: 'NY',
      zipCode: '10901',
      country: 'USA'
    }, {
      addressType: 'mailing',
      street: '13 Rocklyn Drive',
      city: 'Suffern',
      state: 'NY',
      zipCode: '10901',
      country: 'USA'
    }],
    emailAddress: 'kyliequackenbush@gmail.com',
  }, done);
};

async.series([
    removeUsers,
    createUserOne,
    createUserTwo,
    createUserThree,
  ],
  function(error) {
    if (error) {
      console.error(error);
    }
    db.close();
  }
);
