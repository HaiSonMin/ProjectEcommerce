const { model, Schema } = require("mongoose"); // Erase if already required
const { BadRequestError } = require("../core/error.response");
const constant = require("../utils/constant");
const COLLECTION_NAME = constant.MODELS_NAMES.discount;
const DiscountSchema = new Schema(
  {
    discount_name: {
      type: String,
      required: true,
      unique: true,
    },
    discount_code: {
      type: String,
      required: true,
      uppercase: true,
      unique: true,
    },
    discount_type: {
      type: String,
      enum: ["fixed_amount", "percentage"],
      default: "percentage",
    },
    discount_value: {
      type: Number,
      required: true,
      min: 1,
    },
    discount_productIds: {
      type: [Schema.Types.ObjectId],
      ref: constant.MODELS_NAMES.product,
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

DiscountSchema.pre("save", function (next) {
  if (
    this.discount_type === "percentage" &&
    (this.discount_value < 1 || this.discount_value > 100)
  )
    throw new BadRequestError(
      "Value not correct with type discount, value must be (1 <= value <= 100), please try again"
    );
  if (this.discount_type === "fixed_amount" && this.discount_value < 1)
    throw new BadRequestError(
      "Value not correct with type discount, value must be (value >= 1), please try again"
    );
  next();
});

// DiscountSchema.pre("updateOne", function (next) {
//   if (
//     this.discount_type === "percentage" &&
//     (this.discount_value < 1 || this.discount_value > 100)
//   )
//     throw new BadRequestError(
//       "Value not correct with type discount, value must be (1 <= value <= 100), please try again"
//     );
//   if (this.discount_type === "fixed_amount" && this.discount_value <= 50000)
//     throw new BadRequestError(
//       "Value not correct with type discount, value must be (value >= 50000), please try again"
//     );
//   next();
// });

//Export the model
module.exports = model(COLLECTION_NAME, DiscountSchema);
