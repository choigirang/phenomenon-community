import express from 'express';
import { addNotice, eachNotice, showNotice } from '../controllers/notice.controller';

export const noticeRouter = express.Router();

/** 공지사항 전체 조회 */
noticeRouter.get('/notice', showNotice);

/** 공지사항 개별 조회*/
noticeRouter.get('/notice/:id', eachNotice);

/** 공지사항 추가 */
noticeRouter.post('/notice', addNotice);
