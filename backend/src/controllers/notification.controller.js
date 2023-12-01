const { OK } = require('../core/success.response');
const { NotificationService } = require('../services');

class NotificationController {
  static async getAllNotificationByUserId(req, res) {
    new OK({
      message: 'Get all notifications by userId successfully',
      metadata: await NotificationService.getAllNotificationByUserId(req, res),
    }).send(res); 
  }
}

module.exports = NotificationController;
