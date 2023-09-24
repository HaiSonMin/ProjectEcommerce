const { model, Schema } = require("mongoose"); // Erase if already required
const constant = require("../utils/constant");
const COLLECTION_NAME = constant.MODELS_NAMES.keyToken;
// Declare the Schema of the Mongo model
const KeyTokenSchema = new Schema(
  {
    keytoken_userId: {
      type: Schema.Types.ObjectId,
      ref: constant.MODELS_NAMES.user,
    },
    // use decode AT and RT
    keytoken_privateKey: {
      type: String,
      required: true,
    },
    keytoken_publicKey: {
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
module.exports = model(COLLECTION_NAME, KeyTokenSchema);
