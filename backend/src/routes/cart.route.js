const express = require("express");
const router = express.Router();
const { CartController } = require("../controller");
const { authentication } = require("../middleware/checkAuth.middleware");

router.use(authentication);
router.route("/getAllProducts").get(CartController.getAllProducts);
router.route("/addToCart").patch(CartController.addProductToCart);
router.route("/update").patch(CartController.updateCart);
router.route("/deleteProduct").patch(CartController.deleteProduct);
router.route("/deleteAllProducts").patch(CartController.deleteAllProduct);

module.exports = router;
