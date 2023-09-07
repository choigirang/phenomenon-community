import express from 'express';
import { upload } from '../config/multer';
import {
  addImageToGallery,
  deleteGallery,
  detailGallery,
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

galleryRouter.delete('/gallery/:id', deleteGallery);

// 갤러리 좋아요
galleryRouter.post('/gallery/likes', likesGallery);
