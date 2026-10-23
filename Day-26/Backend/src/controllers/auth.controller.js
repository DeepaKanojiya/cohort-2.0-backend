const userModel = require("./../models/users.model");
const blackListModel = require('./../models/blacklist.model')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function RegisterController(req, res) {
  const { username, email, password } = req.body;
  console.log(username, email, password)

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  console.log(isUserAlreadyExists)

  if (isUserAlreadyExists) {
    return res
      .status(409)
      .json({ message: "user Already Exists with is email or username" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "user created successfully",
    user: {
      username: user.username,
      email: user.email,
      password: user.password,
    },
  });
}

async function LoginController(req, res) {
  const { username, email, password } = req.body;

  const isUser = await userModel
    .findOne({
      $or: [{ email }, { username }],
    })
    .select("+password");

  if (!isUser) {
    return res.status(404).json({ message: "User not Found" });
  }

  const isPasswordMatch = await bcrypt.compare(password, isUser.password);

  if (!isPasswordMatch) {
    return res.status(409).json({ message: "Invalid Crenditals" });
  }

  const token = jwt.sign(
    { id: isUser._id, username: isUser.username },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "user login successfully",
    user: {
      username: isUser.username,
      email: isUser.email,
    },
  });
}

async function GetMeController(req, res) {
  const userId = req.user.id;

  const userDetails = await userModel.findById(userId);

  if (!userDetails) {
    return res.status(401).json({ message: "User not Found" });
  }

  res
    .status(200)
    .json({ message: "User Details fetched Successfully", userDetails });
}

async function LogoutController(req,res){
   const token = req.cookies.token;

    res.clearCookie(token)


    const balcklist = await blackListModel.create({token})

    res.status(200).json({message:"token blacklisted successfully"})

}

module.exports = {
  RegisterController,
  LoginController,
  GetMeController,
  LogoutController
};
