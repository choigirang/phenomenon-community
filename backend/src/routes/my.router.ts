import express from 'express';
import { showUserComments, showUserLikes, showUserPosts } from '../controllers/my.controller';
import { userAllData } from '../controllers/my.controller';

export const myRouter = express.Router();

myRouter.get('/my', userAllData);

myRouter.get('/my/posts', showUserPosts);

myRouter.get('/my/comments', showUserComments);

myRouter.get('/my/likes', showUserLikes);
