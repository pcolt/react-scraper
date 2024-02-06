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
exports.usersInDb = exports.mockCrawlerRepos = exports.mockClimatechangeRepos = void 0;
const user_model_1 = __importDefault(require("../models/user_model"));
const mockClimatechangeRepos = [
    {
        id: 0,
        user: 'OpenEMS',
        repoName: 'openems',
        url: 'https://github.com/OpenEMS/openems',
        stars: 536,
        description: 'OpenEMS - Open Source Energy Management System',
        topics: [
            'energy-storage',
            'heatpump',
            'energy-management',
            'climatechange',
            'photovoltaics',
            'electric-vehicle-charging-station'
        ],
        repoLink: '/OpenEMS/openems',
        commits: 5641
    },
    {
        id: 1,
        user: 'climate-strike',
        repoName: 'license',
        url: 'https://github.com/climate-strike/license',
        stars: 476,
        description: 'Prevent oil and gas companies from co-opting your work and extracting more fossil fuels with this software license.',
        topics: [
            'climate-change',
            'licenses',
            'climatechange',
            'climate-crisis',
            'climatestrike'
        ],
        repoLink: '/climate-strike/license',
        commits: 61
    }
];
exports.mockClimatechangeRepos = mockClimatechangeRepos;
const mockCrawlerRepos = [
    {
        'id': 0,
        'user': 'scrapy',
        'repoName': 'scrapy',
        'url': 'https://github.com/scrapy/scrapy',
        'stars': 49162,
        'description': 'Scrapy, a fast high-level web crawling & scraping framework for Python.',
        'topics': [
            'python',
            'crawler',
            'framework',
            'scraping',
            'crawling',
            'web-scraping',
            'hacktoberfest',
            'web-scraping-python'
        ],
        'repoLink': '/scrapy/scrapy',
        'commits': 10194
    },
    {
        'id': 1,
        'user': 'iawia002',
        'repoName': 'lux',
        'url': 'https://github.com/iawia002/lux',
        'stars': 22458,
        'description': '👾 Fast and simple video download library and CLI tool written in Go',
        'topics': [
            'go',
            'golang',
            'crawler',
            'scraper',
            'downloader',
            'youtube',
            'video',
            'download',
            'tumblr',
            'bilibili',
            'qq',
            'youku',
            'iqiyi'
        ],
        'repoLink': '/iawia002/lux',
        'commits': 816
    },
];
exports.mockCrawlerRepos = mockCrawlerRepos;
const usersInDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find({});
    return users.map(user => user.toJSON());
});
exports.usersInDb = usersInDb;
exports.default = { mockClimatechangeRepos, mockCrawlerRepos, usersInDb };
