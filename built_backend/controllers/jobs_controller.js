"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const jobsRouter = require('express').Router()
const express_1 = __importDefault(require("express"));
const jobsRouter = express_1.default.Router();
const logger_1 = __importDefault(require("../utils/logger"));
const verify_token_1 = require("../utils/verify_token");
// const UserModel = require('../models/user_model')
const redis_1 = __importDefault(require("../utils/redis"));
/**
 * Send a job to the Redis queue after verifying user token
 */
jobsRouter.post('/', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info('Inside jobsRouter.post("/"):');
        const decodedToken = (0, verify_token_1.verifyRequestToken)(request);
        yield redis_1.default.connect();
        logger_1.default.info('client.isReady():', redis_1.default.isReady);
        logger_1.default.info('client.isOpen():', redis_1.default.isOpen);
        // Publish an event to Redis
        console.log(`publishing to runScraper_${process.env.NODE_ENV}`);
        yield redis_1.default.publish(`runScraper_${process.env.NODE_ENV}`, JSON.stringify(request.body));
        // await redisClient.set('bike:1', 'Process 134');
        // const value = await redisClient.get('bike:1');
        // console.log(value);
        yield redis_1.default.disconnect();
        response.json({
            decodedToken: decodedToken,
            message: `Job '${request.body.topic}' added to Redis queue`
        });
    }
    catch (exception) {
        next(exception);
    }
}));
// module.exports = jobsRouter
exports.default = jobsRouter;
