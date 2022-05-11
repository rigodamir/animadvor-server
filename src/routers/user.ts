import express from "express";
import User from "../models/user";

const router = express.Router();

router.post("/register", async (req, res) => {
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
