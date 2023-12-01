const { BadRequestError, NotFoundError } = require("../core/error.response");
const { OrderModel } = require("../models");
const {
  UserRepo,
  ProductRepo,
  OrderRepo,
  ProductMainInfoRepo,
} = require("../repositories");
const { convertOperatorObject } = require("../utils");

class OrderService {
  static async createOrder(req, res) {
    const payload = req.body;
    const {
      order_byUser: userId,
      order_productMainInfos: productMainInfoIds,
      order_paymentIntent,
    } = payload;

    // 1. Check user has exist
    const findUser = await UserRepo.getUserById({ userId });
    if (!findUser) throw new NotFoundError("User doesn't exist ro order");

    // 3. Check product main info  have exist
    const findProductsMainInfo =
      await ProductMainInfoRepo.getProductMainInfoByIds({ productMainInfoIds });
    if (
      !findProductsMainInfo ||
      findProductsMainInfo.length !== productMainInfoIds.length
    )
      throw new NotFoundError("Some thing went wrong, please try again!!");

    const productIds = findProductsMainInfo.map((pmi) => pmi.product);

    const productIdsFinal = productIds.filter(
      (productId, index) => productIds.indexOf(productId) === index
    );

    // 3. Check products have exist
    const findProducts = await ProductRepo.getProductByIds({
      productIds: productIdsFinal,
    });
    if (!findProducts || findProducts.length !== productIds.length)
      throw new NotFoundError("Some thing went wrong, please try again!!");

    // 4. Calculate total amount all product ordered
    const totalAmountOrdered = findProductsMainInfo.reduce((acc, cur) => {
      if (cur.product_priceAppliedDiscount > 0)
        return acc + cur.product_priceAppliedDiscount;
      return acc + cur.product_price;
    }, 0);

    console.log(totalAmountOrdered);

    const newOrder = await OrderModel.create({
      order_productMainInfos: productMainInfoIds,
      order_byUser: userId,
      order_totalAmount: totalAmountOrdered,
      order_paymentIntent: order_paymentIntent,
    });
    if (!newOrder) throw new BadRequestError("Order error, please try again!");

    return newOrder;
  }

  static async getAllOrders(req, res) {
    const { sort, page, limit, status, numericFilters } = req.query;
    const { orders, totalOrders } = await OrderRepo.getAllOrders({
      sort,
      page,
      limit,
      status,
      filter: {
        ...convertOperatorObject({
          numericFilters,
          fields: ["order_totalAmount"],
        }),
      },
    });
    return {
      totalOrders,
      ordersPerPage: orders.length,
      orders,
    };
  }

  static async getOneOrder(req, res) {
    const { orderId } = req.params;
    const order = await OrderRepo.getOneOrder({ orderId });
    if (!order) throw new NotFoundError("Order doesn't exist");
    return order;
  }

  static async searchOrders(req, res) {
    const { sort, page, limit, status, numericFilters } = req.query;
    const { orders, totalOrders } = await OrderRepo.searchOrders({
      sort,
      page,
      limit,
      status,
      keySearch,
      filter: {
        ...convertOperatorObject({
          fields: ["order_totalAmount"],
          numericFilters,
        }),
      },
    });
    return {
      totalOrders,
      ordersPerPage: orders.length,
      orders,
    };
  }

  static async updateOrder(req, res) {
    const { orderId } = req.params;
    const payload = req.body;
    //
    const orderUpdated = await OrderRepo.updateOrder({ orderId, payload });
    if (!orderUpdated) throw new BadRequestError("Update order error");
    return orderUpdated;
  }

  static async deleteOrder(req, res) {
    const { orderId } = req.params;
    const orderDeleted = await OrderRepo.deleteOrder({ orderId });
    if (!orderDeleted) throw new BadRequestError("Delete order error");
    return orderDeleted;
  }
}

module.exports = OrderService;
