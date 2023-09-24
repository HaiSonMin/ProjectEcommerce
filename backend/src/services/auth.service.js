const bcrypt = require("bcrypt");
const {
  BadRequestError,
  NotFoundError,
  UnavailableError,
  ForbiddenError,
  UnauthenticatedError,
} = require("../core/error.response");
const { UserModel, KeyTokenModel } = require("../models");
const { UserRepo, KeyTokenRepo } = require("../repositories");
const {
  getInfoData,
  verifyToken,
  saveTokenCookie,
  deleteTokenCookie,
  getMiliSecondFormSecond,
  generatorOTP,
} = require("../utils");
const { sendMail } = require("../helpers");
const { htmlResetPassword, htmlRegister } = require("../constant/html");
const {
  createTokenPair,
  createDoubleKeys,
  createDoubleKeysV2,
} = require("../utils/token.utils");
const constant = require("../utils/constant");
const crypto = require("crypto");

class AuthService {
  static async haveAuth(req, res) {
    if (!req.user) throw new UnauthenticatedError("Người dùng chưa đăng nhập");
    return req.user;
  }

  static async createSessionRegister(req, res) {
    const payload = req.body;

    if (payload.user_password !== payload.user_confirmPassword)
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

    delete payload.user_confirmPassword;

    req.app.locals.sessionData = payload;

    console.log(req.app.locals.sessionData);

    return `Tạo phiên đăng kí thành công`;
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
    req.app.locals.sessionConfirm = null;

    return getInfoData(newUser, [
      "user_fullName",
      "user_email",
      "user_phoneNumber",
    ]);
  }

  static async loginSuccessGoogle(req, res) {
    const user = req.user;

    if (!user || !req.isAuthenticated())
      throw new BadRequestError("Login google failed");

    const {
      _id: userId,
      user_fullName: userFullName,
      user_email: userEmail,
    } = user;

    const { privateKey, publicKey } = createDoubleKeysV2();
    const publicKeyString = crypto.createPublicKey(publicKey);

    /////////////////////// Payload of token ///////////////////////
    const payload = { userFullName, userEmail };

    // AT save to Author
    // RT save to DB and Cookie
    const { accessToken, refreshToken } = await createTokenPair({
      payload,
      privateKey,
      publicKey: publicKeyString,
    });

    // Save refreshToken to DB
    await KeyTokenModel.findOneAndUpdate(
      {
        keytoken_userId: userId,
      },
      {
        keytoken_privateKey: privateKey,
        keytoken_publicKey: publicKey,
        keytoken_refreshTokenUsing: refreshToken,
      },
      { new: true, upsert: true }
    );

    // Save refreshToken to cookie( age: 7day)
    saveTokenCookie({
      tokenName: "refreshToken",
      tokenValue: refreshToken,
      day: 7,
      res,
    });

    return {
      user: getInfoData(user, ["_id", "user_email", "user_fullName"]),
      accessToken,
    };
  }

  static async login(req, res) {
    const { user_email, user_password } = req.body;
    // Check user in DB
    const user = await UserRepo.getUserByEmail({ user_email });
    if (!user) throw new NotFoundError("Wrong Email Or Password");
    // Check password is matching
    const isMatchingPassword = await user.comparePassword(user_password);
    if (!isMatchingPassword) throw new NotFoundError("Wrong Email Or Password");

    const {
      _id: userId,
      user_fullName: userFullName,
      user_email: userEmail,
    } = user;

    // const { privateKey, publicKey } = createDoubleKeys();
    const { privateKey, publicKey } = createDoubleKeysV2();

    const keyStore = await KeyTokenModel.findOneAndUpdate(
      {
        keytoken_userId: userId,
      },
      {
        keytoken_userId: userId,
        keytoken_privateKey: privateKey,
        keytoken_publicKey: publicKey,
      },
      { new: true, upsert: true }
    );

    if (!keyStore) throw new BadRequestError("Some thing went wrong");

    const publicKeyString = crypto.createPublicKey(
      keyStore.keytoken_publicKey.toString()
    );

    // AT save to Author
    // RT save to DB and Cookie
    /////////////////////// Payload of token ///////////////////////
    const payload = { userFullName, userEmail };
    const { accessToken, refreshToken } = await createTokenPair({
      payload,
      privateKey,
      publicKey: publicKeyString,
    });

    await keyStore.updateOne({
      $set: {
        keytoken_refreshTokenUsing: refreshToken,
      },
    });

    // Save refreshToken to cookie( age: 7day)
    saveTokenCookie({
      tokenName: "refreshToken",
      tokenValue: refreshToken,
      day: 7,
      res,
    });

    return {
      user: getInfoData(user, ["_id", "user_email", "user_fullName"]),
      accessToken,
    };
  }

