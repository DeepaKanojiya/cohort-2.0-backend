const express = require("express");
const postControllers = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyer = require("./../middlewares/auth.middleware")

const postRouter = express.Router();

postRouter.post("/", upload.single("image"), identifyer, postControllers.createPostController);

postRouter.get('/',identifyer ,postControllers.getPostController)

postRouter.get('/details/:postId',identifyer,postControllers.getPostDetailsController)

postRouter.post('/like/:postId',identifyer,postControllers.likePostController)



module.exports = postRouter;
