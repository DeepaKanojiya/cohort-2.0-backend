const express = require("express");
const upload = require("../middlewares/upload.middleware");
const songController = require("./../controllers/song.controller");

const songRouter = express.Router();

songRouter.post(
  "/",
  upload.single("song"),
  songController.songUploadController,
);

songRouter.get("/", songController.getSongController);

module.exports = songRouter;
