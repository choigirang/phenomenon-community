import { Document } from 'mongoose';

/** 좋아요 타입 */
interface Likes {
  author: string;
  title: string;
  body?: string;
  date: string;
  postNumber?: number;
  galleryNumber?: number;
}

/** 유저 데이터 타입 */
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

/** 유저 로그인 */
export interface AuthData {
  user: UserType;
  token: string;
}

/** 포스트 타입 */
export interface PostType extends Document {
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

/** 댓글 타입 */
export interface CommentData {
  commentNumber?: number;
  title?: string;
  author: string;
  comment: string;
  date: string;
  postNumber?: string | number;
  galleryNumber?: string | number;
}

/** 공지사항 타입 */
export interface Notice {
  title: string;
  content: string;
  date: string;
  noticeNumber: number;
}

type ImageSrc = {
  src: string;
};

/** 갤러리 타입 */
export interface GalleryType extends Document {
  galleryNumber: number;
  title: string;
  author: string;
  date: string;
  img: ImageSrc[];
  views: number;
  likes: Array<string>;
  comments: Array<CommentData>;
}
