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

    //Find everything out of collection.
    db.collection('users').find().toArray().then( (result) => {
        console.log(JSON.stringify(result,undefined, 2))
    }, (error) => {
       console.log("Couldn't find todos");
    })



    db.collection('users').find({name: 'Hassan'}).toArray().then( (result) => {
      console.log('---------------------------------------\n Todos matching certain conditions')
        console.log(JSON.stringify(result,undefined,2));
    }, (error) => {
      console.log("Couldn't find matching todos")
    })

    database.close();
});
