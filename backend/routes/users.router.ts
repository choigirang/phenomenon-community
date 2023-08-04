import express from 'express';
import { createUser, sendSecurityCode, showUser } from '../src/controllers/users.controller';
const usersRouter = express.Router();

usersRouter.get('/login', showUser);
usersRouter.post('/signin', createUser);
usersRouter.post('/signin/security-code', sendSecurityCode);

export { usersRouter };
