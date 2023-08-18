import { Request, Response } from 'express';
import Post from '../models/posts.model';

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
  const findPostData = await Post.findOne({ postNumber: id });
  try {
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
