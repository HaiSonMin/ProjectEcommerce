const { BrandModel } = require("../models");
const { getSelectData, skipPage, convertSortBy } = require("../utils");

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

  static async getAllBrands({ sort, page, limit, select }) {
    const [brands, totalBrands] = await Promise.all([
      BrandModel.find()
        .sort(convertSortBy(sort))
        .select(getSelectData(select))
        .skip(skipPage({ page, limit }))
        .limit(limit)
        .lean()
        .exec(),
      BrandModel.count(),
    ]);

    return { brands, totalBrands };
  }

  static async searchBrands({ keySearch, page, limit }) {
    const searchRegex = new RegExp(keySearch, "i");
    const [brands, totalBrands] = await Promise.all([
      BrandModel.find({
        $or: [
          { brand_name: { $regex: searchRegex } },
          { brand_origin: { $regex: searchRegex } },
        ],
      })
        .skip(skipPage({ page, limit }))
        .limit(limit)
        .lean()
        .exec(),
      BrandModel.countDocuments({
        $or: [
          { brand_name: { $regex: searchRegex } },
          { brand_origin: { $regex: searchRegex } },
        ],
      }),
    ]);

    return { brands, totalBrands };
  }

  static async updateBrandById({ brandId, payload }) {
    return await BrandModel.findByIdAndUpdate(brandId, payload, { new: true })
      .lean()
      .exec();
  }

  static async deleteBrandById({ brandId }) {
    return await BrandModel.findByIdAndDelete(brandId).lean().exec();
  }
}

module.exports = BrandRepo;
