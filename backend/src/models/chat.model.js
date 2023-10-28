const { model, Schema } = require('mongoose');
const CONSTANT = require('../constant');
const COLLECTION_NAME = CONSTANT.MODELS_NAMES.chat;
const ChatSchema = new Schema({
  //   {
  //     chat_emailUser: string, Can be admin or user
  //     chat_phoneUser: string
  //     chat_nameUser: string
  //     chat_sexUser: string
  //   },
  chat_user: {
    type: Schema.Types.Mixed,
    required: true,
  },
  chat_admin: {
    type: Schema.Types.ObjectId,
    ref: CONSTANT.MODELS_NAMES.user,
  },
  // [
  //   {
  //     chat_emailUser: string, Can be Admin or User
  //     chat_message: string // message when send text
  //   },
  //   ....
  // ]
  chat_contents: {
    type: Schema.Types.Mixed,
  },
});

module.exports = model(COLLECTION_NAME, ChatSchema);
