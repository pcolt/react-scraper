"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis"); // redis client
// require('dotenv').config()       // environment variables
require("dotenv/config");
const logger_1 = __importDefault(require("./logger"));
// Create a client and connect to Redis
const redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL
})
    .on('error', (err) => {
    logger_1.default.error('Error ' + err);
});
exports.default = redisClient;
