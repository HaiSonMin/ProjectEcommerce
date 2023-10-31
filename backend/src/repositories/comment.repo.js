const { CommentModel } = require('../models');
const { skipPage } = require('../utils');

class CommentRepo {
  static async getCommentById(commentId) {
    return await CommentModel.findById(commentId);
  }

  static async getCommentByProductId(productId) {
    return await CommentModel.find({ comment_product: productId });
  }

  static async getCommentByParentId({
    productId,
    commentId,
    limit = 10,
    page = 1,
  }) {
    return await CommentModel.find({
      comment_product: productId,
      comment_parent: commentId,
    })
      .limit(limit)
      .skip(skipPage({ limit, page }))
      .lean()
      .exec();
  }

  static async updateCommentById(commentId, payload) {
    return await CommentModel.findByIdAndUpdate(commentId, payload, {
      new: true,
    });
  }

  static async deleteCommentById(commentId) {
    return await CommentModel.findByIdAndDelete(commentId).lean().exec();
  }

  static async deleteCommentByProductId(productId) {
    await CommentModel.deleteMany({ comment_product: productId });
  }
}

module.exports = CommentRepo;
