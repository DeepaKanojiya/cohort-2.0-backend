const userModel = require("../models/users.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { email, username, bio, profileImage, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserAlreadyExist) {
    return res
      .status(409)
      .json(
        isUserAlreadyExist.email == email
          ? { message: "email already exist" }
          : { message: "UserName already exist" },
      );
  }

  const hashPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const user = await userModel.create({
    email,
    username,
    password: hashPassword,
    bio,
    profileImage,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token);

  res.status(200).json({
    message: "user created successfully",
    username: user.username,
    email: user.email,
    bio: user.bio,
    profileImage: user.profileImage,
  });
}

async function login(req, res) {
  const { username, email, password } = req.body;

  const isUser = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (!isUser) {
    return res
      .status(404)
      .json({ message: "No account found ! please Register " });
  }

  const hashPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const isPasswordMachted = hashPassword === isUser.password;

  if (!isPasswordMachted) {
    return res.status(409).json({ message: "password is incorrect" });
  }

  const token = jwt.sign({ id: isUser._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(200).json({
    message: "user login successfull",
    username: isUser.username,
    email: isUser.email,
    bio: isUser.bio,
    profileImage: isUser.profileImage,
  });
}

module.exports = {
  register,
  login,
};
