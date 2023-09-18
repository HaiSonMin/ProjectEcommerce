const JWT = require("jsonwebtoken");
const {
  ForbiddenError,
  BadRequestError,
  UnauthenticatedError,
} = require("../core/error.response");
const { KeyTokenRepo, UserRepo } = require("../repositories");
const {
  deleteTokenCookie,
  generateOTP,
  getMiliSecondMinute,
} = require("../utils");

const authentication = async (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) throw new ForbiddenError("Invalid Credential 1");

  const { refreshToken } = req.cookies;
  if (!refreshToken) throw new ForbiddenError("Invalid credential 2");

  const keyStore = await KeyTokenRepo.findRefreshTokenUsing(refreshToken);
  if (!keyStore) throw new BadRequestError("KeyStore Error");

  try {
    JWT.verify(refreshToken, keyStore.keytoken_privatekey);
  } catch {
    throw deleteTokenCookie("refreshToken", res);
  }

  const payload = JWT.verify(
    accessToken.split(" ")[1].trim(),
    keyStore.keytoken_publicKey
  );

  // {
  //   _id: userId,
  //   user_userName: userName,
  //   user_email: userEmail,
  //   user_role: userRole,
  // }
  req.user = payload;

  return next();
};

const checkAuthIsUser = async (req, res, next) => {
  await authentication(req, res, next);
  const { userRole } = req.user;
  if (userRole !== "USER")
    throw new UnauthenticatedError("Only user must be visit here");
};

const checkAuthIsAdmin = async (req, res, next) => {
  await authentication(req, res, next);
  const { userRole } = req.user;
  if (userRole !== "ADMIN")
    throw new UnauthenticatedError(
      "You don't have enough permission visit here"
    );
};

const localVariables = (req, res, next) => {
  req.app.locals = {
    sessionOTP: null,
    sessionDuration: null,
    sessionConfirm: null,
    sessionData: null,
  };

  next();
};

module.exports = {
  localVariables,
  authentication,
  checkAuthIsUser,
  checkAuthIsAdmin,
};
