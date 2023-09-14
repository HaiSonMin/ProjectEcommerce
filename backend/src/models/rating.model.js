const { model, Schema } = require("mongoose"); // Erase if already required
const constant = require("../utils/constant");
const COLLECTION_NAME = constant.MODELS_NAMES.rating;
const RatingSchema = new Schema(
  {
    rating_point: {
      type: Number,
      required: true,
      min: [1, "Please provide rating point getter than equal 1"],
      max: [5, "Please provide rating point less than equal 5"],
    },
    rating_product: {
      type: Schema.Types.ObjectId,
      ref: constant.MODELS_NAMES.product,
      required: true,
      index: true,
    },
    rating_user: {
      type: Schema.Types.ObjectId,
      ref: constant.MODELS_NAMES.user,
      required: true,
    },
    rating_description: {
      type: String,
    },
    rating_response: String,
    rating_responseAdmin: {
      type: Schema.Types.ObjectId,
      ref: constant.MODELS_NAMES.user,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = model(COLLECTION_NAME, RatingSchema);
