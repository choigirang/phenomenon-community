import mongoose from 'mongoose';
import AutoIncrement from 'mongoose-sequence';

const postSchema = new mongoose.Schema({
  postNumber: {
    type: Number,
    unique: true, // Make sure the postNumber is unique
  },
  author: {
    // 사용자의 object ID와 필드 연결
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
    type: Number,
    default: 0,
  },
  comments: [
    {
      author: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
});

postSchema.plugin(AutoIncrement, { inc_field: 'postNumber' });

const Post = mongoose.model('Post', postSchema);

export default Post;
