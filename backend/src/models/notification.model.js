const { model, Schema } = require('mongoose');
const CONSTANT = require('../constant');
const COLLECTION_NAME = CONSTANT.MODELS_NAMES.notification;

const NotificationSchema = new Schema(
  {
    notification_type: {
      type: String,
      enum: Object.keys(CONSTANT.TYPE_NOTIFICATION),
      required: [true, 'Please provide notification type'],
    },
    // We need store in redis
    // notification_status: {
    //   type: String, // If MQ send message fail, after 10-30p(option setup), message will be send again
    //   enum: ['SUCCESS', 'FAIL'],
    // },
    notification_thumb: {
      type: String, // It's image when system push notification
      required: true,
    },
    notification_message: {
      type: String,
      required: [true, 'Please provide notification message'],
    },
    notification_user: {
      type: Schema.Types.ObjectId,
      ref: CONSTANT.MODELS_NAMES.user,
      index: true,
    },
    notification_options: {
      type: Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

module.exports = model(COLLECTION_NAME, NotificationSchema);
