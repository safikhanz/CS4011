const express = require("express");
const bodyParser = require("../lib/middleware/bodyParser");

const UserPost = require("../models/post");
const User = require("../models/user");

const addPost = async (req, res) => {
  // creates a new post for a specific user

  console.log(req.body);
  try {
    const userPost = new UserPost(req.body);
    const results = await userPost.save();
    res.send(results);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send(error);
  }
};

const updatePost = async (req, res) => {
  // updates a specific post

  const postId = req.params.postId;

  try {
    const post_Id = await UserPost.find({ id: postId });
    // used to get the long _id
    console.log(post_Id[0]._id);

    const postsToEdit = await UserPost.findById(post_Id[0]._id).exec();
    postsToEdit.set(req.body);
    const result = await postsToEdit.save();
    res.send(result);
  } catch (error) {
    console.error("error: ", error);
    res.status(500);
    res.send(error);
  }
};

const deletePost = async (req, res) => {
  // removes a particular post
  const postId = parseInt(req.params.postId);
  try {
    const results = await UserPost.deleteOne({ id: postId }).exec();
    res.send(results);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send(error);
  }
};

const getAllPosts = async (req, res) => {
  // Returns all posts for all users.

  try {
    const results = await UserPost.find().exec();
    res.send(results);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send(error);
  }
};

const getUsersPosts = async (req, res) => {
  // Returns all posts for a specific user, by using their username.
  const userName = req.params.userName;

  try {
    const user = await User.find({ username: userName });
    const userId = user[0].id;
    const userPosts = await UserPost.find({ userId: userId });
    res.send(userPosts);
  } catch (error) {
    console.error("error: ", error);
    res.status(500);
    res.send(error);
  }
};

const getPostsById = async (req, res) => {
  // returns a specific post by its ID number
  const postId = req.params.postId;

  try {
    const post_Id = await UserPost.find({ id: postId });
    // used to get the long _id

    const postsToReturn = await UserPost.findById(post_Id[0]._id).exec();
    res.send(postsToReturn);
  } catch (error) {
    console.error("error: ", error);
    res.status(500);
    res.send(error);
  }
};

const getUsersName = async (req, res) => {
  //Returns a specific user's name.
  const userName = req.params.userName;

  try {
    const result = await User.find({ username: userName });

    res.send("The user's name is: " + result[0].name);
  } catch (error) {
    console.error("error: ", error);
    res.status(500);
    res.send(error);
  }
};

const Router = express.Router();

Router.route("/allPosts").get(getAllPosts);

Router.route("/allPosts/:userName").get(getUsersPosts);

Router.route("/profile/:userName").get(getUsersName);

Router.route("/posts").post(bodyParser.json(), addPost);

Router.route("/posts/:postId")
  .get(getPostsById)
  .patch(bodyParser.json(), updatePost)
  .delete(deletePost);

module.exports = Router;
