import express from "express";
import { createUser, showUser } from "../src/controllers/users.controller";
const usersRouter = express.Router();

usersRouter.get("/login", showUser);
usersRouter.post("/signin", createUser);

export { usersRouter };
