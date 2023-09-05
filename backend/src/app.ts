import express from 'express';
import mongoose, { Error } from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { usersRouter } from './routes/users.router';
import { postRouter } from './routes/post.router';
import { myRouter } from './routes/my.router';
import { noticeRouter } from './routes/notice.router';

const app = express();
const port = 3001;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(usersRouter, postRouter, myRouter, noticeRouter);
app.listen(port);

// mongoDB 연결
mongoose
  .connect('mongodb+srv://chlrlfkd:chlrlfkd5633@phenomenon-community.zyo8dzo.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('connected successfully'))
  .catch((err: Error) => console.log(err));
