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

  static async getProductCategoryById(req, res) {
    new OK({
      message: "Get Product Categories By Id Successfully",
      metadata: await ProductCategoryService.getProductCategoryById(req, res),
    }).send(res);
  }

  static async getProductCategoriesByIds(req, res) {
    new OK({
      message: "Get Product Categories By Ids Successfully",
      metadata: await ProductCategoryService.getProductCategoriesByIds(
        req,
        res
      ),
    }).send(res);
  }

  static async getProductCategoriesByGroupId(req, res) {
    new OK({
      message: "Get Product Categories By Group Id Successfully",
      metadata: await ProductCategoryService.getProductCategoriesByGroupId(
        req,
        res
      ),
    }).send(res);
  }

  static async searchProductCategories(req, res) {
    new OK({
      message: "Search Product Categories Successfully",
      metadata: await ProductCategoryService.searchProductCategories(req, res),
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

  static async change(req, res) {
    new OK({
      message: "OKeeeee",
      metadata: await ProductCategoryService.change(req, res),
    }).send(res);
  }
}

module.exports = ProductCategoryController;
