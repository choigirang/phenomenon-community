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
