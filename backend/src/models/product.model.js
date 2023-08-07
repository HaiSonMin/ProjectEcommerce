const { model, Schema } = require("mongoose"); // Erase if already required
const slugify = require("slugify");
const COLLECTION_NAME = "Product";
const ProductSchema = new Schema(
  {
    product_name: {
      type: String,
      required: [true, "Please provide product name"],
      maxlength: 50,
      unique: true,
      trim: true,
    },
    product_origin: {
      type: String,
      required: [true, "Please provide origin of product"],
    },
    product_thumb: {
      type: String,
      required: [true, "Please provide thumb for product"],
    },
    product_price: {
      type: Number,
      required: [true, "Please provide product price"],
    },
    product_priceAppliedDiscount: {
      type: Number,
      default: 0,
    },
    product_slugify: String,
    product_available: {
      type: String,
      enum: ["AVAILABLE", "UNAVAILABLE", "COMING_SOON"],
      default: "AVAILABLE",
    },
    product_imagesProduct: [String],
    product_imagesAttribute: [String],
    // {
    //   product_key
    //   product_imageColor
    //   product_price
    //   product_specs
    //   product_desc
    // }
    product_attributes: {
      type: [Schema.Types.Mixed],
      required: true,
    },
    product_brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    product_category: {
      type: Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: true,
    },
    product_demand: {
      type: Schema.Types.ObjectId,
      ref: "Demand",
    },
    product_ratings: {
      type: [Schema.Types.ObjectId],
      ref: "Rating",
      default: [],
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
