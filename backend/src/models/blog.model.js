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
    blog_category: {
      type: Schema.Types.ObjectId,
      ref: "BlogCategory",
    },
    blog_numberViews: {
      type: Number,
      default: 0,
    },
    blog_numberLikes: {
      type: Number,
      default: 0,
    },
    blog_likeByUsers: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    blog_numberDislikes: {
      type: Number,
      default: 0,
    },
    blog_disLikeByUsers: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    blog_thumb: {
      type: String,
      required: true,
    },
    blog_images: {
      type: [String],
      default: [],
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
