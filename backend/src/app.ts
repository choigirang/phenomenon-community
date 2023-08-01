import { Request, Response } from "express";
import mongoose from "mongoose";

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.listen(port);

mongoose
  .connect(
    "mongodb+srv://chlrlfkd:chlrlfkd5633@phenomenon-community.zyo8dzo.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected successfully"))
  .catch((err) => console.log(err));
