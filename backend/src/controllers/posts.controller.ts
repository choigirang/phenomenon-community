import { Request, Response } from 'express';
import { CommentData, PostType } from '../../type/type';

import Post from '../models/posts.model';
import User from '../models/users.model';
import Gallery from '../models/gallery.model';

// 전체 게시글 조회
export async function allPost(req: Request, res: Response) {
  console.log('allPost 실행');
  const posts = await Post.find().sort({ postNumber: -1 });

  try {
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

// 최신 게시글 조회
export async function latestPost(req: Request, res: Response) {
  console.log('latest 실행');
  const posts = await Post.find().sort({ postNumber: -1 }).limit(10);

  try {
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ message: '에러 발생' });
  }
}

// 페이지네이션 게시글 조회
export async function showPosts(req: Request, res: Response) {
  console.log('showPosts 실행');
  const { page, category } = req.query;
  const itemsPerPage = 10;
  const currentPage = parseInt(page as string, 10) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;

  try {
    // 카테고리가 'all'이면 모든 게시글 조회, 그렇지 않으면 해당 카테고리의 게시글 조회
    const totalPosts = await (category === 'all' ? Post.countDocuments() : Post.countDocuments({ category }));
    const posts = await (category === 'all'
      ? Post.find().sort({ postNumber: -1 }).skip(startIndex).limit(itemsPerPage)
      : Post.find({ category }).sort({ postNumber: -1 }).skip(startIndex).limit(itemsPerPage));

    return res.status(200).json({ posts, totalPosts });
  } catch (err) {
    return res.status(500).json({ message: '에러 발생' });
  }
}

// 개별 게시글 조회
export async function showEachPost(req: Request, res: Response) {
  console.log('showEachPost 실행');
  const { id } = req.params;

  if (!id) return;
  try {
    // 게시글 조회
    const findPostData = await Post.findOne({ postNumber: id });

    if (!findPostData) {
      return res.status(404).send('게시글이 존재하지 않습니다.');
    }

    // 게시글의 views를 1 증가
    findPostData.views += 1;
    await findPostData.save();

    return res.status(200).send(findPostData);
  } catch (err) {
    return res.status(404).send('게시글이 존재하지 않습니다.');
  }
}

// 카테고리 게시글 조회
export async function categoryPost(req: Request, res: Response) {
  console.log('categoryPost 실행');
  const { category } = req.params;

  try {
    const findPosts = await Post.find({ category }).sort({ postNumber: -1 });
    const allData = await Post.find().sort({ postNumber: -1 });
    if (category === 'all') return res.status(200).send(allData);

    res.status(200).send(findPosts);
  } catch (err) {
    res.status(404).send('일치하는 데이터가 없습니다.');
  }
}

// 게시글 추가
export async function addPost(req: Request, res: Response) {
  console.log('addPost 실행');
  const { title, body, date, author, name, category } = req.body;

  try {
    const postNumber = await Post.countDocuments();

    const createdPost = new Post({
      postNumber: postNumber + 1,
      author,
      name,
      title,
      body,
      date,
      category,
    });

    await createdPost.save();
    return res.status(200).json('성공');
  } catch (err) {
    console.log(err);
    return res.status(404);
  }
}

// 게시글 삭제
export async function deletePost(req: Request, res: Response) {
  console.log('deletePost 실행');
  const { id } = req.params;

  try {
    const deletePost = await Post.deleteOne({ postNumber: id });

    if (deletePost.deletedCount === 1) return res.status(200).json('삭제되었습니다.');
    else return res.status(404).json('게시글을 찾을 수 없습니다.');
  } catch (err) {
    console.log(err);
    return res.status(404);
  }
}

// 게시글 수정
export async function editPost(req: Request, res: Response) {
  console.log('editPost 실행');
  const { id } = req.params;
  const { title, body, date, author, category } = req.body;

  try {
    // postNumber가 id와 일치하는 게시물을 찾습니다.
    const existingPost = await Post.findOne({ postNumber: id });

    if (!existingPost) {
      return res.status(404).json({ message: '게시물을 찾을 수 없습니다.' });
    }

    // 요청 데이터로 게시물 업데이트
    existingPost.title = title;
    existingPost.body = body;
    existingPost.date = date;
    existingPost.author = author;
    existingPost.category = category;

    // 업데이트를 저장하고 응답
    const updatedPost = await existingPost.save();

    return res.status(200).json({ message: '게시물이 수정되었습니다.', data: updatedPost });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '서버 오류 발생' });
  }
}

