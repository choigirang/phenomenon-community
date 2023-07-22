import { Request, Response } from "express";
import { postData } from "./data/postData";
import { user } from "./data/loginData";

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());
app.listen(port);
// 게시글 관련
app.get("/", (req: Request, res: Response) => {
  res.send(postData);
});

// 로그인 관련
app.get("/login", (req: Request, res: Response) => {
  const { id, password } = req.query;

  const findUser = user.find(
    (user) => user.id === id && user.password === password
  );
  if (findUser) {
    return res.send(findUser);
  } else {
    console.log(user);
    res.status(401).json({ message: "일치하지 않는 사용자입니다." });
  }
});
