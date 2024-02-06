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
const testingRouter = require('express').Router();
const user_model_1 = __importDefault(require("../models/user_model"));
const repo_model_1 = require("../models/repo_model");
const test_helper_1 = __importDefault(require("../tests/test_helper"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// const logger = require('../utils/logger')
testingRouter.post('/resetrepos', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield repo_model_1.RepoClimatechangeModel.deleteMany(); // delete all repos
    yield repo_model_1.RepoClimatechangeModel.insertMany(test_helper_1.default.mockClimatechangeRepos);
    yield repo_model_1.RepoCrawlerModel.deleteMany();
    yield repo_model_1.RepoCrawlerModel.insertMany(test_helper_1.default.mockCrawlerRepos);
    // logger.info('Repos data in database re-initialized')
    response.status(204).end();
}));
testingRouter.post('/resetusers', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.deleteMany({}); // delete all users
    const passwordHash = yield bcrypt_1.default.hash('sekret', 10);
    const user = new user_model_1.default({ username: 'root', passwordHash }); // add 1 initial user
    yield user.save();
    // logger.info('Users data in database re-initialized')
    response.status(204).end();
}));
// module.exports = testingRouter
exports.default = testingRouter;
