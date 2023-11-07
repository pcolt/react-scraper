// import config from './utils/config.js'
// import express from 'express'
// import cors from 'cors'
// // import RepoMongooseModel from './models/repo_model.js'
// import logger from './utils/logger.js'
// import { reposRouter } from './controllers/repo_controller.js'
// import middleware from './utils/middleware.js'
// import mongoose from 'mongoose'
const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const logger = require('./utils/logger')
const reposRouter = require('./controllers/repo_controller')
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

app.use(middleware.requestLogger)

app.use('/api/repos', reposRouter)

app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)

// export default app
module.exports = app