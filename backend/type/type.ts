import { Document } from 'mongoose';

export interface UserType extends Document {
  id: string;
  password: string;
  name: string;
  mail: string;
  refreshToken: string;
  super: boolean;
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
  comments: Array<CommentData>;
}

export interface CommentData {
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
