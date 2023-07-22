const { model, Schema } = require("mongoose");

const COLLECTION_NAME = "ProductMainInfo";
const ProductMainInfoSchema = new Schema({
  product_productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    index: true,
  },
  product_rom: {
    type: String,
    required: true,
    uppercase: true,
    enum: ["32GB", "64GB", "128GB", "256GB", "512GB", "1TB"],
  },
  product_ram: {
    type: String,
    required: true,
    uppercase: true,
    enum: ["4GB", "6GB", "8GB", "12GB", "16GB"],
  },
  product_color: {
    type: String,
    required: [true, "Please provide color product"],
  },
  product_price: {
    type: Number,
    min: [1, "Rating must be getter than 1"],
    required: [true, "Please provide price"],
  },
  product_quantity: {
    type: Number,
    default: 0,
  },
  product_sold: {
    type: Number,
    default: 0,
  },
  product_imageColor: {
    type: String,
    required: true,
  },
  product_colorCode: {
    type: String,
    required: true,
  },
  product_priceAppliedDiscount: {
    type: Number,
    default: 0,
  },
  product_description: {
    type: Object,
    required: true,
  },
  product_specificationId: {
    type: Schema.Types.ObjectId,
    ref: "ProductSpecification",
  },
});

module.exports = model(COLLECTION_NAME, ProductMainInfoSchema);
