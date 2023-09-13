"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const posts_controller_1 = require("../controllers/posts.controller");
exports.postRouter = express_1.default.Router();
// 최신 게시글 조회
exports.postRouter.get('/posts/latest', posts_controller_1.latestPost);
// 페이지네이션 게시글 조회
exports.postRouter.get('/posts', posts_controller_1.showPosts);
// 개별 게시글 조회
exports.postRouter.get('/post/:id', posts_controller_1.showEachPost);
// 카테고리 게시글 조회
exports.postRouter.get('/posts/:category', posts_controller_1.categoryPost);
// 게시글 추가
exports.postRouter.post('/posts', posts_controller_1.addPost);
// 게시글 삭제
exports.postRouter.delete('/post/:id', posts_controller_1.deletePost);
// 게시글 수정
exports.postRouter.post('/edit/:id', posts_controller_1.editPost);
// 게시글 댓글 추가
exports.postRouter.post('/post/comment', posts_controller_1.addComment);
// 게시글 댓글 수정
exports.postRouter.post('/post/:postNumber/comments/:commentNumber', posts_controller_1.editComment);
// 게시글 댓글 삭제
exports.postRouter.delete('/post/:postNumber/comments/:commentNumber', posts_controller_1.deleteComment);
// 게시글 좋아요
exports.postRouter.post('/post/likes', posts_controller_1.postAddLikes);
// 게시글 검색
exports.postRouter.get('/search', posts_controller_1.searchPost);
