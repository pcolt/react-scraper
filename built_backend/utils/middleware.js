"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
// const logger = require('./logger.js')
const requestLogger = (request, response, next) => {
    logger_1.default.info('Method:', request.method);
    logger_1.default.info('Path:  ', request.path);
    logger_1.default.info('Body:  ', request.body);
    logger_1.default.info('---');
    next(); // go to next middleware
};
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};
const errorHandler = (error, request, response, next) => {
    logger_1.default.error('errorHandler:', error.message);
    if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'invlaid token' });
    }
    else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ error: 'token expired' });
    }
    next(error);
};
exports.default = { requestLogger, unknownEndpoint, errorHandler };
// module.exports = { requestLogger, unknownEndpoint, errorHandler }
