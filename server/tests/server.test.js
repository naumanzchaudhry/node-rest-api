const request = require('supertest')
const expect = require('expect')

var {app} = require('./../server')
var {Todo} = require('./../models/todo')

beforeEach( (done) => {
  Todo.remove({}).then(() => {
    done()
  })
})
describe('Todos', () => {
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

        Todo.find().then( (res) => {
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
          expect(res.length).toBe(0)
          done()
        }).catch( (e) => done(e))

      })


  })

})
