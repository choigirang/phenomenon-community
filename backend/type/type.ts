import { Document } from 'mongoose';

export interface UserType extends Document {
  id: string;
  password: string;
  name: string;
  mail: string;
  refreshToken: string;
}

export interface AuthData {
  user: UserType;
  token: string;
}

export interface PostType extends Document {
  id: number;
  userId: string;
}
