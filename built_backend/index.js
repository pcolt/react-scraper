"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import app from './app.js'
const config_js_1 = __importDefault(require("./utils/config.js"));
const logger_js_1 = __importDefault(require("./utils/logger.js"));
const app_js_1 = __importDefault(require("./app.js"));
// const config = require('./utils/config.js')
// const logger = require('./utils/logger.js')
// const PORT = process.env.PORT || 3001                 // startup express server on port 3001
const PORT = config_js_1.default.PORT; // startup express server on port 3001
app_js_1.default.listen(PORT, () => {
    logger_js_1.default.info(`Server running on port ${PORT}`);
});
