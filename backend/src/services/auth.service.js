const bcrypt = require("bcrypt");
const {
  BadRequestError,
  NotFoundError,
  UnavailableError,
  ForbiddenError,
} = require("../core/error.response");
const { UserModel, KeyTokenModel, SessionAuthModel } = require("../models");
const { UserRepo, KeyTokenRepo } = require("../repositories");
const {
  getInfoData,
  verifyToken,
  saveTokenCookie,
  deleteTokenCookie,
  getMiliSecondMinute,
  generateOTP,
} = require("../utils");
const { sendMail } = require("../helpers");
const { htmlResetPassword, htmlRegister } = require("../constant/html");
const { createTokenPair, createDoubleKeys } = require("../utils/token.utils");
const constant = require("../utils/constant");

class AuthService {
  static async register(req, res) {
    const payload = req.body;
    const OTP = await generateOTP();
    if (payload.user_password !== payload.reconfirmPassword)
      throw new BadRequestError("Mật khẩu xác nhận không khớp");

    const checkPhone = await UserModel.findOne({
      user_phoneNumber: payload.user_phoneNumber,
    });
    if (checkPhone)
      throw new BadRequestError("Số điện thoại đã được đăng kí trước đó");

    const checkEmail = await UserModel.findOne({
      user_email: payload.user_email,
    });
    if (checkEmail) throw new BadRequestError("Email đã được đăng kí trước đó");

    const checkUserName = await UserModel.findOne({
      user_userName: payload.user_userName,
    });
    if (checkUserName)
      throw new BadRequestError("Tên người dùng đã được đăng kí trước đó");

    delete payload.reconfirmPassword;

    // create newSessionAuth
    const newSessionAuth = await SessionAuthModel.create({
      session_OTP: OTP,
      session_data: payload,
      session_duration: Date.now() + getMiliSecondMinute(2),
    });

    if (!newSessionAuth) throw new BadRequestError("Tạo người dùng thất bại");
    await sendMail(payload.user_email, htmlRegister(OTP));

    return "Vui lòng kiểm tra gmail của bạn";
  }

  static async confirmRegisterUser(req, res) {
    const { OTPCode } = req.body;

    const sessionAuth = await SessionAuthModel.findOne({
      session_OTP: OTPCode,
    }).exec();
    if (!sessionAuth)
      throw new NotFoundError("OTP không đúng, vui lòng kiểm tra lại");

    if (sessionAuth.session_duration < Date.now())
      throw new NotFoundError(
        "Mã OTP đã hết hiệu lực, vui lòng nhấn vào nút gửi lại mã"
      );

    const user = await UserModel.create(sessionAuth.session_data);
    if (!user) throw new BadRequestError("Tạo người dùng thất bại");

    await SessionAuthModel.findByIdAndDelete(sessionAuth._id);

    return getInfoData(user, [
      "user_userName",
      "user_email",
      "user_role",
      "user_phoneNumber",
    ]);
  }

  static async login(req, res) {
    const { user_email, user_password } = req.body;
    console.log(req.app.locals);
    // Check user in DB
    const user = await UserRepo.getUserByEmail({ user_email });
    if (!user) throw new NotFoundError("Wrong Email Or Password");
    // Check password is matching
    const isMatchingPassword = await user.comparePassword(user_password);
    if (!isMatchingPassword) throw new NotFoundError("Wrong Email Or Password");

    const {
      _id: userId,
      user_userName: userName,
      user_email: userEmail,
      user_role: userRole,
    } = user;

    const { privateKey, publicKey } = createDoubleKeys();

    /////////////////////// Payload of token ///////////////////////
    const payload = { userId, userName, userEmail, userRole };

    // AT save to Author
    // RT save to DB and Cookie
    const { accessToken, refreshToken } = await createTokenPair({
      payload,
      privateKey,
      publicKey,
    });

    // Save refreshToken to DB
    const keyStore = await KeyTokenModel.findOneAndUpdate(
      {
        keytoken_userId: userId,
      },
      {
        keytoken_privatekey: privateKey,
        keytoken_publicKey: publicKey,
        keytoken_refreshTokenUsing: refreshToken,
      },
      { new: true, upsert: true }
    );
    if (!keyStore) throw new BadRequestError("Create KeyStore Error");

    // Save refreshToken to cookie( age: 7day)
    saveTokenCookie({
      tokenName: "refreshToken",
      tokenValue: refreshToken,
      day: 7,
      res,
    });

    return {
      user: getInfoData(user, [
        "_id",
        "user_role",
        "user_email",
        "user_userName",
      ]),
      accessToken,
    };
  }

