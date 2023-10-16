const express = require("express");
const router = express.Router();
const { CityController } = require("../controllers");

router.route("/getAllCities").get(CityController.getAllCities);
router.route("/getAllDistricts/:cityCode").get(CityController.getAllDistricts);
router.route("/getAllWards/:districtCode").get(CityController.getAllWards);

module.exports = router;
