const { model, Schema } = require("mongoose"); // Erase if already required
const constant = require("../utils/constant");
const COLLECTION_NAME = constant.MODELS_NAMES.inventory;
const InventorySchema = new Schema(
  {
    inventory_location: {
      type: String,
      required: [true, "Please provide product name"],
    },
    inventory_product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: constant.MODELS_NAMES.product,
    },
    inventory_numberImport: {
      type: Number,
      require: true,
    },
    inventory_numberExport: {
      type: Number,
      default: 0,
    },
    inventory_stock: {
      type: Number,
      required: true,
    },
    inventory_reservation: {
      /**
       * {cartId, numberProduct, createOn}
       */
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
//Export the model
module.exports = model(COLLECTION_NAME, InventorySchema);