  static async logout(req, res) {
    // Check if don't have RT, wont be able to logout
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw new BadRequestError("No RefreshToken in cookie");
    // Delete RT in cookie
    deleteTokenCookie({ tokenName: "RefreshToken", res });
    // Delete RT in Db
    const keyDeleted = await KeyTokenRepo.deleteTokenByRefreshToken(
      refreshToken
    );
    if (!keyDeleted) throw new BadRequestError("Delete RT Error");

    return getInfoData(keyDeleted, [
      "keytoken_userId",
      "keytoken_refreshTokenUsing",
    ]);
  }

  static async createSessionResetPassword(req, res) {
    const { user_email } = req.body;

    const checkEmail = await UserModel.findOne({
      user_email,
    });
    if (!checkEmail)
      throw new BadRequestError(
        "Email người dùng không tồn tại trong hệ thống"
      );

    req.app.locals.sessionData = { user_email };

    return `Tạo phiên reset mật khẩu thành công`;
  }

  static async generateOTP(req, res) {
    // {timeExpireOTP,optionConfirm .....}
    // optionConfirm = 001 => Register
    // optionConfirm = 002 => ResetPassword
    const { timeExpireOTP, optionConfirm } = req.body;

    console.log("req.app.locals.sessionData:::", req.app.locals.sessionData);

    if (!req.app.locals.sessionData)
      throw new BadRequestError("Tạo OTP không thành công");

    const payload = req.app.locals.sessionData;

    if (optionConfirm === "002") {
      const userExist = await UserRepo.getUserByEmail({
        user_email: payload.user_email,
      });
      if (!userExist)
        throw new BadRequestError(
          `Email ${payload.user_email} không tồn tại trong hệ thống`
        );
    }

    req.app.locals.sessionOTP = await generatorOTP();
    req.app.locals.sessionDuration =
      Date.now() + getMiliSecondFormSecond(Number(timeExpireOTP));
    req.app.locals.sessionConfirm = false;

    if (optionConfirm === "001")
      await sendMail(
        payload.user_email,
        htmlRegister(req.app.locals.sessionOTP)
      );
    if (optionConfirm === "002")
      await sendMail(
        payload.user_email,
        htmlResetPassword(req.app.locals.sessionOTP)
      );

    return `Vui lòng kiểm tra email đã điền trước đó`;
  }

  static async confirmOTPResetPassword(req, res) {
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

  static async confirmResetPassword(req, res) {
    const { sessionData, sessionConfirm } = req.app.locals;
    const { user_password, user_confirmPassword } = req.body;
    if (!sessionConfirm)
      throw new UnavailableError(
        "Không thể truy cập trang này khi chưa xác nhận OTP"
      );

    if (user_password !== user_confirmPassword)
      throw new BadRequestError("Mật khẩu xác nhận không khớp");

    const user = await UserRepo.getUserByEmail({
      user_email: sessionData.user_email,
    });

    if (!user) throw new NotFoundError("Người dùng không tồn tại");

    const newPasswordEncode = await bcrypt.hash(user_password, constant.SALT);

    await user.updateOne({
      $set: { user_password: newPasswordEncode },
    });

    req.app.locals.sessionOTP = null;
    req.app.locals.sessionDuration = null;
    req.app.locals.sessionData = null;
    req.app.locals.sessionConfirm = null;

    return "Đổi mật khẩu thành công";
  }

  static async refreshAccessToken(req, res) {
    // Check cookie
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw new BadRequestError("No RefreshToken in cookie");

    // Check DB
    const keyStore = await KeyTokenRepo.findRefreshTokenUsing(refreshToken);
    if (!keyStore) {
      await deleteTokenCookie({ tokenName: "refreshToken", res });
      throw new BadRequestError("Refresh token dost not exist");
    }

    // Verify RT
    const { keytoken_publicKey, keytoken_privateKey } = keyStore;

    const userVerify = verifyToken({
      token: refreshToken,
      key: keytoken_publicKey,
    });
    if (!userVerify) throw new BadRequestError("Verify Token Error");

    const payload = {
      userId: userVerify.userId,
      userFullName: userVerify.userFullName,
      userEmail: userVerify.userEmail,
      userRole: userVerify.userRole,
    };

    const publicKeyString = crypto.createPublicKey(keytoken_publicKey);

    const { accessToken: newAT, refreshToken: newRT } = await createTokenPair({
      payload,
      publicKey: publicKeyString,
      privateKey: keytoken_privateKey,
    });

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
}

module.exports = AuthService;
