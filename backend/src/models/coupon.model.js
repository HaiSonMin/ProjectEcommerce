const { model, Schema } = require("mongoose"); // Erase if already required
const CONSTANT = require("../constant");
const COLLECTION_NAME = CONSTANT.MODELS_NAMES.coupon;
const CouponSchema = new Schema(
  {
    coupon_name: {
      type: String,
      required: true,
      unique: true,
    },
    coupon_code: {
      type: String,
      required: true,
      uppercase: true,
      unique: true,
    },
    coupon_type: {
      type: String,
      enum: ["fixed_amount", "percentage"],
      default: "percentage",
    },
    coupon_value: {
      type: Number,
      required: true,
      min: 1,
    },
    coupon_numberOfApplication: {
      type: Number,
      required: true,
      min: 1,
    },
    coupon_appliesAll: {
      type: Boolean,
      default: false,
    },
    coupon_applicableProducts: {
      type: [Schema.Types.ObjectId],
      ref: CONSTANT.MODELS_NAMES.product,
      default: [],
    },
    coupon_applicableProductCategories: {
      type: [Schema.Types.ObjectId],
      ref: CONSTANT.MODELS_NAMES.productCategory,
      default: [],
    },
    coupon_minimumOrderValue: {
      type: Number, // Usd
      required: true,
      default: 25,
    },
    coupon_startDate: {
      type: Date,
      default: Date.now(),
    },
    coupon_endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

CouponSchema.index({ coupon_name: "text", coupon_code: "text" });

//Export the model
module.exports = model(COLLECTION_NAME, CouponSchema);
