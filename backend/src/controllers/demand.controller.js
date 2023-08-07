const { CREATED, OK } = require("../core/success.response");
const { DemandService } = require("../services");
class DemandController {
  static async createDemand(req, res) {
    new CREATED({
      message: "Create Demand Successfully",
      metadata: await DemandService.createDemand(req, res),
    }).send(res);
  }

  static async getAllDemands(req, res) {
    new OK({
      message: "Get All Demands Successfully",
      metadata: await DemandService.getAllDemands(req, res),
    }).send(res);
  }

  static async getDemandById(req, res) {
    new OK({
      message: "Get Demand By Id Successfully",
      metadata: await DemandService.getDemandById(req, res),
    }).send(res);
  }

  static async getDemandsByIds(req, res) {
    new OK({
      message: "Get Demands By Ids Successfully",
      metadata: await DemandService.getDemandsByIds(req, res),
    }).send(res);
  }

  static async getDemandsByProductCategoryId(req, res) {
    new OK({
      message: "Get Demands By Product Category Id Successfully",
      metadata: await DemandService.getDemandsByProductCategoryId(req, res),
    }).send(res);
  }

  static async updateDemand(req, res) {
    new OK({
      message: "Update Demand Successfully",
      metadata: await DemandService.updateDemand(req, res),
    }).send(res);
  }

  static async deleteDemand(req, res) {
    new OK({
      message: "Delete Demand Successfully",
      metadata: await DemandService.deleteDemand(req, res),
    }).send(res);
  }
}

module.exports = DemandController;
