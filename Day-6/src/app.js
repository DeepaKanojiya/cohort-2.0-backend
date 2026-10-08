const express = require("express");
const { default: mongoose } = require("mongoose");

const app = express();

function mongoDb() {
  mongoose
    .connect(
      "mongodb+srv://deepakanojiya200_db_user:Deepak%409819@cluster0.im5dykp.mongodb.net/day-6",
    )
    .then(() => {
      console.log("database server is connected");
    });
}

mongoDb();

module.exports = app;
