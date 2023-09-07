import { Request, Response } from 'express';
import Gallery from '../models/gallery.model';

// 갤러리 조회
export async function galleryList(req: Request, res: Response) {
  try {
    const findGallery = await Gallery.find();

    res.status(200).json(findGallery);
  } catch (err) {
    res.status(500).json('server err');
  }
}

// 갤러리 추가
export async function addImageToGallery(req: Request, res: Response) {
  try {
    // 클라이언트로부터 받은 정보
    const { title, author, date } = req.body;

    const files = req.files as Express.MulterS3.File[];

    const baseUrl = 'https://choigirang-why-community.s3.ap-northeast-2.amazonaws.com/gallery/';

    const galleryNumber = await Gallery.find();

    // MongoDB에 이미지 정보 저장
    const gallery = new Gallery({
      title,
      author,
      date,
      galleryNumber: galleryNumber.length + 1,
      images: files.map(file => ({ src: file.location.replace(baseUrl, '') })),
    });

    await gallery.save();

    res.status(200).json({ message: '갤러리 이미지 추가 성공', files });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '갤러리 이미지 추가 실패' });
  }
}
