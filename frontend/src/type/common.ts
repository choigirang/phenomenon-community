import { PropsWithChildren } from 'react';

/** children props*/
export interface SearchParams {
  params: { [key: string]: Array<string> };
  searchParams: { [key: string]: string };
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

/** 좋아요 타입 */
export interface Likes {
  author: string;
  title: string;
  body: string;
  postNumber?: number;
  galleryNumber?: number;
  date: string;
}

/** 공지사항 res 타입 */
export type Notice = {
  title: string;
  content: string;
  date: string;
  noticeNumber: number;
  author: string;
};
