import { CommentData } from '../common';

/** post type  */
export interface PostType {
  postNumber: number;
  author: string;
  title: string;
  body: string;
  date: string;
  views: number;
  likes: Array<string>;
  category: string;
  comments: Array<CommentData>;
}
