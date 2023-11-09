const jwt = require('jsonwebtoken')
const logger = require('./logger')

const getTokenFrom = request => {  
  const authorization = request.get('authorization')  
  if (authorization && authorization.startsWith('Bearer ')) {    
    return authorization.replace('Bearer ', '')  
  }  
  return null
}

const verifyToken = request => {
  const token = getTokenFrom(request)
  try {
    return jwt.verify(token, process.env.SECRET)
  } catch(e) {
    logger.info('jwt.verify():', e.message)
    return false
  }
}

module.exports = verifyToken