const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const { UserModel, KeyTokenModel } = require("../models");
const { UserRepo, KeyTokenRepo } = require("../repositories");
const {
  getInfoData,
  verifyToken,
  saveTokenCookie,
  deleteTokenCookie,
} = require("../utils");
const sendMail = require("../utils/sendMail");
const { createTokenPair, createDoubleKeys } = require("../utils/token.utils");
const UserRepository = require("../repositories/user.repo");

class AuthService {
  static async register(req, res) {
    const payload = req.body;
    if (payload.user_password !== payload.reconfirmPassword)
      throw new BadRequestError("Password and reconfirmPassword don't match");
    const newUser = await UserModel.create(payload);
    if (!newUser) throw new BadRequestError("Register User Error");
    return getInfoData(newUser, [
      "user_firstName",
      "user_lastName",
      "user_userName",
      "user_email",
      "user_phoneNumber",
    ]);
  }

  static async login(req, res) {
    const { user_email, user_password } = req.body;
    // Check user in DB
    const user = await UserRepository.getUserByEmail({ user_email });
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
    console.log("privateKey, publicKey", privateKey, publicKey);

    /////////////////////// Payload of token ///////////////////////
    const payload = { userId, userName, userEmail, userRole };

    // AT save to Author
    // RT save to DB and Cookie
    const { accessToken, refreshToken } = await createTokenPair({
      payload,
      privateKey,
      publicKey,
    });
    console.log("Done");

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
        "user_firstName",
        "user_lastName",
        "user_userName",
        "user_email",
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

  static async forgotPassword(req, res) {
    // Check Email
    const { user_email } = req.body;
    if (!user_email) throw new BadRequestError("Please Provide Your Email");

    // Check user exist by email
    const user = await UserRepo.getUserByEmail({ user_email });
    if (!user) throw new NotFoundError("Not Found User By This Email");

    const secretKey = user.createPasswordChanged();
    await user.save(); // Save secretKey to DB

    const html = `Please click here to change password, Password change time expires in 5 minute. <a href=${process.env.LOCAL_HOST}/api/v1/auth/forgotPassword/${secretKey}>Click here</a>`;
    const responseEmail = await sendMail(user_email, html);
    return {
      sendTo: user_email,
      response: responseEmail,
    };
  }

  static async resetPassword(req, res) {
    const { secretToken } = req.params;
    const { newPassword, repeatNewPassword } = req.body;
    if (newPassword !== repeatNewPassword)
      throw new BadRequestError("NewPassword must be same RepeatNewPassword");

    const encodeSecretToken = crypto
      .createHash("sha256")
      .update(secretToken)
      .digest("hex");

    const user = await UserRepo.matchSecretToken(encodeSecretToken);
    if (!user)
      throw new BadRequestError(
        "Time change new password expired, please try again"
      );

    const newPasswordEncode = await bcrypt.hash(newPassword, 8);

    // Update newPassword
    await user.updateOne({
      $set: {
        user_password: newPasswordEncode,
        user_passwordResetSecretKey: null,
        user_passwordResetExpires: null,
      },
    });
    return;
  }
}

module.exports = AuthService;
