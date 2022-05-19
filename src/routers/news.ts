import express from "express";
import { auth } from "../middleware/auth";
import News from "../models/news/news";

const router = express.Router();

router.get("/news/:page", auth, async (req, res) => {
  const page = parseInt(req.params.page) || 0;
  try {
    const news = await News.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .skip(page * 20)
      .exec();

    return res.status(200).send(news);
  } catch {
    return res.status(500).send("Something went wrong!");
  }
});

router.post("/news", auth, async (req, res) => {
  const requestNews = req.body;

  try {
    const news = new News(requestNews);
    await news.save();

    return res.status(200).send(news);
  } catch {
    return res.status(500).send("Something went wrong!");
  }
});

router.put("/news/:id", auth, async (req, res) => {
  const id = req.params.id;
  const news = req.body;

  try {
    const updatedNews = await News.findOneAndUpdate({ _id: id }, news).exec();

    return res.send(200).send(updatedNews);
  } catch {
    return res.status(500).send("Something went wrong!");
  }
});

router.delete("/news/:id", auth, async (req, res) => {
  const id = req.params.id;

  try {
    await News.deleteOne({ _id: id }).exec();

    return res.status(200).send();
  } catch {
    res.status(500).send("Something went wrong!");
  }
});
