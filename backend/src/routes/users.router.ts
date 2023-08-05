import express from 'express';
import { createUser, sendSecurityCode, loginUser } from '../controllers/users.controller';
const usersRouter = express.Router();

usersRouter.post('/login', loginUser);
usersRouter.post('/signin', createUser);
usersRouter.post('/signin/security-code', sendSecurityCode);

export { usersRouter };
