const { model, Schema } = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Rating";
const RatingSchema = new Schema(
  {
    rating_point: {
      type: Number,
      required: true,
      min: [1, "Please provide rating point getter than equal 1"],
      min: [5, "Please provide rating point less than equal 5"],
    },
    rating_productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating_description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = model(COLLECTION_NAME, RatingSchema);
