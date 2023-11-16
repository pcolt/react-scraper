const jobsRouter = require('express').Router()
const logger = require('../utils/logger')
const { verifyRequestToken } = require('../utils/verify_token')
// const UserModel = require('../models/user_model')
const redisClient = require('../utils/redis')

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

module.exports = jobsRouter