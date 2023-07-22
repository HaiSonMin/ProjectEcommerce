const express = require("express");
const router = express.Router();
const Constant = require("../utils/constant");
const { ProductController } = require("../controllers");
const { checkAuthIsAdmin } = require("../middleware/checkAuth.middleware");
const {
  uploadMultiFieldsImages,
  uploadMultiImages,
  uploadOneImage,
} = require("../utils");

const fieldsUpload = [
  {
    name: "product_thumb",
    maxCount: 1,
  },
  {
    name: "product_images",
    maxCount: Constant.MAX_UPLOAD_IMAGES,
  },
  {
    name: "product_imageColor",
    maxCount: 1,
  },
];
// Only Admin have permission create product
router.route("/getAll").get(ProductController.getAllProducts);

router.route("/getAllAvailable").get(ProductController.getAllProductsAvailable);

router
  .route("/getAllUnavailable")
  .get(ProductController.getAllProductsUnavailable);
router.route("/getById/:productId").get(ProductController.getProductById);
router.route("/getMainInfoById/:productMainInfoId").get(ProductController.getProductMainInfoById);
// router.use(checkAuthIsAdmin);

router
  .route("/create")
  .post(uploadMultiFieldsImages(fieldsUpload), ProductController.createProduct);
router.route("/search").get(ProductController.getProductByNameOrDescription);

router
  .route("/update/:productId")
  .patch(
    uploadMultiFieldsImages(fieldsUpload),
    ProductController.updateProductBasic
  );

router
  .route("/updateMainInfo/:productId")
  .patch(
    uploadOneImage("product_imageColor"),
    ProductController.updateProductMainInfo
  );

router
  .route("/provideInfo/:productId")
  .patch(
    uploadOneImage("product_imageColor"),
    ProductController.provideInfoProduct
  );

router.route("/delete/:productId").delete(ProductController.deleteProductById);
router
  .route("/deleteMainInfo/:productId")
  .delete(ProductController.deleteProductMainInfo);

module.exports = router;
