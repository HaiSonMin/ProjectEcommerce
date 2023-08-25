const { BadRequestError } = require("../core/error.response");
const { ProductCategoryModel } = require("../models");
const {
  convertSortBy,
  skipPage,
  getSelectData,
  getUnSelectData,
} = require("../utils");
const { convertSortByAggregate } = require("../utils/mongoQueryAggregate");
const DemandRepo = require("./demand.repo");

class ProductCategoryRepo {
  // static async getAllProductCategories({
  //   // filter,
  //   sort = "ctime",
  //   limit,
  //   page = 1,
  //   select,
  //   unselect,
  // }) {
  //   const [productCategories, totalProductCategories] = await Promise.all([
  //     ProductCategoryModel.find()
  //       .sort(convertSortBy(sort))
  //       .skip(skipPage({ limit, page }))
  //       .limit(limit)
  //       .populate("productCategory_group", ["productCategoryGroup_name"])
  //       .lean()
  //       .exec(),
  //     ProductCategoryModel.count(),
  //   ]);
  //   return { productCategories, totalProductCategories };
  // }

  static async getAllProductCategories({
    // filter,
    sort = "ctime",
    limit = 1000,
    page = 1,
  }) {
    const result = await ProductCategoryModel.aggregate([
      {
        $facet: {
          productCategories: [
            {
              $lookup: {
                from: "productcategorygroups",
                localField: "productCategory_group",
                foreignField: "_id",
                as: "productCategory_group",
              },
            },
            {
              $unwind: {
                path: "$productCategory_group",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $project: {
                __v: 0,
                productCategory_group: {
                  __v: 0,
                  createdAt: 0,
                  updatedAt: 0,
                  productCategoryGroup_image: 0,
                },
              },
            },
            {
              $sort: convertSortByAggregate({
                localField: "productCategory_group",
                sort,
              }),
            },
            {
              $skip: skipPage({ limit, page }),
            },
            {
              $limit: Number(limit),
            },
          ],
          totalProductCategories: [{ $count: "count" }],
        },
      },
    ]);

    const productCategories = result[0]?.productCategories;
    const totalProductCategories = result[0]?.totalProductCategories[0].count;
    return { productCategories, totalProductCategories };
  }

  static async getProductCategoryGroupId({ productCategoryGroupId }) {
    return await ProductCategoryModel.find({
      productCategory_group: productCategoryGroupId,
    })
      .populate([
        { path: "productCategory_demands", select: ["demand_name"] },
        { path: "productCategory_brands", select: ["brand_name"] },
      ])
      .exec();
  }

  static async getProductCategoryById({ productCategoryId }) {
    return await ProductCategoryModel.findById(productCategoryId)
      .populate("productCategory_brands", ["brand_name"])
      .exec();
  }

  static async getProductCategoriesByIds({ productCategoriesIds }) {
    return await ProductCategoryModel.find({ _id: productCategoriesIds })
      .lean()
      .exec();
  }

  static async searchProductCategories({ keySearch, limit = 10, page = 1 }) {
    const regexSearch = new RegExp(keySearch, "i");
    const [productCategories, totalProductCategories] = await Promise.all([
      ProductCategoryModel.find({
        $or: [
          { productCategory_name: { $regex: regexSearch } },
          { productCategory_type: { $regex: regexSearch } },
        ],
      })
        .skip(skipPage({ limit, page }))
        .limit(limit)
        .populate("productCategory_group", ["productCategoryGroup_name"])
        .exec(),
      ProductCategoryModel.countDocuments({
        $or: [
          { productCategory_name: { $regex: regexSearch } },
          { productCategory_type: { $regex: regexSearch } },
        ],
      }),
    ]);

    return { productCategories, totalProductCategories };
  }

  static async updateProductCategoryById({ productCategoryId, payload }) {
    return await ProductCategoryModel.findByIdAndUpdate(
      productCategoryId,
      payload,
      { new: true }
    )
      .lean()
      .exec();
  }

  static async deleteProductCategoryById({ productCategoryId }) {
    return await ProductCategoryModel.findByIdAndDelete(productCategoryId)
      .lean()
      .exec();
  }
}

module.exports = ProductCategoryRepo;
