import { Request, Response } from 'express';
import Post from '../models/posts.model';
import { CommentData } from '../../type/type';

type UserComment = {
  postNumber: number;
  date: string;
  comment: string;
};

/** 유저가 작성한 데이터 res */
// export async function userAllData(req: Request, res: Response) {
//   const user = req.params.user;

//   try {
//     const userPosts = await Post.find({ author: user });

//     // 해당 user가 작성한 모든 포스트의 comments에서 해당 user의 데이터 가져오기
//     const userComments = await Post.find({ 'comments.author': user });

//     const userAllComments: CommentData[] = [];

//     // 유저가 작성한 댓글 데이터
//     const allPosts = await Post.find();
//     allPosts.forEach(post => {
//       post.comments.forEach(comment => {
//         if (comment.author === user) {
//           userAllComments.unshift({
//             postNumber: post.postNumber,
//             author: post.author,
//             comment: comment.comment,
//             date: comment.date,
//           });
//         }
//       });
//     });

//     return res.status(200).send({ userPosts, userAllComments });
//   } catch (err) {
//     return res.status(404).send(err);
//   }
// }

// 페이지네이션 게시글 조회
export async function showUserPosts(req: Request, res: Response) {
  const { page, user } = req.query;
  const itemsPerPage = 3; // 한 페이지에 표시될 아이템 수
  const currentPage = parseInt(page as string, 10) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;

  try {
    const userPosts = await Post.find({ author: user }).sort({ postNumber: -1 }).skip(startIndex).limit(itemsPerPage);

    const totalPosts = await Post.countDocuments({ author: user });

    return res.status(200).json({ userPosts, totalPosts });
  } catch (err) {
    return res.status(500).json({ message: '에러 발생' });
  }
}

// 페이지네이션 유저가 작성한 댓글 조회
export async function showUserComments(req: Request, res: Response) {
  const { page, user } = req.query;
  const itemsPerPage = 3; // 한 페이지에 표시될 아이템 수
  const currentPage = parseInt(page as string, 10) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;

  try {
    const userAllComments = await Post.find({ 'comments.author': user })
      .sort({ 'comments.date': -1 })
      .skip(startIndex)
      .limit(itemsPerPage);

    const totalComments = await Post.countDocuments({ 'comments.author': user });

    return res.status(200).json({ userAllComments, totalComments });
  } catch (err) {
    return res.status(500).json({ message: '에러 발생' });
  }
}
