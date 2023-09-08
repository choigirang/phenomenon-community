import { Request, Response } from 'express';
import Gallery from '../models/gallery.model';
import User from '../models/users.model';
import { CommentData, GalleryType } from '../../type/type';

// 갤러리 최근 조회
export async function latestGallery(req: Request, res: Response) {
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
  const { id, galleryNumber } = req.body;

  try {
    const findGalleryData = await Gallery.findOne({ galleryNumber });

    if (!findGalleryData) return res.status(404).json('게시글이 존재하지 않습니다.');

    const findUserData = await User.findOne({ id });

    if (!findUserData) {
      return res.status(404).send('사용자가 존재하지 않습니다.');
    }

    const findLikesData = findUserData.galleryLikes.filter(like => like.galleryNumber === galleryNumber);

    // galleryNumber와 일치하는 데이터 있을 시 삭제
    if (findLikesData.length > 0) {
      findUserData.galleryLikes = findUserData.galleryLikes.filter(like => like.galleryNumber !== galleryNumber);
      findGalleryData.likes -= 1;
      await galleryNumber.save();
    } else {
      // galleryNumber와 일치하는 데이터 없을 시 추가
      findUserData.galleryLikes.unshift({
        author: findGalleryData.author,
        title: findGalleryData.title,
        galleryNumber: findGalleryData.galleryNumber,
      });
      findGalleryData.likes += 1;
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
  const { galleryNumber, author, comment, date } = req.body;
  try {
    const findGallery: GalleryType | null = await Gallery.findOne({ galleryNumber });

    if (!findGallery) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }

    const commentNumber = findGallery.comments.length;

    const newComment: CommentData = { commentNumber: commentNumber + 1, author, comment, date };
    findGallery.comments.unshift(newComment);

    await findGallery.save();

    return res.status(200).json({ message: '댓글이 추가되었습니다.', gallery: findGallery });
  } catch (err) {}
}

// 갤러리 댓글 수정
export async function galleryEditComment(req: Request, res: Response) {
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
