import express from "express";
import mongoose, { Error } from "mongoose";
import path from "path";
import cors from "cors";
import { usersRouter } from "../routes/users.router";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(usersRouter);
app.listen(port);

mongoose
  .connect(
    "mongodb+srv://chlrlfkd:chlrlfkd5633@phenomenon-community.zyo8dzo.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected successfully"))
  .catch((err: Error) => console.log(err));
