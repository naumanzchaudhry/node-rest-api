const request = require('supertest')
const expect = require('expect')
var {ObjectID} = require('mongodb')
var {app} = require('./../server')
var {Todo} = require('./../models/todo')

const todos_data = [{
  _id: new ObjectID(),
  text: 'Dummy data 1'
}, {
  _id: new ObjectID(),
  text: 'Dummy data 2'
}]

beforeEach( (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos_data)
  }).then(() => done())
})


describe('POST /todos', () => {
  it('should create new todo item', (done) => {

    var test = 'Test todo'
    request(app)
      .post('/todos')
      .send({text: test})
      .expect(200)
      .expect( (res) => {
        expect(res.body.todo.text).toBe(test)
      })
      .end( (error, res) => {
        if (error){
          done(error)
        }

        Todo.find({text: test}).then( (res) => {
            expect(res.length).toBe(1)
            expect(res[0].text).toBe(test)
            done()
        }).catch( (e) => done(e) )

      })

  })

  it('should not create todo with invalid data', (done) => {

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((error, response) => {
        if (error){
          done(error)
        }
        Todo.find().then( (res) => {
          expect(res.length).toBe(2)
          done()
        }).catch( (e) => done(e))

      })

  })

})

describe('GET /todos', () => {
  it('should get all todos', (done) =>{
      request(app)
        .get('/todos')
        .expect(200)
        .end( (error, response) => {
          if (error){
            done(error)
          }

          Todo.find().then( (res) => {
            expect(res.length).toBe(2)
            done()
          }).catch( (e) => done(e))

        })
  })
})

describe('GET /todos/:id', () => {
  it('should get the todo with given id', (done) => {
      request(app)
        .get(`/todos/${todos_data[0]._id}`)
        .expect(200)
        .expect( (res) => {
          expect(res.body.todo.text).toBe(todos_data[0].text)
        })
        .end(done)
  })

  it('should return 404 if invalid id', (done) => {
    request(app)
      .get(`/todos/${todos_data[0]._id}+'111'`)
      .expect(400)
      .expect( (res) => {
        expect(res.body.message).toBe('Invalid ObjectID')
      })
      .end(done)
  })

  it('should return 404 if todo not found', (done) => {
    request(app)
      .get(`/todos/${new ObjectID().toHexString()}`)
      .expect(400)
      .end(done)
  })


})
