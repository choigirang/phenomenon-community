import { type } from 'os';

export type PostType = {
  id: number;
  memberId: number;
  name: string;
  title: string;
  content: string;
  createdAt: Date;
};

export type HeaderNav = {
  [key: string]: string;
};

// 로그인
export type UserInfo = {
  username: string;
};

export type User = {
  username: string;
  password: string;
  userInfo: UserInfo;
};

// 쿠키
export interface AuthContextProps {
  token: string | undefined;
  setToken: (token: string) => void;
  removeToken: () => void;
}