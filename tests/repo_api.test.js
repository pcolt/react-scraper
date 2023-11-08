// import mongoose from 'mongoose'
// import supertest from 'supertest'
// import app from '../app'
// import {jest} from '@jest/globals';
// jest.useFakeTimers();
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { RepoCrawlerModel, RepoClimatechangeModel } = require('../models/repo_model')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const UserModel = require('../models/user_model')


const api = supertest(app)

describe('interface tests on /api/repos route', () => {
  // Applies only to tests in this describe block
  beforeEach(async () => {
    await RepoClimatechangeModel.deleteMany()
    await RepoClimatechangeModel.insertMany(helper.mockClimatechangeRepos)
    await RepoCrawlerModel.deleteMany()
    await RepoCrawlerModel.insertMany(helper.mockCrawlerRepos)
    console.log('Data in database re-initialized')
  })
  test('test GET api/repos/climatechange', async () => {
    await api
      .get('/api/repos/climatechange')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then(response => {
        // console.log('/api/repos/climatechange response.body', response.body)
        expect(response.body).toHaveLength(helper.mockClimatechangeRepos.length)
      })
  })
  test('test GET api/repos/crawler', async () => {  
    await api
      .get('/api/repos/crawler')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then(response => {
        // console.log('api/repos/crawler response.body', response.body)
        expect(response.body).toHaveLength(helper.mockCrawlerRepos.length)
      })
  })
})

describe('Interface tests on api/users route. Collection has initially one user in db.', () => {
  beforeEach(async () => {
    await UserModel.deleteMany({})                                    // delete all users

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new UserModel({ username: 'root', passwordHash })    // add 1 initial user

    await user.save()
  })

  test('Creation succeeds with a new username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {                                                 // try to add a new user
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()                       // check one user was succesfully added
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)                 // check usernames contain the new inserted user
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})