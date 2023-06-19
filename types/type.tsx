export type Post = {
  memberId: number;
  name: string;
  title: string;
  content: string;
  createdAt: Date;
};

export type HeaderNav = {
  [key: string]: string;
};
