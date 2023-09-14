const { model, Schema } = require("mongoose");
const constant = require("../utils/constant");
const COLLECTION_NAME = constant.MODELS_NAMES.chat;
const ChatSchema = new Schema({
  chat_roomName: {
    type: String,
    required: [true, "Please provide room name"],
  },
  use_send: {
    type: Schema.Types.ObjectId,
    ref: constant.MODELS_NAMES.user,
    required: [true, "Please provide user id send"],
  },
  use_receive: {
    type: Schema.Types.ObjectId,
    ref: constant.MODELS_NAMES.user,
    required: [true, "Please provide user id send"],
  },
});

module.exports = model(COLLECTION_NAME, ChatSchema);
