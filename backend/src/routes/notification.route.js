const express = require('express');
const router = express.Router();
const { NotificationController } = require('../controllers');
const { authentication } = require('../middleware/auth.middleware');

router.use(authentication);
router.route('/getAll').get(NotificationController.getAllNotificationByUserId);

module.exports = router;
