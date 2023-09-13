"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myRouter = void 0;
const express_1 = __importDefault(require("express"));
const my_controller_1 = require("../controllers/my.controller");
// import { userAllData } from '../controllers/my.controller';
exports.myRouter = express_1.default.Router();
// myRouter.get('/my=:user', userAllData);
exports.myRouter.get('/my/posts', my_controller_1.showUserPosts);
exports.myRouter.get('/my/comments', my_controller_1.showUserComments);
