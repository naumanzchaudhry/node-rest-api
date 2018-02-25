var env = process.env.NODE_ENV || 'development'

if (env === 'development'){
  process.env.PORT = 3000
  process.env.MONGOLAB_URL = 'mongodb://127.0.0.1:27017/TodoApp'
}else if(env === 'test'){
  process.env.PORT = 3000
  process.env.MONGOLAB_URL = 'mongodb://127.0.0.1:27017/TodoAppTest'
}


var SECRET = 'alpha123'
