const { ProductCategoryGroupModel } = require("../models");
const { convertSortBy, skipPage } = require("../utils");

class ProductCategoryGroupRepo {
  static async getAllProductCategoriesGroup({
    // filter,
    sort = "ctime",
    limit,
    page = 1,
  }) {
    
    const [productCategoriesGroup, totalProductCategoriesGroup] =
      await Promise.all([
        ProductCategoryGroupModel.find()
          .sort(convertSortBy(sort))
          .skip(skipPage({ limit, page }))
          .limit(limit)
          .lean()
          .exec(),
        ProductCategoryGroupModel.count(),
      ]);
    return { productCategoriesGroup, totalProductCategoriesGroup };
  }

  static async getProductCategoryGroupById({ productCategoryGroupId }) {
    return await ProductCategoryGroupModel.findById(
      productCategoryGroupId
    ).exec();
  }

  static async getProductCategoriesByIds({ productCategoriesIds }) {
    return await ProductCategoryGroupModel.find({ _id: productCategoriesIds })
      .lean()
      .exec();
  }

  static async updateProductCategoryGroupById({
    productCategoryGroupId,
    payload,
  }) {
    return await ProductCategoryGroupModel.findByIdAndUpdate(
      productCategoryGroupId,
      payload,
      { new: true }
    )
      .lean()
      .exec();
  }

  static async deleteProductCategoryGroupById({ productCategoryGroupId }) {
    return await ProductCategoryGroupModel.findByIdAndDelete(
      productCategoryGroupId
    )
      .lean()
      .exec();
  }
}

module.exports = ProductCategoryGroupRepo;
