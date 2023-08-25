const { model, Schema } = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "ProductCategoryGroup";
const ProductCategoryGroupSchema = new Schema(
  {
    productCategoryGroup_name: {
      type: String,
      required: [true, "Please provide product category name"],
    },
    productCategoryGroup_image: {
      type: String,
      required: [true, "Please provide product category image"],
    },
  },
  {
    timestamps: true,
  }
);
//Export the model
module.exports = model(COLLECTION_NAME, ProductCategoryGroupSchema);
