var mongoose = require('mongoose');


var emailAddressSchema = new mongoose.Schema({
  emaillAddressType: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true,
    match: /\S+@\S+\.\S+/
  }
});

var phoneNumberSchema = new mongoose.Schema({
  phoneNumberType: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /(\d?\D*\d{3}\D*\d{3}\D*\d{4})/
  }
});

var enumeratedStates = ['AL AK AS AZ AR CA CO CT DE DC FM FL',
  'GA GU HI ID IL IN IA KS KY LA ME MH MD MA MI MN MS MO MT',
  'NE NV NH NJ NM NY NC ND MP OH OK OR PW PA PR RI SC SD TN TX',
  'UT VT VI VA WA WV WI WY'
].join(' ').split(' ');

var mailingAddressSchema = new mongoose.Schema({
  addressType: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  secondStreet: String,
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true,
    enum: {
      values: enumeratedStates
    }
  },
  zipCode: {
    type: String,
    required: true,
    match: /^\d{5}?$/
  },
  country: String
});

var userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: [phoneNumberSchema],
  mailingAddress: [mailingAddressSchema],
  emailAddress: [emailAddressSchema]
});








var User = mongoose.model('User', userSchema);

module.exports = User;
