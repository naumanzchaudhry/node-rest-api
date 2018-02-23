const mongoose = require('mongoose')

mongoose.Promise = global.Promise

//Connect to mongodb usung mongoose.
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose}
