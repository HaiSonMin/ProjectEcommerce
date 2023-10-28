const express = require('express');
const { ChatController } = require('../controllers');
const router = express.Router();

router.route('/create').post(ChatController.create);
router.route('/getById/:chatId').get(ChatController.getById);
router.route('/getAll').get(ChatController.getAll);
router.route('/update/:chatId').patch(ChatController.getAll);
router.route('/delete/:chatId').delete(ChatController.delete);

module.exports = router;
