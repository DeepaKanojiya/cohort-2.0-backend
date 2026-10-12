const express = require("express");
const postControllers = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const postRouter = express.Router();

postRouter.post("/", upload.single("image"), postControllers.createPostController);

postRouter.get('/',postControllers.getPostController)

postRouter.get('/details/:postId',postControllers.getPostDetailsController)



module.exports = postRouter;
