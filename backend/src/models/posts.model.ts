import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    author: {
      // 사용자의 object ID와 필드 연결
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // 사용자 모델과 연결되어 작성자 정보를 가져올 수 있도록 함
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
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User', // 사용자 모델과 연결되어 댓글 작성자 정보를 가져올 수 있도록 함
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
); // 자동으로 생성 및 업데이트 날짜를 기록

const Post = mongoose.model('Post', postSchema);

export default Post;
