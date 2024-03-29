import express from 'express'
const reposRouter = express.Router()
import  { RepoCrawlerModel, RepoClimatechangeModel } from '../models/repo_model'
import logger from '../utils/logger'
// const reposRouter = require('express').Router()
// const  { RepoCrawlerModel, RepoClimatechangeModel } = require('../models/repo_model.js')
// const logger = require('../utils/logger')

reposRouter.get('/crawler', (request, response) => {              // backend root to retrieve crawler repos from mongoDB
  RepoCrawlerModel.find({}).then(repos => {
    logger.info('Repos retrieved')
    response.json(repos)
  })
})

reposRouter.get('/climatechange', (request, response) => {        // backend root to retrieve climatechange repos from mongoDB
  RepoClimatechangeModel.find({}).then(repos => {
    logger.info('Repos retrieved')
    response.json(repos)
  })
})

// export { reposRouter }
// module.exports = reposRouter
export default reposRouter