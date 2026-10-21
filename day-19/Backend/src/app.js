const express = require("express");
const authRouter = require("../src/routes/auth.routes");
const postRouter = require("../src/routes/post.routes");
const followRouter = require("./routes/follow.routes");
const cors = require("cors");

const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", followRouter);

module.exports = app;
