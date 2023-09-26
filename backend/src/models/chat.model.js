const { model, Schema } = require("mongoose");
const CONSTANT = require("../constant");
const COLLECTION_NAME = CONSTANT.MODELS_NAMES.chat;
const ChatSchema = new Schema({
  chat_roomName: {
    type: String,
    required: [true, "Please provide room name"],
  },
  use_send: {
    type: Schema.Types.ObjectId,
    ref: CONSTANT.MODELS_NAMES.user,
    required: [true, "Please provide user id send"],
  },
  use_receive: {
    type: Schema.Types.ObjectId,
    ref: CONSTANT.MODELS_NAMES.user,
    required: [true, "Please provide user id send"],
  },
});

module.exports = model(COLLECTION_NAME, ChatSchema);
