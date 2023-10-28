const { CREATED, OK } = require('../core/success.response');
const { ChatService } = require('../services');

class ChatController {
  static async create(req, res) {
    return new CREATED({
      message: 'Create chat room successfully',
      metadata: await ChatService.create(req, res),
    }).send(res);
  }
  static async getById(req, res) {
    return new OK({
      message: 'Get chat room by id successfully',
      metadata: await ChatService.getById(req, res),
    }).send(res);
  }
  static async getAll(req, res) {
    return new OK({
      message: 'Get all chat room successfully',
      metadata: await ChatService.getAll(req, res),
    }).send(res);
  }
  static async update(req, res) {
    return new OK({
      message: 'Update chat room successfully',
      metadata: await ChatService.update(req, res),
    }).send(res);
  }
  static async delete(req, res) {
    return new OK({
      message: 'Delete chat room successfully',
      metadata: await ChatService.delete(req, res),
    }).send(res);
  }
}

module.exports = ChatController;
