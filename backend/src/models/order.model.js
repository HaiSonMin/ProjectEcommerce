const { model, Schema } = require("mongoose"); // Erase if already required
const CONSTANT = require("../constant");
const COLLECTION_NAME = CONSTANT.MODELS_NAMES.order;
const OrderSchema = new Schema(
  {
    order_product: {
      type: [Schema.Types.ObjectId],
      ref: CONSTANT.MODELS_NAMES.product,
      required: [true, "Please provide product main info id"],
    },
    order_status: {
      type: String,
      enum: ["processing", "success", "cancel"],
      default: "processing",
    },
    order_byUser: {
      type: Schema.Types.ObjectId,
      ref: CONSTANT.MODELS_NAMES.user,
      required: [true, "Please provide user id"],
    },
    order_totalAmount: {
      type: Number,
      required: [true, "Please provide amount total order"],
    },
    order_paymentIntent: {
      type: String,
      enum: ["pay-by-visa", "pay-by-bank", "pay-on-delivery"],
      default: "pay-on-delivery",
    },
    order_note: String,
  },
  {
    timestamps: { createdAt: "order_createdAt", updatedAt: "order_updatedAt" },
  }
);
//Export the model
module.exports = model(COLLECTION_NAME, OrderSchema);
