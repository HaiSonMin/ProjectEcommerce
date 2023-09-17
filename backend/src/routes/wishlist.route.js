const express = require("express");
const router = express.Router();
const { WishlistController } = require("../controllers");
const { checkAuthIsUser, authentication } = require("../middleware/auth.middleware");

router.use(authentication);
router.route("/addProduct").patch(WishlistController.addProduct);
router.route("/getAllProducts").get(WishlistController.getAllProducts);
router.route("/deleteProduct/:wishlistId").patch(WishlistController.deleteProduct);
router.route("/deleteAllProducts/:wishlistId").patch(WishlistController.deleteAllProducts);

module.exports = router;
