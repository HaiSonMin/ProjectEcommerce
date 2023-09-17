const express = require("express");
const router = express.Router();
const { RatingController } = require("../controllers");
const { authentication } = require("../middleware/auth.middleware");

router.use(authentication);
router.route("/create").post(RatingController.createRating);
router.route("/getByProductId").get(RatingController.getRatingsByProductId);
router.route("/update/:ratingId").patch(RatingController.updateRating);
router.route("/delete/:ratingId").delete(RatingController.deleteRating);
router.route("/deleteAll/:productId").delete(RatingController.deleteAllRatings);

module.exports = router;
