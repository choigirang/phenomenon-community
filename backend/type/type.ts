import { Document } from 'mongoose';

/** 좋아요 타입 */
interface Likes {
  author: string;
  title: string;
  body: string;
  postNumber: number;
}

export interface UserType extends Document {
  id: string;
  password: string;
  name: string;
  mail: string;
  img: string;
  refreshToken: string;
  super: boolean;
  likes: Array<Likes>;
}

export interface AuthData {
  user: UserType;
  token: string;
}

export interface PostType extends Document {
  postNumber: number;
  author: string;
  title: string;
  body: string;
  date: string;
  views: number;
  likes: number;
  category: string;
  comments: Array<CommentData>;
}

export interface CommentData {
  commentNumber?: number;
  author: string;
  comment: string;
  date: string;
  postNumber?: string | number;
}

/** 공지사항 타입 */
export interface Notice {
  title: string;
  content: string;
  date: string;
  noticeNumber: number;
}
