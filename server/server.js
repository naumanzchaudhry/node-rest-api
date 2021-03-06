const config = require('./config/config.js')

var _ = require('lodash')
var express = require('express');
var bodyParser = require('body-parser')
var {ObjectID} = require('mongodb')
var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')
var {authenticate} = require('./middlewares/authenticate')


var app = express();
const port = process.env.PORT
//console.log(port)
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
     res.status(404).json({error: error})
  })
}, (err) => {
  // console.log('Unable to access /todos');
  res.status(500).json({error:err});
})


app.get('/todos', authenticate, (req,res) => {
  var todos = Todo.find().then( (todos) => {
    res.status(200).json({todos})
  }, (error) => {
    res.status(404).json({error})
  })
}, (error) => {
  res.status(500).json({error})
})

app.get('/todos/:id', (req,res) => {


  const id =  req.params.id

  //check if objectis is valid or not.
  if (!ObjectID.isValid(id)) {
    return res.status(404).json({message: 'Invalid ObjectID'})
  }

  Todo.findById(id).then( (todo) => {
    if (!todo){
      return res.status(404).json({message: 'Record not found.'})
    }

    return res.status(200).json({todo})

  })

}, (error) => {
  return error;
})

app.delete('/todos/:id', (req,res) => {

  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).json({message: 'Invalid ObjectID'})
  }

  Todo.findByIdAndRemove(id).then( (todo) => {
     if(!todo) {
       return res.status(404).json({message: 'Record not found.'})
     }

     return res.status(200).json({todo: todo})
  }).catch((e) => {return e})

})


app.patch('/todos/:id', (req,res) => {
  const id = req.params.id
  var body = _.pick(req.body, ['text','completed'])

  if (!ObjectID.isValid(id)) {
    return res.status(404).json({message: 'Invalid ObjectID'})
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime()
  }else{
    body.completed = false
    body.completedAt = null
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then( (todo) => {
    if(!todo) {
      return res.status(404).json({message: 'Record not found.'})
    }

    res.status(200).json({todo})

  }).catch((e) => {
    res.status(404).json({message: "Couldn't update record."})
  })

})


app.post('/users/', (req,res) => {
    var body = _.pick(req.body, ['email','password'])

    //create new user instance.
    var user = new User(body)

    user.save().then( () => {
      //return res.status(200).json({user})
      return user.generateAuthToken()

    }).then( (token) => {
      res.header('x-auth', token).json({user})
    }).catch( (e) => {
      return res.status(400).json({error: e})
    })
})



app.get('/users/me',authenticate, (req,res) => {
  res.status(200).json({user: req.user})
})

if (!module.parent)
{
  app.listen(process.env.PORT, () =>{
    console.log(`Started listening on port ${process.env.PORT}`)
  })
}



module.exports = {app}
