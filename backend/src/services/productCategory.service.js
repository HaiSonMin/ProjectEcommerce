const { BadRequestError, NotFoundError } = require("../core/error.response");
const { ProductCategoryModel } = require("../models");
const { ProductCategoryRepo } = require("../repositories");
const { convertFieldsToArray } = require("../utils");

class ProductCategoryService {
  static async createProductCategory(req, res) {
    const payload = req.body;
    const { path: pathImage } = req?.file || {};
    console.log("pathImage:::");
    const newProductCategory = await ProductCategoryModel.create({
      ...payload,
      productCategory_image: pathImage,
    });
    if (!newProductCategory) throw new BadRequestError("Create Category Error");
    return newProductCategory;
  }

  static async getAllProductCategories(req, res) {
    const { sort, limit, page, fields } = req.query;
    const { productCategories, totalProductCategories } =
      await ProductCategoryRepo.getAllProductCategories({
        sort,
        limit,
        page,
        select: convertFieldsToArray(fields),
      });
    if (!productCategories.length)
      throw new NotFoundError("Not Found ProductCategories");
    return {
      totalProductCategories,
      productCategoriesPerPage: productCategories.length,
      productCategories,
    };
  }

  static async updateProductCategory(req, res) {
    const { productCategoryId } = req.params;
    const payload = req.body;

    console.log("productCategoryId:::", productCategoryId);
    const { path: pathImage } = req?.file || {};

    console.log("pathImage:::", pathImage);

    const productCategoryUpdated =
      await ProductCategoryRepo.updateProductCategoryById({
        productCategoryId,
        payload: { ...payload, productCategory_image: pathImage },
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
