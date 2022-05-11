import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  body: {
    required: true,
    type: String,
  },
  imageUrl: {
    type: String,
  },
});

const News = mongoose.model("News", newsSchema);

export default News;
