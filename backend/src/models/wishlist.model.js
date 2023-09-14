const { model, Schema } = require("mongoose"); // Erase if already required
const constant = require("../utils/constant");
const COLLECTION_NAME = constant.MODELS_NAMES.wishlist;
const RatingSchema = new Schema(
  {
    wishlist_byUserId: {
      type: Schema.Types.ObjectId,
      ref: constant.MODELS_NAMES.user,
      index: true,
      required: true,
    },
    wishlist_productIds: {
      type: [Schema.Types.ObjectId],
      ref: constant.MODELS_NAMES.product,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = model(COLLECTION_NAME, RatingSchema);
