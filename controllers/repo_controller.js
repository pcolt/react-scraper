// import express from 'express'
// const reposRouter = express.Router()
// import  { RepoCrawlerModel, RepoClimatechangeModel } from '../models/repo_model.js'
// import logger from '../utils/logger.js'
const reposRouter = require('express').Router()
const  { RepoCrawlerModel, RepoClimatechangeModel } = require('../models/repo_model.js')
const logger = require('../utils/logger')

reposRouter.get('/crawler', (request, response) => {        // backend root to retrieve notes from mongoDB
  RepoCrawlerModel.find({}).then(repos => {
    logger.info('Repos retrieved')
    response.json(repos)
  })
})

reposRouter.get('/climatechange', (request, response) => {        // backend root to retrieve notes from mongoDB
  RepoClimatechangeModel.find({}).then(repos => {
    logger.info('Repos retrieved')
    response.json(repos)
  })
})

// export { reposRouter }
module.exports = reposRouter