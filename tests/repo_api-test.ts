import { connection } from 'mongoose'
import { describe, expect, test } from '@jest/globals'   // explicit import actaully required only for typescript
import supertest from 'supertest'
import app from '../app'
import { mockClimatechangeRepos, mockCrawlerRepos, usersInDb } from './test_helper'
import { Secret, verify } from 'jsonwebtoken'

const api = supertest(app)

describe('interface tests on /api/repos route', () => {
  // Applies only to tests in this describe block
  const api = supertest(app); // Create the api object using supertest

  beforeEach(async () => {
    await api.post('/api/testing/resetrepos')
    console.log('Repos data in database re-initialized')
  })
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

describe('Interface tests on api/users and api/login routes. Collection has initially one user in db.', () => {
  beforeEach(async () => {
    await api.post('/api/testing/resetusers')
    console.log('Repos data in database re-initialized')
  })

  test('Creation succeeds with a new username', async () => {
    const usersAtStart = await usersInDb()

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

    const usersAtEnd = await usersInDb()                       // check one user was succesfully added
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)                 // check usernames contain the new inserted user
    expect(usernames).toContain(newUser.username)
  })

  test('Creation fails if username is duplicate already in db', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {                                                 // try to add a new user with username already in the db
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)                                                    // check http error code
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('duplicate key error collection') // check response body

    const usersAtEnd = await usersInDb()                         // check no user was added
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('Test succesfully "root" user login and token verification', async () => {
    const newLogin = {                                                 // try login
      'username': 'root',
      'password': 'sekret'
    }

    const result = await api
      .post('/api/login')
      .send(newLogin)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(result.body.token).toBeDefined

    if (!process.env.SECRET) {
      throw new Error('No secret defined in .env')
    }
    const decodedToken = verify(result.body.token, process.env.SECRET);
    if (typeof decodedToken === 'string' || decodedToken instanceof String) {
      throw new Error('Token verification failed')
    }
    expect(decodedToken.username).toBe('root')
    expect(decodedToken.id).toBeDefined
  })

  test('Test login failed', async () => {
    const newLogin = {
      'username': 'root',
      'password': 'sekretssssss'
    }

    const result = await api
      .post('/api/login')
      .send(newLogin)
      .expect(401)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toBeDefined
  })
})

afterAll(async () => {
  await connection.close()
})