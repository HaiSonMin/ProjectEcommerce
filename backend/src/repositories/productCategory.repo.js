const { BadRequestError } = require("../core/error.response");
const { ProductCategoryModel } = require("../models");
const {
  convertSortBy,
  skipPage,
  getSelectData,
  getUnSelectData,
} = require("../utils");

class ProductCategoryRepo {
  static async getAllProductCategories({
    filter,
    sort = "ctime",
    limit = 20,
    page = 1,
    select,
    unselect,
  }) {
    const [productCategories, totalProductCategories] = await Promise.all([
      ProductCategoryModel.find(filter)
        .select(getSelectData(select))
        .select(getUnSelectData(unselect))
        .sort(convertSortBy(sort))
        .limit(limit)
        .skip(skipPage({ limit, page }))
        .lean()
        .exec(),
      ProductCategoryModel.count(),
    ]);
    return { productCategories, totalProductCategories };
  }

  static async getProductCategoryById({ productCategoryId }) {
    return await ProductCategoryModel.findById(productCategoryId).lean().exec();
  }

  static async updateProductCategoryById({ productCategoryId, payload }) {
    return await ProductCategoryModel.findByIdAndUpdate(
      productCategoryId,
      payload,
      { new: true }
    )
      .lean()
      .exec();
  }

  static async deleteProductCategoryById({ productCategoryId }) {
    return await ProductCategoryModel.findByIdAndDelete(productCategoryId)
      .lean()
      .exec();
  }
}

module.exports = ProductCategoryRepo;
