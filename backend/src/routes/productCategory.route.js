const express = require("express");
const router = express.Router();

const { ProductCategoryController } = require("../controller");

const { checkAuthIsAdmin } = require("../middleware/checkAuth.middleware");

router.use(checkAuthIsAdmin);
router.route("/create").post(ProductCategoryController.createProductCategory);
router.route("/getAll").get(ProductCategoryController.getAllProductCategories);
router.route("/update/:productCategoryId").patch(ProductCategoryController.updateProductCategory);
router.route("/delete/:productCategoryId").delete(ProductCategoryController.deleteProductCategory);

// Only Admin have permission create product

module.exports = router;
