const { model, Schema } = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "ProductCategory";
const productCategorySchema = new Schema(
  {
    category_name: {
      type: String,
      required: [true, "Please provide product name"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
//Export the model
module.exports = model(COLLECTION_NAME, productCategorySchema);
