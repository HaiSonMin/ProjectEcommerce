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
    product_thumb: {
      type: [String],
      required: [true, "Please provide thumb for product"],
    },
    product_images: [String],
    product_mainInfo: {
      type: [Schema.Types.ObjectId],
      ref: "ProductMainInfo",
    },
    product_brandId: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    product_categoryId: {
      type: Schema.Types.ObjectId,
      ref: "ProductCategory",
    },
    product_ratingIds: {
      type: [Schema.Types.ObjectId],
      ref: "Rating",
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
