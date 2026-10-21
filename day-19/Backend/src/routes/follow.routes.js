const express = require("express");
const followController = require("../controllers/follow.controllers");
const identifyer = require("../middlewares/auth.middleware");

const followRouter = express.Router();

followRouter.post("/follow/:username", identifyer,followController.followUserController);
followRouter.post('/unfollow/:username',identifyer,followController.UnFollowUserController)
followRouter.post('/followstatus/:username/:status',identifyer,followController.followUserStatusAccepted)

module.exports = followRouter;
