const { model, Schema } = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Coupon";
const CouponSchema = new Schema(
  {
    coupon_name: {
      type: String,
      required: true,
    },
    coupon_code: {
      type: String,
      required: true,
      uppercase: true,
    },
    coupon_type: {
      type: String,
      enum: ["fix_amount", "percentage"],
      default: "percentage",
    },
    coupon_value: {
      type: Number,
      required: true,
      min: 1,
    },
    coupon_applicableProducts: {
      type: [Schema.Types.ObjectId],
      ref: "Product",
      default: [],
    },
    coupon_applicableProductCategories: {
      type: [Schema.Types.ObjectId],
      ref: "ProductCategory",
      default: [],
    },
    coupon_minimumOrderValue: {
      type: Number,
      required: true,
      default: 500000,
    },
    coupon_startDate: {
      type: Date,
      default: Date.now(),
    },
    coupon_endDate: {
      type: Date,
    },
    coupon_numberDayApply: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = model(COLLECTION_NAME, CouponSchema);
