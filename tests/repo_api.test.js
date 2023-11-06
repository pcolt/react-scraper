// import mongoose from 'mongoose'
// import supertest from 'supertest'
// import app from '../app'
// import {jest} from '@jest/globals';
// jest.useFakeTimers();
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('interface tests on /api/repos endpoint', () => {
  test('api/repos/climatechange returns 200 and json', async () => {
    await api
      .get('/api/repos/climatechange')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('api/repos/crawler returns 200 and json', async () => {  
    await api
      .get('/api/repos/crawler')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})