const mongoose = require("mongoose");

async function connectToDb() {
  await mongoose.connect(process.env.Mongo_URI);

  console.log("database connected to DB");
}

module.exports = connectToDb;
