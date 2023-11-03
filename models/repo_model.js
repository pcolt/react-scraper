import mongoose from 'mongoose'
import logger from '../utils/logger.js'
import config from '../utils/config.js'

const repoMongooseSchema = new mongoose.Schema({
  id: Number,
  user: String,
  repo: String,
  url: String,
  stars: Number,
  description: String,
  topics: [],
  repoLink: String,
  commits: Number
})
repoMongooseSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const RepoMongooseModel = mongoose.model('Repo', repoMongooseSchema)

export default RepoMongooseModel