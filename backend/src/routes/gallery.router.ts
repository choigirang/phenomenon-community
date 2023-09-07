import express from 'express';
import { upload } from '../config/multer';
import { addImageToGallery, galleryList } from '../controllers/gallery.controller';

export const galleryRouter = express.Router();

// 갤러리 조회
galleryRouter.get('/gallery', galleryList);

// 갤러리 이미지 추가
galleryRouter.post('/gallery', upload('gallery').array('images', 10), addImageToGallery);
