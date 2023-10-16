const { CREATED, OK } = require("../core/success.response");
const { CityService } = require("../services/index");
class AuthController {
  static async getAllCities(req, res) {
    new OK({
      message: "Get all cities successfully",
      metadata: await CityService.getAllCities(req, res),
    }).send(res);
  }
  static async getAllDistricts(req, res) {
    new OK({
      message: "Get all district by city code successfully",
      metadata: await CityService.getAllDistricts(req, res),
    }).send(res);
  }
  static async getAllWards(req, res) {
    new OK({
      message: "Get all wards by district code successfully",
      metadata: await CityService.getAllWards(req, res),
    }).send(res);
  }
}

module.exports = AuthController;
