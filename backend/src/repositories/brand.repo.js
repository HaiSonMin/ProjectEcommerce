const { BrandModel } = require("../models");

class BrandRepo {
  static async getBrandById({ brandId }) {
    return await BrandModel.findById(brandId).lean().exec();
  }
  static async getBrandByName({ brandName }) {
    const nameReg = new RegExp(brandName, "i");
    return await BrandModel.findOne({
      $text: {
        $search: nameReg,
      },
    });
  }

  static async getAllBrands({ brandName }) {
    return await BrandModel.find().lean().exec();
  }

  static async updateBrandById({ brandId, payload }) {
    return await BrandModel.findByIdAndUpdate(brandId, payload, { new: true })
      .lean()
      .exec();
  }

  static async deleteBrandById({ brandId, payload }) {
    return await BrandModel.findByIdAndUpdate(brandId, payload, { new: true })
      .lean()
      .exec();
  }

  static async deleteBrandById({ brandId }) {
    return await BrandModel.findByIdAndDelete(brandId).lean().exec();
  }
}

module.exports = BrandRepo;
