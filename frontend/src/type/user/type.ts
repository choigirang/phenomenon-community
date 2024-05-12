import { Likes } from '../common';

export interface UserType {
  img: string;
  id: string;
  password: string;
  name: string;
  mail: string;
  refreshToken: string;
  super: boolean;
  likes: Array<Likes>;
}
