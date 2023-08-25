const { BadRequestError, NotFoundError } = require("../core/error.response");
const { DemandModel } = require("../models");
const { DemandRepo, ProductCategoryRepo } = require("../repositories");

class DemandService {
  static async createDemand(req, res) {
    const payload = req.body;
    const { path } = req?.file || {};
    const { demand_productCategory } = payload;

    // 1. Check product category has exist
    const productCategory = await ProductCategoryRepo.getProductCategoryById({
      productCategoryId: demand_productCategory,
    });

    if (!productCategory) throw new NotFoundError("Product category not found");

    const newDemand = await DemandModel.create({
      ...payload,
      demand_image: path,
    });
    if (!newDemand) throw new BadRequestError("Create Demand Error");

    await productCategory.updateOne({
      $addToSet: { productCategory_demands: newDemand._id },
    });

    return newDemand;
  }

  static async getAllDemands(req, res) {
    const { sort, page, limit } = req.query;
    const { demands, totalDemands } = await DemandRepo.getAllDemands({
      sort,
      page,
      limit,
    });

    return {
      totalDemands,
      demandsPerPage: demands.length,
      demands,
    };
  }

  static async getDemandById(req, res) {
    const { demandId } = req.params;
    const demand = await DemandRepo.getDemandById({
      demandId,
    });

    if (!demand) throw new NotFoundError("Demand not found");
    return demand;
  }

  static async getDemandsByIds(req, res) {
    const { demandIds } = req.query;
    const demands = await DemandRepo.getDemandsByIds({
      demandIds,
    });
    return demands;
  }

  static async getDemandsByProductCategoryId(req, res) {
    const { productCategoryId } = req.params;
    // 1. Check product category has exist
    const productCategory = await ProductCategoryRepo.getProductCategoryById({
      productCategoryId: productCategoryId,
    });

    if (!productCategory) throw new NotFoundError("Product category not found");
    const demands = await DemandRepo.getDemandsByProductCategoryId({
      productCategoryId,
    });
    return demands;
  }

  static async updateDemand(req, res) {
    const { demandId } = req.params;
    const { demand_name, demand_productCategory, demand_image } =
      req.body || {};
    const { path: pathImage } = req?.file || {};

    // 1. Check product category has exist
    const productCategory = await ProductCategoryRepo.getProductCategoryById({
      productCategoryId: demand_productCategory,
    });

    if (!productCategory) throw new NotFoundError("Product category not found");

    const demandUpdated = await DemandRepo.updateDemandById({
      demandId,
      payload: {
        demand_name,
        demand_productCategory,
        demand_image: pathImage ?? demand_image,
      },
    });
    if (!demandUpdated) throw new BadRequestError("Updated Demand Error");
    return demandUpdated;
  }

  static async deleteDemand(req, res) {
    const { demandId } = req.params;
    const demandDeleted = await DemandRepo.deleteDemandById({
      demandId,
    });
    if (!demandDeleted) throw new BadRequestError("Delete Demand Error");
    return demandDeleted;
  }
}

module.exports = DemandService;
