import express from 'express';
import mongoose, { Error } from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { usersRouter } from './routes/users.router';
import { postRouter } from './routes/post.router';
import { myRouter } from './routes/my.router';
import { noticeRouter } from './routes/notice.router';
import { galleryRouter } from './routes/gallery.router';

import dotenv from 'dotenv';

dotenv.config();

const server = process.env.SERVER_NAME;
const password = process.env.SERVER_PASS;

const app = express();
const port = 8080;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(usersRouter, postRouter, myRouter, noticeRouter, galleryRouter);
app.listen(port);

// mongoDB 연결
mongoose
  .connect(`mongodb+srv://${server}:${password}@phenomenon-community.zyo8dzo.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => console.log('connected successfully'))
  .catch((err: Error) => console.log(err));
