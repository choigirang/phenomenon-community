import { CommentData } from '../common';

type ImageSrc = {
  src: string;
  _id: string;
};

/** gallery type */
export interface GalleryType {
  galleryNumber: number;
  title: string;
  author: string;
  date: string;
  images: ImageSrc[];
  views: number;
  likes: Array<string>;
  comments: Array<CommentData>;
}
