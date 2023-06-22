const { model, Schema } = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Cart";
const CartSchema = new Schema(
  {
    cart_userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide userId for cart"],
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
