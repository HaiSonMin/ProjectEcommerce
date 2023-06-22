const { model, Schema } = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Discount";
const DiscountSchema = new Schema(
  {
    discount_name: {
      type: String,
      required: true,
    },
    discount_code: {
      type: String,
      required: true,
      uppercase: true,
    },
    discount_type: {
      type: String,
      enum: ["fix_amount", "percentage"],
      default: "percentage",
    },
    discount_value: {
      type: Number,
      required: true,
      min: 1,
    },
    discount_productIds: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    discount_startDate: {
      type: Date,
      default: Date.now(),
    },
    discount_endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = model(COLLECTION_NAME, DiscountSchema);
