import mongoose from 'mongoose';
import { Gallery } from '../../type/type';

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
    type: Number,
    required: true,
  },
  images: [
    {
      src: {
        type: String,
      },
    },
  ],
});

const Gallery = mongoose.model<Gallery>('Gallery', gallerySchema);

export default Gallery;
