import express from 'express';
import {
  addComment,
  addLikes,
  addPost,
  showEachPost,
  showPostsByPage,
  searchPost,
  deletePost,
  editPost,
} from '../controllers/posts.controller';

export const postRouter = express.Router();

// 게시글 조회
postRouter.get('/all-posts', showPostsByPage);

// 개별 게시글 조회
postRouter.get('/post/:id', showEachPost);

// 게시글 추가
postRouter.post('/posts', addPost);

// 게시글 삭제
postRouter.delete('/post/:id', deletePost);

// 게시글 수정
postRouter.post('/edit/:id', editPost);

// 게시글 댓글 추가
postRouter.post('/post/comment', addComment);

// 게시글 좋아요
postRouter.post('/likes', addLikes);

// 게시글 검색
postRouter.get('/search', searchPost);
