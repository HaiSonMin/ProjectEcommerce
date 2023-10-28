const express = require("express");
const router = express.Router();
const { ProductController } = require("../controllers");
const {
  checkAuthIsAdmin,
  checkAuthIsUser,
} = require("../middleware/auth.middleware");
const { uploadMultiFieldsImagesDynamic } = require("../utils");
// Only Admin have permission create product
router.route("/getAll").get(ProductController.getAllProducts);
router.route("/getById/:productId").get(ProductController.getProductById);
router
  .route("/getByCategoryId/:categoryId")
  .get(ProductController.getProductByCategoryId);

router.use(checkAuthIsAdmin);
router
  .route("/create")
  .post(uploadMultiFieldsImagesDynamic(), ProductController.createProduct);

router.route("/search").get(ProductController.searchProduct);

router
  .route("/update/:productId")
  .patch(uploadMultiFieldsImagesDynamic(), ProductController.updateProduct);

router.route("/delete/:productId").delete(ProductController.deleteProduct);

module.exports = router;
