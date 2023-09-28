const { model, Schema } = require("mongoose"); // Erase if already required
const CONSTANT  = require("../constant");
const COLLECTION_NAME = CONSTANT.MODELS_NAMES.question;
const QuestionSchema = new Schema(
  {
    question_userId: {
      type: Schema.Types.ObjectId,
      ref: CONSTANT.MODELS_NAMES.user,
      required: true,
    },
    question_productId: {
      type: Schema.Types.ObjectId,
      ref: CONSTANT.MODELS_NAMES.product,
      required: true,
    },
    question_content: {
      type: String,
      required: true,
    },
    question_answer: String,
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = model(COLLECTION_NAME, QuestionSchema);
