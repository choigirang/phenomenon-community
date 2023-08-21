import { Request, Response } from 'express';
import Post from '../models/posts.model';
import { PostType } from '../../type/type';
import { CommentData } from '../../type/type';

export async function userAllData(req: Request, res: Response) {
  const user = req.params.user;

  const userPosts = await Post.find({ author: user });

  // 해당 user가 작성한 모든 포스트의 comments에서 해당 user의 데이터 가져오기
  const userComments = await Post.find({ 'comments.author': user });

  try {
    return res.status(200).send({ user, userPosts, userComments });
  } catch (err) {
    return res.status(404).send(err);
  }
}
