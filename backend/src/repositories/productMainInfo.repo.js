const { ProductMainInfoModel } = require("../models");
const { convertToMongoObjectId } = require("../utils");
class ProductMainInfoRepo {
  static async getProductMainInfoById(productMainInfoId) {
    return await ProductMainInfoModel.findById(
      convertToMongoObjectId(productMainInfoId)
    ).exec();
  }

  static async getAllProductsWithFilter({
    filter,
    page = 1,
    limit = 10,
    select,
    unselect,
    sort,
  }) {
    const products = await ProductMainInfoModel.find(filter)
      .select("product_productId")
      .lean()
      .exec();
    return products;
  }

  static async getProductMainInfoByProductId({ productId }) {
    return await ProductMainInfoModel.find({ product_productId: productId })
      .select({ __v: -1 })
      .lean()
      .exec();
  }

  static async updateProductMainInfo({ productMainInfoId, payload }) {
    return await ProductMainInfoModel.findByIdAndUpdate(
      productMainInfoId,
      payload,
      { new: true }
    )
      .lean()
      .exec();
  }

  static async deleteProductMainInfoByProductId({ productId }) {
    await ProductMainInfoModel.deleteMany({ product_productId: productId });
  }

  static async deleteProductMainInfo(productMainInfoId) {
    return await ProductMainInfoModel.findByIdAndDelete(productMainInfoId)
      .lean()
      .exec();
  }

  static async deleteProductMainById({ productMainInfoId }) {
    return await ProductMainInfoModel.findByIdAndDelete(productMainInfoId)
      .lean()
      .exec();
  }
}

module.exports = ProductMainInfoRepo;
