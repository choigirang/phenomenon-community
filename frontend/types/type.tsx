import { LOGIN_SUCCESS, LOGOUT } from '@/redux/actions/user';
import { type } from 'os';
import { Action } from 'redux';

// 포스트 타입
export interface PostType {
  postNumber: number;
  author: string;
  name: string;
  title: string;
  body: string;
  date: string;
  views: number;
  likes: Array<string>;
  comments: CommentType[];
  category: string;
}

export type EachPostProps = {
  posts: PostType[];
  totalPost?: number;
};

// search res type
export type SearchKeyword = {
  searchPostResults: PostType[];
  searchGalleryResults: GalleryType[];
};

export interface CommentType {
  title: string;
  author: string;
  comment: string;
  date: string;
  commentNumber?: number;
}

// 게시글 단일 조회 props
export type PostTopProps = {
  findPostData: PostType;
};

// comment api 타입
export type CommentAPI = {
  postNumber?: number;
  galleryNumber?: number;
  author: string;
  comment: string;
  date: string;
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
  img: string;
  id: string;
  password: string;
  name: string;
  mail: string;
  refreshToken: string;
  super: boolean;
  likes: Array<Likes>;
}

/** redux 초기 데이터 */
export interface InitialState {
  user: User;
}

/** 좋아요 타입 */
export interface Likes {
  author: string;
  title: string;
  body: string;
  postNumber?: number;
  galleryNumber?: number;
  date: string;
}

// redux 로그인 유저 데이터
export interface User {
  id: string;
  name: string;
  mail?: string;
  img: string;
  login?: boolean;
  super?: boolean;
  likes?: Array<Likes>;
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

// my type
export interface UserDataLogType {
  userPosts: PostType[];
  userAllComments: CommentType[];
  userInfo: User;
}

export interface Comment {
  title: string;
  author: string;
  comment: string;
  date: string;
  _id?: string;
  postNumber?: string;
}

/** 공지사항 res 타입 */
export type Notice = {
  title: string;
  content: string;
  date: string;
  noticeNumber: number;
};

/** 유저 검색 데이터 타입 */
export interface SearchUser {
  id: string;
  name: string;
  mail: string;
  img: string;
  posts: PostType[];
}

export type ImageSrc = {
  src: string;
};

/** 갤러리 res data 타입 */
export type GalleryType = {
  title: string;
  author: string;
  date: string;
  galleryNumber: number;
  views: number;
  likes: number;
  images: ImageSrc[];
  comments: CommentType[];
};

/** Sign up input type */
export interface InputType {
  [key: string]: string;
}

/** 유효성 검사 */
export type ValidationItem = {
  name: string;
  check: (data: string) => boolean;
};

/** 아이디 상태값 */
export type CheckId = {
  userId: string;
  required: boolean;
};

export type CheckPass = {
  pass: string;
  required: boolean;
};

/** 비밀번호에 따른 유효성 타입 */
export type PassInputData = {
  word?: boolean;
  length?: boolean;
  validation?: boolean;
};

/** 닉네임 */
export type CheckName = {
  name: string;
  checkName: boolean;
};

/** 보안 코드 */
export interface AxiosSecurityCode {
  code: string;
  userCode: string;
}

/** 보안 코드 확인 */
export type CheckSecurityType = {
  agree: boolean;
  compareSecurityCode: boolean;
  errInfo: string;
  errCode: string;
};
