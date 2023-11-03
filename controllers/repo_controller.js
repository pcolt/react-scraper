import express from 'express'
const reposRouter = express.Router()
import RepoMongooseModel from '../models/repo_model.js'
import logger from '../utils/logger.js'

reposRouter.get('/', (request, response) => {        // backend root to retrieve notes from mongoDB
  RepoMongooseModel.find({}).then(repos => {
    logger.info('Repos retrieved')
    response.json(repos)
  })
})

export { reposRouter }