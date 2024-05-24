/** children props*/
export interface SearchParams {
  params: { [key: string]: Array<string> };
  searchParams: { [key: string]: string };
}

/** comments type in post | gallery */
export interface CommentData {
  commentNumber?: number;
  title?: string;
  author: string;
  comment: string;
  date: string;
  postNumber?: string | number;
  galleryNumber?: string | number;
}

// likes type in post | gallery
export interface Likes {
  author: string;
  title: string;
  body: string;
  postNumber?: number;
  galleryNumber?: number;
  date: string;
}

// notice type
export type Notice = {
  title: string;
  content: string;
  date: string;
  noticeNumber: number;
  author: string;
};
