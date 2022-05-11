import jwt from "jsonwebtoken";
import { IUser } from "../models/user/types";
import "dotenv/config";

export const accessToken = (name: string) => {
  return jwt.sign({ name: name }, process.env.ACCESS_TOKEN, {
    expiresIn: "15m",
  });
};
