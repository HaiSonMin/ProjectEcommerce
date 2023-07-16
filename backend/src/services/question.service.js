const { QuestionModel } = require("../models");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const { ProductRepo, QuestionRepo } = require("../repositories");

class QuestionService {
  static async createQuestion(req, res) {
    const dataCreate = {
      question_productId: req.params,
      question_userId: req.user.userId,
      ...req.body,
    };
    const newQuestion = await QuestionModel.create(dataCreate);
    if (!newQuestion) throw new BadRequestError("Create question error");
    return { newQuestion };
  }

  static async getAllQuestionByProductId(req, res) {
    const { productId } = req.params;
    const findProduct = await ProductRepo.getProductById({ productId });
    if (!findProduct)
      throw new NotFoundError("Product doesn't exist for get questions ");

    const questions = await QuestionRepo.getAllQuestionByProductId({
      productId,
    });
    if (!questions.length) throw new NotFoundError("Questions are empty ");

    return { questions };
  }

  static async updateQuestion(req, res) {
    const { questionId, ...payload } = req.body;
    const questionUpdated = await QuestionRepo.updateAnswerQuestion({
      questionId,
      payload,
    });

    if (!questionUpdated)
      throw new NotFoundError("Question doesn't exist for update");
    return { questionUpdated };
  }

  static async deleteQuestion(req, res) {
    const { questionId } = req.body;
    const questionDeleted = await QuestionRepo.deleteQuestion({
      questionId,
    });

    if (!questionDeleted)
      throw new NotFoundError("Question doesn't exist for delete");
    return { questionDeleted };
  }

  static async deleteAllQuestions(req, res) {
    const { productId } = req.body;
    await QuestionRepo.deleteAllQuestion({
      productId,
    });
  }
}

module.exports = QuestionService;
