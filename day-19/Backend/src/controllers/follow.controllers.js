const followModel = require("./../models/follow.model");
const usersModel = require("./../models/users.model");

async function followUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (!followerUsername || !followeeUsername) {
    return res.status(404).json({ message: "followee or follower not found" });
  }

  const isFolloweeExist = await usersModel.findOne({
    username: followeeUsername,
  });

  if (!isFolloweeExist) {
    return res
      .status(404)
      .json({ message: "User you are tyring to follow does not exists" });
  }

  if (followeeUsername === followerUsername) {
    return res.status(400).json({ message: `You can not follow yourself` });
  }

  const isAlreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isAlreadyFollowing) {
    return res.status(200).json({
      message: `You are already follwing ${followeeUsername} `,
      follow: isAlreadyFollowing,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  res.status(201).json({
    message: `You are following ${followeeUsername}`,
    follow: followRecord,
  });
}

async function UnFollowUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!isUserFollowing) {
    return res
      .status(409)
      .json({ message: `you not following ${followeeUsername}` });
  }

  const unfollowRecord = await followModel.findByIdAndDelete(
    isUserFollowing._id,
  );

  res.status(200).json({
    message: `You have unfollowed ${followeeUsername}`,
    follow: unfollowRecord,
  });
}

async function followUserStatusAccepted(req, res) {
  const status = req.params.status;
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (!followerUsername || !followeeUsername || !status) {
    return res.status(404).json({ message: "followee or follower not found" });
  }

  const isfolloweeUsernameExist = await usersModel.findOne({
    username: followeeUsername,
  });

  if (!isfolloweeUsernameExist) {
    return res
      .status(400)
      .json({ message: "User you are tyring to follow does not exists" });
  }

  const followingData = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!followingData) {
    return res.status(404).json({
      message: `followingData Not found `,
    });
  }

  let followstatusUpdate = null;

  if (status == "accepted") {
    followstatusUpdate = await followModel.findByIdAndUpdate(
      followingData.id,
      { $set: { status: "accpeted" } },
    );
  } else {
    followstatusUpdate = await followModel.findByIdAndUpdate(
      followingData.id,
      { $set: { status: "rejected" } },
    );
  }

  res
    .status(200)
    .json(
      status == "accepted"
        ? { message: "follow request accepted", followstatusUpdate }
        : { message: "follow request rejected", followstatusUpdate },
    );
}

module.exports = {
  followUserController,
  UnFollowUserController,
  followUserStatusAccepted,
};
