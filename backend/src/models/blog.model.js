const { model, Schema } = require("mongoose"); // Erase if already required
const CONSTANT = require("../constant");
const COLLECTION_NAME = CONSTANT.MODELS_NAMES.blog;
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
      ref: CONSTANT.MODELS_NAMES.blogCategory,
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
      ref: CONSTANT.MODELS_NAMES.user,
      default: [],
    },
    blog_numberDislikes: {
      type: Number,
      default: 0,
    },
    blog_disLikeByUsers: {
      type: [Schema.Types.ObjectId],
      ref: CONSTANT.MODELS_NAMES.user,
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
