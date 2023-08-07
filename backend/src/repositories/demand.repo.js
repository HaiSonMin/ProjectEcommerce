const { DemandModel } = require("../models");
const { convertSortBy, skipPage } = require("../utils");

class DemandRepo {
  static async getAllDemands({ filter, sort = "ctime", limit = 10, page = 1 }) {
    const [demands, totalDemands] = await Promise.all([
      DemandModel.find(filter)
        .sort(convertSortBy(sort))
        .limit(limit)
        .skip(skipPage({ limit, page }))
        .populate("demand_productCategory", "productCategory_name")
        .lean()
        .exec(),
      DemandModel.count(),
    ]);
    return { demands, totalDemands };
  }

  static async getDemandById({ demandId }) {
    return await DemandModel.findById(demandId).lean().exec();
  }

  static async getDemandsByIds({ demandIds }) {
    return await DemandModel.find({ _id: demandIds }).lean().exec();
  }

  static async getDemandsByProductCategoryId({ productCategoryId }) {
    return await DemandModel.find({ demand_productCategory: productCategoryId })
      .lean()
      .exec();
  }

  static async updateDemandById({ demandId, payload }) {
    return await DemandModel.findByIdAndUpdate(demandId, payload, { new: true })
      .lean()
      .exec();
  }

  static async deleteDemandById({ demandId }) {
    return await DemandModel.findByIdAndDelete(demandId).lean().exec();
  }
}

module.exports = DemandRepo;
