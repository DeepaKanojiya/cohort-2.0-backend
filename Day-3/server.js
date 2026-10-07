const express = require("express");

const app = express();

app.use(express.json());

const notes = [];

app.post("/notes", (req, res) => {
  const data = req.body;

  notes.push(data);

  res.send("notes created");
});

app.get("/notes", (req, res) => {
  res.send(notes);
});

app.listen(3000, () => {
  console.log("port is running on 3000");
});
