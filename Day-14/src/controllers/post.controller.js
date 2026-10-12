const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const postModel = require("../models/post.model");
const imagekit = new ImageKit({
  privateKey: process.env.Image_kit_API,
});

async function createPostController(req, res) {
  const { caption } = req.body;

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "test",
  });

  const post = await postModel.create({
    caption,
    imgUrl: file.url,
    user: decoded.id,
  });

  res.status(201).json({ message: "post created successfully", post });
}

async function getPostController(req, res) {
  const userId = req.user.id;
  const posts = await postModel.find({ user: userId });

  if (!posts) {
    res.status(401).json({ message: "Post Not found" });
  }

  res.status(200).json({ message: "posts fetched succesfully", posts });
}

async function getPostDetailsController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  const postDetails = await postModel.findById(postId);

  if (!postDetails) {
    return res.status(401).json({ message: "Posts not found with this Id" });
  }

  const isValedateUser = postDetails.user.toString() === userId;
  if (!isValedateUser) {
    return res.status(403).json({ message: "Forbidden Content" });
  }

  res
    .status(200)
    .json({ message: "postDetail fetched successfully", postDetails });
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
};
