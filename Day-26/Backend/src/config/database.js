const mongoose = require("mongoose");

async function ConnectToDb() {
  await mongoose.connect(process.env.Mongo_URI);

  console.log("database connect successfully to DB");
}

module.exports = ConnectToDb;
