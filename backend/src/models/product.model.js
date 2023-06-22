const { model, Schema } = require("mongoose"); // Erase if already required
const slugify = require("slugify");
const COLLECTION_NAME = "Product";
const ProductSchema = new Schema(
  {
    product_name: {
      type: String,
      required: [true, "Please provide product name"],
      maxlength: 50,
      trim: true,
    },
    product_slugify: String,
    product_price: {
      type: Number,
      min: [1, "Rating must be getter than 1"],
      required: [true, "Please provide price"],
    },
    product_thumb: String,
    product_description: {
      type: String,
      required: true,
    },
    product_brand: {
      type: Schema.Types.ObjectId,
      ref:"Brand",
      required: true,
    },
    product_category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    product_quantity: {
      type: Number,
      default: 0,
    },
    product_sold: {
      type: Number,
      default: 0,
    },
    product_images: [String],
    product_color: [String],
    product_rating: [
      {
        star: {
          type: Number,
          default: 5,
          min: [1, "Rating must be getter than 1"],
          max: [5, "Rating must be less then 5"],
        },
        ratingBy: { type: [Schema.Types.ObjectId], ref: "User" },
        comment: { type: String },
      },
    ],
    product_totalRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.index({ product_name: "text", product_description: "text" });

ProductSchema.pre("save", function (next) {
  this.product_slugify = slugify(this.product_name, { lower: true });
  next();
});

//Export the model
module.exports = model(COLLECTION_NAME, ProductSchema);
