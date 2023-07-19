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
interface UserInfo {
  username: string;
}

interface User {
  username: string;
  password: string;
  userInfo: UserInfo;
}
