const { BadRequestError, NotFoundError } = require("../core/error.response");
const { SpecificationModel } = require("../models");
const { SpecificationRepo, ProductRepo } = require("../repositories");

class SpecificationService {
  static async createSpecification(req, res) {
    const { specification } = req.body;
    const { specification_productId } = specification;
    // 1. Check product has exist
    const findProduct = await ProductRepo.getProductById({
      productId: specification_productId,
    });
    if (!findProduct)
      throw new BadRequestError(
        "Product doesn't exist for create specification"
      );

    // 2. Create specification for product
    const newSpecification = await SpecificationModel.create(specification);
    if (!newSpecification)
      throw new BadRequestError("Create specification error");
    return { newSpecification };
  }

  static async getSpecificationByProductId(req, res) {
    const { productId } = req.params;
    // 1. Check product has exist
    const findProduct = await ProductRepo.getProductById({
      productId: specification_productId,
    });
    if (!findProduct) throw new BadRequestError("Product doesn't exist");

    // 2. Get specification

    const specification = await SpecificationRepo.getSpecificationByProductId({
      productId,
    });
    if (!specification)
      throw new BadRequestError("Please provide specification for product");
    return { specification };
  }

  static async updateSpecificationByProductId(req, res) {
    const { productId } = req.params;
    const { specification } = req.body;

    // 1. Check product has exist before update specification
    const findProduct = await ProductRepo.getProductById({ productId });
    if (!findProduct)
      throw new NotFoundError("Product doesn't exist for update specification");

    // 2. Update specification
    const specificationUpdated =
      await SpecificationRepo.updateSpecificationByProductId({
        productId,
        payload: specification,
      });
    if (!specificationUpdated)
      throw new BadRequestError("Update specification error");

    return { specificationUpdated };
  }

  static async deleteSpecificationByProductId(req, res) {
    const { productId } = req.params;

    // 1. Check product has exist before update specification
    const findProduct = await ProductRepo.getProductById({ productId });
    if (!findProduct)
      throw new NotFoundError("Product doesn't exist for update specification");

    // 2. Delete specification
    const specificationDeleted =
      await SpecificationRepo.deleteSpecificationByProductId({ productId });
    if (!specificationDeleted)
      throw new BadRequestError("Delete specification error");

    return { specificationDeleted };
  }
}

module.exports = SpecificationService;
