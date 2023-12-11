import mongoose from 'mongoose';
import { GalleryType } from '../../type/type';

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  galleryNumber: {
    type: Number,
    required: true,
  },
  views: {
    type: Number,
    required: true,
  },
  likes: {
    type: Array,
    required: true,
  },
  images: [
    {
      src: {
        type: String,
      },
    },
  ],
  comments: [
    {
      author: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
      commentNumber: {
        type: Number,
        unique: true,
        required: true,
      },
    },
  ],
});

const Gallery = mongoose.model<GalleryType>('Gallery', gallerySchema);

export default Gallery;
