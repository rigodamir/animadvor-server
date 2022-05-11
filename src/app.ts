import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const port = process.env.PORT;
const app = express();
app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://animadvor:${process.env.MONGODB_KEY}@cluster0.rldds.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to MongoDB database!"))
  .catch((e) => {
    console.log("Cannot connect to MongoDB database!", e);
  });

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});