import express from 'express';
import { addPost } from '../controllers/posts.controller';

const postRouter = express.Router();

postRouter.post('/posts', addPost);

export default postRouter;
