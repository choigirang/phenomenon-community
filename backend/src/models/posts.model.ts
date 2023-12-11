import mongoose from 'mongoose';
import { PostType } from '../../type/type';

const postSchema = new mongoose.Schema({
  postNumber: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Array,
    default: 0,
  },
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
  category: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model<PostType>('Post', postSchema);

export default Post;
