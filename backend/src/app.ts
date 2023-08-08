import express from 'express';
import mongoose, { Error } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { usersRouter } from './routes/users.router';

const app = express();
dotenv.config();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(usersRouter);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  // res.setHeader("Access-Control-Allow-Credentials", 'true');

  next();
});

app.get('/', (req, res) => {
  res.status(200).send('OK');
  console.log('서버가 정상적으로 실행 중입니다.');
});
app.get('/login', (req, res) => {
  res.status(200).send('임시 ok');
});
app.listen(port, () => {
  console.log('서버 실행');
});

mongoose
  .connect('mongodb+srv://chlrlfkd:chlrlfkd5633@phenomenon-community.zyo8dzo.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('connected successfully'))
  .catch((err: Error) => console.log(err));
