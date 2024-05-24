import { Request, Response } from 'express';

import Notice from '../models/notice.model';

/** 공지사항 목록 */
export async function showNotice(req: Request, res: Response) {
  const { page } = req.query;

  try {
    const itemsPerPage = 10;
    const currentPage = parseInt(page as string, 10) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const notice = await Notice.find().sort({ noticeNumber: -1 }).skip(startIndex).limit(itemsPerPage);
    const totalNotice = await Notice.countDocuments();

    return res.status(200).send({ notice, totalNotice });
  } catch (err) {
    return res.status(404).send(err);
  }
}

/** 공지사항 개별 조회 */
export async function eachNotice(req: Request, res: Response) {
  const { id } = req.params;

  const notice = await Notice.findOne({ noticeNumber: id });

  try {
    return res.status(200).send(notice);
  } catch (err) {
    return res.status(404).send(err);
  }
}

/** 권한 계정에 따른 공지사항 추가 */
export async function addNotice(req: Request, res: Response) {
  const { title, content, date, author } = req.body;

  try {
    const noticeNumber = await Notice.countDocuments();

    const createdPost = new Notice({
      author,
      noticeNumber: noticeNumber + 1,
      title,
      content,
      date,
    });

    await createdPost.save();

    return res.status(200).json('성공');
  } catch (err) {
    console.log(err);
    return res.status(404);
  }
}