// 게시글 댓글 추가
export async function addComment(req: Request, res: Response) {
  console.log('addComment 실행');
  const { postNumber, author, comment, date } = req.body;

  try {
    const findPost: PostType | null = await Post.findOne({ postNumber });

    if (!findPost) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }

    const commentNumber = findPost.comments.length;

    const newComment: CommentData = { commentNumber: commentNumber + 1, author, comment, date };
    findPost.comments.unshift(newComment);

    await findPost.save();

    return res.status(200).json({ message: '댓글이 추가되었습니다.', post: findPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '서버 에러' });
  }
}

// 댓글 수정
export async function editComment(req: Request, res: Response) {
  console.log('editComment 실행');
  const { postNumber, commentNumber } = req.params;
  const { comment: newComment } = req.body;

  try {
    const findPost: PostType | null = await Post.findOne({ postNumber });

    if (!findPost) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }

    const commentFind = findPost.comments.findIndex((comment: CommentData) => comment.commentNumber === +commentNumber);

    if (commentFind === -1) {
      return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
    }

    // Update the comment
    findPost.comments[commentFind].comment = newComment;

    await findPost.save();

    return res.status(200).json({ message: '댓글이 수정되었습니다.', post: findPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '서버 에러' });
  }
}

// 댓글 삭제
export async function deleteComment(req: Request, res: Response) {
  console.log('deleteComment 실행');
  const { postNumber, commentNumber } = req.params;

  try {
    const findPost: PostType | null = await Post.findOne({ postNumber });

    if (!findPost) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }

    const commentFind = findPost.comments.findIndex((comment: CommentData) => comment.commentNumber === +commentNumber);

    if (commentFind === -1) {
      return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
    }

    findPost.comments.splice(commentFind, 1);

    await findPost.save();

    return res.status(200).json({ message: '댓글이 삭제되었습니다.', post: findPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '서버 에러' });
  }
}

/** 게시글 좋아요 */
export async function postAddLikes(req: Request, res: Response) {
  console.log('postAddLikes 실행');
  const { id, postNumber } = req.body;

  try {
    // 게시글 조회
    const findPostData = await Post.findOne({ postNumber: postNumber });

    if (!findPostData) {
      return res.status(404).send('게시글이 존재하지 않습니다.');
    }

    const findUserData = await User.findOne({ id: id });

    if (!findUserData) {
      return res.status(404).send('사용자가 존재하지 않습니다.');
    }

    const findLikesData = findPostData.likes.filter(like => like === id);

    // postNumber와 일치하는 데이터 있을 시 삭제
    if (findLikesData.length > 0) {
      findUserData.likes = findUserData.likes.filter(like => like.postNumber !== postNumber);
      findPostData.likes = findPostData.likes.filter(likesId => likesId !== id);
      await findPostData.save();
    } else {
      // postNumber와 일치하는 데이터 없을 시 추가
      findUserData.likes.unshift({
        author: findPostData.author,
        title: findPostData.title,
        body: findPostData.body,
        postNumber: findPostData.postNumber,
        date: findPostData.date,
      });
      findPostData.likes.unshift(findUserData.id);
      await findPostData.save();
    }

    await findUserData.save();
    return res.status(200).send(findUserData);
  } catch (err) {
    return res.status(404).send('게시글이 존재하지 않습니다.');
  }
}

/** 특정 게시글 검색 */
export async function searchPost(req: Request, res: Response) {
  console.log('searchPost 실행');
  try {
    const keyword = req.query.keyword;
    const page = req.query.page || 1;

    const itemsPerPage = 10;
    const currentPage = parseInt(page as string, 10) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;

    // 키워드를 포함하는 데이터 검색
    const posts = await Post.find({
      $or: [{ title: { $regex: keyword, $options: 'i' } }, { content: { $regex: keyword, $options: 'i' } }],
    })
      .sort({ postNumber: -1 })
      .skip(startIndex)
      .limit(itemsPerPage);

    const totalPosts = await Post.find({
      $or: [{ title: { $regex: keyword, $options: 'i' } }, { content: { $regex: keyword, $options: 'i' } }],
    })
      .sort({ postNumber: -1 })
      .countDocuments();

    const searchGalleryResults = await Gallery.find({
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

    res.status(200).json({ posts, totalPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
