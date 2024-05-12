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
