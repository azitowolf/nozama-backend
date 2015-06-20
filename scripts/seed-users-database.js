var async = require('async');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nozama');

var User = require('../lib/users.js');


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

async.series([
    removeUsers,
    createUserOne,
    createUserTwo
  ],
  function(error) {
    if (error) {
      console.error(error);
    }
    mongoose.disconnect();
  }
);
