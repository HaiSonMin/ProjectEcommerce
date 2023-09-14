const { model, Schema } = require("mongoose");
const COLLECTION_NAME = "Notification";

const NotificationSchema = new Schema({
  notification_message: {
    type: String,
    required: [true, "Please provide notification message"],
  },
  notification_: {
    type: String,
    required: [true, "Please provide notification message"],
  },
});

module.exports = model(COLLECTION_NAME, NotificationSchema);
