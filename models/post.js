const mongoose = require("mongoose");

const userPostSchema = mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  body: {
    type: String,
    required: true,
  },
});
const UserPost = mongoose.model("posts", {
  userId: Number,
  id: Number,
  title: String,
  body: String,
});

module.exports = UserPost;
