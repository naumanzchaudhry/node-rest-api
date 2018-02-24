const mongoose = require('mongoose')

mongoose.Promise = global.Promise

//Connect to mongodb usung mongoose.

//connecting with this.

//const MONGOLAB_URL = 'mongodb://naumanz:alpha123@ds247178.mlab.com:47178/nauman-todoapp'

mongoose.connect(process.env.MONGOLAB_URL || 'mongodb://127.0.0.1:27017/TodoApp');
//mongoose.connect(MONGOLAB_URL);

module.exports = {mongoose}
