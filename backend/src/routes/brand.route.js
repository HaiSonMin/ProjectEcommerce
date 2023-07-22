const express = require("express");
const router = express.Router();
const { uploadOneImage } = require("../utils");
const { BrandController } = require("../controllers");

router
  .route("/create")
  .post(uploadOneImage("brand_image"), BrandController.createBrand);
router.route("/getById/:brandId").get(BrandController.getBrandById);
router.route("/getAll").get(BrandController.getAllBrands);
router
  .route("/update/:brandId")
  .patch(uploadOneImage("brand_image"), BrandController.updateBrandById);
router.route("/delete/:brandId").delete(BrandController.deleteBrandById);
// router.route("/uploadFile/:brandId").post(uploader.single("imageBrand"),BrandController.uploadImage);

module.exports = router;
