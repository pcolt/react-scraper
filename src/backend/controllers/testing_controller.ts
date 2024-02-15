const testingRouter = require('express').Router()
import UserModel from '../models/user_model'
import { RepoCrawlerModel, RepoClimatechangeModel } from '../models/repo_model'
import helper from '../tests/test_helper'
import bcrypt from 'bcrypt'
// const logger = require('../utils/logger')

testingRouter.post('/resetrepos', async (request, response) => {   // reset repos data in database

  await RepoClimatechangeModel.deleteMany()                         // delete all repos
  await RepoClimatechangeModel.insertMany(helper.mockClimatechangeRepos)
  await RepoCrawlerModel.deleteMany()
  await RepoCrawlerModel.insertMany(helper.mockCrawlerRepos)
  // logger.info('Repos data in database re-initialized')

  response.status(204).end()
})

testingRouter.post('/resetusers', async (request, response) => {   // reset users data in database

  await UserModel.deleteMany({})                                    // delete all users
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new UserModel({ username: 'root', passwordHash })    // add 1 initial user
  await user.save()
  // logger.info('Users data in database re-initialized')

  response.status(204).end()
})

// module.exports = testingRouter
export default testingRouter