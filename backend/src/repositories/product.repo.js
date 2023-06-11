const { convertObjectIdMongo } = require("../../../ProjectDelivery/src/utils");
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
    console.log("convertSortBy(sort)::::",convertSortBy(sort));
    return await ProductModel.find(filter)
      .select(getSelectData(select))
      .select(getUnSelectData(unselect))
      .skip(skipPage({ page, limit }))
      .limit(limit)
      .sort(convertSortBy(sort))
      .lean()
      .exec();
  }
  static async getProductById({ productId }) {
    return await ProductModel.findById(convertObjectIdMongo(productId))
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
    return await ProductModel.find(
      {
        $text: { $search: regexSearch },
      },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
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
