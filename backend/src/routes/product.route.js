const express = require("express");
const router = express.Router();
const { ProductController } = require("../controller");
const { checkAuthIsAdmin } = require("../middleware/checkAuth.middleware");

// Only Admin have permission create product
router.route("/getAllProducts").get(ProductController.getAllProducts);
router.route("/getAllProductsAvailable").get(ProductController.getAllProductsAvailable);
router.route("/getAllProductsUnavailable").get(ProductController.getAllProductsUnavailable);
router.route("/getProduct/:productId").get(ProductController.getProductById);
router.use(checkAuthIsAdmin);
router.route("/createProduct").post(ProductController.createProduct);
router.route("/search").get(ProductController.getProductByNameOrDescription);
router.route("/update/:productId").patch(ProductController.updateProductById);
router.route("/delete/:productId").delete(ProductController.deleteProductById);

module.exports = router;
