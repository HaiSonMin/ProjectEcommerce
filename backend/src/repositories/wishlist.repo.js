const { WishlistModel } = require("../models");

class WishlistRepo {
  static async getWishlistById({ wishlistId }) {
    return await WishlistModel.findById(wishlistId).exec();
  }
  static async getWishlistByUserId({ userId }) {
    return await WishlistModel.findOne({ wishlist_byUserId: userId }).exec();
  }
}

module.exports = WishlistRepo;
