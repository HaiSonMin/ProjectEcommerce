const express = require("express");
const router = express.Router();
const { BlogCategoryController } = require("../controller");

const { checkAuthIsAdmin } = require("../middleware/checkAuth.middleware");


router.use(checkAuthIsAdmin);
router.route("/create").post(BlogCategoryController.createBlogCategory);
router.route("/getAll").get(BlogCategoryController.getAllBlogCategories);
router.route("/update/:blogCategoryId").patch(BlogCategoryController.updateBlogCategory);
router.route("/delete/:blogCategoryId").delete(BlogCategoryController.deleteBlogCategory);

module.exports = router;
