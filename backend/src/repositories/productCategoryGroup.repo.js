const { ProductCategoryGroupModel } = require("../models");
const { convertSortBy, skipPage } = require("../utils");
const { convertSortByAggregate } = require("../utils/mongoQueryAggregate");

class ProductCategoryGroupRepo {
  // static async getAllProductCategoriesGroup({
  //   // filter,
  //   sort = "ctime",
  //   limit = 10,
  //   page = 1,
  // }) {
  //   const result = await ProductCategoryGroupModel.aggregate([
  //     {
  //       $facet: {
  //         productCategoriesGroup: [
  //           {
  //             $lookup: {
  //               from: "productcategories", // db name
  //               localField: "productCategoryGroup_categoryChildren",
  //               foreignField: "_id",
  //               as: "productCategoryGroup_categoryChildren.productCategory_nametype",
  //             },
  //           },
  //           {
  //             $lookup: {
  //               from: "brands",
  //               localField:
  //                 "productCategoryGroup_categoryChildren.productCategory_brands",
  //               foreignField: "_id",
  //               as: "productCategoryGroup_categoryChildren.productCategory_brands",
  //             },
  //           },
  //           {
  //             $lookup: {
  //               from: "demands",
  //               localField:
  //                 "productCategoryGroup_categoryChildren.productCategory_demands",
  //               foreignField: "_id",
  //               as: "productCategoryGroup_categoryChildren.productCategory_demands",
  //             },
  //           },
  //           // {
  //           //   $group: {
  //           //     _id: "$_id",
  //           //     productCategoryGroup_name: {
  //           //       $first: "$productCategoryGroup_name",
  //           //     },
  //           //     productCategoryGroup_image: {
  //           //       $first: "$productCategoryGroup_image",
  //           //     },
  //           //     productCategoryGroup_categoryChildren: {
  //           //       $push: "$productCategoryGroup_categoryChildren",
  //           //     },
  //           //   },
  //           // },
  //           {
  //             $project: {
  //               _id: 1,
  //               productCategoryGroup_name: 1,
  //               productCategoryGroup_image: 1,
  //               "productCategoryGroup_categoryChildren.productCategory_nametype._id": 1,
  //               "productCategoryGroup_categoryChildren.productCategory_nametype.productCategory_name": 1,
  //               "productCategoryGroup_categoryChildren.productCategory_nametype.productCategory_type": 1,
  //               "productCategoryGroup_categoryChildren.productCategory_brands._id": 1,
  //               "productCategoryGroup_categoryChildren.productCategory_brands.brand_name": 1,
  //               "productCategoryGroup_categoryChildren.productCategory_demands._id": 1,
  //               "productCategoryGroup_categoryChildren.productCategory_demands.demand_name": 1,
  //             },
  //           },
  //           // {
  //           //   $project: {
  //           //     _id: 1,
  //           //     productCategoryGroup_name: 1,
  //           //     productCategoryGroup_categoryChildren: {
  //           //       _id: 1,
  //           //       productCategory_type: 1,
  //           //       productCategory_name: 1,
  //           //       productCategory_brands: {
  //           //         _id: 1,
  //           //         brand_name: 1,
  //           //       },
  //           //       productCategory_demands: {
  //           //         _id: 1,
  //           //         demand_name: 1,
  //           //       },
  //           //     },
  //           //   },
  //           // },
  //           {
  //             $sort: convertSortByAggregate({
  //               localField: "productCategoryGroup_categoryChildren",
  //               sort,
  //             }),
  //           },
  //           {
  //             $limit: Number(limit),
  //           },
  //           {
  //             $skip: skipPage({ limit, page }),
  //           },
  //         ],
  //         totalProductCategoriesGroup: [{ $count: "count" }],
  //       },
  //     },
  //   ]);

  //   const productCategoriesGroup = result[0]?.productCategoriesGroup;
  //   const totalProductCategoriesGroup =
  //     result[0]?.totalProductCategoriesGroup[0].count;
  //   return { productCategoriesGroup, totalProductCategoriesGroup };
  // }
  static async getAllProductCategoriesGroup({
    // filter,
    sort = "ctime",
    limit,
    page = 1,
  }) {
    const [productCategoriesGroup, totalProductCategoriesGroup] =
      await Promise.all([
        ProductCategoryGroupModel.find()
          .sort(convertSortBy(sort))
          .skip(skipPage({ limit, page }))
          .limit(limit)
          .populate([
            {
              path: "productCategoryGroup_categoryChildren",
              select: ["_id", "productCategory_name", "productCategory_type"],
              populate: [
                {
                  path: "productCategory_demands",
                  select: ["_id", "demand_name"],
                },
                {
                  path: "productCategory_brands",
                  select: ["_id", "brand_name"],
                },
              ],
            },
          ])
          .select([
            "_id",
            "productCategoryGroup_name",
            "productCategoryGroup_image",
          ])
          .exec(),
        ProductCategoryGroupModel.count(),
      ]);
    return { productCategoriesGroup, totalProductCategoriesGroup };
  }

  static async getProductCategoryGroupById({ productCategoryGroupId }) {
    return await ProductCategoryGroupModel.findById(
      productCategoryGroupId
    ).exec();
  }

  static async getProductCategoriesByIds({ productCategoriesIds }) {
    return await ProductCategoryGroupModel.find({ _id: productCategoriesIds })
      .lean()
      .exec();
  }

  static async updateProductCategoryGroupById({
    productCategoryGroupId,
    payload,
  }) {
    return await ProductCategoryGroupModel.findByIdAndUpdate(
      productCategoryGroupId,
      payload,
      { new: true }
    )
      .lean()
      .exec();
  }

  static async deleteProductCategoryGroupById({ productCategoryGroupId }) {
    return await ProductCategoryGroupModel.findByIdAndDelete(
      productCategoryGroupId
    )
      .lean()
      .exec();
  }
}

module.exports = ProductCategoryGroupRepo;
