import express from 'express';
import { userAllData } from '../controllers/my.controller';

export const myRouter = express.Router();

myRouter.get('/my=:user', userAllData);
