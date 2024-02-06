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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// const loginRouter = require('express').Router()
const express_1 = __importDefault(require("express"));
const loginRouter = express_1.default.Router();
const user_model_1 = __importDefault(require("../models/user_model"));
loginRouter.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = request.body;
    const user = yield user_model_1.default.findOne({ username }); // search user in db
    const passwordCorrect = user === null
        ? false
        : yield bcrypt_1.default.compare(password, user.passwordHash); // check password
    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        });
    }
    const userForToken = {
        username: user.username,
        id: user._id,
    };
    const token = jsonwebtoken_1.default.sign(// generate token if login succesfull with expire time 1h
    userForToken, process.env.SECRET, { expiresIn: 60 * 60 });
    response
        .status(200)
        .send({ token, username: user.username, name: user.name });
}));
// module.exports = loginRouter
exports.default = loginRouter;
