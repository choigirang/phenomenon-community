"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("../controllers/users.controller");
const token_controller_1 = require("../controllers/token.controller");
const multer_1 = require("../config/multer");
const usersRouter = express_1.default.Router();
exports.usersRouter = usersRouter;
// 로그인
usersRouter.post('/login', users_controller_1.loginUser);
// // 로그인 유지
// usersRouter.get('/user', checkUser);
// 전체 유저
usersRouter.get('/users', users_controller_1.allUser);
// 개별 유저 검색
usersRouter.get('/user', users_controller_1.searchUser);
// 개별 유저 데이터
usersRouter.get('/user/:id', users_controller_1.searchUserData);
// 회원가입
usersRouter.post('/signup', (0, multer_1.upload)('profile').single('profileImage'), users_controller_1.createUser);
// 보안메일
usersRouter.post('/signup/security-code', users_controller_1.sendSecurityCode);
// 토큰 재발급
usersRouter.post('/refresh', token_controller_1.refreshToken);
