import { Request, Response } from 'express';
import Post from '../models/posts.model';
import { CommentData } from '../../type/type';

type UserComment = {
  postNumber: number;
  date: string;
  comment: string;
};

/** 유저가 작성한 데이터 res */
export async function userAllData(req: Request, res: Response) {
  const user = req.params.user;

  try {
    const userPosts = await Post.find({ author: user });

    // 해당 user가 작성한 모든 포스트의 comments에서 해당 user의 데이터 가져오기
    const userComments = await Post.find({ 'comments.author': user });

    const userAllComments: CommentData[] = [];

    // Iterate through all posts and their comments
    const allPosts = await Post.find();
    allPosts.forEach(post => {
      post.comments.forEach(comment => {
        if (comment.author === user) {
          // Push relevant comment data into the userAllComments array
          userAllComments.unshift({
            postNumber: post.postNumber,
            author: post.author,
            comment: comment.comment,
            date: comment.date,
          });
        }
      });
    });

    return res.status(200).send({ userPosts, userAllComments });
  } catch (err) {
    return res.status(404).send(err);
  }
}
