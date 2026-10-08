const express = require("express");
const noteModel = require("./models/notes.model");

const app = express();

app.use(express.json());

app.post("/notes", (req, res) => {
  const { title, description } = req.body;

  const notes = noteModel.create({
    title,
    description,
  });

  res.status(201).json({ mesaage: "notes created successfully" }, notes);
});

app.get("/notes", (req, res) => {
  const notes = noteModel.find();

  res.status(200).json({ notes });
});

module.exports = app;
