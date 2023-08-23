import { Request, Response } from 'express';
import Post from '../models/posts.model';
import { PostType } from '../../type/type';
import { CommentData } from '../../type/type';

type UserComment = {
  postNumber: number;
  date: string;
  comment: string;
};

export async function userAllData(req: Request, res: Response) {
  const user = req.params.user;

  try {
    const userPosts = await Post.find({ author: user });

    // 해당 user가 작성한 모든 포스트의 comments에서 해당 user의 데이터 가져오기
    const userComments = await Post.find({ 'comments.author': user });

    const userCommentsMap: Record<number, UserComment[]> = {};

    const allPosts = await Post.find();

    allPosts.forEach(post => {
      post.comments.forEach(comment => {
        if (comment.author === user) {
          if (!userCommentsMap[post.postNumber]) {
            userCommentsMap[post.postNumber] = [];
          }
          userCommentsMap[post.postNumber].push({
            comment: comment.comment,
            date: comment.date,
            postNumber: post.postNumber,
          });
        }
      });
    });

    // 댓글 데이터 형태
    // const allPosts: PostType[] = await Post.find();

    // const userCommentsMap: Record<number, CommentData[]> = {};

    // allPosts.forEach(post => {
    //   const userComments = post.comments.filter(comment => comment.author === user);
    //   if (userComments.length > 0) {
    //     if (!userCommentsMap[post.postNumber]) {
    //       userCommentsMap[post.postNumber] = [];
    //     }
    //     userCommentsMap[post.postNumber].push(...userComments);
    //   }
    // });

    return res.status(200).send({ userPosts, userCommentsMap });
  } catch (err) {
    return res.status(404).send(err);
  }
}
