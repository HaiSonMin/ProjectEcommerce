const { model, Schema } = require('mongoose');
const CONSTANT = require('../constant');
const COLLECTION_NAME = CONSTANT.MODELS_NAMES.comment;
const CommentSchema = new Schema(
  {
    comment_product: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: CONSTANT.MODELS_NAMES.product,
      index: true,
    },
    comment_user: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: CONSTANT.MODELS_NAMES.user,
    },
    comment_content: {
      type: String,
      required: [true, 'Vui lòng nhập comment'],
    },
    comment_left: {
      type: Number,
      default: 0,
    },
    comment_right: {
      type: Number,
      default: 0,
    },
    comment_parent: {
      type: Schema.Types.ObjectId,
      ref: CONSTANT.MODELS_NAMES.comment,
    },
    comment_isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = model(COLLECTION_NAME, CommentSchema);
