const { model, Schema } = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Payment";
const PaymentSchema = new Schema(
  {
    payment_amount: {
      type: Number,
      required: [true, "Please provide blog name"],
      min: [1, "Please provide value getter than 1"],
    },
    payment_orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
    payment_userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    payment_method: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
//Export the model
module.exports = model(COLLECTION_NAME, PaymentSchema);
