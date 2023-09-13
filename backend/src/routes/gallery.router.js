"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.galleryRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = require("../config/multer");
const gallery_controller_1 = require("../controllers/gallery.controller");
exports.galleryRouter = express_1.default.Router();
// 갤러리 최근 조회
exports.galleryRouter.get('/gallery/latest', gallery_controller_1.latestGallery);
// 갤러리 조회
exports.galleryRouter.get('/gallery', gallery_controller_1.galleryList);
// 갤러리 이미지 추가
exports.galleryRouter.post('/gallery', (0, multer_1.upload)('gallery').array('images', 10), gallery_controller_1.addImageToGallery);
// 개별 갤러리 조회
exports.galleryRouter.get('/gallery/:id', gallery_controller_1.detailGallery);
// 갤러리 삭제
exports.galleryRouter.delete('/gallery/:id', gallery_controller_1.deleteGallery);
// 갤러리 좋아요
exports.galleryRouter.post('/gallery/likes', gallery_controller_1.likesGallery);
// 갤러리 댓글 추가
exports.galleryRouter.post('/gallery/comment', gallery_controller_1.galleryAddComment);
// 갤러리 댓글 수정
exports.galleryRouter.post('/gallery/:galleryNumber/comments/:commentNumber', gallery_controller_1.galleryEditComment);
// 갤러리 댓글 삭제
exports.galleryRouter.delete('/gallery/:galleryNumber/comments/:commentNumber', gallery_controller_1.galleryDeleteComment);
