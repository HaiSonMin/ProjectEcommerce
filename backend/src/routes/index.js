const express = require("express");
const router = express.Router();

const authRouter = require("./auth.route");
const blogRouter = require("./blog.route");
const cartRouter = require("./cart.route");
const userRouter = require("./user.route");
const adminRouter = require("./admin.route");
const brandRouter = require("./brand.route");
const orderRouter = require("./order.route");
const ratingRouter = require("./rating.route");
const productRouter = require("./product.route");
const discountRouter = require("./discount.route");
const wishlistRouter = require("./wishlist.route");
const inventoryRouter = require("./inventory.route");
const blogCategoryRouter = require("./blogCategory.route");
const SpecificationRouter = require("./specification.route");
const productCategoryRouter = require("./productCategory.route");

router.use("/api/v1/auth", authRouter);
router.use("/api/v1/user", userRouter);
router.use("/api/v1/blog", blogRouter);
router.use("/api/v1/cart", cartRouter);
router.use("/api/v1/order", orderRouter);
router.use("/api/v1/admin", adminRouter);
router.use("/api/v1/brand", brandRouter);
router.use("/api/v1/rating", ratingRouter);
router.use("/api/v1/product", productRouter);
router.use("/api/v1/wishlist", wishlistRouter);
router.use("/api/v1/discount", discountRouter);
router.use("/api/v1/inventory", inventoryRouter);
router.use("/api/v1/blogCategory", blogCategoryRouter);
router.use("/api/v1/specification", SpecificationRouter);
router.use("/api/v1/productCategory", productCategoryRouter);

module.exports = router;
