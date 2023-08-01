import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import { User } from "../models/users.model";

const showUser: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { id, password } = req.params;
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

// 비동기 요청
async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const createUser = await User.create(req.body);
    res.status(200).json(createUser);
  } catch (err) {
    next(err);
  }
}

export { showUser, createUser };
