const { model, Schema } = require("mongoose"); // Erase if already required
const CONSTANT = require("../constant");
const COLLECTION_NAME = CONSTANT.MODELS_NAMES.cart;
const CartSchema = new Schema(
  {
    cart_userId: {
      type: Schema.Types.ObjectId,
      ref: CONSTANT.MODELS_NAMES.user,
      required: [true, "Please provide userId for cart"],
      index: true,
    },
    cart_products: {
      /**
       * productId
       * quantity
       */
      type: Schema.Types.Mixed,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
//Export the model
module.exports = model(COLLECTION_NAME, CartSchema);
