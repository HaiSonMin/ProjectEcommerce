const { model, Schema } = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Payment";
const PaymentSchema = new Schema(
  {
    payment_amount: {
      type: String,
      required: [true, "Please provide blog name"],
      maxlength: 50,
    },
    payment_orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  },
  {
    timestamps: true,
  }
);
//Export the model
module.exports = model(COLLECTION_NAME, PaymentSchema);
