const { model, Schema } = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Wishlist";
const RatingSchema = new Schema(
  {
    wishlist_productIds: {
      type: [Schema.Types.ObjectId],
      ref: "Product",
        default:[]
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = model(COLLECTION_NAME, RatingSchema);
