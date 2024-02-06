"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
// import logger from './logger.js'
// require('dotenv').config()
// const logger = require('./logger')
// const MONGO_URL = process.env.MONGO_URL
const MONGO_URL = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGO_URL
    : process.env.MONGO_URL;
const PORT = process.env.PORT;
// logger.info('db url: ', MONGO_URL)
// logger.info('server port: ', PORT)
exports.default = { MONGO_URL, PORT };
// module.exports = { MONGO_URL, PORT }
