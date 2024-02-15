// const jobsRouter = require('express').Router()
import express from 'express'
const jobsRouter = express.Router()
import logger from '../utils/logger'
import { verifyRequestToken } from '../utils/verify_token'
// const UserModel = require('../models/user_model')
import redisClient from '../utils/redis'

/**
 * Send a job to the Redis queue after verifying user token
 */
jobsRouter.post('/', async (request, response, next) => {
  try {

    logger.info('Inside jobsRouter.post("/"):')

    const decodedToken = verifyRequestToken(request)

    await redisClient.connect()
    logger.info('client.isReady():', redisClient.isReady)
    logger.info('client.isOpen():', redisClient.isOpen)

    // Publish an event to Redis
    console.log(`publishing to runScraper_${process.env.NODE_ENV}`)
    await redisClient.publish(`runScraper_${process.env.NODE_ENV}`, JSON.stringify(request.body))

    // await redisClient.set('bike:1', 'Process 134');
    // const value = await redisClient.get('bike:1');
    // console.log(value);

    await redisClient.disconnect()

    response.json({
      decodedToken: decodedToken,
      message: `Job '${request.body.topic}' added to Redis queue`
    })
  } catch (exception) {
    next(exception)
  }
})

// module.exports = jobsRouter
export default jobsRouter