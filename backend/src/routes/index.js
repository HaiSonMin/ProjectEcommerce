const express = require("express");
const router = express.Router();
const authRouter = require("./auth.route");
const adminRouter = require("./admin.route");
const userRouter = require("./user.route");
const productRouter = require("./product.route");

router.use("/api/v1/auth", authRouter);
router.use("/api/v1/admin", adminRouter);
router.use("/api/v1/user", userRouter);
router.use("/api/v1/product", productRouter);

module.exports = router;
