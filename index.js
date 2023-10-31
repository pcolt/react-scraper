// import http from 'http'
import 'dotenv/config'
import express from 'express'
import { repos } from './src/assets/repos.js'
import cors from 'cors'
import { mongoose } from 'mongoose';
import RepoMongooseModel from './models/repo_model.js';


const app = express()
app.use(express.static('dist'))     // when http GET request to main root or index.html it returns the static files in /dist build with vite
app.use(cors())                     // allow cors

const requestLogger = (request, response, next) => {    // middleware to print info about any request
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()      // go to next middleware
}
app.use(requestLogger)

// app.get('/', (request, response) => {
//   response.send('<h1>Hello World!!!!!</h1>')
// })

app.get('/api/repos', (request, response) => {        // backend root to retrieve notes from mongoDB
  RepoMongooseModel.find({}).then(repos => {
    console.log('Repos retrieved')
    response.json(repos)
  })
})

const unknownEndpoint = (request, response) => {      // all other not defined roots give error
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)


const PORT = process.env.PORT || 3001                 // startup express server on port 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})