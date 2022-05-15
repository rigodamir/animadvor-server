import express from "express";
import {
  accessToken,
  refreshToken,
  verifyRefreshToken,
} from "../middleware/accessToken";
import { auth } from "../middleware/auth";
import Token from "../models/token/token";
import User from "../models/user/user";

const router = express.Router();

router.post("/token", async (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);

  const mongoToken = await Token.findOne({ token: refreshToken }).exec();
  if (!mongoToken) return res.sendStatus(403);

  const newToken = verifyRefreshToken(mongoToken.token);

  res.status(200).send({ token: newToken });
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.name, req.body.password);
    if (!user) {
      return res.status(401).send("Login failed!");
    }
    const userToken = accessToken({ name: user.name, isAdmin: user.isAdmin });
    const rToken = refreshToken({
      name: user.name,
      isAdmin: user.isAdmin,
    });

    const mongoToken = new Token({
      token: rToken,
    });
    await mongoToken.save();

    res.status(200).send({
      user: { name: user.name, isAdmin: user.isAdmin },
      token: userToken,
      refreshToken: rToken,
    }); //TODO transformations
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
