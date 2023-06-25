const { REQUESTED_RANGE_NOT_SATISFIABLE } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../core/error.response");
const { WishlistModel } = require("../models");
const { WishlistRepo, ProductRepo } = require("../repositories");
const { convertFieldsToArray } = require("../utils");

class WishlistService {
  static async addProduct(req, res) {
    const { userId } = req.user;
    const { productId } = req.body;

    // Check product has exist
    const product = await ProductRepo.getProductById({ productId });
    if (!product)
      throw new NotFoundError("Product hasn't exist for add to wishlist");

    const findProduct = await WishlistModel.findOne({
      wishlist_productIds: { $elemMatch: { $eq: productId } },
    });
    if (findProduct) throw new BadRequestError("Product has exist in wishlist");

    // Add product to wishlist of user
    await WishlistModel.findOneAndUpdate(
      {
        wishlist_byUserId: userId,
      },
      {
        $addToSet: { wishlist_productIds: productId },
      },
      { new: true, upsert: true }
    ).exec();
    return product;
  }

  static async getAllProducts(req, res) {
    const { userId } = req.user;
    const { fields } = req.query;
    // Check wish list or product have exists
    const wishlist = await WishlistRepo.getWishlistByUserId({ userId });
    if (!wishlist || !wishlist.wishlist_productIds)
      throw new NotFoundError("Wishlist hasn't exist or products don't exist");
    const { wishlist_productIds: productIds } = wishlist;
    const products = await ProductRepo.getProductByIds({
      productIds,
      select: convertFieldsToArray(fields),
    });
    return {
      wishlistId: wishlist._id,
      numberProducts: products.length,
      products,
    };
  }

  static async deleteProductById(req, res) {
    const { wishlistId } = req.params;
    const { productId } = req.body;
    // Check wishlist has exist
    const wishlist = await WishlistRepo.getWishlistById({ wishlistId });
    if (!wishlist || !wishlist.wishlist_productIds)
      throw new NotFoundError("Wishlist hasn't exist or products don't exist");
    // Check product has exist in wishlist
    const isContainsProduct = wishlist.wishlist_productIds.includes(productId);
    if(!isContainsProduct) throw new NotFoundError("Product hasn't exist in wishlist");

    await wishlist.updateOne({
      $pull: {
        wishlist_productIds: productId,
      },
    });
    return;
  }

  static async deleteAllProducts(req, res) {
    const { wishlistId } = req.params;
    const wishlist = await WishlistRepo.getWishlistById({ wishlistId });
    if (!wishlist || !wishlist.wishlist_productIds)
      throw new NotFoundError("Wishlist doesn't exist or products don't exist");
    await wishlist.updateOne({
      $set: {
        wishlist_productIds: [],
      },
    });
    return;
  }
}

module.exports = WishlistService;
