// import app from './app.js'
import config from './utils/config.js'
import logger from './utils/logger.js'
import app from './app.js'
// const config = require('./utils/config.js')
// const logger = require('./utils/logger.js')

// const PORT = process.env.PORT || 3001                 // startup express server on port 3001
const PORT = config.PORT                // startup express server on port 3001
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})