  static async logout(req, res) {
    // Check if don't have RT, wont be able to logout
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw new BadRequestError("No RefreshToken in cookie");
    // Delete RT in cookie
    deleteTokenCookie({ tokenName: "refreshToken", res });
    // Delete RT in Db
    const keyDeleted = await KeyTokenRepo.deleteTokenByRefreshToken(
      refreshToken
    );
    if (!keyDeleted) throw new BadRequestError("Delete RT Error");

    console.log("refreshToken:::", refreshToken);

    return getInfoData(keyDeleted, [
      "keytoken_userId",
      "keytoken_refreshTokenUsing",
    ]);
  }

  static async refreshAccessToken(req, res) {
    // Check cookie
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw new BadRequestError("No RefreshToken in cookie");

    // Check DB
    const keyStore = await KeyTokenRepo.findRefreshTokenUsing(refreshToken);
    if (!keyStore) throw new BadRequestError("Refresh token dost not exist");

    // Verify RT
    const { keytoken_publicKey, keytoken_privatekey } = keyStore;

    const userVerify = verifyToken({
      token: refreshToken,
      key: keytoken_privatekey,
    });
    if (!userVerify) throw new BadRequestError("Verify Token Error");
    const payload = {
      userId: userVerify.userId,
      userName: userVerify.userName,
      userEmail: userVerify.userEmail,
      userRole: userVerify.userRole,
    };

    const { accessToken: newAT, refreshToken: newRT } = await createTokenPair({
      payload,
      publicKey: keytoken_publicKey,
      privateKey: keytoken_privatekey,
    });

    console.log(newAT, newRT);
    // Update refreshToken
    await keyStore.updateOne({
      $set: {
        keytoken_refreshTokenUsing: newRT,
      },
      $addToSet: {
        keytoken_refreshTokenUsed: refreshToken,
      },
    });

    // Save refreshToken to cookie( age: 7day)
    saveTokenCookie({
      tokenName: "refreshToken",
      tokenValue: newRT,
      day: 7,
      res,
    });

    return {
      user: payload,
      newAccessToken: newAT,
    };
  }

  // static async forgotPassword(req, res) {
  //   // Check Email
  //   const { user_email } = req.body;
  //   const OTP = await generateOTP();
  //   if (!user_email)
  //     throw new BadRequestError("Vui lòng nhập bổ sung địa chỉ email");

  //   // Check user exist by email
  //   const user = await UserRepo.getUserByEmail({ user_email });
  //   if (!user)
  //     throw new NotFoundError(
  //       `Email ${user_email} chưa được đăng kí trong hệ thống`
  //     );

  //   const sessionAuth = await SessionAuthModel.create({
  //     session_OTP: OTP,
  //     session_duration: Date.now() + 2 * 60 * 1000,
  //   });

  //   await Promise.all([
  //     user.updateOne({ $set: { user_sessionAuth: sessionAuth._id } }),
  //     sendMail(user_email, htmlLogin(OTP)),
  //   ]);
  // }

  // static async createResetPasswordSession(req, res) {
  //   const { OTPCode } = req.body;

  //   const sessionAuth = await SessionAuthModel.findOne({
  //     session_OTP: OTPCode,
  //   }).exec();

  //   if (!sessionAuth) throw new NotFoundError("Mã OTP không chính xác");

  //   if (sessionAuth.session_duration < Date.now())
  //     throw new UnavailableError(
  //       "Mã OTP đã hết hiệu lực, vui lòng nhấn vào nút gửi lại mã"
  //     );
  //   await sessionAuth.updateOne({ $set: { session_confirm: true } });
  //   return "Xác nhận OTP thành công";
  // }

  // static async resetPassword(req, res) {
  //   const { user_password, reconfirmPassword, user_email } = req.body;

  //   const user = await UserRepo.getUserByEmail({ user_email });
  //   if (!user) throw new NotFoundError("Người dùng không tồn tại");

  //   const sessionAuth = await SessionAuthModel.findById(user.user_sessionAuth);
  //   if (!sessionAuth || !sessionAuth.session_confirm)
  //     throw new ForbiddenError("Chưa xác nhận mã OTP, vui lòng thử lại");

  //   if (user_password !== reconfirmPassword)
  //     throw new BadRequestError("Mật khẩu xác nhận không khớp");

  //   const newPasswordEncode = await bcrypt.hash(user_password, constant.SALT);

