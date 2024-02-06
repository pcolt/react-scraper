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
const bcrypt_1 = __importDefault(require("bcrypt"));
const usersRouter = require('express').Router();
const user_model_1 = __importDefault(require("../models/user_model"));
const logger_1 = __importDefault(require("../utils/logger"));
usersRouter.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('request.body:', request.body)
    const { username, name, password } = request.body;
    const saltRounds = 10;
    const passwordHash = yield bcrypt_1.default.hash(password, saltRounds);
    const user = new user_model_1.default({
        username,
        name,
        passwordHash,
    });
    try {
        const savedUser = yield user.save();
        response.status(201).json(savedUser);
    }
    catch (e) {
        logger_1.default.info('error:', e);
        response.status(400).json({
            error: e.message
        });
    }
}));
usersRouter.get('/', (request, response) => {
    user_model_1.default.find({}).then(users => {
        logger_1.default.info('Users retrieved');
        response.json(users);
    });
});
exports.default = usersRouter;
// module.exports = usersRouter
