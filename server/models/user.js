
const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
var UserSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    minLength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: `{VALUE} is not a valid email.`
    }

  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})
UserSchema.methods.toJSON = function() {
  var user = this
  var userObject = user.toObject()
  return _.pick(userObject, ['email','_id'])
}
UserSchema.methods.generateAuthToken = function () {
  var user = this
  var access = 'auth'
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'alpha123').toString()

  user.tokens.push({access,token})
  return user.save().then( () => {
    return token;
  })
}

var User = mongoose.model('User', UserSchema)

module.exports = {User}
