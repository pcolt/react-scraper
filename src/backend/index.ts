// import app from './app.js'
import config from './utils/config'
import logger from './utils/logger'
import app from './app'
// const config = require('./utils/config.js')
// const logger = require('./utils/logger.js')

// const PORT = process.env.PORT || 3001                 // startup express server on port 3001
const PORT = config.PORT                // startup express server on port 3001
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})