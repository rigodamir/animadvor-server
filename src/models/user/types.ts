import { Model } from "mongoose";

export interface IUser {
  name: string;
  password: string;
  isAdmin: boolean;
}

export interface UserModel extends Model<IUser> {
  findByCredentials(name: string, password: string): Promise<IUser>;
}
