import { Likes } from '../common';

export interface LoginIni {
  img: string;
  id: string;
  name: string;
  mail: string;
  super: boolean;
  login: boolean;
  likes: Array<Likes>;
}

export interface UserType {
  img: string;
  id: string;
  password?: string;
  name: string;
  mail: string;
  refreshToken?: string;
  super: boolean;
  likes: Array<Likes>;
}
