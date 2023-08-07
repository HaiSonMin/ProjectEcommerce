const { OrderModel } = require("../models");
const { convertSortBy, skipPage, getUnSelectData } = require("../utils");

class OrderRepo {
  static async getAllOrders({ sort, page = 1, limit = 10, filter }) {
    const [orders, totalOrders] = await Promise.all([
      OrderModel.find({ ...filter })
        .limit(limit)
        .sort(convertSortBy(sort))
        .skip(skipPage({ limit, page }))
        .populate([
          {
            path: "order_byUser",
            model: "User",
            select: ["user_email", "user_userName", "user_phoneNumber"],
          },
          {
            path: "order_productMainInfos",
            model: "ProductMainInfo",
            select: ["-product_description"],
            populate: {
              path: "product",
              model: "Product",
              select: ["product_name"],
            },
          },
        ])

        .lean()
        .exec(),
      OrderModel.countDocuments({ ...filter }),
    ]);

    return { orders, totalOrders };
  }

  static async getOneOrder({ orderId }) {
    return await OrderModel.findById(orderId)
      .populate([
        {
          path: "order_byUser",
          model: "User",
          select: ["user_email", "user_userName", "user_phoneNumber"],
        },
        {
          path: "order_productMainInfos",
          model: "ProductMainInfo",
          select: ["-product_description"],
          populate: {
            path: "product",
            model: "Product",
            select: ["product_name"],
          },
        },
      ])
      .select(getUnSelectData(["__v"]))
      .exec();
  }

  static async searchOrders({ sort, page = 1, limit = 10, keySearch, filter }) {
    const regexSearch = new RegExp(keySearch, "i");
    const [orders, totalOrders] = await Promise.all([
      OrderModel.find({ $text: { $search: regexSearch } })
        .limit(limit)
        .sort(convertSortBy(sort))
        .skip(skipPage({ limit, page }))
        .lean()
        .exec(),
      OrderModel.countDocuments({ $text: { $search: regexSearch } }),
    ]);

    return { orders, totalOrders };
  }

  static async updateOrder({ orderId, payload }) {
    return await OrderModel.findByIdAndUpdate(orderId, payload, { new: true })
      .lean()
      .exec();
  }

  static async deleteOrder({ orderId }) {
    return await OrderModel.findByIdAndDelete(orderId).lean().exec();
  }
}

module.exports = OrderRepo;
