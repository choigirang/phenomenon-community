import express from 'express';
import { addComment, addPost, showEachPost, showPostsByPage } from '../controllers/posts.controller';

const postRouter = express.Router();

// 게시글 조회
postRouter.get('/all-posts', showPostsByPage);

// 개별 게시글 조회
postRouter.get('/post/:id', showEachPost);

// 게시글 추가
postRouter.post('/posts', addPost);

// 게시글 댓글 추가
postRouter.post('/post/comment', addComment);
export default postRouter;
