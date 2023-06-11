const { model, Schema } = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "KeyToken";
// Declare the Schema of the Mongo model
const keyTokenSchema = new Schema(
  {
    keytoken_userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    keytoken_publicKey: {
      type: String,
      required: true,
    },
    keytoken_privatekey: {
      type: String,
      required: true,
    },
    keytoken_refreshTokenUsing: {
      type: String,
      required: true,
    },
    keytoken_refreshTokenUsed: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = model(COLLECTION_NAME, keyTokenSchema);