  //   // Update newPassword
  //   await Promise.all([
  //     user.updateOne({
  //       $set: {
  //         user_password: newPasswordEncode,
  //         user_sessionAuth: null,
  //       },
  //     }),
  //     SessionAuthModel.findByIdAndDelete(user.user_sessionAuth),
  //   ]);
  //   return;
  // }

  static async createSessionRegister(req, res) {
    const payload = req.body;

    if (payload.user_password !== payload.reconfirmPassword)
      throw new BadRequestError("Mật khẩu xác nhận không khớp");

    const checkEmail = await UserModel.findOne({
      user_email: payload.user_email,
    });
    if (checkEmail) throw new BadRequestError("Email đã được đăng kí trước đó");

    const checkPhone = await UserModel.findOne({
      user_phoneNumber: payload.user_phoneNumber,
    });
    if (checkPhone)
      throw new BadRequestError("Số điện thoại đã được đăng kí trước đó");

    const checkUserName = await UserModel.findOne({
      user_userName: payload.user_userName,
    });
    if (checkUserName)
      throw new BadRequestError("Tên người dùng đã được đăng kí trước đó");

    delete payload.reconfirmPassword;

    req.app.locals.sessionOTP = await generateOTP();
    req.app.locals.sessionDuration = Date.now() + getMiliSecondMinute(2);
    req.app.locals.sessionData = payload;

    await sendMail(payload.user_email, htmlRegister(req.app.locals.sessionOTP));

    return `Vui lòng kiểm tra email ${payload.user_email}`;
  }

  static async confirmRegister(req, res) {
    const { OTPCode } = req.body;
    const { sessionOTP, sessionDuration, sessionData } = req.app.locals;

    if (Number(OTPCode) !== Number(sessionOTP))
      throw new BadRequestError(
        "Mã OTP không chính xác, vui lòng kiểm tra lại"
      );
    if (sessionDuration < Date.now())
      throw new BadRequestError(
        "Mã OTP hết hạn, nhấn vào nút gửi lại để xác nhận mã khác"
      );

    const newUser = await UserModel.create(sessionData);

    if (!newUser) throw new BadRequestError("Tạo tài khoảng thất bại");

    req.app.locals.sessionOTP = null;
    req.app.locals.sessionDuration = null;
    req.app.locals.sessionData = null;

    return getInfoData(newUser, [
      "user_userName",
      "user_email",
      "user_phoneNumber",
      "user_role",
    ]);
  }

  static async generateOTPResetPassword(req, res) {
    const { user_email } = req.body;

    const userExist = await UserRepo.getUserByEmail({
      user_email,
    });

    if (!userExist)
      throw new BadRequestError(
        `Email ${user_email} không tồn tại trong hệ thống`
      );

    req.app.locals.sessionOTP = await generateOTP();
    req.app.locals.sessionDuration = Date.now() + getMiliSecondMinute(2);
    req.app.locals.sessionConfirm = false;
    req.app.locals.sessionData = user_email;

    await sendMail(user_email, htmlResetPassword(req.app.locals.sessionOTP));

    return `Vui lòng kiểm tra email ${user_email}`;
  }

  static async createSessionResetPassword(req, res) {
    const { OTPCode } = req.body;
    const { sessionOTP, sessionDuration } = req.app.locals;
    if (Number(OTPCode) !== Number(sessionOTP))
      throw new BadRequestError(
        "Mã OTP không chính xác, vui lòng kiểm tra lại"
      );

    if (sessionDuration < Date.now())
      throw new BadRequestError(
        "Mã OTP hết hạn, nhấn vào nút gửi lại để xác nhận mã khác"
      );

    req.app.locals.sessionConfirm = true;

    return `Xác nhận thành công`;
  }

  static async resetPassword(req, res) {
    const { sessionData: user_email, sessionConfirm } = req.app.locals;
    const { user_password, reconfirmPassword } = req.body;
    if (!sessionConfirm)
      throw new UnavailableError(
        "Không thể truy cập trang này khi chưa xác nhận OTP"
      );

    if (user_password !== reconfirmPassword)
      throw new BadRequestError("Mật khẩu xác nhận không khớp");

    const user = await UserRepo.getUserByEmail({ user_email });

    if (!user) throw new NotFoundError("Người dùng không tồn tại");

    const newPasswordEncode = await bcrypt.hash(user_password, constant.SALT);

    await user.updateOne({
      $set: { user_password: newPasswordEncode },
    });

    req.app.locals.sessionOTP = null;
    req.app.locals.sessionData = null;
    req.app.locals.sessionDuration = null;
    req.app.locals.sessionConfirm = false;

    return "Đổi mật khẩu thành công";
  }
}

module.exports = AuthService;
