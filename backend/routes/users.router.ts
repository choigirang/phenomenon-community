import express from 'express';
import { createUser, sendSecurityCode, loginUser, checkUser } from '../src/controllers/users.controller';
import { refreshToken } from '../src/controllers/token.controller';
const usersRouter = express.Router();

// 로그인
usersRouter.post('/login', loginUser);

// 로그인 유지
usersRouter.get('/user', checkUser);

// 회원가입
usersRouter.post('/signin', createUser);

// 보안메일
usersRouter.post('/signin/security-code', sendSecurityCode);

// 토큰 재발급
usersRouter.post('/refresh', refreshToken);

export { usersRouter };
