import config from './utils/config'
import express from 'express'
import cors from 'cors'
import logger from './utils/logger'
import reposRouter from './controllers/repo_controller'
import usersRouter from './controllers/users_controller'
import loginRouter from './controllers/login_controller'
import jobsRouter from './controllers/jobs_controller'
import testingRouter from './controllers/testing_controller'
import middleware from './utils/middleware'
import mongoose from 'mongoose'

// const mongo_url = process.env.MONGO_URL
// // `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)     // connecting to mongodb
logger.info('connecting to ', config.MONGO_URL)
if (config.MONGO_URL === undefined) {
  logger.error('no mongo url found')
  process.exit(1)
}
mongoose.connect(config.MONGO_URL)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB:', error.message)
  })

const app = express()
app.use(express.static('src/frontend/dist'))     // when http GET request to main root or index.html it returns the static files in /dist build with vite
app.use(cors())                     // allow cors
app.use(express.json())             // activate the json-parser and implement an initial handler for dealing with the HTTP POST requests

app.use(middleware.requestLogger)

app.use('/api/repos', reposRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/jobs', jobsRouter)

if (process.env.NODE_ENV === 'test') {        // add testing route only when running tests
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)

export default app
// module.exports = app