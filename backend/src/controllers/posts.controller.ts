import { Request, Response } from 'express';
import Post from '../models/posts.model';

export async function addPost(req: Request, res: Response) {
  const { title, body, date, author } = req.body;

  try {
    const createdPost = new Post({
      author,
      title,
      body,
      date,
    });

    await createdPost.save();
    console.log(1);
    return res.status(200).json('성공');
  } catch (err) {
    console.log(err);
    return res.status(404);
  }
}
