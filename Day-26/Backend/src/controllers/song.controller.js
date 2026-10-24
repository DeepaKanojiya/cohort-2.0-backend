const { NativeBuffer } = require("mongoose");
const id3 = require("node-id3");
const storageService = require("./../services/storage.service");
const songModel = require("../models/song.model");

async function songUploadController(req, res) {
  const mood = req.body.mood;
  const songBuffer = req.file.buffer;

  const tags = id3.read(songBuffer);

  const [posterFile, songFile] = await Promise.all([
      storageService.uploadFile({
      buffer: tags.image.imageBuffer,
      filename: tags.title + ".jpeg",
      folder: "cohort-2/modify/posts",
    }),
    storageService.uploadFile({
      buffer: songBuffer,
      filename: tags.title + ".mp3",
      folder: "cohort-2/modify/songs",
    }),
  ]);

  const song = await songModel.create({
    url: songFile.url,
    posterUrl: posterFile.url,
    title: tags.title,
    mood,
  });

  res.status(200).json({ message: "Song created successfully", song });
}

async function getSongController(req, res) {
  const { mood } = req.query;

  const song = await songModel.findOne({
    mood,
  });

  res.status(200).json({ message: "song fetched successfully", song });
}

module.exports = {
  songUploadController,
  getSongController,
};
