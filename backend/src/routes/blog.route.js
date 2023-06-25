const express = require("express");
const router = express.Router();
const { BlogController } = require("../controller");
const {
  authentication,
  checkAuthIsAdmin,
} = require("../middleware/checkAuth.middleware");

router.route("/getAll").get(BlogController.getAllBlogs);
router.route("/getById/:blogId").get(BlogController.getBlogById);
router.use(authentication);
router.route("/like/:blogId").patch(BlogController.likeBlog);
router.route("/dislike/:blogId").patch(BlogController.dislikeBlog);
router.use(checkAuthIsAdmin);
router.route("/create").post(BlogController.createBlog);
router.route("/update/:blogId").patch(BlogController.updateBlog);
router.route("/delete/:blogId").delete(BlogController.deleteBlog);

module.exports = router;
