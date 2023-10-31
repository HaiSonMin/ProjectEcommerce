const { model, Schema } = require('mongoose');
const CONSTANT = require('../constant');
const COLLECTION_NAME = CONSTANT.MODELS_NAMES.notification;

const NotificationSchema = new Schema(
  {
    notification_type: {
      type: String,
      enum: [
        'PRODUCT-001', // CREATE NEW PRODUCT
        'ORDER-001', // ORDER SUCCESS
        'ORDER-002', // ORDER FAIL
        'SHIPPING-001', // ON DELIVERY
        'SHIPPING-002', // DELIVERED
        'COUPON-001', // HAVE NEW COUPON
        'DISCOUNT-001', // PRODUCT IS ON SALE
      ],
      required: [true, 'Please provide notification type'],
    },
    notification_message: {
      type: String,
      required: [true, 'Please provide notification message'],
    },
    notification_user: {
      type: Schema.Types.ObjectId,
      ref: CONSTANT.MODELS_NAMES.user,
    },
    notification_options: {
      type: Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

module.exports = model(COLLECTION_NAME, NotificationSchema);
