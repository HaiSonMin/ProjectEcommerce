const { model, Schema } = require("mongoose"); // Erase if already required
const CONSTANT = require("../constant");
const COLLECTION_NAME = CONSTANT.MODELS_NAMES.keyToken;
// Declare the Schema of the Mongo model
const KeyTokenSchema = new Schema(
  {
    keytoken_userId: {
      type: Schema.Types.ObjectId,
      ref: CONSTANT.MODELS_NAMES.user,
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
