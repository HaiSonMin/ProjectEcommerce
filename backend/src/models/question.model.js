const { model, Schema } = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Question";
const QuestionSchema = new Schema(
  {
    question_userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    question_productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    question_content: {
      type: String,
      required: true,
      minlength: [
        20,
        "Please provide rating point getter than equal 20 character",
      ],
    },
    question_answer: String,
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = model(COLLECTION_NAME, QuestionSchema);
