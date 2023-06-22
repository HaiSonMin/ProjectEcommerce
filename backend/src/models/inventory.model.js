const { model, Schema } = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Inventory";
const InventorySchema = new Schema(
  {
    inventory_location: {
      type: String,
      required: [true, "Please provide product name"],
    },
    inventory_productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
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
