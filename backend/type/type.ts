import { Document } from "mongoose";

export interface UserType extends Document {
  userNum: number;
  id: string;
  password: string;
  name: string;
  mail: string;
}
