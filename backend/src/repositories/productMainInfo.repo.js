const { ProductMainInfoModel } = require("../models");
class ProductMainInfoRepo {
  static async getProductMainInfoByProductId({ productId }) {
    return await ProductMainInfoModel.find({ product_productId: productId })
      .select({ __v: -1 })
      .lean()
      .exec();
  }

  static async updateProductMainInfo({
    productId,
    product_rom,
    product_ram,
    payload,
  }) {
    return await ProductMainInfoModel.findOneAndUpdate(
      {
        product_rom,
        product_ram,
        product_productId: productId,
      },
      payload,
      { new: true }
    )
      .lean()
      .exec();
  }

  static async deleteProductMainInfoByProductId({ productId }) {
    await ProductMainInfoModel.deleteMany({ product_productId: productId });
  }

  static async deleteProductMainInfo({ productId, product_ram, product_rom }) {
    return await ProductMainInfoModel.findOneAndDelete({
      product_productId: productId,
      product_ram,
      product_rom,
    })
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
