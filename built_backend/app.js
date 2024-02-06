"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./utils/config"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = __importDefault(require("./utils/logger"));
const repo_controller_1 = __importDefault(require("./controllers/repo_controller"));
const users_controller_1 = __importDefault(require("./controllers/users_controller"));
const login_controller_1 = __importDefault(require("./controllers/login_controller"));
const jobs_controller_1 = __importDefault(require("./controllers/jobs_controller"));
const testing_controller_1 = __importDefault(require("./controllers/testing_controller"));
const middleware_1 = __importDefault(require("./utils/middleware"));
const mongoose_1 = __importDefault(require("mongoose"));
// const mongo_url = process.env.MONGO_URL
// // `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`
mongoose_1.default.set('strictQuery', false); // connecting to mongodb
logger_1.default.info('connecting to ', config_1.default.MONGO_URL);
mongoose_1.default.connect(config_1.default.MONGO_URL)
    .then(() => {
    logger_1.default.info('connected to MongoDB');
})
    .catch((error) => {
    logger_1.default.info('error connecting to MongoDB:', error.message);
});
const app = (0, express_1.default)();
app.use(express_1.default.static('dist')); // when http GET request to main root or index.html it returns the static files in /dist build with vite
app.use((0, cors_1.default)()); // allow cors
app.use(express_1.default.json()); // activate the json-parser and implement an initial handler for dealing with the HTTP POST requests
app.use(middleware_1.default.requestLogger);
app.use('/api/repos', repo_controller_1.default);
app.use('/api/users', users_controller_1.default);
app.use('/api/login', login_controller_1.default);
app.use('/api/jobs', jobs_controller_1.default);
if (process.env.NODE_ENV === 'test') { // add testing route only when running tests
    app.use('/api/testing', testing_controller_1.default);
}
app.use(middleware_1.default.unknownEndpoint);
app.use(middleware_1.default.errorHandler);
exports.default = app;
// module.exports = app
