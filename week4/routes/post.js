const express = require("express");

const router = express.Router();

const postController = require("../controllers/post");
const authMiddleware = require("../middleware/is-auth");
const rankingMiddleware = require("../middleware/get-best-score-info");

router.get(
  "/posts",
  authMiddleware.isAuth,
  rankingMiddleware.getBestScoreUsers,
  postController.getPosts
);

router.get(
  "/add-post",
  authMiddleware.isAuth,
  authMiddleware.isBadMember,
  rankingMiddleware.getBestScoreUsers,
  postController.getAddPost
);

router.post("/add-post", authMiddleware.isAuth, postController.postAddPost);

router.get(
  "/post/:postId",
  authMiddleware.isAuth,
  rankingMiddleware.getBestScoreUsers,
  postController.getPost
);

router.post(
  "/delete-post/:postId",
  authMiddleware.isAuth,
  postController.postDeletePost
);

module.exports = router;
