import mongoose from 'mongoose';
import { UserType } from '../../type/type';

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    require: true,
  },
  refreshToken: {
    type: String,
  },
  super: {
    type: Boolean,
  },
  likes: [
    {
      author: {
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
      postNumber: {
        type: Number,
        required: true,
      },
    },
  ],
});

userSchema.methods.comparePassword = function (password: string) {
  return password === this.password;
};

const User = mongoose.model<UserType>('User', userSchema);

export default User;
