const { BadRequestError } = require('../core/error.response');
const { ChatModel } = require('../models');
const { skipPage } = require('../utils');

class ChatService {
  static async create(req, res) {
    const { chat_userName, chat_userEmail, chat_userPhone, chat_userSex } =
      req.body;

    if (!chat_userName || !chat_userEmail || !chat_userPhone || !chat_userSex)
      throw new BadRequestError('Vui lòng điền đầy đủ thông tin');

    const chatUser = {
      chat_userName,
      chat_userEmail,
      chat_userPhone,
      chat_userSex,
    };

    const newChat = await ChatModel.create({ chat_user: chatUser });

    return newChat;
  }

  static async getById(req, res) {
    const { chatId } = req.params;
    const chat = await ChatModel.findById(chatId);
    if (!chat) throw new BadRequestError('Phòng chat không tồn tại');
    return chat;
  }

  static async getAll(req, res) {
    const { page, limit } = req.query;
    const chats = await ChatModel.find()
      .skip(skipPage({ page, limit }))
      .limit(limit || 10)
      .lean()
      .exec();
    return chats;
  }

  // When admin join the chat or send new message
  static async update(req, res) {
    const { chatId } = req.params;
    const { userId, userEmail } = req.user;
    const { message } = req.body;
    if (!message) return;
    const chatUpdated = await ChatModel.findByIdAndUpdate(chatId, {
      $set: { chat_admin: userId },
      $addToSet: {
        chat_contents: {
          chat_emailUser: userEmail,
          chat_message: message,
        },
      },
    });

    if (!chatUpdated) throw new BadRequestError('Không tìm thấy phòng chat');

    return chats;
  }

  static async delete(req, res) {
    const { chatId } = req.params;
    const chatDeleted = await ChatModel.findByIdAndDelete(chatId);
    if (!chatDeleted) throw new BadRequestError('Phòng chat không tồn tại');
    return chatDeleted;
  }
}

module.exports = ChatService;
