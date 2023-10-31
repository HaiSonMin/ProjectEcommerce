const { NotFoundError, BadRequestError } = require('../core/error.response');
const { CommentModel } = require('../models');
const { CommentRepo, ProductRepo, UserRepo } = require('../repositories');

class CommentService {
  static async createComment(req, res) {
    const { comment_product, comment_content, comment_parent } = req.body;
    const { userId } = req.user;

    const product = await ProductRepo.getProductById({
      productId: comment_product,
    });
    if (!product)
      throw new BadRequestError('Không tồn tại sản phẩm bạn muốn comment');

    let rightValue;
    if (comment_parent) {
      const parentComment = await CommentRepo.getCommentById(comment_parent);
      if (!parentComment)
        throw new BadRequestError('Comment này không tồn tại');

      rightValue = parentComment.comment_right;

      await CommentModel.bulkWrite([
        {
          updateMany: {
            filter: {
              comment_product,
              comment_right: { $gte: rightValue },
            },
            update: {
              $inc: { comment_right: 2 },
            },
          },
        },
        {
          updateMany: {
            filter: {
              comment_product,
              comment_left: { $gt: rightValue },
            },
            update: {
              $inc: { comment_left: 2 },
            },
          },
        },
      ]);

      // await Promise.all([
      //   CommentModel.updateMany(
      //     {
      //       comment_product,
      //       comment_right: { $gte: rightValue },
      //     },
      //     { $inc: { comment_right: 2 } }
      //   ),
      //   CommentModel.updateMany(
      //     {
      //       comment_product,
      //       comment_left: { $gt: rightValue },
      //     },
      //     { $inc: { comment_left: 2 } }
      //   ),
      // ]);
    } else {
      const maxRightValue = await CommentModel.findOne(
        {
          comment_product: comment_product,
        },
        'comment_right',
        { sort: { comment_right: -1 } }
      );
      if (maxRightValue) rightValue = maxRightValue.comment_right + 1;
      else rightValue = 1;
    }

    const newComment = await CommentModel.create({
      comment_user: userId,
      comment_product: comment_product,
      comment_content: comment_content,
      comment_parent: comment_parent,
      comment_left: rightValue,
      comment_right: rightValue + 1,
    });

    return newComment;
  }

  static async getCommentByProductId(req, res) {
    const { productId } = req.params;
    const comments = await CommentRepo.getCommentByProductId(productId);
    return comments;
  }

  static async getCommentByParentId(req, res) {
    const { productId, commentId } = req.params;
    console.log('productId, parentId:::', req.params);

    const product = await ProductRepo.getProductById({
      productId,
    });
    if (!product)
      throw new BadRequestError('Không tồn tại sản phẩm bạn muốn comment');

    const parentComment = await CommentRepo.getCommentById(commentId);
    if (!parentComment)
      throw new BadRequestError('Comment đã không còn tồn tại');

    const { page, limit } = req.query;
    const comments = await CommentRepo.getCommentByParentId({
      commentId,
      productId,
      limit,
      page,
    });
    return comments;
  }

  static async deleteComment(req, res) {
    const { productId, commentId } = req.params;
    console.log('productId, commentId:::', req.params);

    // Delete comment and delete all comment children in to parent comment
    const product = await ProductRepo.getProductById({ productId: productId });
    if (!product)
      throw new BadRequestError('Không tồn tại sản phẩm bạn muốn xóa comment');

    const comment = await CommentRepo.getCommentById(commentId);
    if (!comment) throw new BadRequestError('Comment đã không còn tồn tại');

    // root comment
    if (comment.comment_left === 1) {
      console.log('Delete root comment');
      await CommentRepo.deleteCommentByProductId(productId);
      return;
    } else {
      const leftValue = comment.comment_left;
      const rightValue = comment.comment_right;
      const widthPoint = rightValue - leftValue + 1;

      await CommentModel.bulkWrite([
        {
          deleteMany: {
            filter: {
              $and: [
                {
                  comment_product: productId,
                  comment_left: { $gte: leftValue },
                  comment_right: { $lte: rightValue },
                },
              ],
            },
          },
        },
        {
          updateMany: {
            filter: {
              comment_left: { $gt: rightValue },
            },
            update: {
              $inc: { comment_left: -widthPoint, comment_right: -widthPoint },
            },
          },
        },
        {
          updateMany: {
            filter: {
              $and: [
                {
                  comment_left: { $lt: rightValue },
                  comment_right: { $gt: rightValue },
                },
              ],
            },
            update: {
              $inc: { comment_right: -widthPoint },
            },
          },
        },
      ]);
      return;
    }
  }

  static async deleteCommentByProductId(req, res) {
    const { productId } = req.params;
    await CommentRepo.deleteCommentByProductId(productId);
    return;
  }
}

module.exports = CommentService;
