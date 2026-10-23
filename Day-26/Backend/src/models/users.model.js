const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required for register"],
    unique: [true, "username always be unique for registering"],
  },
  email: {
    type: String,
    required: [true, "Email is required for register"],
    unique: [true, "Email always be unique for registering"],
  },
  password: {
    type: String,
    required: [true, "password is required for register"],
    select: false,
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
