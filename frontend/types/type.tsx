import { LOGIN_SUCCESS, LOGOUT } from '@/redux/actions/user';
import { type } from 'os';
import { Action } from 'redux';

// 포스트 타입
export interface PostType {
  postNumber: number;
  author: string;
  title: string;
  body: string;
  date: string;
  views: number;
  likes: number;
  comments: CommentType[];
}

export type EachPostProps = {
  posts: PostType[];
  totalPost?: number;
};

export interface CommentType {
  author: string;
  body: string;
}

// 게시글 단일 조회 props
export type PostTopProps = {
  findPostData: PostType;
};

// header

export type HeaderNav = {
  [key: string]: string;
};

// 로그인
export type UserInfo = {
  username: string;
};

export interface UserType extends Document {
  id: string;
  password: string;
  name: string;
  mail: string;
  refreshToken: string;
}

// redux 로그인 유저 데이터
export interface User {
  id: string;
  name: string;
  mail: string;
  login?: boolean;
}

interface LoginSuccessAction extends Action<typeof LOGIN_SUCCESS> {
  payload: User;
}

interface LogoutAction extends Action<typeof LOGOUT> {}

export type UserAction = LoginSuccessAction | LogoutAction;

// 쿠키
export interface AuthContextProps {
  token: string | undefined;
  setToken: (token: string) => void;
  removeToken: () => void;
}

export interface AuthData {
  user: UserType;
  token: string;
}
