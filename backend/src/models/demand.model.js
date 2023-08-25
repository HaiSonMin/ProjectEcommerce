const { model, Schema } = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Demand";
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
      ref: "ProductCategory",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model(COLLECTION_NAME, DemandSchema);
