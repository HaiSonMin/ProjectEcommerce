const { model, Schema } = require("mongoose");
const constant = require("../utils/constant");

const COLLECTION_NAME = constant.MODELS_NAMES.SessionAuth;

const SessionAuthSchema = new Schema(
  {
    session_OTP: {
      type: String,
      required: true,
    },
    session_duration: {
      type: Number,
      required: true,
    },
    session_confirm: {
      type: Boolean,
      default: false,
    },
    session_data: {
      type: Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

SessionAuthSchema.index({ session_OTP: 1 });

module.exports = model(COLLECTION_NAME, SessionAuthSchema);
