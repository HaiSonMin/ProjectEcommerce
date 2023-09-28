const { model, Schema } = require("mongoose"); // Erase if already required
const CONSTANT = require("../constant");
const COLLECTION_NAME = CONSTANT.MODELS_NAMES.blogCategory;
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
