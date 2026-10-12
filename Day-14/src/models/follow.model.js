const mongoose = require("mongoose");

const followSchema = new mongoose.connect({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "Follower is required"],
  },
  followee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "Followee is required"],
  },
});

const followModel = mongoose.model("follow", followSchema);

module.exports = followModel;
