"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reposRouter = express_1.default.Router();
const repo_model_js_1 = require("../models/repo_model.js");
const logger_1 = __importDefault(require("../utils/logger"));
// const reposRouter = require('express').Router()
// const  { RepoCrawlerModel, RepoClimatechangeModel } = require('../models/repo_model.js')
// const logger = require('../utils/logger')
reposRouter.get('/crawler', (request, response) => {
    repo_model_js_1.RepoCrawlerModel.find({}).then(repos => {
        logger_1.default.info('Repos retrieved');
        response.json(repos);
    });
});
reposRouter.get('/climatechange', (request, response) => {
    repo_model_js_1.RepoClimatechangeModel.find({}).then(repos => {
        logger_1.default.info('Repos retrieved');
        response.json(repos);
    });
});
// export { reposRouter }
// module.exports = reposRouter
exports.default = reposRouter;
