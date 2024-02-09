import { createClient } from 'redis'   // redis client
// require('dotenv').config()       // environment variables
import 'dotenv/config'
import logger from './logger'

// Create a client and connect to Redis
const redisClient = createClient({
  url: process.env.REDIS_URL
})
  .on('error', (err) => {
    logger.error('Error ' + err)
  })

export default redisClient