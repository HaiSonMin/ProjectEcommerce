const { CREATED, OK } = require("../core/success.response");
const { ProductCategoryService } = require("../services");
class ProductCategoryController {
  static async createProductCategory(req, res) {
    new CREATED({
      message: "Create Product Category Successfully",
      metadata: await ProductCategoryService.createProductCategory(req, res),
    }).send(res);
  }

  static async getAllProductCategories(req, res) {
    new OK({
      message: "Get All Product Categories Successfully",
      metadata: await ProductCategoryService.getAllProductCategories(req, res),
    }).send(res);
  }

  static async updateProductCategory(req, res) {
    new OK({
      message: "Update Product Category Successfully",
      metadata: await ProductCategoryService.updateProductCategory(req, res),
    }).send(res);
  }

  static async deleteProductCategory(req, res) {
    new OK({
      message: "Delete Product Category Successfully",
      metadata: await ProductCategoryService.deleteProductCategory(req, res),
    }).send(res);
  }
}

module.exports = ProductCategoryController;
