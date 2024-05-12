import { CommentData } from '../common';

/** 포스트 타입 */
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

  [key: string]: number | string | string[] | CommentData[];
}
