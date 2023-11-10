const jobsRouter = require('express').Router()
const logger = require('../utils/logger')
const verifyToken = require('../utils/verify_token')
// const UserModel = require('../models/user_model')
const redisClient = require('../utils/redis')

/**
 * Check user's token is valid and then
 * TODO: subscribe a new job to Redis db 
 */
jobsRouter.post('/', async (request, response, next) => {
  try {

    logger.info('Inside jobsRouter.post("/"):')

    const decodedToken = verifyToken(request)

    await redisClient.connect()
    logger.info('client.isReady():', redisClient.isReady)
    logger.info('client.isOpen():', redisClient.isOpen)

    // Publish an event to Redis
    // const article = {
    //   id: '123456',
    //   name: 'Using Redis Pub/Sub with Node.js',
    //   blog: 'Logrocket Blog',
    // }
    await redisClient.publish('runScraper', JSON.stringify(request.body))

    // await redisClient.set('bike:1', 'Process 134');
    // const value = await redisClient.get('bike:1');
    // console.log(value);

    await redisClient.disconnect()


    // const body = request.body

    // const user = await User.findById(decodedToken.id)
    // const note = new Note({
    //   content: body.content,
    //   important: body.important === undefined ? false : body.important,
    //   user: user._id
    // })

    // const savedNote = await note.save()
    // user.notes = user.notes.concat(savedNote._id)
    // await user.save()

    response.json({
      decodedToken: decodedToken
    })
  } catch (exception) {
    next(exception)
  }
})

module.exports = jobsRouter