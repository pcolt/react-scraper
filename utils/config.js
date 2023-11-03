import 'dotenv/config'
import logger from './logger.js'

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT

// logger.info('db url: ', MONGO_URL)
// logger.info('server port: ', PORT)

export default { MONGO_URL, PORT }