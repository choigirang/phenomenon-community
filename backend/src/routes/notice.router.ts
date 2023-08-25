import express from 'express';
import { addNotice, showNotice } from '../controllers/notice.controller';

export const noticeRouter = express.Router();

/** 공지사항 조회 */
noticeRouter.get('/notice', showNotice);

/** 공지사항 추가 */
noticeRouter.post('/notice', addNotice);
