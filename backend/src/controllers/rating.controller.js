const { CREATED, OK } = require("../core/success.response");
const { RatingService } = require("../services");
class RatingController {
  static async createRating(req, res) {
    new CREATED({
      message: "Create rating successfully",
      metadata: await RatingService.createRating(req, res),
    }).send(res);
  }
  static async getRatingsByProductId(req, res) {
    new OK({
      message: "Get comments by productId rating successfully",
      metadata: await RatingService.getRatingsByProductId(req, res),
    }).send(res);
  }
  static async updateRating(req, res) {
    new OK({
      message: "Update rating successfully",
      metadata: await RatingService.updateRating(req, res),
    }).send(res);
  }
  static async deleteRating(req, res) {
    new OK({
      message: "Delete rating successfully",
      metadata: await RatingService.deleteRating(req, res),
    }).send(res);
  }
  static async deleteAllRatings(req, res) {
    new OK({
      message: "Delete all rating by product id successfully",
      metadata: await RatingService.deleteAllRatings(req, res),
    }).send(res);
  }
}

module.exports = RatingController;
