const { model, Schema } = require("mongoose"); // Erase if already required
const slugify = require("slugify");
const COLLECTION_NAME = "Product";
const ProductSchema = new Schema(
  {
    product_name: {
      type: String,
      required: [true, "Please provide product name"],
      maxlength: 100,
      unique: true,
      trim: true,
    },
    product_thumb: {
      type: String,
      required: [true, "Please provide thumb for product"],
    },
    product_price: {
      type: Number,
      required: [true, "Please provide product price"],
    },
    // (Filter default)
    product_priceAppliedDiscount: {
      type: Number,
    },
    product_slugify: String,
    product_available: {
      type: String,
      enum: ["AVAILABLE", "UNAVAILABLE", "COMING_SOON"],
      default: "AVAILABLE",
    },
    product_promotion: [String],
    product_imagesProduct: [String],
    product_imagesHighlights: [String],
    // [
    // {
    //   product_optionName: String
    //   product_priceDifference: Number;
    //   product_serials: [{product_priceDifference: Number,product_serialName: String,product_serialImage: String}]
    //   product_description: String(html)
    //   product_specificationMain: JSON.stringify
    //   product_specificationDetail: String(html)
    // }
    // ]
    product_options: {
      type: Schema.Types.Mixed,
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
    product_demands: {
      type: [Schema.Types.ObjectId],
      ref: "Demand",
    },
    product_ratings: {
      type: [Schema.Types.ObjectId],
      ref: "Rating",
      default: [],
    },
    product_optionFilters: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.index({ product_name: "text", product_description: "text" });

ProductSchema.pre("save", function (next) {
  this.product_slugify = slugify(this.product_name, { lower: true });
  this.product_priceAppliedDiscount = this.product_price;
  next();
});

//Export the model
module.exports = model(COLLECTION_NAME, ProductSchema);
