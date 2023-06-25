const express = require("express");
const router = express.Router();

const authRouter = require("./auth.route");
const adminRouter = require("./admin.route");
const userRouter = require("./user.route");
const brandRouter = require("./brand.route");
const productRouter = require("./product.route");
const productCategoryRouter = require("./productCategory.route");
const blogRouter = require("./blog.route");
const blogCategoryRouter = require("./blogCategory.route");
const discountRouter = require("./discount.route");
const ratingRouter = require("./rating.route");
const inventoryRouter = require("./inventory.route");
const cartRouter = require("./cart.route");
const wishlistRouter = require("./wishlist.route");
const orderRouter = require("./order.route");

router.use("/api/v1/auth", authRouter);
router.use("/api/v1/admin", adminRouter);
router.use("/api/v1/user", userRouter);
router.use("/api/v1/brand", brandRouter);
router.use("/api/v1/product", productRouter);
router.use("/api/v1/productCategory", productCategoryRouter);
router.use("/api/v1/blogCategory", blogCategoryRouter);
router.use("/api/v1/blog", blogRouter);
router.use("/api/v1/discount", discountRouter);
router.use("/api/v1/rating", ratingRouter);
router.use("/api/v1/inventory", inventoryRouter);
router.use("/api/v1/cart", cartRouter);
router.use("/api/v1/wishlist", wishlistRouter);
router.use("/api/v1/order", orderRouter);

module.exports = router;
