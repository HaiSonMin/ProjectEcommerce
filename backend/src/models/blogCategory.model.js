const { model, Schema } = require("mongoose"); // Erase if already required
const constant = require("../utils/constant");
const COLLECTION_NAME = constant.MODELS_NAMES.blogCategory;
const BlogCategorySchema = new Schema(
  {
    blogCategory_name: {
      type: String,
      required: [true, "Please provide blog name"],
      maxlength: 50,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
//Export the model
module.exports = model(COLLECTION_NAME, BlogCategorySchema);
