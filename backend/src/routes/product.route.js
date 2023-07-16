const express = require("express");
const router = express.Router();
const Constant = require("../utils/constant");
const { ProductController } = require("../controllers");
const { checkAuthIsAdmin } = require("../middleware/checkAuth.middleware");
const { uploadMultiFieldsImages } = require("../utils");

const fieldsUpload = [
  {
    name: "product_thumb",
    maxCount: Constant.MAX_UPLOAD_IMAGES,
  },
  {
    name: "product_images",
    maxCount: Constant.MAX_UPLOAD_IMAGES,
  },
  {
    name: "product_imageColor",
    maxCount: Constant.MAX_UPLOAD_IMAGES,
  },
];
// Only Admin have permission create product
router.route("/getAll").get(ProductController.getAllProducts);
router.route("/getAllAvailable").get(ProductController.getAllProductsAvailable);
router
  .route("/getAllUnavailable")
  .get(ProductController.getAllProductsUnavailable);
router.route("/getById/:productId").get(ProductController.getProductById);
// router.use(checkAuthIsAdmin);
router
  .route("/create")
  .post(uploadMultiFieldsImages(fieldsUpload), ProductController.createProduct);
router.route("/search").get(ProductController.getProductByNameOrDescription);
router
  .route("/update/:productId")
  .patch(
    uploadMultiFieldsImages(fieldsUpload),
    ProductController.updateProductById
  );
router
  .route("/provideInfo/:productId")
  .patch(
    uploadMultiFieldsImages(fieldsUpload),
    ProductController.provideInfoProductById
  );
router.route("/delete/:productId").delete(ProductController.deleteProductById);

module.exports = router;
