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

    // Delete Many

    db.collection('users').deleteMany({name: 'Hassan'}).then( (result) => {
      console.log (JSON.stringify(result, undefined, 2));
    }, (error) => {
      console.log("Couldn't delete sucu records.")
    })

    // Delete one

    db.collection('users').deleteOne({name:'Hassan'}).then( (result)=> {
      console.log(JSON.stringify(result, undefined, 2));
    }, (error) => {

    })

    // FindOrDeleteOne

    db.collection('users').findOneAndDelete({name: 'Salman'}).then( (result)=> {
      console.log(JSON.stringify(result, undefined, 2));
    }, (error) => {
        console.log("Couldn't find and delte any item")
    })

    database.close();
});
