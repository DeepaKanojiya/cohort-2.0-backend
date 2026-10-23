const { NativeBuffer } = require("mongoose");
const id3 = require("node-id3");
const storageService = require("./../services/storage.service");
const songModel = require("../models/song.model");

async function songUploadController(req, res) {
  const mood = req.body.mood;
  const songBuffer = req.file.buffer;

  const tags = id3.read(songBuffer);

  const songFile = await storageService.uploadFile({
    buffer: songBuffer,
    fileName: tags.title + ".mp3",
    folder: "cohort-2/modify/songs",
  });

  const posterFile = await storageService.uploadFile({
    buffer: tags.image.imageBuffer,
    fileName: tags.title + ".jpeg",
    folder: "cohort-2/modify/posts",
  });

  const song = await songModel.create({
    url: songFile.url,
    posterUrl: posterFile.url,
    title: tags.title,
    mood,
  });

  res.status(200).json({ message: "song created successfully", song });
}

module.exports = {
  songUploadController,
};
