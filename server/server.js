var express = require('express');
var bodyParser = require('body-parser')

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')


var app = express();
app.use(bodyParser.json())

app.get('/', (req,res) => {
  res.send('Helo World')
}, (error) => {
  console.log('Unable to call /')
})

app.post('/todos', (req,res) => {
  var todo = new Todo({
     text: req.body.text
  })
  //save todo
  todo.save().then( (addedTodo) => {
     //console.log('Added todo succesfully', addedTodo)
     res.status(200).json({message: 'Todo added succesfully', todo: addedTodo})

  }, (error) => {
     // console.log('Unable to add new todo')
     res.status(400).json({error: error})
  })
}, (err) => {
  // console.log('Unable to access /todos');
  res.status(500).json({error:err});
})

app.listen(3000, () =>{
  console.log('Started listening on port 3000')
})

module.exports = {app}
