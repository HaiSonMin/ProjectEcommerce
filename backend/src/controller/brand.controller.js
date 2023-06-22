const { CREATED, OK } = require("../core/success.response");
const { BrandService } = require("../services");
class BrandController {
  static async createBrand(req, res) {
    new CREATED({
      message: "Create Brand Successfully",
      metadata: await BrandService.createBrand(req, res),
    }).send(res);
  }

  static async getAllBrands(req, res) {
    new OK({
      message: "Get All Brands Successfully",
      metadata: await BrandService.getAllBrand(req, res),
    }).send(res);
  }
}

module.exports = BrandController;
