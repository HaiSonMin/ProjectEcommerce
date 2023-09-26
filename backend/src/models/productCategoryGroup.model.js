const { model, Schema } = require("mongoose"); // Erase if already required
const CONSTANT = require("../constant");
const COLLECTION_NAME = CONSTANT.MODELS_NAMES.productCategoryGroup;
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
    productCategoryGroup_categoryChildren: {
      type: [Schema.Types.ObjectId],
      ref: CONSTANT.MODELS_NAMES.productCategory,
    },
  },
  {
    timestamps: true,
  }
);
//Export the model
module.exports = model(COLLECTION_NAME, ProductCategoryGroupSchema);
