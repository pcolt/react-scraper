// import mongoose from 'mongoose'
// import logger from '../utils/logger.js'
// import config from '../utils/config.js'
const mongoose = require('mongoose');
// const logger = require('../utils/logger')
// const config = require('../utils/config')
const repoMongooseSchema = new mongoose.Schema({
    id: Number,
    user: String,
    repoName: String,
    url: String,
    stars: Number,
    description: String,
    topics: [],
    repoLink: String,
    commits: Number
});
repoMongooseSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const RepoCrawlerModel = mongoose.model('Crawler', repoMongooseSchema);
const RepoClimatechangeModel = mongoose.model('Climatechange', repoMongooseSchema);
// export { RepoCrawlerModel, RepoClimatechangeModel }
module.exports = { RepoCrawlerModel, RepoClimatechangeModel };
