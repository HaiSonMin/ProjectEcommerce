const { CREATED, OK } = require("../core/success.response");
const { SpecificationService } = require("../services");
class SpecificationController {
  static async createSpecification(req, res) {
    new OK({
      message: "Create specification successfully",
      metadata: await SpecificationService.createSpecification(req, res),
    }).send(res);
  }
  static async getSpecificationByProductId(req, res) {
    new OK({
      message: "Get specification successfully",
      metadata: await SpecificationService.getSpecificationByProductId(req, res),
    }).send(res);
  }
  static async updateSpecificationByProductId(req, res) {
    new OK({
      message: "Update specification successfully",
      metadata: await SpecificationService.updateSpecificationByProductId(req, res),
    }).send(res);
  }
  static async deleteSpecificationByProductId(req, res) {
    new OK({
      message: "Delete specification successfully",
      metadata: await SpecificationService.deleteSpecificationByProductId(req, res),
    }).send(res);
  }
}

module.exports = SpecificationController
