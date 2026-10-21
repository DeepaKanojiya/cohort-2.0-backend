const express = require("express");
const authControllers = require("../controllers/auth.controllers");
const identifyer = require("../middlewares/auth.middleware");

const authRouter = express.Router();

authRouter.post("/register", authControllers.register);

authRouter.post("/login", authControllers.login);

authRouter.get('/get-me',identifyer,authControllers.getMeController)

module.exports = authRouter;
