const { SpecificationModel } = require("../models");
class SpecificationRepo {
  static async getSpecificationByProductId({ productId }) {
    return await SpecificationModel.findOne({
      specification_productId: productId,
    }).exec();
  }

  static async updateSpecificationByProductId({ productId, payload }) {
    return await SpecificationModel.findOneAndUpdate(
      {
        specification_productId: productId,
      },
      payload,
      { new: true }
    ).exec();
  }

  static async deleteSpecificationByProductId({ productId }) {
    return await SpecificationModel.findOneAndDelete({
      specification_productId: productId,
    }).exec();
  }
}

module.exports = SpecificationRepo;
