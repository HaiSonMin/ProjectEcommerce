const { model, Schema } = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Order";
const OrderSchema = new Schema(
  {
    order_productIds: {
      type: [Schema.Types.ObjectId],
      ref: "Product",
      required: [true, "Please provide product id"],
    },
    order_status: {
      type: String,
      enum: ["Processing", "Success", "Cancel"],
      default: "Processing",
    },
    order_byUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user id"],
    },
    order_amountTotal: {
      type: Number,
      required: [true, "Please provide amount total order"],
    },
    order_paymentIntent: { type: String },
  },
  {
    timestamps: true,
  }
);
//Export the model
module.exports = model(COLLECTION_NAME, OrderSchema);
