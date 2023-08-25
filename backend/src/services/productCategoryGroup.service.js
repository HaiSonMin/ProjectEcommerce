const { BadRequestError, NotFoundError } = require("../core/error.response");
const { ProductCategoryGroupModel } = require("../models");
const {
  ProductCategoryGroupRepo,
  ProductCategoryRepo,
} = require("../repositories");

class ProductCategoryGroupService {
  static async createProductCategoryGroup(req, res) {
    const payload = req.body;
    const { path } = req?.file || {};
    console.log(path);
    const newProductCategoryGroup = await ProductCategoryGroupModel.create({
      ...payload,
      productCategoryGroup_image: path,
    });
    if (!newProductCategoryGroup)
      throw new BadRequestError("Create CategoryGroup Error");
    return newProductCategoryGroup;
  }

  static async getAllProductCategories(req, res) {
    const { sort, limit, page } = req.query;
    const { productCategoriesGroup, totalProductCategoriesGroup } =
      await ProductCategoryGroupRepo.getAllProductCategoriesGroup({
        sort,
        limit,
        page,
      });
    return {
      totalProductCategoriesGroup,
      productCategoriesGroupPerPage: productCategoriesGroup.length,
      productCategoriesGroup,
    };
  }

  static async getProductCategoryGroupById(req, res) {
    const { productCategoryGroupId } = req.params;
    const productCategoryGroup =
      await ProductCategoryGroupRepo.getProductCategoryGroupById({
        productCategoryGroupId,
      });

    if (!productCategoryGroup)
      throw new NotFoundError("Product category group not found");
    return productCategoryGroup;
  }

  static async updateProductCategoryGroup(req, res) {
    const { productCategoryGroupId } = req.params;
    const payload = req.body;

    const { path: pathImage } = req?.file || {};

    const productCategoryGroupUpdated =
      await ProductCategoryGroupRepo.updateProductCategoryGroupById({
        productCategoryGroupId,
        payload: {
          ...payload,
          productCategoryGroup_image:
            pathImage ?? payload.productCategoryGroup_image,
        },
      });
    if (!productCategoryGroupUpdated)
      throw new BadRequestError("Updated Category Group Error");
    return productCategoryGroupUpdated;
  }

  static async deleteProductCategoryGroup(req, res) {
    const { productCategoryGroupId } = req.params;
    const productCategoryGroupDeleted =
      await ProductCategoryGroupRepo.deleteProductCategoryGroupById({
        productCategoryGroupId,
      });
    if (!productCategoryGroupDeleted)
      throw new BadRequestError("Delete CategoryGroup Error");
    return productCategoryGroupDeleted;
  }

  // static async addGroup(req) {
  //   const { productCategories } =
  //     await ProductCategoryRepo.getAllProductCategories({});

  //   const filterGroup = productCategories.filter(
  //     (cate, index, arr) =>
  //       arr.findIndex(
  //         (cat) => cat.productCategory_group === cate.productCategory_group
  //       ) === index
  //   );

  //   await Promise.all(
  //     filterGroup.map(async (cate) => {
  //       const newGroup = await ProductCategoryGroupModel.create({
  //         productCategoryGroup_name: cate.productCategory_group,
  //         productCategoryGroup_image: cate.productCategory_image,
  //       });
  //       if (!newGroup) throw new BadRequestError("Create group error");
  //     })
  //   );
  // }
}

module.exports = ProductCategoryGroupService;
