import express, { Application, Request, Response } from "express";
import cors from "cors";

const PORT = process.env.PORT || 3001;

class App {
  public application: express.Application;
  constructor() {
    this.application = express();
  }
}

const app = new App().application;

app.use(cors());

app.get("/", (req: Request, rest: Response) => {
  rest.send("Hi");
});

// app.get("post", (req: Request, rest: Response) => {});

app.get("/post/1", (req: Request, res: Response) => {
  res.json({
    id: 1,
    memberId: 1,
    name: "choigirang",
    title: "임시 데이터",
    content: "임시데이터를 작성합니다....",
    createdAt: "2023-07-16",
  });
});
app.get("/post/2", (req: Request, res: Response) => {
  res.json({
    id: 2,
    memberId: 1,
    name: "choigirang",
    title: "임시 데이터",
    content: "임시데이터를 작성합니다....",
    createdAt: "2023-07-16",
  });
});
