import { rest } from 'msw';

const post = [
  { userId: 1, name: 'choi', content: 'content' },
  { userId: 2, name: 'choi', content: 'content' },
  { userId: 3, name: 'choi', content: 'content' },
  { userId: 4, name: 'choi', content: 'content' },
];

export const handler = [
  rest.get('/dummy', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(post));
  }),
];
