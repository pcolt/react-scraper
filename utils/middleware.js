// import logger from './logger.js'
const logger = require('./logger.js')

const requestLogger = (request, response, next) => {    // middleware to print info about any request
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()      // go to next middleware
}

const unknownEndpoint = (request, response) => {      // all other not defined roots give error
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error('errorHandler:', error.message)

  if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'invlaid token' })
  } else if (error.name ===  'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(error)
}

// export default { requestLogger, unknownEndpoint }
module.exports = { requestLogger, unknownEndpoint, errorHandler }