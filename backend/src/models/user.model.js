const bcrypt = require("bcrypt");
const { model, Schema } = require("mongoose"); // Erase if already required
const crypto = require("crypto");
const CONSTANT = require("../constant");
const COLLECTION_NAME = CONSTANT.MODELS_NAMES.user;
// Declare the Schema of the Mongo model
const UserSchema = new Schema(
  {
    user_fullName: {
      type: String,
      required: [true, "Please provide user full name"],
      maxlength: 100,
    },
    user_email: {
      type: String,
      match: [
        /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm,
        ,
        "Email không đúng định dạng",
      ],
      unique: [true, "Email đã được đăng kí trước đó"],
      required: [true, "Vui lòng bổ sung email"],
      maxlength: 50,
    },
    user_password: {
      type: String,
      required: [true, "Vui lòng bổ sung mật khẩu"],
      select: false,
    },
    user_role: {
      type: String,
      enum: ["USER", "WRITER", "READER", "ADMIN"],
      default: "USER",
    },
    user_phoneNumber: {
      type: String,
      match: [
        /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
        "Số điện thoại không đúng định dạng",
      ],
    },
    user_referralCode: String,
    user_address: {
      type: Schema.Types.ObjectId,
      ref: CONSTANT.MODELS_NAMES.user,
    },
    user_avatar: String,
    user_isBlocking: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({
  user_email: 1,
  user_fullName: 1,
  user_phoneNumber: 1,
});

UserSchema.pre("save", async function (next) {
  this.user_password = await bcrypt.hash(this.user_password, CONSTANT.SALT);
  next();
});

UserSchema.methods = {
  comparePassword: async function (password) {
    console.log(password, this.user_password);

    return await bcrypt.compare(password, this.user_password);
  },

  createSessionOTP: function (OTPCode) {
    this.user_OTP = OTPCode;
    this.user_sessionDuration = Date.now() + 2 * 60 * 1000; // Time expires is 2minute
  },
};

//Export the model
module.exports = model(COLLECTION_NAME, UserSchema);
