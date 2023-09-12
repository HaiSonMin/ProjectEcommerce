const express = require("express");
const router = express.Router();
const Constant = require("../utils/constant");
const { ProductController } = require("../controllers");
const { checkAuthIsAdmin } = require("../middleware/checkAuth.middleware");
const { uploadMultiFieldsImagesDynamic } = require("../utils");
// Only Admin have permission create product
router.route("/getAll").get(ProductController.getAllProducts);
router.route("/getById/:productId").get(ProductController.getProductById);

// router.use(checkAuthIsAdmin);
router
  .route("/create")
  .post(uploadMultiFieldsImagesDynamic(), ProductController.createProduct);

router.route("/search").get(ProductController.searchProduct);

router
  .route("/update/:productId")
  .patch(uploadMultiFieldsImagesDynamic(), ProductController.updateProduct);

router.route("/delete/:productId").delete(ProductController.deleteProduct);

module.exports = router;
