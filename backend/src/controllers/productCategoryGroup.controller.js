const { CREATED, OK } = require("../core/success.response");
const { ProductCategoryGroupService } = require("../services");
class ProductCategoryGroupController {
  static async createProductCategoryGroup(req, res) {
    new CREATED({
      message: "Create Product Category Group Successfully",
      metadata: await ProductCategoryGroupService.createProductCategoryGroup(req, res),
    }).send(res);
  }

  static async getAllProductCategoriesGroup(req, res) {
    new OK({
      message: "Get All Product Categories Group Successfully",
      metadata: await ProductCategoryGroupService.getAllProductCategories(req, res),
    }).send(res);
  }

  static async getProductCategoryGroupById(req, res) {
    new OK({
      message: "Get Product Categories Group By Id Successfully",
      metadata: await ProductCategoryGroupService.getProductCategoryGroupById(req, res),
    }).send(res);
  }


  static async updateProductCategoryGroup(req, res) {
    new OK({
      message: "Update Product Category Group Successfully",
      metadata: await ProductCategoryGroupService.updateProductCategoryGroup(req, res),
    }).send(res);
  }

  static async deleteProductCategoryGroup(req, res) {
    new OK({
      message: "Delete Product Category Group Successfully",
      metadata: await ProductCategoryGroupService.deleteProductCategoryGroup(req, res),
    }).send(res);
  }

  
  static async addGroup(req, res) {
    new OK({
      message: "Add Group Okeeee",
      metadata: await ProductCategoryGroupService.addGroup(req, res),
    }).send(res);
  }
}

module.exports = ProductCategoryGroupController;
