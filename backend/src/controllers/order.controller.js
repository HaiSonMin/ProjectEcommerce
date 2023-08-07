const { CREATED, OK } = require("../core/success.response");
const { OrderService } = require("../services");
class OrderController {
  static async createOrder(req, res) {
    new CREATED({
      message: "Create order successfully",
      metadata: await OrderService.createOrder(req, res),
    }).send(res);
  }

  static async getAllOrders(req, res) {
    new OK({
      message: "Get all orders successfully",
      metadata: await OrderService.getAllOrders(req, res),
    }).send(res);
  }

  static async getOneOrder(req, res) {
    new OK({
      message: "Get order successfully",
      metadata: await OrderService.getOneOrder(req, res),
    }).send(res);
  }

  static async searchOrders(req, res) {
    new OK({
      message: "Search orders successfully",
      metadata: await OrderService.searchOrders(req, res),
    }).send(res);
  }

  static async updateOrder(req, res) {
    new OK({
      message: "Update order successfully",
      metadata: await OrderService.updateOrder(req, res),
    }).send(res);
  }

  static async deleteOrder(req, res) {
    new OK({
      message: "Delete order successfully",
      metadata: await OrderService.deleteOrder(req, res),
    }).send(res);
  }
}

module.exports = OrderController;
