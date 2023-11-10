const redis = require('redis')   // redis client

// Create a client and connect to Redis
const redisClient = redis.createClient({
  url: 'redis://default:D8STrD4BhkWwVHO46oOIc0TKCnUWSQAa@redis-12236.c300.eu-central-1-1.ec2.cloud.redislabs.com:12236'
  // host: 'redis-12236.c300.eu-central-1-1.ec2.cloud.redislabs.com',
  // port: 12236,
  // password: 'Pi-cian1986'
})
  .on('error', (err) => {
    logger.error("Error " + err);
  })

module.exports = redisClient