import mongoose from "mongoose";

const animalSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  bodyText: {
    required: true,
    type: String,
  },
  imageUrl: {
    type: String,
  },
  age: {
    required: true,
    type: String,
  },
  gender: {
    required: true,
    type: String,
  },
  size: {
    required: true,
    type: String,
  },
  personality: {
    required: true,
    type: String,
  },
});

const Animal = mongoose.model("Animal", animalSchema);

export default Animal;
