const redis = require('redis')   // redis client
require('dotenv').config()       // environment variables
const logger = require('./logger')

// Create a client and connect to Redis
const redisClient = redis.createClient({
  url: process.env.REDIS_URL
  // host: 'redis-12236.c300.eu-central-1-1.ec2.cloud.redislabs.com',
  // port: 12236,
  // password: 'Pi-cian1986'
})
  .on('error', (err) => {
    logger.error("Error " + err);
  })

module.exports = redisClient