import { Request, Response } from 'express';
import Post from '../models/posts.model';
import { CommentData, PostType } from '../../type/type';
import User from '../models/users.model';

// 기본 페이지 게시글 조회
export async function showPostsByPage(req: Request, res: Response) {
  const { page } = req.query; // 페이지 번호를 쿼리 파라미터로 받아옴
  const itemsPerPage = 10; // 페이지당 게시글 수

  const currentPage = parseInt(page as string, 10) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;

  try {
    const totalPosts = await Post.countDocuments();
    const posts = await Post.find().skip(startIndex).limit(itemsPerPage).sort({ postNumber: -1 });

    return res.status(200).json({ posts, totalPosts });
  } catch (err) {
    return res.status(500).json({ message: '에러 발생' });
  }
}

// 개별 게시글 조회
export async function showEachPost(req: Request, res: Response) {
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

// 게시글 추가
export async function addPost(req: Request, res: Response) {
  const { title, body, date, author } = req.body;

  try {
    const postNumber = await Post.countDocuments();

    const createdPost = new Post({
      postNumber: postNumber + 1,
      author,
      title,
      body,
      date,
    });

    await createdPost.save();
    return res.status(200).json('성공');
  } catch (err) {
    console.log(err);
    return res.status(404);
  }
}

// 게시글 댓글 추가
export async function addComment(req: Request, res: Response) {
  const { postNumber, author, comment, date } = req.body;

  try {
    const findPost: PostType | null = await Post.findOne({ postNumber });

    if (!findPost) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }

    const newComment: CommentData = { author, comment, date };
    findPost.comments.unshift(newComment);

    await findPost.save();

    return res.status(200).json({ message: '댓글이 추가되었습니다.', post: findPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '서버 에러' });
  }
}

/** 게시글 좋아요 */
export async function addLikes(req: Request, res: Response) {
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

    // find 안 돼서 보류
    // 이미 좋아요 했을 시 삭제
    // const updatedLikes = findUserData.likes.filter(like => like.postNumber !== postNumber);
    // findUserData.likes = updatedLikes;

    const findLikesData = findUserData.likes.filter(like => like.postNumber === postNumber);

    // postNumber와 일치하는 데이터 있을 시 삭제
    if (findLikesData.length > 0) {
      findUserData.likes = findUserData.likes.filter(like => like.postNumber !== postNumber);
      findPostData.likes -= 1;
      await findPostData.save();
    } else {
      // postNumber와 일치하는 데이터 없을 시 추가
      findUserData.likes.unshift({
        author: findPostData.author,
        title: findPostData.title,
        body: findPostData.body,
        postNumber: findPostData.postNumber,
      });
      findPostData.likes += 1;
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
  try {
    const keyword = req.query.keyword;

    // 키워드를 포함하는 데이터 검색
    const searchResults = await Post.find({
      $or: [{ title: { $regex: keyword, $options: 'i' } }, { content: { $regex: keyword, $options: 'i' } }],
    });

    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
