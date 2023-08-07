const { BadRequestError, NotFoundError } = require("../core/error.response");
const { ProductCategoryModel } = require("../models");
const { ProductCategoryRepo } = require("../repositories");
const { convertFieldsToArray } = require("../utils");

class ProductCategoryService {
  static async createProductCategory(req, res) {
    const payload = req.body;
    const { path } = req?.file || {};
    console.log(path);
    const newProductCategory = await ProductCategoryModel.create({
      ...payload,
      productCategory_image: path,
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

  static async getProductCategoryById(req, res) {
    const { productCategoryId } = req.params;
    const productCategory = await ProductCategoryRepo.getProductCategoryById({
      productCategoryId,
    });

    if (!productCategory) throw new NotFoundError("Product category not found");
    return productCategory;
  }

  static async getProductCategoriesByIds(req, res) {
    const { productCategoriesIds } = req.query;
    const productCategories =
      await ProductCategoryRepo.getProductCategoriesByIds({
        productCategoriesIds,
      });
    return productCategories;
  }

  static async updateProductCategory(req, res) {
    const { productCategoryId } = req.params;
    const payload = req.body;

    const { path: pathImage } = req?.file || {};

    const productCategoryUpdated =
      await ProductCategoryRepo.updateProductCategoryById({
        productCategoryId,
        payload: {
          ...payload,
          productCategory_image: pathImage ?? payload.productCategory_image,
        },
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
