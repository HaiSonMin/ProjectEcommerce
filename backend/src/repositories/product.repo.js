const { convertToMongoObjectId } = require("../utils");
const { ProductModel } = require("../models");
const {
  skipPage,
  convertSortBy,
  getSelectData,
  getUnSelectData,
} = require("../utils");

class ProductRepository {
  static async getAllProducts({
    filter,
    page = 1,
    limit = 10,
    select,
    unselect,
    sort,
  }) {
    return await ProductModel.find(filter)
      .select(getSelectData(select))
      .select(getUnSelectData(unselect))
      .skip(skipPage({ page, limit }))
      .limit(limit)
      .sort(convertSortBy(sort))
      .populate({ path: "product_brand", select: "brand_name" })
      .populate({ path: "product_category", select: "category_name" })
      .lean()
      .exec();
  }
  static async getProductById({ productId, unselect }) {
    return await ProductModel.findById(convertToMongoObjectId(productId))
      .select(getUnSelectData(unselect))
      .exec();
  }
  static async getProductByIds({ productIds, select }) {
    return await ProductModel.find({ _id: { $in: productIds } })
      .select(getSelectData(select))
      .lean()
      .exec();
  }
  static async getProductNotByIds({ productIds }) {
    return await ProductModel.find({ _id: { $nin: productIds } })
      .lean()
      .exec();
  }
  static async getProductByNameOrDescription({
    keySearch,
    page = 1,
    limit = 10,
    select,
    unselect,
  }) {
    const regexSearch = new RegExp(keySearch, "i");
    return await ProductModel.find({
      $text: { $search: regexSearch },
    })
      .select(getSelectData(select))
      .select(getUnSelectData(unselect))
      .skip(skipPage({ page, limit }))
      .limit(limit)
      .lean()
      .exec();
  }

  static async updateProductById({ productId, payload }) {
    return await ProductModel.findByIdAndUpdate(productId, payload, {
      new: true,
    })
      .lean()
      .exec();
  }
  static async deleteProductById({ productId }) {
    return await ProductModel.findByIdAndDelete(productId).lean().exec();
  }
}
module.exports = ProductRepository;
