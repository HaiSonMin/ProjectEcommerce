const { model, Schema } = require("mongoose"); // Erase if already required
const constant = require("../utils/constant");
const COLLECTION_NAME = constant.MODELS_NAMES.cart;
const CartSchema = new Schema(
  {
    cart_userId: {
      type: Schema.Types.ObjectId,
      ref: constant.MODELS_NAMES.user,
      required: [true, "Please provide userId for cart"],
      index: true,
    },
    cart_products: {
      /**
       * productId
       * quantity
       */
      type: Array,
      default: [],
    },
    cart_countProduct: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
//Export the model
module.exports = model(COLLECTION_NAME, CartSchema);
