const { model, Schema } = require("mongoose");
const CONSTANT = require("../constant");
const COLLECTION_NAME = CONSTANT.MODELS_NAMES.notification;

const NotificationSchema = new Schema({
  notification_message: {
    type: String,
    required: [true, "Please provide notification message"],
  },
  notification_userId: {
    type: Schema.Types.ObjectId,
    ref: constant.MODELS_NAMES.user,
    required: [true, "Please provide notification message"],
  },
});

module.exports = model(COLLECTION_NAME, NotificationSchema);
