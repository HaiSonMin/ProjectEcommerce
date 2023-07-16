const express = require("express");
const router = express.Router();

const { ProductCategoryController } = require("../controllers");

const { checkAuthIsAdmin } = require("../middleware/checkAuth.middleware");
const { uploadOneImage } = require("../utils");

// router.use(checkAuthIsAdmin);
router
  .route("/create")
  .post(
    uploadOneImage("productCategory_image"),
    ProductCategoryController.createProductCategory
  );

router.route("/getAll").get(ProductCategoryController.getAllProductCategories);

router
  .route("/update/:productCategoryId")
  .patch(
    uploadOneImage("productCategory_image"),
    ProductCategoryController.updateProductCategory
  );

router
  .route("/delete/:productCategoryId")
  .delete(ProductCategoryController.deleteProductCategory);

// Only Admin have permission create product

module.exports = router;
