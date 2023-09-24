const express = require("express");
const router = express.Router();
const { CouponController } = require("../controllers");
const { checkAuthIsAdmin } = require("../middleware/auth.middleware");

router.use(checkAuthIsAdmin);
router.route("/create").post(CouponController.createCoupon);
router.route("/getAll").get(CouponController.getAllCoupons);
router.route("/search").get(CouponController.searchCoupons);
router.route("/getById/:couponId").get(CouponController.getCouponById);

// Belong to product
router.route("/update/:couponId").patch(CouponController.updateCoupon);
router
  .route("/addToProducts/:couponId")
  .patch(CouponController.addCouponToProducts);

router.route("/delete/:couponId").delete(CouponController.deleteCoupon);
router
  .route("/deleteAllExpired")
  .delete(CouponController.deleteAllCouponsExpired);

module.exports = router;
