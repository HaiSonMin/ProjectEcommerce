const { CREATED, OK } = require("../core/success.response");
const { QuestionService } = require("../services");
class QuestionController {
  static async createQuestion(req, res) {
    new CREATED({
      message: "Create Question successfully",
      metadata: await QuestionService.createQuestion(req, res),
    }).send(res);
  }
  static async getQuestionsByProductId(req, res) {
    new OK({
      message: "Get ratings by productId successfully",
      metadata: await QuestionService.getQuestionsByProductId(req, res),
    }).send(res);
  }
  static async updateQuestion(req, res) {
    new OK({
      message: "Update Question successfully",
      metadata: await QuestionService.updateQuestion(req, res),
    }).send(res);
  }
  static async deleteQuestion(req, res) {
    new OK({
      message: "Delete Question successfully",
      metadata: await QuestionService.deleteQuestion(req, res),
    }).send(res);
  }
  static async deleteAllQuestions(req, res) {
    new OK({
      message: "Delete all Question by product id successfully",
      metadata: await QuestionService.deleteAllQuestions(req, res),
    }).send(res);
  }
}

module.exports = QuestionController;
