const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, ["username already taken"]],
    required: [true, ["username required"]],
  },
  email: {
    type: String,
    unique: [true, ["User already exsist with this eamil"]],
    required: [true, ["Emial is required"]],
  },
  bio: {
    type: String,
  },
  profileImage: {
    type: String,
    default:
      "https://ik.imagekit.io/fzsimxftb/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3485.jpg_semt=ais_hybrid&w=740&q=80",
  },
  password:{
    type:String,
    required:[true,"password is required"],
    select:false
  }
});


const userModel = mongoose.model("users",userSchema);

module.exports = userModel;
