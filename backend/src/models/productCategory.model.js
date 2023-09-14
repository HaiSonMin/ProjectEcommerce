const { model, Schema } = require("mongoose"); // Erase if already required
const constant = require("../utils/constant");
const COLLECTION_NAME = constant.MODELS_NAMES.productCategory;
const ProductCategorySchema = new Schema(
  {
    productCategory_name: {
      type: String,
      required: [true, "Please provide product category name"],
    },
    productCategory_type: {
      type: String,
      required: [true, "Please provide product category type"],
    },
    productCategory_image: {
      type: String,
      required: [true, "Please provide product category image"],
    },
    productCategory_demands: {
      type: [Schema.Types.ObjectId],
      ref: constant.MODELS_NAMES.demand,
    },
    productCategory_brands: {
      type: [Schema.Types.ObjectId],
      ref: constant.MODELS_NAMES.brand,
    },
    productCategory_group: {
      type: Schema.Types.ObjectId,
      ref: constant.MODELS_NAMES.productCategory,
      require: [true, "Please provide product category group"],
    },
    productCategory_filtersOptions: String,
  },
  {
    timestamps: true,
  }
);

ProductCategorySchema.index(
  { productCategory_name: 1 },
  { productCategory_type: 1 }
);

//Export the model
module.exports = model(COLLECTION_NAME, ProductCategorySchema);
