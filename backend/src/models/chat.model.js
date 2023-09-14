const { model, Schema } = require("mongoose");
const COLLECTION_NAME = "Chat";
const ChatSchema = new Schema({
  chat_roomName: {
    type: String,
    required: [true, "Please provide room name"],
  },
  use_send: {
    type: Schema.Types.ObjectId,
    required: [true, "Please provide user id send"],
  },
  use_receive: {
    type: Schema.Types.ObjectId,
    required: [true, "Please provide user id send"],
  },
});

module.exports = model(COLLECTION_NAME, ChatSchema);
