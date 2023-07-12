import { rest } from 'msw';

const post = [
  { id: 9, userId: 1, name: 'choi', title: '9번 게시글 입니다.', content: 'content', createdAt: '2023-07-12' },
  { id: 8, userId: 1, name: 'choi', title: '8번 게시글 입니다.', content: 'content', createdAt: '2023-07-12' },
  { id: 7, userId: 1, name: 'choi', title: '7번 게시글 입니다.', content: 'content', createdAt: '2023-07-12' },
  { id: 6, userId: 1, name: 'choi', title: '6번 게시글 입니다.', content: 'content', createdAt: '2023-07-12' },
  { id: 5, userId: 1, name: 'choi', title: '5번 게시글 입니다.', content: 'content', createdAt: '2023-07-12' },
  { id: 4, userId: 1, name: 'choi', title: '4번 게시글 입니다.', content: 'content', createdAt: '2023-07-12' },
  { id: 3, userId: 1, name: 'choi', title: '3번 게시글 입니다.', content: 'content', createdAt: '2023-07-12' },
  { id: 2, userId: 1, name: 'choi', title: '2번 게시글 입니다.', content: 'content', createdAt: '2023-07-12' },
  { id: 1, userId: 1, name: 'choi', title: '1번 게시글 입니다.', content: 'content', createdAt: '2023-07-12' },
];

export const handler = [
  rest.get('/dummy', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(post));
  }),
];
