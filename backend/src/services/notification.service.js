const CONSTANT = require('../constant');
const { NotificationModel } = require('../models');

class NotificationService {
  // Send notification via user email
  static async pushNotification({
    notification_user,
    notification_type,
    notification_thumb,
    notification_options,
  }) {
    let notification_message;
    switch (notification_type) {
      case CONSTANT.TYPE_NOTIFICATION['COUPON-001']:
        notification_message = '';
        break;
      case CONSTANT.TYPE_NOTIFICATION['COUPON-002']:
        notification_message = '';
        break;
      case CONSTANT.TYPE_NOTIFICATION['DISCOUNT-001']:
        notification_message = '';
        break;
      case CONSTANT.TYPE_NOTIFICATION['DISCOUNT-002']:
        notification_message = '';
        break;
      case CONSTANT.TYPE_NOTIFICATION['ORDER-001']:
        notification_message = '';
        break;
      case CONSTANT.TYPE_NOTIFICATION['ORDER-002']:
        notification_message = '';
        break;
      case CONSTANT.TYPE_NOTIFICATION['PRODUCT-001']:
        notification_message = '';
        break;
      case CONSTANT.TYPE_NOTIFICATION['SHIPPING-001']:
        notification_message = '';
        break;
      case CONSTANT.TYPE_NOTIFICATION['SHIPPING-002']:
        notification_message = '';
        break;
      default:
        break;
    }

    const newNotification = NotificationModel.create({
      notification_message,
      notification_options,
      notification_thumb,
      notification_type,
      notification_user,
    });

    return newNotification;
  }

  static async getAllNotificationByUserId(req, res) {
    const { userId } = req.user;
    const listNotiByUserId = await NotificationModel.find({
      notification_user: userId,
    });
    return listNotiByUserId;
  }

  static async deleteNotification({ _id }) {}
}

module.exports = NotificationService;
