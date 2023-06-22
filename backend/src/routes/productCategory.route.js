const express = require("express");
const router = express.Router();
const { ProductCategoryController } = require("../controller");
const { checkAuthIsAdmin } = require("../middleware/checkAuth.middleware");

// Only Admin have permission create product

module.exports = router;
