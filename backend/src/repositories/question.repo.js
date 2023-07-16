const { QuestionModel } = require("../models");

class QuestionRepo {
  static async getAllQuestionByProductId({ productId }) {
    return await QuestionModel.find({
      question_productId: productId,
    }).exec();
  }
  static async updateAnswerQuestion({ questionId, payload }) {
    return await QuestionModel.findByIdAndUpdate(questionId, payload, {
      new: true,
    }).exec();
  }
  static async deleteQuestion({ questionId }) {
    return await QuestionModel.findByIdAndDelete({
      questionId,
    }).exec();
  }
  static async deleteAllQuestion({ productId }) {
    return await QuestionModel.deleteMany({
      question_productId: productId,
    }).exec();
  }
}

module.exports = QuestionRepo;
