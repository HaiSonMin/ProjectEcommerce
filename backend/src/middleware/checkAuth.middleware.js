const JWT = require("jsonwebtoken");
const {
  ForbiddenError,
  BadRequestError,
  UnauthenticatedError,
} = require("../core/error.response");
const { KeyTokenRepo } = require("../repositories");

const authentication = async (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken || !accessToken.startsWith("Bearer "))
    throw new ForbiddenError("Invalid Credential 1");

  const { refreshToken } = req.cookies;
  if (!refreshToken) throw new ForbiddenError("Invalid credential 2");

  const keyStore = await KeyTokenRepo.findRefreshTokenUsing(refreshToken);
  if (!keyStore) throw new BadRequestError("KeyStore Error");

  // console.log("accessToken.split()[1]:::", accessToken.split(" ")[1]);
  // console.log("keyStore.keytoken_publicKey:::", keyStore.keytoken_publicKey);

  const payload = JWT.verify(
    accessToken.split(" ")[1],
    keyStore.keytoken_publicKey
  );

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

module.exports = {
  authentication,
  checkAuthIsUser,
  checkAuthIsAdmin,
};
