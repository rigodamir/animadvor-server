import express from "express";
import { accessToken } from "../middleware/accessToken";
import { auth } from "../middleware/auth";
import User from "../models/user/user";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.name, req.body.password);
    const token = accessToken(user.name); //TODO save username and isadmin in token
    res
      .status(200)
      .send({ user: { name: user.name, isAdmin: user.isAdmin }, token: token }); //TODO transformations
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/register", auth, async (req, res) => {
  const { body } = req;
  if (body.name && body.password) {
    const user = new User({
      name: body.name,
      password: body.password,
      isAdmin: !!body.isAdmin,
    });
    await user.save();
    return res.status(201).send(user);
  }
  return res.status(400).send();
});

export { router as userRouter };
