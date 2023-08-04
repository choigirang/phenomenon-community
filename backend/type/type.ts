import { Document } from 'mongoose';

export interface UserType extends Document {
  userNum: number;
  id: string;
  password: string;
  name: string;
  mail: string;
  comparePassword: (password: string) => boolean;
}

export interface PostType extends Document {
  id: number;
  userId: string;
}
