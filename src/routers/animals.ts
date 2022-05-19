import express, { request } from "express";
import { auth } from "../middleware/auth";
import Animal from "../models/animal/animal";

const router = express.Router();

router.get("/animal/:page", auth, async (req, res) => {
  const page = parseInt(req.params.page) || 0;

  //add filtering for animals
  try {
    const animal = await Animal.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .skip(page * 20)
      .exec();

    return res.status(200).send(animal);
  } catch {
    return res.status(500).send("Something went wrong!");
  }
});

router.post("/animal", auth, async (req, res) => {
  const requestAnimal = req.body;

  try {
    const animal = new Animal(requestAnimal);
    await animal.save();

    return res.status(200).send(animal);
  } catch {
    return res.status(500).send("Something went wrong!");
  }
});

router.put("/animal/:id", auth, async (req, res) => {
  const id = req.params.id;
  const animal = req.body;

  try {
    const updatedAnimal = await Animal.findOneAndUpdate(
      { _id: id },
      animal
    ).exec();

    return res.send(200).send(updatedAnimal);
  } catch {
    return res.status(500).send("Something went wrong!");
  }
});

router.delete("/animal/:id", auth, async (req, res) => {
  const id = req.params.id;

  try {
    await Animal.deleteOne({ _id: id }).exec();

    return res.status(200).send();
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

export { router as animalRouter };
