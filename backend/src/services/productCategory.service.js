const { BadRequestError, NotFoundError } = require("../core/error.response");
const { ProductCategoryModel } = require("../models");
const { ProductCategoryRepo } = require("../repositories");
const { convertFieldsToArray } = require("../utils");

class ProductCategoryService {
  static async createProductCategory(req, res) {
    const payload = req.body;
    const newProductCategory = await ProductCategoryModel.create(payload);
    if (!newProductCategory) throw new BadRequestError("Create Category Error");
    return newProductCategory;
  }

  static async getAllProductCategories(req, res) {
    const { sort, limit, page, fields } = req.query;
    const productCategories = await ProductCategoryRepo.getAllProductCategories(
      { sort, limit, page, select: convertFieldsToArray(fields) }
    );
    if (!productCategories.length)
      throw new NotFoundError("Not Found ProductCategories");
    return productCategories;
  }

  static async updateProductCategory(req, res) {
    const { productCategoryId } = req.params;
    const payload = req.body;
    const productCategoryUpdated =
      await ProductCategoryRepo.updateProductCategoryById({
        productCategoryId,
        payload,
      });
    if (!productCategoryUpdated)
      throw new BadRequestError("Updated Category Error");
    return productCategoryUpdated;
  }

  static async deleteProductCategory(req, res) {
    const { productCategoryId } = req.params;
    const productCategoryDeleted =
      await ProductCategoryRepo.deleteProductCategoryById({
        productCategoryId,
      });
    if (!productCategoryDeleted)
      throw new BadRequestError("Delete Category Error");
    return productCategoryDeleted;
  }
}

module.exports = ProductCategoryService;
