import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { IUser, UserModel } from "./types";

const userScheme = new mongoose.Schema<IUser, UserModel>({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
});

userScheme.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userScheme.statics.findByCredentials = async (
  name: String,
  password: String
) => {
  const user = await User.findOne({ name });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = bcrypt.compare(password.toString(), user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

const User = mongoose.model<IUser, UserModel>("User", userScheme);

export default User;
