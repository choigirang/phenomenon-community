import express from 'express';
import { showUserComments, showUserLikes, showUserPosts } from '../controllers/my.controller';
import { userAllData } from '../controllers/my.controller';

export const myRouter = express.Router();

// 유저 전체 데이터 (포스터, 댓글 등)
myRouter.get('/my', userAllData);

// 유저 작성 데이터
myRouter.get('/my/posts', showUserPosts);

// 유저 작성 댓글
myRouter.get('/my/comments', showUserComments);

// 유저 좋아요
myRouter.get('/my/likes', showUserLikes);
