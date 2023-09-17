const JWT = require("jsonwebtoken");
const crypto = require("crypto");

const createDoubleKeys = () => {
  const privateKey = crypto.randomBytes(64).toString("hex");
  const publicKey = crypto.randomBytes(64).toString("hex");
  return { privateKey, publicKey };
};

const createTokenPair = async ({ payload = {}, privateKey, publicKey }) => {
  const accessToken = JWT.sign(payload, publicKey, { expiresIn: "10s" });
  const refreshToken = JWT.sign(payload, privateKey, { expiresIn: "3d" });

  // Check AT have valid
  JWT.verify(accessToken, publicKey, (err, decode) => {
    if (err) console.error(`Error verify:::${err}`);
    else {
      console.log(`accessToken:::`, accessToken);
      console.log(`publicKey:::`, publicKey);
    }
  });

  return { accessToken, refreshToken };
};

module.exports = { createDoubleKeys, createTokenPair };
