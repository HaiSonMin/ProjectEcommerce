const express = require("express");
const router = express.Router();

const { ProductCategoryGroupController } = require("../controllers");

const { checkAuthIsAdmin } = require("../middleware/checkAuth.middleware");
const { uploadOneImage } = require("../utils");

// router.use(checkAuthIsAdmin);
router
  .route("/create")
  .post(
    uploadOneImage("productCategoryGroup_image"),
    ProductCategoryGroupController.createProductCategoryGroup
  );

router
  .route("/getAll")
  .get(ProductCategoryGroupController.getAllProductCategoriesGroup);
router
  .route("/getById/:productCategoryGroupId")
  .get(ProductCategoryGroupController.getProductCategoryGroupById);

router
  .route("/update/:productCategoryGroupId")
  .patch(
    uploadOneImage("productCategoryGroup_image"),
    ProductCategoryGroupController.updateProductCategoryGroup
  );

router
  .route("/delete/:productCategoryGroupId")
  .delete(ProductCategoryGroupController.deleteProductCategoryGroup);

router
  .route("/addGroup")
  .patch(ProductCategoryGroupController.addGroup);

module.exports = router;
