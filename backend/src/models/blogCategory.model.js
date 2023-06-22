const { model, Schema } = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "BlogCategory";
const BlogCategorySchema = new Schema(
  {
    blogCategory_name: {
      type: String,
      required: [true, "Please provide blog name"],
      maxlength: 50,
    },
  },
  {
    timestamps: true,
  }
);
//Export the model
module.exports = model(COLLECTION_NAME, BlogCategorySchema);
