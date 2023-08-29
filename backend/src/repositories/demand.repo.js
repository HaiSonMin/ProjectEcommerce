const { DemandModel } = require("../models");
const { convertSortBy, skipPage } = require("../utils");
const { convertSortByAggregate } = require("../utils/mongoQueryAggregate");

class DemandRepo {
  static async getAllDemands({ sort, limit = 10, page = 1 }) {
    const result = await DemandModel.aggregate([
      {
        $facet: {
          demands: [
            {
              $lookup: {
                from: "productcategories", // from db name
                localField: "demand_productCategory",
                foreignField: "_id",
                as: "demand_productCategory",
              },
            },
            {
              $unwind: {
                path: "$demand_productCategory",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: "productcategorygroups",
                localField: "demand_productCategory.productCategory_group",
                foreignField: "_id",
                as: "demand_productCategory.productCategory_group",
              },
            },
            {
              $unwind: {
                path: "$demand_productCategory.productCategory_group",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $project: {
                __v: 0,
                demand_productCategory: {
                  __v: 0,
                  createdAt: 0,
                  updatedAt: 0,
                  productCategory_image: 0,
                  productCategory_demands: 0,
                  productCategory_group: {
                    __v: 0,
                    updatedAt: 0,
                    createdAt: 0,
                    productCategoryGroup_image: 0,
                  },
                },
              },
            },
            {
              $sort: convertSortByAggregate({
                localField: "demand_productCategory",
                sort,
              }),
            },
            {
              // Must be put it in the first
              $skip: +skipPage({ limit, page }),
            },
            {
              $limit: Number(limit),
            },
          ],
          totalDemands: [{ $count: "count" }],
        },
      },
    ]);
    const demands = result[0]?.demands;
    const totalDemands = result[0]?.totalDemands[0]?.count;
    return { demands, totalDemands };
  }

  static async getDemandById({ demandId }) {
    return await DemandModel.findById(demandId).exec();
  }

  static async getDemandsByIds({ demandIds }) {
    return await DemandModel.find({ _id: demandIds }).lean().exec();
  }

  static async getDemandsByProductCategoryId({ productCategoryId }) {
    return await DemandModel.find({ demand_productCategory: productCategoryId })
      .lean()
      .exec();
  }

  static async searchDemands({ keySearch, page, limit }) {
    const searchRegex = new RegExp(keySearch, "i");
    const result = await DemandModel.aggregate([
      {
        $facet: {
          demands: [
            {
              $lookup: {
                from: "productcategories", // from db name
                localField: "demand_productCategory",
                foreignField: "_id",
                as: "demand_productCategory",
              },
            },
            {
              $unwind: {
                path: "$demand_productCategory",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: "productcategorygroups",
                localField: "demand_productCategory.productCategory_group",
                foreignField: "_id",
                as: "demand_productCategory.productCategory_group",
              },
            },
            {
              $unwind: {
                path: "$demand_productCategory.productCategory_group",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $project: {
                __v: 0,
                demand_productCategory: {
                  __v: 0,
                  createdAt: 0,
                  updatedAt: 0,
                  productCategory_image: 0,
                  productCategory_demands: 0,
                  productCategory_group: {
                    __v: 0,
                    updatedAt: 0,
                    createdAt: 0,
                    productCategoryGroup_image: 0,
                  },
                },
              },
            },
            {
              // Must be put it in the first
              $skip: +skipPage({ limit, page }),
            },
            {
              $limit: Number(limit),
            },
            {
              $match: { demand_name: { $regex: searchRegex } },
            },
          ],
          totalDemands: [{ $count: "count" }],
        },
      },
    ]);
    console.log("Total demand:::", result[0].totalDemands[0]);
    const demands = result[0]?.demands;
    const totalDemands = result[0]?.totalDemands[0]?.count;
    return { demands, totalDemands };
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
