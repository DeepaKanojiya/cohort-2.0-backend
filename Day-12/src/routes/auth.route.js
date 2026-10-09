const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const Router = express.Router();

Router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      meassage: "User already exsist with this email try another eamil",
    });
  }

  const user = await userModel.create({ name, email, password });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(201).json({ message: "user created successfully", user, token });
});

module.exports = Router;
