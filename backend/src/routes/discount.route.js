const express = require("express");
const router = express.Router();
const { DiscountController } = require("../controllers");
const { checkAuthIsAdmin } = require("../middleware/auth.middleware");

router.use(checkAuthIsAdmin)
router.route("/create").post(DiscountController.createDiscount);

router.route("/getAll").get(DiscountController.getAllDiscounts);
router.route("/search").get(DiscountController.searchDiscount);
router.route("/getById/:discountId").get(DiscountController.getDiscount);
router.route("/getAllAvailable").get(DiscountController.getDiscountsAvailable);
router.route("/getAllUnavailable").get(DiscountController.getDiscountsUnavailable);
router.route("/getAllPercentage").get(DiscountController.getAllDiscountsPercentage);
router.route("/getAllFixedAmount").get(DiscountController.getAllDiscountsFixedAmount);

// Belong to product
router.route("/getAllProductsWithDiscount/:discountId").get(DiscountController.getAllProductsWithDiscount);
router.route("/getAllProductsWithoutDiscount/:discountId").get(DiscountController.getAllProductsWithoutDiscount);

router.route("/update/:discountId").patch(DiscountController.updateDiscount);
router.route("/addToProducts/:discountId").patch(DiscountController.addDiscountToProducts);

router.route("/delete/:discountId").delete(DiscountController.deleteDiscount);
router.route("/deleteAllUnavailable").delete(DiscountController.deleteAllDiscountsUnAvailable);

module.exports = router;
