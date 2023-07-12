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
