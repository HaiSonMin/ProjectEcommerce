const { CREATED, OK } = require("../core/success.response");
const { BrandService } = require("../services");
class BrandController {
  static async createBrand(req, res) {
    new CREATED({
      message: "Create Brand Successfully",
      metadata: await BrandService.createBrand(req, res),
    }).send(res);
  }

  static async getBrandById(req, res) {
    new OK({
      message: "Get Brand Successfully",
      metadata: await BrandService.getBrandById(req, res),
    }).send(res);
  }

  static async getBrandByIds(req, res) {
    new OK({
      message: "Get Brands Successfully",
      metadata: await BrandService.getBrandByIds(req, res),
    }).send(res);
  }

  static async getBrandByName(req, res) {
    new OK({
      message: "Get Brand Successfully",
      metadata: await BrandService.getBrandByName(req, res),
    }).send(res);
  }

  static async getAllBrands(req, res) {
    new OK({
      message: "Get All Brands Successfully",
      metadata: await BrandService.getAllBrand(req, res),
    }).send(res);
  }

  static async searchBrands(req, res) {
    new OK({
      message: "Search Brands Successfully",
      metadata: await BrandService.searchBrands(req, res),
    }).send(res);
  }

  static async updateBrandById(req, res) {
    new OK({
      message: "Update Brand Successfully",
      metadata: await BrandService.updateBrand(req, res),
    }).send(res);
  }

  static async deleteBrandById(req, res) {
    new OK({
      message: "Delete Brand Successfully",
      metadata: await BrandService.deleteBrand(req, res),
    }).send(res);
  }

  static async uploadImage(req, res) {
    new OK({
      message: "Upload Image Successfully",
    }).send(res);
  }
}

module.exports = BrandController;
