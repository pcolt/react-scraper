const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const logger = require('./utils/logger')
const reposRouter = require('./controllers/repo_controller')
const usersRouter = require('./controllers/users_controller')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

// const mongo_url = process.env.MONGO_URL
// // `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)     // connecting to mongodb
logger.info('connecting to ', config.MONGO_URL)
mongoose.connect(config.MONGO_URL)
  .then(() => {    
    logger.info('connected to MongoDB')  
  })  
  .catch((error) => {    
    logger.info('error connecting to MongoDB:', error.message)  
  })

const app = express()
app.use(express.static('dist'))     // when http GET request to main root or index.html it returns the static files in /dist build with vite
app.use(cors())                     // allow cors
app.use(express.json())             // activate the json-parser and implement an initial handler for dealing with the HTTP POST requests

app.use(middleware.requestLogger)

app.use('/api/repos', reposRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)

// export default app
module.exports = app