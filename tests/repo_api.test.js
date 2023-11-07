// import mongoose from 'mongoose'
// import supertest from 'supertest'
// import app from '../app'
// import {jest} from '@jest/globals';
// jest.useFakeTimers();
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { RepoCrawlerModel, RepoClimatechangeModel } = require('../models/repo_model')
const { mockClimatechangeRepos, mockCrawlerRepos } = require('./tests_helper')


const api = supertest(app)

describe('interface tests on /api/repos endpoint', () => {
  // Applies only to tests in this describe block
  beforeEach(async () => {
    await RepoClimatechangeModel.deleteMany()
    await RepoClimatechangeModel.insertMany(mockClimatechangeRepos)
    await RepoCrawlerModel.deleteMany()
    await RepoCrawlerModel.insertMany(mockCrawlerRepos)
    console.log("Data in database re-initialized");
  });
  test('test GET api/repos/climatechange', async () => {
    await api
      .get('/api/repos/climatechange')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then(response => {
        // console.log('/api/repos/climatechange response.body', response.body)
        expect(response.body).toHaveLength(mockClimatechangeRepos.length)
      })
  })
  test('test GET api/repos/crawler', async () => {  
    await api
      .get('/api/repos/crawler')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then(response => {
        // console.log('api/repos/crawler response.body', response.body)
        expect(response.body).toHaveLength(mockCrawlerRepos.length)
      })
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})