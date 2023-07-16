const { model, Schema } = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Brand";
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
//Export the model
module.exports = model(COLLECTION_NAME, BrandSchema);
