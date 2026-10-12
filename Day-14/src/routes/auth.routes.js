const express = require("express");
const authControllers = require("../controllers/auth.controllers");

const authRouter = express.Router();

authRouter.post("/register", authControllers.register);

authRouter.post("/login", authControllers.login);

module.exports = authRouter;
