const { model, Schema } = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Brand";
const BrandSchema = new Schema(
  {
    brand_name: {
      type: String,
      required: [true, "Please provide brand name"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
//Export the model
module.exports = model(COLLECTION_NAME, BrandSchema);
