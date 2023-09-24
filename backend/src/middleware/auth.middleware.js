const JWT = require("jsonwebtoken");
const {
  ForbiddenError,
  BadRequestError,
  UnauthenticatedError,
} = require("../core/error.response");
const { KeyTokenRepo, UserRepo } = require("../repositories");
const { deleteTokenCookie } = require("../utils");
const { KeyTokenModel } = require("../models");

const authentication = async (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) throw new ForbiddenError("Invalid Credential 1");

  const { refreshToken } = req.cookies;
  if (!refreshToken) throw new ForbiddenError("Invalid credential 2");

  const keyStore = await KeyTokenRepo.findRefreshTokenUsing(refreshToken);
  if (!keyStore) throw new BadRequestError("Invalid credential 3");

  try {
    JWT.verify(refreshToken, keyStore.keytoken_publicKey);
  } catch {
    await KeyTokenModel.deleteOne({ keytoken_refreshTokenUsing: refreshToken });
    throw deleteTokenCookie("refreshToken", res);
  }

  try {
    const payload = JWT.verify(
      accessToken.split(" ")[1].trim(),
      keyStore.keytoken_publicKey
    );
    // {
    //   user_fullName: userFullName,
    //   user_email: userEmail,
    // }
    req.user = payload;
  } catch (error) {
    throw new UnauthenticatedError("Phiên đăng nhập hết hạn");
  }

  return next();
};

const checkAuthIsUser = async (req, res, next) => {
  await authentication(req, res, next);
  const { userEmail } = req.user;
  const user = await UserRepo.getUserByEmail({ user_email: userEmail });
  if (user.user_role !== "USER")
    throw new UnauthenticatedError("Only user must be visit here");
};

const checkAuthIsAdmin = async (req, res, next) => {
  await authentication(req, res, next);
  const { userEmail } = req.user;
  const user = await UserRepo.getUserByEmail({ user_email: userEmail });
  if (user.user_role !== "ADMIN")
    throw new UnauthenticatedError(
      "You don't have enough permission visit here"
    );
};

const validationCaptcha = async (req, res, next) => {
  const { tokenCaptcha } = req.body;
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${tokenCaptcha}`,
    { method: "POST" }
  );

  const data = await response.json();
  if (!data.success)
    throw new BadRequestError("Lỗi xác thực Captcha vui lòng thử lại");
  next();
};

module.exports = {
  authentication,
  checkAuthIsUser,
  checkAuthIsAdmin,
  validationCaptcha,
};
