const { model, Schema } = require("mongoose"); // Erase if already required
const CONSTANT = require("../constant");
const COLLECTION_NAME = CONSTANT.MODELS_NAMES.wishlist;
const RatingSchema = new Schema(
  {
    wishlist_byUserId: {
      type: Schema.Types.ObjectId,
      ref: CONSTANT.MODELS_NAMES.user,
      index: true,
      required: true,
    },
    wishlist_productIds: {
      type: [Schema.Types.ObjectId],
      ref: CONSTANT.MODELS_NAMES.product,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = model(COLLECTION_NAME, RatingSchema);
