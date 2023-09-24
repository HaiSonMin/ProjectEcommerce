const express = require("express");
const router = express.Router();
const { uploadOneImage } = require("../utils");
const { DemandController } = require("../controllers");
const {
  authentication,
  checkAuthIsAdmin,
} = require("../middleware/auth.middleware");

router.use(authentication);
router
  .route("/create")
  .post(uploadOneImage("demand_image"), DemandController.createDemand);
router.route("/getAll").get(DemandController.getAllDemands);
router.route("/getById/:demandId").get(DemandController.getDemandById);
router.route("/getByIds").get(DemandController.getDemandsByIds);
router.route("/search").get(DemandController.searchDemands);

router
  .route("/getByProductCategoryId/:productCategoryId")
  .get(DemandController.getDemandsByProductCategoryId);

router
  .route("/update/:demandId")
  .patch(uploadOneImage("demand_image"), DemandController.updateDemand);

router.route("/delete/:demandId").delete(DemandController.deleteDemand);
module.exports = router;
