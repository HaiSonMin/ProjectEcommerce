const bcrypt = require("bcrypt");
const { model, Schema } = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "User";
const crypto = require("crypto");
const CONSTANT = require("../utils/constant");
const constant = require("../utils/constant");
// Declare the Schema of the Mongo model
const UserSchema = new Schema(
  {
    user_firstName: {
      type: String,
      maxlength: 50,
    },
    user_lastName: {
      type: String,
      maxlength: 50,
    },
    user_userName: {
      type: String,
      required: [true, "Please provide user Name"],
      unique: [true, "Name has exist, please enter other name"],
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
      unique: [true, "Số điện thoại đã được đăng kí trước đó"],
      required: true,
      match: [
        /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
        "Số điện thoại không đúng định dạng",
      ],
    },
    user_address: {
      type: Schema.Types.ObjectId,
      ref: constant.MODELS_NAMES.user,
    },
    user_avatar: String,
    user_isBlocking: {
      type: Boolean,
      default: false,
    },
    user_sessionAuth: {
      type: Schema.Types.ObjectId,
      ref: constant.MODELS_NAMES.SessionAuth,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({
  user_email: 1,
  user_userName: 1,
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
