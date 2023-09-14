const { model, Schema } = require("mongoose"); // Erase if already required
const constant = require("../utils/constant");
const COLLECTION_NAME = constant.MODELS_NAMES.demand;
const DemandSchema = new Schema(
  {
    demand_name: {
      type: String,
      required: true,
    },
    demand_image: {
      type: String,
      required: true,
    },
    demand_productCategory: {
      type: Schema.Types.ObjectId,
      ref: constant.MODELS_NAMES.productCategory,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

DemandSchema.index("demand_name", 1);

module.exports = model(COLLECTION_NAME, DemandSchema);
