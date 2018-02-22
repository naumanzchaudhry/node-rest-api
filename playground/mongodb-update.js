// var MongoClient = require('mongodb').MongoClient
//     , format = require('util').format;

var {MongoClient, ObjectID} = require('mongodb')  //Defining using object destructuring - ES6 feature.
var {format} = require('util')
//console.log(new ObjectID())
MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', function (err, database) {
    if (err) {
        throw err;
    }
    const db = database.db('TodoApp');

    db.collection('users').findOneAndUpdate({
      _id: new ObjectID('5a8f25c6840a9836d9ec0fbf')
    }, {
      $set: {
        email: 'naumanzafarchaudhry@gmail.com'
      }
    }, {
      returnOriginal: false
    }).then( (result) => {
      console.log(JSON.stringify(result, undefined, 2))
    }, (error) => {
        console.log("Couldn't update document.")
    })

    database.close();
});
