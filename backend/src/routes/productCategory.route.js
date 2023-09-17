const express = require("express");
const router = express.Router();

const { ProductCategoryController } = require("../controllers");

const { checkAuthIsAdmin } = require("../middleware/auth.middleware");
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
  .route("/getById/:productCategoryId")
  .get(ProductCategoryController.getProductCategoryById);
router
  .route("/getByIds")
  .get(ProductCategoryController.getProductCategoriesByIds);
router
  .route("/getByGroupId/:productCategoryGroupId")
  .get(ProductCategoryController.getProductCategoriesByGroupId);
router.route("/search").get(ProductCategoryController.searchProductCategories);

router
  .route("/update/:productCategoryId")
  .patch(
    uploadOneImage("productCategory_image"),
    ProductCategoryController.updateProductCategory
  );

router
  .route("/delete/:productCategoryId")
  .delete(ProductCategoryController.deleteProductCategory);

router.route("/change").patch(ProductCategoryController.change);

// Only Admin have permission create product

module.exports = router;
