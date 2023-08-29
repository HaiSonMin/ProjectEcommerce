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
    product_imagesAttribute: [String],
    // [
    // {
    //   product_key (phone: diskSpace, laptop:disSpace )
    //   product_price:Number;
    //   product_color: [{product_priceDifference: Number,product_color: String,product_imagesColor:[String]}]
    //   product_description: String(html)
    // }
    // ]
    product_attributes: {
      type: Schema.Types.Mixed,
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
    product_specification: {
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
