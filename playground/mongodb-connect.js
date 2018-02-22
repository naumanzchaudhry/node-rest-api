// var MongoClient = require('mongodb').MongoClient
//     , format = require('util').format;

var {MongoClient, ObjectID} = require('mongodb')  //Defining using object destructuring - ES6 feature.
var {format} = require('util')
console.log(new ObjectID())
MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', function (err, database) {
    if (err) {
        throw err;
    }
    const db = database.db('TodoApp');
    db.collection('users').insert({
        name: 'Hassan',
        email: 'hassan@apptech.ae',
        age: 25
    }, (error,result) => {

        if (error) {
          return console.log('Unable to insert')
        }
        console.log(JSON.stringify(result.ops, undefined, 2))
    })

    database.close();
});
