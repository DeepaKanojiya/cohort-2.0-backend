const app = require("./src/app");
const connectToDb = require("./src/config/database");
const mongoose = require("mongoose");

//conecting database
connectToDb();

app.listen(3000, () => {
  console.log("server is runnin on port 3000");
});
