const express = require("express");
const router = express.Router();
const { ProductController } = require("../controller");
const { checkAuthIsAdmin } = require("../middleware/checkAuth.middleware");

// Only Admin have permission create product
router.route("/getAll").get(ProductController.getAllProducts);
router.route("/getAllAvailable").get(ProductController.getAllProductsAvailable);
router.route("/getAllUnavailable").get(ProductController.getAllProductsUnavailable);
router.route("/getById/:productId").get(ProductController.getProductById);
router.use(checkAuthIsAdmin);
router.route("/create").post(ProductController.createProduct);
router.route("/search").get(ProductController.getProductByNameOrDescription);
router.route("/update/:productId").patch(ProductController.updateProductById);
router.route("/delete/:productId").delete(ProductController.deleteProductById);

module.exports = router;
