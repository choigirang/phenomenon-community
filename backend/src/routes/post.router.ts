import express from 'express';
import {
  addComment,
  addPost,
  showEachPost,
  searchPost,
  deletePost,
  editPost,
  categoryPost,
  latestPost,
  showPosts,
  editComment,
  deleteComment,
  postAddLikes,
} from '../controllers/posts.controller';

export const postRouter = express.Router();

// 전체 게시글 조회
postRouter.get('/posts/all');

// 최신 게시글 조회
postRouter.get('/posts/latest', latestPost);

// 페이지네이션 게시글 조회
postRouter.get('/posts', showPosts);

// 개별 게시글 조회
postRouter.get('/post/:id', showEachPost);

// 카테고리 게시글 조회
postRouter.get('/posts/category', categoryPost);

// 게시글 추가
postRouter.post('/posts', addPost);

// 게시글 삭제
postRouter.delete('/post/:id', deletePost);

// 게시글 수정
postRouter.post('/edit/:id', editPost);

// 게시글 댓글 추가
postRouter.post('/post/comment', addComment);

// 게시글 댓글 수정
postRouter.post('/post/:postNumber/comments/:commentNumber', editComment);

// 게시글 댓글 삭제
postRouter.delete('/post/:postNumber/comments/:commentNumber', deleteComment);

// 게시글 좋아요
postRouter.post('/post/likes', postAddLikes);

// 게시글 검색
postRouter.get('/posts/search', searchPost);
