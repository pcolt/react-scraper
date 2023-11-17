const redis = require('redis')   // redis client
require('dotenv').config()       // environment variables
const logger = require('./logger')

// Create a client and connect to Redis
const redisClient = redis.createClient({
  url: process.env.REDIS_URL
})
  .on('error', (err) => {
    logger.error('Error ' + err)
  })

module.exports = redisClient