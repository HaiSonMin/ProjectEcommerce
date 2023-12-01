const { model, Schema } = require('mongoose'); // Erase if already required
const CONSTANT = require('../constant');
const COLLECTION_NAME = CONSTANT.MODELS_NAMES.inventory;
const InventorySchema = new Schema(
  {
    inventory_location: {
      type: String,
      required: [true, 'Please provide product name'],
    },
    inventory_product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: CONSTANT.MODELS_NAMES.product,
      index: true,
    },
    inventory_stock: {
      type: Number,
      required: true,
    },
    // {
    //   inventory_color
    //   inventory_serial
    // }
    inventory_options: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);
//Export the model
module.exports = model(COLLECTION_NAME, InventorySchema);
