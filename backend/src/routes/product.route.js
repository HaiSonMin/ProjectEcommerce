const express = require("express");
const router = express.Router();
const Constant = require("../utils/constant");
const { ProductController, ProductControllerV2 } = require("../controllers");
const { checkAuthIsAdmin } = require("../middleware/checkAuth.middleware");
const { uploadMultiFieldsImages, uploadOneImage } = require("../utils");

const fieldsUpload = [
  {
    name: "product_thumb",
    maxCount: 1,
  },
  {
    name: "product_imagesProduct",
    maxCount: Constant.MAX_UPLOAD_IMAGES,
  },
  {
    name: "product_imagesAttribute",
    maxCount: Constant.MAX_UPLOAD_IMAGES,
  },
  {
    name: "product_imageColor",
    maxCount: 1,
  },
];
// Only Admin have permission create product
router.route("/getAll").get(ProductControllerV2.getAllProducts);
// router.use(checkAuthIsAdmin);

router
  .route("/create")
  .post(
    uploadMultiFieldsImages(fieldsUpload),
    ProductControllerV2.createProduct
  );
router.route("/search").get(ProductControllerV2.getProductByNameOrDescription);

router
  .route("/update/:productId")
  .patch(
    uploadMultiFieldsImages(fieldsUpload),
    ProductControllerV2.updateProductBasic
  );

router
  .route("/updateAttribute/:productId")
  .patch(
    uploadOneImage("product_imageColor"),
    ProductControllerV2.updateProductAttribute
  );

router
  .route("/provideAttribute/:productId")
  .patch(
    uploadOneImage("product_imageColor"),
    ProductControllerV2.provideAttributeProduct
  );

router
  .route("/deleteAttribute/:productId")
  .delete(ProductControllerV2.deleteProductAttribute);

router
  .route("/delete/:productId")
  .delete(ProductControllerV2.deleteProductById);

module.exports = router;
