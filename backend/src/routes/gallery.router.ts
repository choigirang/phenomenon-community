import express from 'express';
import { upload } from '../config/multer';
import {
  addImageToGallery,
  deleteGallery,
  detailGallery,
  galleryAddComment,
  galleryDeleteComment,
  galleryEditComment,
  galleryList,
  latestGallery,
  likesGallery,
} from '../controllers/gallery.controller';

export const galleryRouter = express.Router();

// 갤러리 최근 조회
galleryRouter.get('/gallery/latest', latestGallery);

// 갤러리 조회
galleryRouter.get('/gallery', galleryList);

// 갤러리 이미지 추가
galleryRouter.post('/gallery', upload('gallery').array('images', 10), addImageToGallery);

// 개별 갤러리 조회
galleryRouter.get('/gallery/:id', detailGallery);

// 갤러리 삭제
galleryRouter.delete('/gallery/:id', deleteGallery);

// 갤러리 좋아요
galleryRouter.post('/gallery/likes', likesGallery);

// 갤러리 댓글 추가
galleryRouter.post('/gallery/comment', galleryAddComment);

// 갤러리 댓글 수정
galleryRouter.post('/gallery/:galleryNumber/comments/:commentNumber', galleryEditComment);

// 갤러리 댓글 삭제
galleryRouter.delete('/gallery/:galleryNumber/comments/:commentNumber', galleryDeleteComment);
