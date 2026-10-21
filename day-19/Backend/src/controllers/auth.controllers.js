const userModel = require("../models/users.model");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
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

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    email,
    username,
    password: hashPassword,
    bio,
    profileImage,
  });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "user created successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

async function login(req, res) {
  const { username, email, password } = req.body;

  const isUser = await userModel
    .findOne({
      $or: [{ email }, { username }],
    })
    .select("+password");

  if (!isUser) {
    return res
      .status(404)
      .json({ message: "No account found ! please Register " });
  }

  const isPasswordMachted = await bcrypt.compare(password, isUser.password);

  if (!isPasswordMachted) {
    return res.status(409).json({ message: "password is incorrect" });
  }

  const token = jwt.sign(
    { id: isUser._id, username: isUser.username },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "user login successfull",
    user: {
      username: isUser.username,
      email: isUser.email,
      bio: isUser.bio,
      profileImage: isUser.profileImage,
    },
  });
}

async function getMeController(req, res) {
  const userId = req.user.id;

  const userDetail = await userModel.findById(userId);

  res.status(200).json({
    message: "users details found successfully",
    user: {
      username: userDetail.username,
      email: userDetail.email,
      bio: userDetail.bio,
      profileImage: userDetail.profileImage,
    },
  });
}

module.exports = {
  register,
  login,
  getMeController,
};
