import { Request, Response } from "express";
import { postData } from "./data/postData";
import { user } from "./data/loginData";

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());

// 게시글 관련
app.get("/", (req: Request, res: Response) => {
  res.send(postData);
});

// 로그인 관련
app.get("/login", (req: Request, res: Response) => {
  const findUser = user.find((user) => {
    user.id;
    user.password;
  });
  if (findUser === req.body.id && findUser === req.body.password) {
    res;
  }
});
