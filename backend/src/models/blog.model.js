const { model, Schema } = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Blog";
const BlogSchema = new Schema(
  {
    blog_title: {
      type: String,
      required: true,
    },
    blog_description: {
      type: String,
      required: true,
    },
    blog_categories: {
      type: Schema.Types.ObjectId,
      ref: "blogCategory",
    },
    blog_numberViews: {
      type: Number,
      default: 0,
    },
    blog_numberLikes: {
      type: Number,
      default: 0,
    },
    blog_numberDislikes: {
      type: Number,
      default: 0,
    },
    blog_thumb: {
      type: String,
      required: true,
    },
    blog_author: {
      type: String,
      default: "ADMIN",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Export the model
module.exports = model(COLLECTION_NAME, BlogSchema);
