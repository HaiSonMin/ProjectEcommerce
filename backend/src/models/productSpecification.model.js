const { model, Schema } = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "ProductSpecification";
const ProductSpecificationScheme = new Schema({
  specification_productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Please provide product id"],
    index: true,
  },
  specification_processor: {
    type: String,
  },
  specification_graphic: {
    type: String,
  },
  specification_communication: {
    type: String,
  },
  specification_rearCamera: {
    type: String,
  },
  specification_frontCamera: {
    type: String,
  },
  specification_design: {
    type: String,
  },
  specification_weight: {
    type: String,
  },
  specification_releaseTime: {
    type: Date,
  },
  specification_chargingTechnology: {
    type: String,
  },
  specification_otherParameter: {
    type: String,
  },
  specification_otherUtilities: {
    type: String,
  },
});

//Export the model
module.exports = model(COLLECTION_NAME, ProductSpecificationScheme);
