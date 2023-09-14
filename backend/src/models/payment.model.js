const { model, Schema } = require("mongoose"); // Erase if already required
const constant = require("../utils/constant");
const COLLECTION_NAME = constant.MODELS_NAMES.payment;
const PaymentSchema = new Schema(
  {
    payment_amount: {
      type: Number,
      required: [true, "Please provide blog name"],
      min: [1, "Please provide value getter than 1"],
    },
    payment_orderId: {
      type: Schema.Types.ObjectId,
      ref: constant.MODELS_NAMES.order,
    },
    payment_userId: {
      type: Schema.Types.ObjectId,
      ref: constant.MODELS_NAMES.user,
    },
    payment_method: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "payment_createdAt",
      updatedAt: "payment_updatedAt",
    },
  }
);
//Export the model
module.exports = model(COLLECTION_NAME, PaymentSchema);
