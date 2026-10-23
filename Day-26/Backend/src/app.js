const express = require("express");
const AuthRouter = require("./routes/auth.route");
const songRouter = require("./routes/song.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", AuthRouter);
app.use("/api/song", songRouter);
module.exports = app;
