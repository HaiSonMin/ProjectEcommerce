const { model, Schema } = require("mongoose"); // Erase if already required
const constant = require("../utils/constant");
const COLLECTION_NAME = constant.MODELS_NAMES.brand;
const BrandSchema = new Schema(
  {
    brand_name: {
      type: String,
      required: [true, "Please provide brand name"],
      unique: true,
    },
    brand_origin: {
      type: String,
      required: [true, "Please provide brand origin"],
    },
    brand_image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

BrandSchema.index({ brand_name: 1, brand_origin: 1 });
//Export the model
module.exports = model(COLLECTION_NAME, BrandSchema);
