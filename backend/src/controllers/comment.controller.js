const { CREATED, OK } = require('../core/success.response');
const { CommentService } = require('../services');

class CommentController {
  static async createComment(req, res) {
    new CREATED({
      message: 'Create comment successfully',
      metadata: await CommentService.createComment(req, res),
    }).send(res);
  }

  static async getCommentByProductId(req, res) {
    new OK({
      message: 'Get comment by product id successfully',
      metadata: await CommentService.getCommentByProductId(req, res),
    }).send(res);
  }

  static async getCommentByParentId(req, res) {
    new OK({
      message: 'Get comment by parent id successfully',
      metadata: await CommentService.getCommentByParentId(req, res),
    }).send(res);
  }

  static async deleteComment(req, res) {
    new OK({
      message: 'Delete comment successfully',
      metadata: await CommentService.deleteComment(req, res),
    }).send(res);
  }

  static async deleteCommentByProductId(req, res) {
    new OK({
      message: 'Delete comment by product id successfully',
      metadata: await CommentService.deleteCommentByProductId(req, res),
    }).send(res);
  }
}

module.exports = CommentController;
