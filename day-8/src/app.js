const express = require("express");
const noteModel = require("./models/notes.model");

const app = express();

app.use(express.json());

app.post("/notes", async (req, res) => {
  const { title, description } = req.body;

  await noteModel.create({
    title,
    description,
  });

  res.status(201).json({ message: "notes created successfully" });
});

app.get("/notes", async (req, res) => {
  const notes = await noteModel.find({});

  res.status(200).json(notes);
});

app.delete("/notes/:index", async (req, res) => {
  const index = req.params.index;
  await noteModel.findByIdAndDelete(index);
  res.status(204).json({ message: "notes deleted successfully" });
});

app.patch("/notes/:id", async (req, res) => {
  const { id } = req.params;
  await noteModel.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({ messag: "notes updated successfully" });
});

module.exports = app;
