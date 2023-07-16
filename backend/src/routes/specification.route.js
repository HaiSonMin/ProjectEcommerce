const express = require("express");
const router = express.Router();

const { SpecificationController } = require("../controllers");
const { checkAuthIsAdmin } = require("../middleware/checkAuth.middleware");

router.use(checkAuthIsAdmin);

router.route("/create").post(SpecificationController.createSpecification);
router.route("/getByProductId/:productId").post(SpecificationController.getSpecificationByProductId);
router.route("/updateByProductId/:productId").post(SpecificationController.updateSpecificationByProductId);
router.route("/deleteByProductId/:productId").post(SpecificationController.deleteSpecificationByProductId);

module.exports = router;
