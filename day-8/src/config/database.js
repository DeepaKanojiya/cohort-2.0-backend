const mongoose = require("mongoose");
require("dotenv").config();

function connectToDb() {
  mongoose.connect(process.env.Mongo_URI).then(() => {
    console.log("database cannected successfully");
  });
}

module.exports = connectToDb;
