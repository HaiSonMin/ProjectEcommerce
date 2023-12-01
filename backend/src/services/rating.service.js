const { BadRequestError, NotFoundError } = require("../core/error.response");
const { RatingModel } = require("../models");
const { RatingRepo, ProductRepo } = require("../repositories");
const { convertOperatorObject, convertFieldsToArray } = require("../utils");
class RatingService {
  static async createRating(req, res) {
    const { rating_productId } = req.body;
    const { userId } = req.user;
    // 1. Check product has exist after created rating
    const findProduct = await ProductRepo.getProductById({
      productId: rating_productId,
    });
    if (!findProduct)
      throw new BadRequestError("Product doesn't exist for rating");

    const dataRatingCreate = {
      ...req.body,
      rating_userId: userId,
    };
    const newRating = await RatingModel.create(dataRatingCreate);
    if (!newRating) throw new BadRequestError("Create rating error");
    return newRating;
  }
  static async getRatingsByProductId(req, res) {
    const { productId } = req.body;
    const { sort, limit, page, fields, unFields, numericFilters } = req.query;
    const operatorFilter = convertOperatorObject({
      numericFilters,
      fields: ["rating_point"],
    });
    const ratings = await RatingRepo.getRatingsByProductId({
      filter: {
        rating_productId: productId,
        ...operatorFilter,
      },
      sort,
      limit,
      page,
      select: convertFieldsToArray(fields),
      unSelect: convertFieldsToArray(unFields),
    });

    if (!ratings.length) throw new NotFoundError("Ratings are empty");
    return {
      numberRating: ratings.length,
      ratings,
    };
  }

  static async updateRating(req, res) {
    const { ratingId } = req.params;
    const payload = req.body;
    const ratingUpdated = await RatingRepo.updateRatingById({
      ratingId,
      payload,
    });
    if (!ratingUpdated)
      throw new BadRequestError("Rating doesn't exist for update");
    return ratingUpdated;
  }

  static async deleteRating(req, res) {
    const { ratingId } = req.params;

    const ratingDeleted = await RatingRepo.deleteRatingById({ ratingId });
    if (!ratingDeleted)
      throw new BadRequestError("Rating doesn't exist for delete");
    return ratingDeleted;
  }

  static async deleteAllRatings(req, res) {
    const { productId } = req.params;

    const findProduct = await ProductRepo.getProductById({ productId });

    if (!findProduct)
      throw new NotFoundError("Product not exist for delete all ratings");

    await RatingModel.deleteMany({ rating_productId: productId });
  }
}

module.exports = RatingService;
