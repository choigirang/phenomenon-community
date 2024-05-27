import { Request, Response } from 'express';
import { CommentData, GalleryType } from '../../type/type';

import Gallery from '../models/gallery.model';
import User from '../models/users.model';

// 갤러리 최근 조회
export async function latestGallery(req: Request, res: Response) {
  console.log('latestGallery 실행');
  try {
    const latestGallery = (await Gallery.find().sort({ galleryNumber: -1 })).splice(0, 5);

    if (!latestGallery) res.status(200).json('데이터가 없습니다.');

    res.status(200).json(latestGallery);
  } catch (err) {
    res.status(500).json('서버 에러입니다.');
  }
}

// 갤러리 조회
export async function galleryList(req: Request, res: Response) {
  console.log('galleryList 실행');
  const { page, keyword } = req.query;
  const itemsPerPage = 10;
  const currentPage = parseInt(page as string, 10) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;

  try {
    if (keyword) {
      const gallery = await Gallery.find({
        $or: [{ title: { $regex: keyword, $options: 'i' } }],
      })
        .sort({ galleryNumber: -1 })
        .skip(startIndex)
        .limit(itemsPerPage);

      const totalGallery = await Gallery.find({
        $or: [{ title: { $regex: keyword, $options: 'i' } }],
      })
        .sort({ galleryNumber: -1 })
        .countDocuments();

      return res.status(200).json({ gallery, totalGallery });
    } else {
      const gallery = await Gallery.find().sort({ galleryNumber: -1 }).skip(startIndex).limit(itemsPerPage);
      const totalGallery = await Gallery.countDocuments();

      return res.status(200).json({ gallery, totalGallery });
    }
  } catch (err) {
    res.status(500).json('server err');
  }
}

// 갤러리 추가
export async function addImageToGallery(req: Request, res: Response) {
  console.log('addImageToGallery 실행');
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
      views: 0,
      likes: 0,
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

// 개별 갤러리 조회
export async function detailGallery(req: Request, res: Response) {
  console.log('detailGallery 실행');
  const { id } = req.params;
  try {
    const findGallery = await Gallery.findOne({ galleryNumber: id });

    if (!findGallery) return res.status(404).json('데이터가 존재하지 않습니다.');

    findGallery.views += 1;
    await findGallery.save();

    res.status(200).json(findGallery);
  } catch (err) {
    res.status(500).json(err);
  }
}

// 게시글 삭제
export async function deleteGallery(req: Request, res: Response) {
  console.log('deleteGallery 실행');
  const { id } = req.params;

  try {
    const deleteGallery = await Gallery.deleteOne({ galleryNumber: id });

    if (!deleteGallery) res.status(404).json('데이터가 존재하지 않습니다.');

    res.status(200).json(deleteGallery);
  } catch (err) {
    res.status(500).json(err);
  }
}

// 게시글 좋아요
export async function likesGallery(req: Request, res: Response) {
  console.log('likesGallery 실행');
  const { id, galleryNumber } = req.body;

  try {
    const findGalleryData = await Gallery.findOne({ galleryNumber });

    if (!findGalleryData) return res.status(404).json('게시글이 존재하지 않습니다.');

    const findUserData = await User.findOne({ id });

    if (!findUserData) {
      return res.status(404).send('사용자가 존재하지 않습니다.');
    }

    const findLikesData = findUserData.likes.filter(like => like.galleryNumber === galleryNumber);

    // galleryNumber와 일치하는 데이터 있을 시 삭제
    if (findLikesData.length > 0) {
      findUserData.likes = findUserData.likes.filter(like => like.galleryNumber !== galleryNumber);
      findGalleryData.likes = findGalleryData.likes.filter(likesId => likesId !== findUserData.id);
      await galleryNumber.save();
    } else {
      // galleryNumber와 일치하는 데이터 없을 시 추가
      findUserData.likes.unshift({
        author: findGalleryData.author,
        title: findGalleryData.title,
        galleryNumber: findGalleryData.galleryNumber,
        date: findGalleryData.date,
      });
      findGalleryData.likes.unshift(findUserData.id);

      await galleryNumber.save();
    }

    await findUserData.save();
    return res.status(200).send(findUserData);
  } catch (err) {
    return res.status(404).send('게시글이 존재하지 않습니다.');
  }
}

// 갤러리 댓글
export async function galleryAddComment(req: Request, res: Response) {
  console.log('galleryAddComment 실행');
  const { galleryNumber, author, comment, date } = req.body;
  try {
    const findGallery: GalleryType | null = await Gallery.findOne({ galleryNumber });

    if (!findGallery) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }

    const maxCommentNumber =
      findGallery.comments.length > 0
        ? Math.max(...findGallery.comments.map(comment => comment.commentNumber || 0))
        : 0;

    const newComment: CommentData = { commentNumber: maxCommentNumber + 1, author, comment, date };
    findGallery.comments.unshift(newComment);

    await findGallery
      .save()
      .then(() => console.log('중단점'))
      .catch(err => console.log('중단점2', err));

    return res.status(200).json({ message: '댓글이 추가되었습니다.', gallery: findGallery });
  } catch (err) {
    return res.status(404).send('check err');
  }
}

// 갤러리 댓글 수정
export async function galleryEditComment(req: Request, res: Response) {
  console.log('galleryEditComment 실행');
  const { galleryNumber, commentNumber } = req.params;
  const { comment: newComment } = req.body;

  try {
    const findGallery: GalleryType | null = await Gallery.findOne({ galleryNumber });

    if (!findGallery) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }

    const commentFind = findGallery.comments.findIndex(
      (comment: CommentData) => comment.commentNumber === +commentNumber,
    );

    if (commentFind === -1) {
      return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
    }

    // Update the comment
    findGallery.comments[commentFind].comment = newComment;

    await findGallery.save();

    return res.status(200).json({ message: '댓글이 수정되었습니다.', gallery: findGallery });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '서버 에러' });
  }
}

// 갤러리 댓글 삭제
export async function galleryDeleteComment(req: Request, res: Response) {
  console.log('galleryDeleteComment 실행');
  const { galleryNumber, commentNumber } = req.params;

  try {
    const findGallery: GalleryType | null = await Gallery.findOne({ galleryNumber });

    if (!findGallery) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }

    const commentFind = findGallery.comments.findIndex(
      (comment: CommentData) => comment.commentNumber === +commentNumber,
    );

    if (commentFind === -1) {
      return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
    }

    findGallery.comments.splice(commentFind, 1);

    await findGallery.save();

    return res.status(200).json({ message: '댓글이 삭제되었습니다.', gallery: findGallery });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '서버 에러' });
  }
}
